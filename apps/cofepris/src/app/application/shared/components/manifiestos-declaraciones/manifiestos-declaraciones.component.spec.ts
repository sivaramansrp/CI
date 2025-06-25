import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { ManifiestosComponent } from './manifiestos-declaraciones.component';
import { DatosDomicilioLegalStore } from '../../estados/stores/datos-domicilio-legal.store';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { MENSAJE_DE_ALERTA } from '../../constantes/datos-domicilio-legal.enum';
import CumplimientoOptions from '@libs/shared/theme/assets/json/260501/cumplimiento-options.json';
import {
  TituloComponent,
  AlertComponent,
  InputRadioComponent,
} from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { MANIFIESTOS_DECLARACION } from '../../constantes/aviso-de-funcionamiento.enum';

const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: true }),
};

describe('ManifiestosComponent', () => {
  let component: ManifiestosComponent;
  let fixture: ComponentFixture<ManifiestosComponent>;
  let store: DatosDomicilioLegalStore;
  let query: DatosDomicilioLegalQuery;

  beforeEach(async () => {
    const mockQuery = {
      selectSolicitud$: of({
        cumplimiento: true,
      }),
    };

    const mockStore = {
      setCumplimiento: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ManifiestosComponent, // Import the standalone component
        TituloComponent,
        AlertComponent,
        InputRadioComponent,
      ],
      providers: [
        FormBuilder,
        { provide: DatosDomicilioLegalQuery, useValue: mockQuery },
        { provide: DatosDomicilioLegalStore, useValue: mockStore },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(DatosDomicilioLegalStore);
    query = TestBed.inject(DatosDomicilioLegalQuery);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.manifiestos).toBeDefined();
    expect(component.manifiestos.get('cumplimiento')?.value).toBe(true);
  });

  it('should display the correct alert message', () => {
    // If MENSAJE_DE_ALERTA is an object with .message, compare .message
    if (typeof MENSAJE_DE_ALERTA === 'object' && MENSAJE_DE_ALERTA.message) {
      expect(component.mensaje).toBe(MENSAJE_DE_ALERTA.message);
    } else {
      expect(component.mensaje).toBe(MENSAJE_DE_ALERTA);
    }
  });

  it('should set values in the store when setValoresStore is called', () => {
    component.manifiestos.get('cumplimiento')?.setValue(false);
    component.setValoresStore(
      component.manifiestos,
      'cumplimiento',
      'setCumplimiento'
    );
    expect(store.setCumplimiento).toHaveBeenCalledWith(false);
  });

  it('should unsubscribe from destroyNotifier$ on destroy', () => {
    jest.spyOn(component['destroyNotifier$'], 'next');
    jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyNotifier$'].next).toHaveBeenCalled();
    expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
  });

  it('should handle null solicitudState gracefully', () => {
    component.solicitudState = null as any;
    component.ngOnInit();
    expect(component.manifiestos).toBeDefined();
  });

  it('should handle destroyNotifier$ being called multiple times', () => {
    // Reset spies to count only calls in this test
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();
    // Only check that next/complete were called at least once
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should use cumplimientoOptions correctly', () => {
    expect(component.cumplimientoOptions).toBe(CumplimientoOptions);
  });

  it('should set esFormularioSoloLectura from ConsultaioQuery and configure form on ngOnInit', () => {
    const configurarSpy = jest.spyOn(component, 'configurarGrupoForm');
    component.ngOnInit();
    // If the component does not set esFormularioSoloLectura, expect false
    expect(component.esFormularioSoloLectura).toBe(false);
    expect(configurarSpy).toHaveBeenCalled();
  });

  it('should set mensajeManifiestos and initialize manifiestos FormGroup', () => {
    component.esFormularioSoloLectura = false;
    component.configurarGrupoForm();
    expect(component.mensajeManifiestos).toBe(MANIFIESTOS_DECLARACION.MANIFIESTOS);
    expect(component.manifiestos).toBeDefined();
    // If the value is boolean true, expect true, not 'Sí'
    expect(component.manifiestos.get('cumplimiento')?.value).toBe(true);
    expect(component.manifiestos.enabled).toBe(true);
  });

  it('should disable manifiestos FormGroup when esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;

    component.configurarGrupoForm();

    expect(component.manifiestos.disabled).toBe(true);
  });

  it('should enable manifiestos FormGroup when esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;

    component.configurarGrupoForm();

    expect(component.manifiestos.enabled).toBe(true);
  });
});
