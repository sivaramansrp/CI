import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ExpedicionAsignacionComponent } from './expedicion-asignacion.component';
import { Tramite120702Store } from '../../estados/tramite120702.store';
import { Tramite120702Query } from '../../estados/tramite120702.query';
import { ExpedicionCertificadosFronteraService } from '../../services/expedicion-certificados-frontera.service';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedicionAsignacionComponent);
    component = fixture.componentInstance;
    component.consultaState = {
      readonly: false,
    } as any;
    store = TestBed.inject(Tramite120702Store);
    query = TestBed.inject(Tramite120702Query);
    service = TestBed.inject(ExpedicionCertificadosFronteraService);
     component.consultaState = {
      readonly: false,
    } as any;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener anoOficioDatos del servicio al inicializar', () => {
    expect(service.getAnoOficioDatos).toHaveBeenCalled();
    expect(component.anoOficioDatos).toEqual(mockAnoOficioDatos);
  });

  it('debería obtener montoExpedirTabla del servicio al inicializar', () => {
    expect(service.getMontoExpedirTabla).toHaveBeenCalled();
    expect(component.montoTablaDatos).toEqual(mockMontoExpedirTablaDatos.columns);
  });

  it('debería llamar a setValoresStore y actualizar el store', () => {
    const spy = jest.spyOn(store, 'setDynamicFieldValue');
    component.asignacionForm.get('anoDelOficio')?.setValue('2025');
    component.setValoresStore(component.asignacionForm, 'anoDelOficio', 'setDynamicFieldValue');
    expect(spy).toHaveBeenCalledWith('2025');
  });

  it('debería agregar montoAExpedir a la tabla y actualizar totalAExpedir', () => {
    component.montoTablaFilaDatos = []; // reset
    component.asignacionForm.get('montoAExpedir')?.setValue('100');
    component.enviarMontoFormulario();

    expect(component.montoTablaFilaDatos).toEqual([{ tbodyData: ['100'] }]);
    expect(component.asignacionForm.get('totalAExpedir')?.value).toBe('0100');
  });

  it('debería limpiar las suscripciones al destruir el componente', () => {
    const spyNext = jest.spyOn(component['destroy$'], 'next');
    const spyComplete = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

it('debería deshabilitar el formulario si esFormularioSoloLectura es true', () => {
  component.esFormularioSoloLectura = true;
  component.inicializarEstadoFormulario();
  expect(component.asignacionForm.disabled).toBe(true);
});

it('debería habilitar el formulario si esFormularioSoloLectura es false', () => {
  component.esFormularioSoloLectura = false;
  component.asignacionForm.disable();
  component.inicializarEstadoFormulario();
  expect(component.asignacionForm.enabled).toBe(true);
});

it('No debería fallar si asignacionForm es undefined en inicializarEstadoFormulario', () => {
  (component as any).asignacionForm = undefined;
  expect(() => component.inicializarEstadoFormulario()).not.toThrow();
});
});