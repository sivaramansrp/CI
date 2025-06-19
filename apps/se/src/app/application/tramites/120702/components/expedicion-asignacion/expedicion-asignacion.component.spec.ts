import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ExpedicionAsignacionComponent } from './expedicion-asignacion.component';
import { Tramite120702Store } from '../../estados/tramite120702.store';
import { Tramite120702Query } from '../../estados/tramite120702.query';
import { ExpedicionCertificadosFronteraService } from '../../services/expedicion-certificados-frontera.service';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';

describe('ExpedicionAsignacionComponent', () => {
  let component: ExpedicionAsignacionComponent;
  let fixture: ComponentFixture<ExpedicionAsignacionComponent>;
  let store: Tramite120702Store;
  let query: Tramite120702Query;
  let service: ExpedicionCertificadosFronteraService;

  const mockAnoOficioDatos = [
    { id: 1, descripcion: '2024' },
    { id: 2, descripcion: '2025' },
  ];

  const mockMontoExpedirTablaDatos = {
    columns: ['Monto A Expedir'],
    rows: [],
  };

const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: false })
};
TestBed.configureTestingModule({
  providers: [
    { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
  ]
});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedicionAsignacionComponent,ReactiveFormsModule],
      declarations: [],
      providers: [
        FormBuilder,
        {
          provide: Tramite120702Store,
          useValue: {
            setDynamicFieldValue: jest.fn(),
          },
        },
        {
          provide: Tramite120702Query,
          useValue: {
            selectSolicitud$: of({}),
          },
        },
        {
          provide: ExpedicionCertificadosFronteraService,
          useValue: {
            getAnoOficioDatos: jest.fn().mockReturnValue(of(mockAnoOficioDatos)),
            getMontoExpedirTabla: jest
              .fn()
              .mockReturnValue(of(mockMontoExpedirTablaDatos)),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedicionAsignacionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Tramite120702Store);
    query = TestBed.inject(Tramite120702Query);
    service = TestBed.inject(ExpedicionCertificadosFronteraService);
    component.consultaState = {
      procedureId: '',
      parameter: '',
      department: '',
      folioTramite: '',
      tipoDeTramite: '',
      estadoDeTramite: '',
      readonly: false,
      create: false,
      update: true,
      consultaioSolicitante: null,
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component creation', () => {
    expect(component.asignacionForm).toBeDefined();
    expect(component.asignacionForm.get('anoDelOficio')?.value).toBe('');
    expect(component.asignacionForm.get('estado')?.value).toBe('CHIHUAHUA');
    expect(component.asignacionForm.get('montoAsignado')?.value).toBe('500');
  });

  it('should fetch anoOficioDatos from the service on init', () => {
    expect(service.getAnoOficioDatos).toHaveBeenCalled();
    expect(component.anoOficioDatos).toEqual(mockAnoOficioDatos);
  });

  it('should fetch montoExpedirTabla from the service on init', () => {
    expect(service.getMontoExpedirTabla).toHaveBeenCalled();
    expect(component.montoTablaDatos).toEqual(mockMontoExpedirTablaDatos.columns);
  });

  it('should call setValoresStore and update the store', () => {
    const spy = jest.spyOn(store, 'setDynamicFieldValue');
    component.setValoresStore(component.asignacionForm, 'anoDelOficio', 'setDynamicFieldValue');
    expect(spy).toHaveBeenCalledWith('');
  });

  it('should add montoAExpedir to the table and update totalAExpedir', () => {
    component.asignacionForm.get('montoAExpedir')?.setValue('100');
    component.enviarMontoFormulario();

    expect(component.montoTablaFilaDatos).toEqual([
      { tbodyData: ['100'] },
    ]);
    expect(component.asignacionForm.get('totalAExpedir')?.value).toBe('100');
  });

  it('should clean up subscriptions on component destroy', () => {
    const spyNext = jest.spyOn(component['destroy$'], 'next');
    const spyComplete = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should not add montoAExpedir to the table if value is empty', () => {
  component.asignacionForm.get('montoAExpedir')?.setValue('');
  component.montoTablaFilaDatos = [];
  component.enviarMontoFormulario();
  expect(component.montoTablaFilaDatos.length).toBe(0);
});

it('should patch form values when selectSolicitud$ emits', () => {
  const solicitud = { anoDelOficio: '2025', estado: 'SONORA', montoAsignado: '700' };
  (query as any).selectSolicitud$ = of(solicitud);

  fixture = TestBed.createComponent(ExpedicionAsignacionComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

  expect(component.asignacionForm.get('anoDelOficio')?.value).toBe('2025');
  expect(component.asignacionForm.get('estado')?.value).toBe('SONORA');
  expect(component.asignacionForm.get('montoAsignado')?.value).toBe('700');
});

it('should disable the form if esFormularioSoloLectura is true', () => {
  component.esFormularioSoloLectura = true;
  component.inicializarEstadoFormulario();
  expect(component.asignacionForm.disabled).toBe(true);
});

it('should enable the form if esFormularioSoloLectura is false', () => {
  component.esFormularioSoloLectura = false;
  component.asignacionForm.disable();
  component.inicializarEstadoFormulario();
  expect(component.asignacionForm.enabled).toBe(true);
});

it('should not throw if asignacionForm is undefined in inicializarEstadoFormulario', () => {
  (component as any).asignacionForm = undefined;
  expect(() => component.inicializarEstadoFormulario()).not.toThrow();
});
});