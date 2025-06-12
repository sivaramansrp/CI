import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DatosComponent } from './datos.component';

// Import mocks and interfaces
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { PASOS_REGISTRO } from '@ng-mf/data-access-user';

// =============================================================================
// MOCK COMPONENTS FOR TESTING TEMPLATE INTERACTIONS
// =============================================================================

/**
 * Mock child component that is expected to be in DatosComponent's template.
 * It has an @Output that will trigger the getValorIndice method.
 * We are assuming a component with this selector exists in the template.
 */
@Component({
  selector: 'app-wizard-controls', // A plausible selector for the child component
  template: ``,
})
class MockWizardControlsComponent {
  @Input() datosPasos: DatosPasos;
  @Output() accionBoton = new EventEmitter<{ accion: string; valor: number }>();
}

/**
 * Mock for the <ng-mf-wizard> component also present in the template.
 * This prevents Angular from throwing an error about an unknown element.
 */
@Component({
  selector: 'ng-mf-wizard',
  template: ``,
})
class MockAppWizardComponent {
  @Input() pasos: ListaPasosWizard[];
}

// =============================================================================
// TEST SUITE
// =============================================================================

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let mockWizardComponentInstance: {
    siguiente: jest.Mock;
    atras: jest.Mock;
  };

  beforeEach(async () => {
    // Create a mock for the @ViewChild(WizardComponent)
    mockWizardComponentInstance = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };

    // Configure the testing module with the component and its mock children
    await TestBed.configureTestingModule({
      declarations: [
        DatosComponent,
        MockWizardControlsComponent, // Declare mock child
        MockAppWizardComponent,      // Declare mock child
      ],
    }).compileComponents();

    // Create component fixture and get instance
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;

    // Manually assign the mock to the @ViewChild property before change detection
    component.wizardComponent = mockWizardComponentInstance as unknown as WizardComponent;

    fixture.detectChanges(); // Trigger initial data binding
  });

  // ===========================================================================
  // Class Method Unit Tests (Previously written tests, still essential)
  // ===========================================================================
  describe('Class Logic Tests', () => {
    it('should create the component successfully', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize properties with correct default values', () => {
      expect(component.pasos).toEqual(PASOS_REGISTRO);
      expect(component.pantallasPasos).toEqual(PASOS_REGISTRO);
      expect(component.indice).toBe(1);
      expect(component.datosPasos).toEqual({
        nroPasos: PASOS_REGISTRO.length,
        indice: 1,
        txtBtnAnt: 'Anterior',
        txtBtnSig: 'Continuar',
      });
    });

    describe('getValorIndice() method', () => {
      it('should update indice and call wizardComponent.siguiente() when accion is "cont"', () => {
        const event = { accion: 'cont', valor: 3 };
        component.getValorIndice(event);
        expect(component.indice).toBe(3);
        expect(mockWizardComponentInstance.siguiente).toHaveBeenCalledTimes(1);
        expect(mockWizardComponentInstance.atras).not.toHaveBeenCalled();
      });

      it('should update indice and call wizardComponent.atras() when accion is not "cont"', () => {
        const event = { accion: 'back', valor: 2 };
        component.getValorIndice(event);
        expect(component.indice).toBe(2);
        expect(mockWizardComponentInstance.atras).toHaveBeenCalledTimes(1);
        expect(mockWizardComponentInstance.siguiente).not.toHaveBeenCalled();
      });

      it('should NOT act if valor is out of bounds (too low)', () => {
        const initialIndice = component.indice;
        component.getValorIndice({ accion: 'cont', valor: 0 });
        expect(component.indice).toBe(initialIndice);
        expect(mockWizardComponentInstance.siguiente).not.toHaveBeenCalled();
        expect(mockWizardComponentInstance.atras).not.toHaveBeenCalled();
      });

      it('should NOT act if valor is out of bounds (too high)', () => {
        const initialIndice = component.indice;
        component.getValorIndice({ accion: 'back', valor: 5 });
        expect(component.indice).toBe(initialIndice);
        expect(mockWizardComponentInstance.siguiente).not.toHaveBeenCalled();
        expect(mockWizardComponentInstance.atras).not.toHaveBeenCalled();
      });
    });
  });

  // ===========================================================================
  // Template Integration Tests (NEW TESTS TO REACH 100%)
  // ===========================================================================
  describe('Template Interaction Tests', () => {
    it('should call getValorIndice when the child component emits an "accionBoton" event', () => {
      // Spy on the component's method to verify it's called by the template binding
      const getValorIndiceSpy = jest.spyOn(component, 'getValorIndice');
      
      // Find the debug element of the mock child component
      const controlsDebugElement = fixture.debugElement.query(
        By.css('app-wizard-controls')
      );
      // Ensure the mock child component was found in the DOM
      expect(controlsDebugElement).toBeTruthy();

      // Define the event payload we want to emit
      const eventPayload = { accion: 'cont', valor: 4 };

      // Get the instance of the child component and trigger its @Output EventEmitter
      controlsDebugElement.componentInstance.accionBoton.emit(eventPayload);

      // Verify that the parent component's method was called with the correct payload
      expect(getValorIndiceSpy).toHaveBeenCalledWith(eventPayload);
    });

    it('should update the index and call wizard.siguiente() when a "cont" event is emitted from the template', () => {
        const controlsDebugElement = fixture.debugElement.query(By.css('app-wizard-controls'));
        const eventPayload = { accion: 'cont', valor: 2 };

        controlsDebugElement.componentInstance.accionBoton.emit(eventPayload);

        // Verify the full consequences of the event
        expect(component.indice).toBe(2);
        expect(mockWizardComponentInstance.siguiente).toHaveBeenCalledTimes(1);
        expect(mockWizardComponentInstance.atras).not.toHaveBeenCalled();
    });
  });
});