import { TestBed } from '@angular/core/testing';
import { DestinatarioDeComponent } from './destinatario-de.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import {
  SeccionLibQuery,
  SeccionLibStore,
} from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DestinatarioService } from '../../../../shared/services/destinatario.service';
import { of } from 'rxjs';

describe('DestinatarioDeComponent', () => {
  let component: DestinatarioDeComponent;
  let fixture: any;
  let mockStore: jest.Mocked<Tramite110207Store>;
  let mockTramiteQuery: Partial<jest.Mocked<Tramite110207Query>>;
  let mockSeccionQuery: Partial<jest.Mocked<SeccionLibQuery>>;
  let mockSeccionStore: Partial<jest.Mocked<SeccionLibStore>>;
  let mockConsultaQuery: Partial<jest.Mocked<ConsultaioQuery>>;
  let mockDestinatarioService: Partial<jest.Mocked<DestinatarioService>>;

  beforeEach(async () => {
    mockStore = {
      setDestinatarioForm: jest.fn(),
      setFormDatosDelDestinatario: jest.fn(),
      setFormDestinatario: jest.fn(),
      setMedioDeTransporteSeleccion: jest.fn(),
      setPaisDestinSeleccion: jest.fn(),
    } as any;

    mockTramiteQuery = {
      selectDestinatarioForm$: of({ medioDeTransporte: 'Aereo' }),
      selectFormDestinatario$: of({ nombre: 'Juan' }),
      selectFormDatosDelDestinatario$: of({ apellido: 'Perez' }),
      selectPaisDestino$: of([]),
      selectMedioDeTransporte$: of([]),
    };

    mockSeccionQuery = {
      selectSeccionState$: of({ seccion: [true], formaValida: [true] }),
    };

    mockSeccionStore = {};

    mockConsultaQuery = {
      selectConsultaioState$: of({
        procedureId: '',
        parameter: '',
        department: '',
        folioTramite: '',
        tipoDeTramite: '',
        estadoDeTramite: '',
        readonly: true,
        create: false,
        update: false,
        consultaioSolicitante: null,
        action_id: '',
        current_user: '',
        id_solicitud: '',
        nombre_pagina: '',
        idSolicitudSeleccionada: '',
      }),
    };

    mockDestinatarioService = {};

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DestinatarioDeComponent],
      providers: [
        FormBuilder,
        { provide: Tramite110207Store, useValue: mockStore },
        { provide: Tramite110207Query, useValue: mockTramiteQuery },
        { provide: SeccionLibQuery, useValue: mockSeccionQuery },
        { provide: SeccionLibStore, useValue: mockSeccionStore },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery },
        { provide: DestinatarioService, useValue: mockDestinatarioService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with medioDeTransporte control', () => {
    expect(component.destinatarioForm.contains('medioDeTransporte')).toBe(true);
  });

  it('should set esFormularioSoloLectura on ngOnInit', () => {
    component.ngOnInit();
    expect(component.esFormularioSoloLectura).toBe(true);
  });

  it('should validateAll and mark forms as touched if invalid', () => {
    component.destinatarioForm = new FormBuilder().group({
      medioDeTransporte: [''],
    });
    const markAllAsTouchedSpy = jest.spyOn(
      component.destinatarioForm,
      'markAllAsTouched'
    );
    component.destinatarioForm.setErrors({ required: true });
    const valid = component.validateAll();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(valid).toBe(false);
  });

  it('should set datosDelDestinatarioValido when setFormValida is called', () => {
    component.setFormValida(true);
    expect(component.datosDelDestinatarioValido).toBe(true);
    component.setFormValida(false);
    expect(component.datosDelDestinatarioValido).toBe(false);
  });

  it('should set destinatarioValido when setFormValidaDestinatario is called', () => {
    component.setFormValidaDestinatario(true);
    expect(component.destinatarioValido).toBe(true);
    component.setFormValidaDestinatario(false);
    expect(component.destinatarioValido).toBe(false);
  });

  it('should call store.setFormDatosDelDestinatario in setValoresStore', () => {
    component.setValoresStore({
      formGroupName: '',
      campo: 'test',
      valor: undefined,
      storeStateName: '',
    });
    expect(mockStore.setFormDatosDelDestinatario).toHaveBeenCalledWith({
      test: undefined,
    });
  });

  it('should call store.setFormDestinatario in setValoresStoreDe', () => {
    component.setValoresStoreDe({
      formGroupName: '',
      campo: 'test',
      valor: undefined,
      storeStateName: '',
    });
    expect(mockStore.setFormDestinatario).toHaveBeenCalledWith({
      test: undefined,
    });
  });

  it('should call store.setFormDestinatario in formDestinatarioFunc', () => {
    component.formDestinatarioFunc({ nombre: 'Juan' });
    expect(mockStore.setFormDestinatario).toHaveBeenCalledWith({
      nombre: 'Juan',
    });
  });

  it('should call store.setFormDatosDelDestinatario in detosDelDestinatarioFunc', () => {
    component.detosDelDestinatarioFunc({ apellido: 'Perez' });
    expect(mockStore.setFormDatosDelDestinatario).toHaveBeenCalledWith({
      apellido: 'Perez',
    });
  });

  it('should call store.setMedioDeTransporteSeleccion in medioDeTransporteSeleccion', () => {
    const catalogo = { id: 1, nombre: 'Aereo' } as any;
    component.medioDeTransporteSeleccion(catalogo);
    expect(mockStore.setMedioDeTransporteSeleccion).toHaveBeenCalledWith(
      catalogo
    );
  });

  it('should call store.setPaisDestinSeleccion in paisDestinSeleccion', () => {
    const catalogo = { id: 2, nombre: 'Mexico' } as any;
    component.paisDestinSeleccion(catalogo);
    expect(mockStore.setPaisDestinSeleccion).toHaveBeenCalledWith(catalogo);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const spy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
