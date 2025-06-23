import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturarExpedicionCertificadosComponent } from './capturar-expedicion-certificados.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Expedicion120204Store } from '../../estados/tramites/expedicion120204.store';
import { Expedicion120204Query } from '../../estados/queries/expedicion120204.query';
import { ExpedicionCertificadoService } from '../../services/expedicion-certificado.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CapturarExpedicionCertificadosComponent', () => {
  let component: CapturarExpedicionCertificadosComponent;
  let fixture: ComponentFixture<CapturarExpedicionCertificadosComponent>;
  let serviceMock: any;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    serviceMock = {
      getEntidadFederativa: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Entidad1' }])),
      getRepresentacionFederal: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Rep1' }])),
      getDetallesDelalicitacion: jest.fn().mockReturnValue(of({
        numeraDelicitacion: '123',
        fechaDelEventoDelicitacion: '2024-01-01',
        descripcionDelProducto: 'desc'
      })),
      obtenerDatosTabla: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Licitacion1' }])),
      getDistribucionSaldo: jest.fn().mockReturnValue(of({
        montoDisponible: '1000'
      }))
    };
    storeMock = {
      setEntidadFederativa: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      setMontoExpedir: jest.fn(),
      setMontoExpedirCheck: jest.fn(),
      setTotalExpedir: jest.fn()
    };
    queryMock = {
      selectSolicitud$: of({
        entidadFederativa: 'Entidad1',
        representacionFederal: 'Rep1',
        numeraDelicitacion: '123',
        fechaDelEventoDelicitacion: '2024-01-01',
        descripcionDelProducto: 'desc',
        montoDisponible: '1000',
        montoAExpedir: '100',
        montoAExpedirCheck: true,
        totalAExpedir: '1100'
      })
    };

    await TestBed.configureTestingModule({
      imports: [CapturarExpedicionCertificadosComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ExpedicionCertificadoService, useValue: serviceMock },
        { provide: Expedicion120204Store, useValue: storeMock },
        { provide: Expedicion120204Query, useValue: queryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CapturarExpedicionCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set esFormularioSoloLectura from readonly input on ngOnInit', () => {
    component.readonly = true;
    component.ngOnInit();
    expect(component.esFormularioSoloLectura).toBe(true);
  });

  it('should get entidad federativa and set options', () => {
    component.getEntidadFederativa();
    expect(serviceMock.getEntidadFederativa).toHaveBeenCalled();
    expect(component.entidadFederativaOptions).toEqual([{ id: 1, nombre: 'Entidad1' }]);
  });

  it('should get representacion federal and set options', () => {
    component.getRepresentacionFederal();
    expect(serviceMock.getRepresentacionFederal).toHaveBeenCalled();
    expect(component.representacionFederalOptions).toEqual([{ id: 1, nombre: 'Rep1' }]);
  });

  it('should patch detalledelaLicitacionForm with licitacion details', () => {
    component.detalledelaLicitacionForm = new FormBuilder().group({
      numeraDelicitacion: [''],
      fechaDelEventoDelicitacion: [''],
      descripcionDelProducto: ['']
    });
    component.getDetallesDelalicitacion();
    expect(serviceMock.getDetallesDelalicitacion).toHaveBeenCalled();
    expect(component.detalledelaLicitacionForm.value.numeraDelicitacion).toBe('123');
  });

  it('should set datos from obtenerDatosTabla', () => {
    component.obtenerDatosTabla();
    expect(serviceMock.obtenerDatosTabla).toHaveBeenCalled();
    expect(component.datos).toEqual([{ id: 1, nombre: 'Licitacion1' }]);
  });

  it('should patch distribucionSaldoForm with distribucion saldo', () => {
    component.distribucionSaldoForm = new FormBuilder().group({
      montoDisponible: ['']
    });
    component.getDistribucionSaldo();
    expect(serviceMock.getDistribucionSaldo).toHaveBeenCalled();
    expect(component.distribucionSaldoForm.value.montoDisponible).toBe('1000');
  });

  it('should call store setEntidadFederativa on onCambiarEntiadFederative', () => {
    component.formulario = new FormBuilder().group({
      entidadFederativa: ['Entidad1']
    });
    component.onCambiarEntiadFederative();
    expect(storeMock.setEntidadFederativa).toHaveBeenCalledWith('Entidad1');
  });

  it('should call store setRepresentacionFederal on onCambiarRepresentacionFederal', () => {
    component.formulario = new FormBuilder().group({
      representacionFederal: ['Rep1']
    });
    component.onCambiarRepresentacionFederal();
    expect(storeMock.setRepresentacionFederal).toHaveBeenCalledWith('Rep1');
  });

  it('should call store setMontoExpedir on onCambiarMontoAExpedir', () => {
    component.distribucionSaldoForm = new FormBuilder().group({
      montoAExpedir: ['100']
    });
    component.onCambiarMontoAExpedir();
    expect(storeMock.setMontoExpedir).toHaveBeenCalledWith('100');
  });

  it('should call store setMontoExpedirCheck on onCambiarMontoAExpedirCheck', () => {
    component.distribucionSaldoForm = new FormBuilder().group({
      montoAExpedirCheck: [true]
    });
    component.onCambiarMontoAExpedirCheck();
    expect(storeMock.setMontoExpedirCheck).toHaveBeenCalledWith(true);
  });

  it('should add montoAExpedir to totalAExpedir and update store', () => {
    component.distribucionSaldoForm = new FormBuilder().group({
      montoAExpedir: ['100'],
      totalAExpedir: ['200']
    });
    component.AgregarMontoExpedir();
    expect(component.distribucionSaldoForm.value.totalAExpedir).toBe('300');
    expect(storeMock.setTotalExpedir).toHaveBeenCalledWith(300);
  });

  it('should return true if distribucionSaldoForm control is invalid and touched', () => {
    component.distribucionSaldoForm = new FormBuilder().group({
      test: ['val']
    });
    const control = component.distribucionSaldoForm.get('test');
    control?.markAsTouched();
    control?.setErrors({ required: true });
    expect(component.isInvalid('test')).toBe(true);
  });

  it('should return null if distribucionSaldoForm control does not exist', () => {
    component.distribucionSaldoForm = new FormBuilder().group({});
    expect(component.isInvalid('notExist')).toBeNull();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
