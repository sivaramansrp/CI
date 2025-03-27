import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { HistoricoProductoresComponent } from './historico-productores.component';
import { CertificadosOrigenService } from '../../services/certificadosOrigen.service';
import { Tramite110216Store } from '../../../../estados/tramites/tramite110216.store';
import { Tramite110216Query } from '../../../../estados/queries/tramite110216.query';
import { TituloComponent, TablaDinamicaComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';


describe('HistoricoProductoresComponent', () => {
  let component: HistoricoProductoresComponent;
  let fixture: ComponentFixture<HistoricoProductoresComponent>;
  let certificadosOrigenServiceMock: any;
  let tramite110216StoreMock: any;
  let tramite110216QueryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    certificadosOrigenServiceMock = {
      obtenerProductorPorExportador: jest.fn().mockReturnValue(of({ datos: [{ id: 1, nombreProductor: 'Productor 1' }] }))
    };

    tramite110216StoreMock = {
      setDatosConfidencialesProductor: jest.fn(),
      setProductorMismoExportador: jest.fn(),
      setAgregarDatosProductorNumeroRegistroFiscal: jest.fn(),
      setAgregarDatosProductorFax: jest.fn()
    };

    tramite110216QueryMock = {
      selectSolicitud$: of({
        datosConfidencialesProductor: true,
        productorMismoExportador: true,
        agregarDatosProductorFormulario: {
          numeroRegistroFiscal: '12345',
          fax: '1234567890'
        }
      })
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true)
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        TituloComponent,
        TablaDinamicaComponent,
        HistoricoProductoresComponent
      ],
      providers: [
        FormBuilder,
        { provide: CertificadosOrigenService, useValue: certificadosOrigenServiceMock },
        { provide: Tramite110216Store, useValue: tramite110216StoreMock },
        { provide: Tramite110216Query, useValue: tramite110216QueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoProductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('datosConfidencialesProductor')?.value).toBe(true);
    expect(component.formulario.get('productorMismoExportador')?.value).toBe(true);
    expect(component.agregarDatosProductorFormulario.get('numeroRegistroFiscal')?.value).toBe('12345');
    expect(component.agregarDatosProductorFormulario.get('fax')?.value).toBe('1234567890');
  });

  it('should call setValoresStore when datosConfidencialesProductor checkbox is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const checkbox = fixture.debugElement.nativeElement.querySelector('#idConfidencialesProductores');
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formulario, 'datosConfidencialesProductor', 'setDatosConfidencialesProductor');
  });

  it('should call setValoresStore when productorMismoExportador checkbox is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const checkbox = fixture.debugElement.nativeElement.querySelector('#idProductorMismoExportador');
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formulario, 'productorMismoExportador', 'setProductorMismoExportador');
  });

  it('should call cargarProductorPorExportador on ngOnInit', () => {
    const cargarProductorPorExportadorSpy = jest.spyOn(component, 'cargarProductorPorExportador');
    component.ngOnInit();
    expect(cargarProductorPorExportadorSpy).toHaveBeenCalled();
  });

  it('should load productores on cargarProductorPorExportador', () => {
    component.cargarProductorPorExportador();
    expect(certificadosOrigenServiceMock.obtenerProductorPorExportador).toHaveBeenCalled();
    expect(component.productoresExportador).toEqual([{ id: 1, nombreProductor: 'Productor 1' }]);
  });

  it('should call setValoresStore when numeroRegistroFiscal input is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const input = fixture.debugElement.nativeElement.querySelector('#numeroRegistroFiscal');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.agregarDatosProductorFormulario, 'numeroRegistroFiscal', 'setAgregarDatosProductorNumeroRegistroFiscal');
  });

  it('should call setValoresStore when fax input is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const input = fixture.debugElement.nativeElement.querySelector('#fax');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.agregarDatosProductorFormulario, 'fax', 'setAgregarDatosProductorFax');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should add selected productores to agregarProductoresExportador on productoresSeleccionados', () => {
    component.seleccionadoProductoresExportador = [{
      "id": 1,
      "nombreProductor": "Productor 1",
      "numeroRegistroFiscal": "AEVL621207B95",
      "direccion": "SAN GABRIEL 144 DURANGO",
      "correoElectronico": "laura2992@hotmail.com",
      "telefono": "044-6182999535",
      "fax": "6182999535"
    }];
    component.productoresSeleccionados();
    expect(component.agregarProductoresExportador).toEqual([{
      "id": 1,
      "nombreProductor": "Productor 1",
      "numeroRegistroFiscal": "AEVL621207B95",
      "direccion": "SAN GABRIEL 144 DURANGO",
      "correoElectronico": "laura2992@hotmail.com",
      "telefono": "044-6182999535",
      "fax": "6182999535"
    }]);
    expect(component.productoresExportador).toEqual([]);
  });

  it('should remove selected productores from agregarProductoresExportador on eliminarProductoresSeleccionados', () => {
    component.seleccionadoAgregarProductoresExportador = [{
      "id": 1,
      "nombreProductor": "Productor 1",
      "numeroRegistroFiscal": "AEVL621207B95",
      "direccion": "SAN GABRIEL 144 DURANGO",
      "correoElectronico": "laura2992@hotmail.com",
      "telefono": "044-6182999535",
      "fax": "6182999535"
    }];
    component.agregarProductoresExportador = [{
      "id": 1,
      "nombreProductor": "Productor 1",
      "numeroRegistroFiscal": "AEVL621207B95",
      "direccion": "SAN GABRIEL 144 DURANGO",
      "correoElectronico": "laura2992@hotmail.com",
      "telefono": "044-6182999535",
      "fax": "6182999535"
    }];
    component.eliminarProductoresSeleccionados();
    expect(component.agregarProductoresExportador).toEqual([]);
  });

  it('should open modal on agregarDatosProductorPorExportador', () => {
    const modalElement = fixture.debugElement.nativeElement.querySelector('#modalAgregarDatosProductorPorExportador');
    component.modalElement = { nativeElement: modalElement };
    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.agregarDatosProductorPorExportador();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });

  it('should close modal on cerrarModal', () => {
    const modalElement = fixture.debugElement.nativeElement.querySelector('#modalAgregarDatosProductorPorExportador');
    component.modalElement = { nativeElement: modalElement };
    const clickSpy = jest.spyOn(Modal.prototype, 'show');
    component.cerrarModal();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should mark all fields as touched and close modal if form is valid on agregarExportador', () => {
    const cerrarModalSpy = jest.spyOn(component, 'cerrarModal');
    component.agregarDatosProductorFormulario = component.fb.group({
      numeroRegistroFiscal: ['12345', [Validators.required, Validators.minLength(5)]],
      fax: ['1234567890', [Validators.required, Validators.maxLength(20)]]
    });
    component.agregarExportador();
    expect(component.agregarDatosProductorFormulario.touched).toBe(true);
    expect(cerrarModalSpy).toHaveBeenCalled();
  });

  it('should mark all fields as touched and not close modal if form is invalid on agregarExportador', () => {
    const cerrarModalSpy = jest.spyOn(component, 'cerrarModal');
    component.agregarDatosProductorFormulario = component.fb.group({
      numeroRegistroFiscal: ['', [Validators.required, Validators.minLength(5)]],
      fax: ['', [Validators.required, Validators.maxLength(20)]]
    });
    component.agregarExportador();
    expect(component.agregarDatosProductorFormulario.touched).toBe(true);
    expect(cerrarModalSpy).not.toHaveBeenCalled();
  });
});