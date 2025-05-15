import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModificacionPermisoMedsUsoComponent } from './modificacion-permiso-meds-uso.component';
import { AccionBoton } from '@libs/shared/data-access-user/src';

// Dummy mock child components
@Component({ selector: 'app-paso-uno-pages', template: '' })
class MockPasoUnoComponent {
  collectFormValues = jest.fn().mockReturnValue({ solicitante: { nombre: 'Juan' } });
}

@Component({ selector: 'app-wizard', template: '' })
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('ModificacionPermisoMedsUsoComponent', () => {
  let component: ModificacionPermisoMedsUsoComponent;
  let fixture: ComponentFixture<ModificacionPermisoMedsUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ModificacionPermisoMedsUsoComponent,
        MockPasoUnoComponent,
        MockWizardComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionPermisoMedsUsoComponent);
    component = fixture.componentInstance;

    // Assign mock components manually
    component.pasoUnoComponent = new MockPasoUnoComponent() as any;
    component.wizardComponent = new MockWizardComponent() as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values set correctly', () => {
    expect(component.indice).toBe(1);
    expect(component.payload).toEqual({});
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
    expect(component.infoAlert).toBe('alert-info');
  });

  it('should collect form values and go to next step when action is "cont"', () => {
    component.wizardComponent = new MockWizardComponent() as any; // Ensure wizardComponent is initialized
    component.wizardComponent = new MockWizardComponent() as any; // Ensure wizardComponent is initialized
    component.wizardComponent = new MockWizardComponent() as any; // Ensure wizardComponent is initialized
    const accion: AccionBoton = { accion: 'cont', valor: 2 };
    // Ensure wizardComponent is properly initialized
    component.wizardComponent = new MockWizardComponent() as any;
    component.pasoUnoComponent = new MockPasoUnoComponent() as any; // Ensure pasoUnoComponent is initialized
    component.payload = component.pasoUnoComponent.collectFormValues();
    component.wizardComponent = new MockWizardComponent() as any; // Ensure wizardComponent is initialized
    component.wizardComponent = new MockWizardComponent() as any; // Ensure wizardComponent is initialized
    component.getValorIndice(accion);

    expect(component.payload).toEqual({ solicitante: { nombre: 'Juan' } });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should collect form values and go to previous step when action is not "cont"', () => {
    component.wizardComponent = new MockWizardComponent() as any; // Ensure wizardComponent is initialized
    component.pasoUnoComponent = new MockPasoUnoComponent() as any; // Ensure pasoUnoComponent is initialized
    component.payload = component.pasoUnoComponent.collectFormValues(); // Collect form values
    const accion: AccionBoton = { accion: 'back', valor: 3 };
    component.getValorIndice(accion);

    expect(component.payload).toEqual({ solicitante: { nombre: 'Juan' } });
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should NOT change step if valor is outside valid range (lower)', () => {
    component.wizardComponent = new MockWizardComponent() as any; // Ensure wizardComponent is initialized
    const accion: AccionBoton = { accion: 'cont', valor: 0 };
    component.getValorIndice(accion);

    expect(component.indice).toBe(1); // unchanged
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should NOT change step if valor is outside valid range (upper)', () => {
    component.wizardComponent = new MockWizardComponent() as any; // Ensure wizardComponent is initialized
    const accion: AccionBoton = { accion: 'cont', valor: 5 };
    component.getValorIndice(accion);

    expect(component.indice).toBe(1); // unchanged
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should log error if pasoUnoComponent is not initialized', () => {
    console.error = jest.fn(); // Spy on console.error
    component.pasoUnoComponent = undefined as any;
    component.wizardComponent = new MockWizardComponent() as any; // Ensure wizardComponent is initialized

    const accion: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);

    expect(console.error).toHaveBeenCalledWith('PasoUnoPagesComponent is not initialized.');
    expect(component.indice).toBe(2); // still updates step
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should handle collectFormValues returning undefined gracefully', () => {
    const mockPaso = new MockPasoUnoComponent();
    (mockPaso.collectFormValues as jest.Mock).mockReturnValue(undefined);

    component.pasoUnoComponent = mockPaso as any;
    component.wizardComponent = new MockWizardComponent() as any; // Ensure wizardComponent is initialized
    const accion: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);

    expect(component.payload).toBeUndefined();
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });
});
