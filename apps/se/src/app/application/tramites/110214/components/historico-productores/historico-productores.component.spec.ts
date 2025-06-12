import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoProductoresComponent } from './historico-productores.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
import { Tramite110214Store } from '../../../../estados/tramites/tramite110214.store';
import { Tramite110214Query } from '../../../../estados/queries/tramite110214.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { TituloComponent, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { HistoricoColumnas, SeleccionadasTabla } from '../../models/validar-inicialmente-certificado.model';

describe('HistoricoProductoresComponent', () => {
  let component: HistoricoProductoresComponent;
  let fixture: ComponentFixture<HistoricoProductoresComponent>;
  let validarInicialmenteCertificadoServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;
  let mockEvento: HistoricoColumnas[];
  let mockSeleccionadasEvento: SeleccionadasTabla[];


  beforeEach(async () => {
    validarInicialmenteCertificadoServiceMock = {
      obtenerProductorPorExportador: jest.fn().mockReturnValue(of({ datos: [{ id: 1, nombreProductor: 'Productor 1' }] })),
      obtenerMercanciasSeleccionadas: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Mercancía Seleccionada' }])),
    };

    tramiteStoreMock = {
      setDatosConfidencialesProductor: jest.fn(),
      setProductorMismoExportador: jest.fn(),
      setAgregarDatosProductorNumeroRegistroFiscal: jest.fn(),
      setAgregarDatosProductorFax: jest.fn(),
      setAsignarProductor: jest.fn(),
    };

    tramiteQueryMock = {
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
    // Initialize mockEvento
    mockEvento = [
      {
        id: 1,
        nombreProductor: 'Productor 1',
        numeroRegistroFiscal: 'AEVL621207B95',
        direccion: 'SAN GABRIEL 144 DURANGO',
        correoElectronico: 'laura2992@hotmail.com',
        telefono: '044-6182999535',
        fax: '6182999535'
      }
    ];
    mockSeleccionadasEvento = [
      {
        id: 0,
        rfcProductor: "",
        fraccionArancelaria: "08888888",
        cantidad: "100.00",
        unidadMedida: "Caja",
        valorMercancia: "100.00",
        tipoFactura: "Manual",
        numFactura: "1122232",
        complementoDescripcion: "CAJA ROJA GRANDE",
        fechaFactura: "2015-03-01"
      }
    ];
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        TituloComponent,
        TablaDinamicaComponent,
        HistoricoProductoresComponent
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: ValidarInicialmenteCertificadoService, useValue: validarInicialmenteCertificadoServiceMock },
        { provide: Tramite110214Store, useValue: tramiteStoreMock },
        { provide: Tramite110214Query, useValue: tramiteQueryMock },
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

  it('should load productores on cargarProductorPorExportador', () => {
    component.cargarProductorPorExportador();
    expect(validarInicialmenteCertificadoServiceMock.obtenerProductorPorExportador).toHaveBeenCalled();
    expect(component.productoresExportador).toEqual([{ id: 1, nombreProductor: 'Productor 1' }]);
  });

  it('should call setValoresStore when numeroRegistroFiscal input is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const input = fixture.debugElement.nativeElement.querySelector('#numeroRegistroFiscal');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.agregarDatosProductorFormulario, 'numeroRegistroFiscal', 'setAgregarDatosProductorNumeroRegistroFiscal');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should add selected productores to agregarProductoresExportador on productoresSeleccionados', () => {
    component.seleccionadoProductoresExportador = mockEvento;
    component.productoresSeleccionados();
    expect(component.productoresExportador).toEqual([]);
  });

  it('should remove selected productores from agregarProductoresExportador on eliminarProductoresSeleccionados', () => {
    component.seleccionadoAgregarProductoresExportador = mockEvento;
    component.agregarProductoresExportador = mockEvento;
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

  it('should update seleccionadoProductoresExportador when obtenerSeleccionadoProductores is called', () => {
    component.obtenerSeleccionadoProductores(mockEvento);
    expect(component.seleccionadoProductoresExportador).toEqual(mockEvento);
  });

  it('should update seleccionadoAgregarProductoresExportador when obtenerAnadirProductosSeleccionados is called', () => {
    component.obtenerAnadirProductosSeleccionados(mockEvento);
    expect(component.seleccionadoAgregarProductoresExportador).toEqual(mockEvento);
  });
  it('should update mercanciaSeleccionadasFila on seleccionDeFilas', () => {
    component.seleccionDeFilas(mockSeleccionadasEvento);
    expect(component.mercanciaSeleccionadasFila).toEqual(mockSeleccionadasEvento);
  });

  it('should call abrirModal and setAsignarProductor with selected rows on asignarProductor', () => {
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    component.mercanciaSeleccionadasFila = mockSeleccionadasEvento;
    component.asignarProductor();
    expect(abrirModalSpy).toHaveBeenCalledWith('Debe seleccionar un productor para asignarle la mercancía');
  });

  it('should call abrirModal and setAsignarProductor with all rows if no selection on asignarProductor', () => {
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    component.mercanciaSeleccionadasTablaDatos = mockSeleccionadasEvento;
    component.mercanciaSeleccionadasFila = null;
    component.asignarProductor();
    expect(abrirModalSpy).toHaveBeenCalledWith('Debe seleccionar un productor para asignarle la mercancía');
  });
});