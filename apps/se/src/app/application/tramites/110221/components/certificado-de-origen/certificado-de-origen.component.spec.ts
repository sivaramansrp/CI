import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';

import { of } from 'rxjs';
import { RegistroService } from '../../services/registro.service';
import { Tramite110221Store } from '../../state/Tramite110221.store';
import { Tramite110221Query } from '../../state/Tramite110221.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;
  let registroService: RegistroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificadoDeOrigenComponent],
      providers: [
        FormBuilder,
        {
          provide: RegistroService,
          useValue: {
            getTratado: jest.fn(),
            getPais: jest.fn(),
            getUMC: jest.fn(),
            getUnidadMedida: jest.fn(),
            getTipoFactura: jest.fn(),
            getSolicitudesTabla: jest.fn(),
            getSolicitudesDataTabla: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    registroService = TestBed.inject(RegistroService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    jest.spyOn(component, 'donanteDomicilio');
    jest.spyOn(component, 'getTratado');
    jest.spyOn(component, 'getPais');
    jest.spyOn(component, 'getUMC');
    jest.spyOn(component, 'getUnidadMedida');
    jest.spyOn(component, 'getTipoFactura');
    jest.spyOn(component, 'getSolicitudesTabla');

    component.ngOnInit();

    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.getTratado).toHaveBeenCalled();
    expect(component.getPais).toHaveBeenCalled();
    expect(component.getUMC).toHaveBeenCalled();
    expect(component.getUnidadMedida).toHaveBeenCalled();
    expect(component.getTipoFactura).toHaveBeenCalled();
    expect(component.getSolicitudesTabla).toHaveBeenCalled();
  });

  it('should mark all fields as touched if registroForm is invalid on validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        tratado: ['', Validators.required],
      }),
    });

    component.validarDestinatarioFormulario();

    expect(component.registroForm.get('validacionForm.tratado')?.touched).toBe(true);
  });

  it('should mark all fields as touched if mercanciaForm is invalid on validarMercanciaForm', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({
        cantidad: ['', Validators.required],
      }),
    });

    component.validarMercanciaForm();

    expect(component.mercanciaForm.get('validacionMercanciaForm.cantidad')?.touched).toBe(true);
  });

  it('should toggle cargarArchivo to true on cargaArchivo', () => {
    component.cargarArchivo = false;

    component.cargaArchivo();

    expect(component.cargarArchivo).toBe(true);
  });

  it('should toggle mostrarErrores to true and cargarArchivo to false on darError', () => {
    component.mostrarErrores = false;
    component.cargarArchivo = true;

    component.darError();

    expect(component.mostrarErrores).toBe(true);
    expect(component.cargarArchivo).toBe(false);
  });

  it('should update fechaInicial in registroForm on cambioFechaInicial', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        fechaInicial: [''],
      }),
    });

    component.cambioFechaInicial('2023-01-01');

    expect(component.registroForm.get('validacionForm.fechaInicial')?.value).toBe('2023-01-01');
  });

  it('should update fechaFinal in registroForm on cambioFechaFinal', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        fechaFinal: [''],
      }),
    });

    component.cambioFechaFinal('2023-12-31');

    expect(component.registroForm.get('validacionForm.fechaFinal')?.value).toBe('2023-12-31');
  });

  it('should update fecha in mercanciaForm on cambioFechaFactura', () => {
    component.mercanciaForm = new FormBuilder().group({
      validacionMercanciaForm: new FormBuilder().group({
        fecha: [''],
      }),
    });

    component.cambioFechaFactura('2023-06-15');

    expect(component.mercanciaForm.get('validacionMercanciaForm.fecha')?.value).toBe('2023-06-15');
  });

  it('should call registroService.getTratado on getTratado', () => {
    const getTratadoSpy = jest.spyOn(registroService, 'getTratado').mockReturnValue(of({ code: 200, data: [] }));

    component.getTratado();

    expect(getTratadoSpy).toHaveBeenCalled();
  });

  it('should call registroService.getPais on getPais', () => {
    const getPaisSpy = jest.spyOn(registroService, 'getPais').mockReturnValue(of({ code: 200, data: [] }));

    component.getPais();

    expect(getPaisSpy).toHaveBeenCalled();
  });

  it('should call registroService.getUMC on getUMC', () => {
    const getUMCSpy = jest.spyOn(registroService, 'getUMC').mockReturnValue(of({ code: 200, data: [] }));

    component.getUMC();

    expect(getUMCSpy).toHaveBeenCalled();
  });

  it('should call registroService.getUnidadMedida on getUnidadMedida', () => {
    const getUnidadMedidaSpy = jest.spyOn(registroService, 'getUnidadMedida').mockReturnValue(of({ code: 200, data: [] }));

    component.getUnidadMedida();

    expect(getUnidadMedidaSpy).toHaveBeenCalled();
  });

  it('should call registroService.getTipoFactura on getTipoFactura', () => {
    const getTipoFacturaSpy = jest.spyOn(registroService, 'getTipoFactura').mockReturnValue(of({ code: 200, data: [] }));

    component.getTipoFactura();

    expect(getTipoFacturaSpy).toHaveBeenCalled();
  });

  it('should set nombreArchivo on alSeleccionarArchivo', () => {
    const mockEvent = {
      target: {
        files: [{ name: 'test-file.txt' }],
      },
    };

    component.alSeleccionarArchivo(mockEvent);

    expect(component.nombreArchivo).toBe('test-file.txt');
  });

  it('should set nombreArchivo to default message if no file is selected on alSeleccionarArchivo', () => {
    const mockEvent = {
      target: {
        files: [],
      },
    };

    component.alSeleccionarArchivo(mockEvent);

    expect(component.nombreArchivo).toBe('No se eligió ningún archivo');
  });

  it('should call registroService.getSolicitudesTabla on getSolicitudesTabla', () => {
    const getSolicitudesTablaSpy = jest.spyOn(registroService, 'getSolicitudesTabla').mockReturnValue(of([]));

    component.getSolicitudesTabla();

    expect(getSolicitudesTablaSpy).toHaveBeenCalled();
  });

  it('should call registroService.getSolicitudesDataTabla on getSolicitudesDataTabla', () => {
    const getSolicitudesDataTablaSpy = jest.spyOn(registroService, 'getSolicitudesDataTabla').mockReturnValue(of([]));

    component.getSolicitudesDataTabla();

    expect(getSolicitudesDataTablaSpy).toHaveBeenCalled();
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
  });
});