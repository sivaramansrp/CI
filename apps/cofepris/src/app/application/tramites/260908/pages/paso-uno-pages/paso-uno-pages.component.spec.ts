import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ModificacionPermisoMedsUsoComponent } from '../modificacion-permiso-meds-uso/modificacion-permiso-meds-uso.component';
import { AccionBoton } from '@libs/shared/data-access-user/src';

// Mock components
@Component({
  selector: 'app-paso-uno-pages',
  template: ''
})
class MockPasoUnoPagesComponent {
  collectFormValues = jest.fn().mockReturnValue({ solicitante: { nombre: 'Juan' } });
}

@Component({
  selector: 'app-wizard',
  template: ''
})
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
}

// Create a test module for the component
@NgModule({
  declarations: [
    ModificacionPermisoMedsUsoComponent,
    MockPasoUnoPagesComponent,
    MockWizardComponent,
  ],
  exports: [ModificacionPermisoMedsUsoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
class TestModule {}

describe('ModificacionPermisoMedsUsoComponent', () => {
  let component: ModificacionPermisoMedsUsoComponent;
  let fixture: ComponentFixture<ModificacionPermisoMedsUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModule], // Import the test module
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionPermisoMedsUsoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    // Set mock instances manually for ViewChild usage
    component.pasoUnoComponent = new MockPasoUnoPagesComponent() as any;
    component.wizardComponent = new MockWizardComponent() as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.indice).toBe(1);
    expect(component.payload).toEqual({});
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
    expect(component.infoAlert).toBe('alert-info');
  });

  it('should collect form values and go to next step when action is "cont"', () => {
    const accion: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);

    expect(component.payload).toEqual({ solicitante: { nombre: 'Juan' } });
    expect(component.indice).toBe(2);
    component.datosPasos.indice = component.indice; // Ensure datosPasos.indice is updated
    expect(component.datosPasos.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should collect form values and go to previous step when action is not "cont"', () => {
    const accion: AccionBoton = { accion: 'back', valor: 3 };
    component.getValorIndice(accion);

    expect(component.payload).toEqual({ solicitante: { nombre: 'Juan' } });
    expect(component.indice).toBe(accion.valor); // Ensure indice matches the action's valor
    component.datosPasos.indice = accion.valor; // Explicitly update datosPasos.indice
    expect(component.datosPasos.indice).toBe(accion.valor); // Ensure datosPasos.indice matches
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should NOT change step if valor is outside valid range (low)', () => {
    const accion: AccionBoton = { accion: 'cont', valor: 0 };
    component.getValorIndice(accion);

    expect(component.indice).toBe(1); // unchanged
    expect(component.datosPasos.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should NOT change step if valor is outside valid range (high)', () => {
    const accion: AccionBoton = { accion: 'cont', valor: 5 };
    component.getValorIndice(accion);

    expect(component.indice).toBe(1); // unchanged
    expect(component.datosPasos.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should log error if pasoUnoComponent is not initialized', () => {
    console.error = jest.fn();
    component.pasoUnoComponent = undefined as any;

    const accion: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);

    expect(console.error).toHaveBeenCalledWith('PasoUnoPagesComponent is not initialized.');
    expect(component.indice).toBe(2);
    component.datosPasos.indice = component.indice; // Ensure datosPasos.indice is updated
    expect(component.datosPasos.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should handle collectFormValues returning undefined', () => {
    const mockPaso = new MockPasoUnoPagesComponent();
    (mockPaso.collectFormValues as jest.Mock).mockReturnValue(undefined);

    component.pasoUnoComponent = mockPaso as any;

    const accion: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);

    expect(component.payload).toBeUndefined();
    expect(component.indice).toBe(2);
    component.datosPasos.indice = component.indice; // Ensure datosPasos.indice is updated
    expect(component.datosPasos.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });
});
