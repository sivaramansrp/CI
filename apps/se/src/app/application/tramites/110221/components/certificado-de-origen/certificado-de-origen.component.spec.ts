import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { RegistroService } from '../../services/registro.service';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Tramite110221Query } from '../../../../estados/queries/Tramite110221.query';
import { Tramite110221Store } from '../../../../estados/tramites/Tramite110221.store';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;
  let registroServiceMock: any;
  let storeMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getTratado: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getPais: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getUMC: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getUnidadMedida: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getTipoFactura: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getSolicitudesTabla: jest.fn().mockReturnValue(of([])),
      getSolicitudesDataTabla: jest.fn().mockReturnValue(of([])),
    };

    storeMock = {
      setTercerOperador: jest.fn(),
      setTratado: jest.fn(),
      setPais: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setNumRegistro: jest.fn(),
      setNomComercial: jest.fn(),
      setFechInicioB: jest.fn(),
      setFechFinB: jest.fn(),
      setArchivo: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({
        tercerOperador: false,
        tratado: null,
        pais: null,
        fraccionArancelaria: '',
        numeroRegistro: '',
        nombreComercial: '',
        fechaInicial: '',
        fechaFinal: '',
        archivo: '',
      }),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, CommonModule,CertificadoDeOrigenComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110221Store, useValue: storeMock },
        { provide: Tramite110221Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    component.mercanciasHeader = ['Column 1', 'Column 2', 'Column 3'];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.registroForm).toBeDefined();
    expect(component.mercanciaForm).toBeDefined();
  });

  it('should call getTratado on ngOnInit', () => {
    const getTratadoSpy = jest.spyOn(component, 'getTratado');
    component.ngOnInit();
    expect(getTratadoSpy).toHaveBeenCalled();
  });

  it('should call getPais on ngOnInit', () => {
    const getPaisSpy = jest.spyOn(component, 'getPais');
    component.ngOnInit();
    expect(getPaisSpy).toHaveBeenCalled();
  });

  it('should call getUMC on ngOnInit', () => {
    const getUMCSpy = jest.spyOn(component, 'getUMC');
    component.ngOnInit();
    expect(getUMCSpy).toHaveBeenCalled();
  });

  it('should call getUnidadMedida on ngOnInit', () => {
    const getUnidadMedidaSpy = jest.spyOn(component, 'getUnidadMedida');
    component.ngOnInit();
    expect(getUnidadMedidaSpy).toHaveBeenCalled();
  });

  it('should call getTipoFactura on ngOnInit', () => {
    const getTipoFacturaSpy = jest.spyOn(component, 'getTipoFactura');
    component.ngOnInit();
    expect(getTipoFacturaSpy).toHaveBeenCalled();
  });

  it('should call setValoresStore when tercerOperador checkbox is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const checkbox = fixture.debugElement.nativeElement.querySelector('#tercerOperador');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.validacionForm, 'tercerOperador', 'setTercerOperador');
  });

  it('should call setValoresStore when tratado dropdown is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.validacionForm.get('tratado')?.setValue('Tratado 1');
    const input = fixture.debugElement.nativeElement.querySelector('#tratado');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.validacionForm, 'tratado', 'setTratado');
  });

  it('should call setValoresStore when pais dropdown is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.validacionForm.get('pais')?.setValue('País 1');
    const input = fixture.debugElement.nativeElement.querySelector('#pais');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.validacionForm, 'pais', 'setPais');
  });

  it('should call setValoresStore when fraccionArancelaria input is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.validacionForm.get('fraccionArancelaria')?.setValue('123456');
    const input = fixture.debugElement.nativeElement.querySelector('#fraccionArancelaria');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.validacionForm, 'fraccionArancelaria', 'setFraccionArancelaria');
  });

  it('should call setValoresStore when numeroRegistro input is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.validacionForm.get('numeroRegistro')?.setValue('12345');
    const input = fixture.debugElement.nativeElement.querySelector('#numeroRegistro');
     input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.validacionForm, 'numeroRegistro', 'setNumRegistro');
  });

  it('should call setValoresStore when nombreComercial input is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.validacionForm.get('nombreComercial')?.setValue('Nombre Comercial');
    const input = fixture.debugElement.nativeElement.querySelector('#nombreComercial');
     input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.validacionForm, 'nombreComercial', 'setNomComercial');
  });

  it('should call setValoresStore when fechaInicial is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaInicial('2023-01-01');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.validacionForm, 'fechaInicial', 'setFechInicioB');
  });

  it('should call setValoresStore when fechaFinal is changed', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaFinal('2023-12-31');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.validacionForm, 'fechaFinal', 'setFechFinB');
  });

  // it('should call setValoresStore when archivo is selected', () => {
  //   const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
  //   const fileInput = fixture.debugElement.nativeElement.querySelector('#archivoAdjuntar');
  //   const file = new File([''], 'test-file.txt', { type: 'text/plain' });
  //   const event = { target: { files: [file] } };
  //   component.alSeleccionarArchivo(event);
  //   fixture.detectChanges();
  //   expect(setValoresStoreSpy).toHaveBeenCalledWith(component.validacionForm, 'archivo', 'setArchivo');
  // });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});