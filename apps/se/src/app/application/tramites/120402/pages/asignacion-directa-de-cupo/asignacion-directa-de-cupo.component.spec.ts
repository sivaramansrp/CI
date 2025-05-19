import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignacionDirectaDeCupoComponent } from './asignacion-directa-de-cupo.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

/**
 * Mock WizardComponent with spies for `siguiente()` and `atras()`
 */
@Component({
  selector: 'app-wizard',
  template: '',
})
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('AsignacionDirectaDeCupoComponent', () => {
  let component: AsignacionDirectaDeCupoComponent;
  let fixture: ComponentFixture<AsignacionDirectaDeCupoComponent>;
  let wizard: MockWizardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignacionDirectaDeCupoComponent, MockWizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignacionDirectaDeCupoComponent);
    component = fixture.componentInstance;

    // Manually assign the mock wizard component
    const mockWizardDebugElement = fixture.debugElement.query(
      By.directive(MockWizardComponent)
    );
    wizard = mockWizardDebugElement?.componentInstance || new MockWizardComponent();
    component.wizardComponent = wizard as unknown as WizardComponent;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call wizardComponent.siguiente when accion is "cont" and valor is valid', () => {
    const action = { accion: 'cont', valor: 2 };
    component.wizardComponent = wizard as unknown as WizardComponent; // Ensure wizardComponent is set
    component.getValorIndice(action);
    expect(component.indice).toBe(2);
    expect(wizard.siguiente).toHaveBeenCalled();
    expect(wizard.atras).not.toHaveBeenCalled();
  });

  it('should call wizardComponent.atras when accion is not "cont" and valor is valid', () => {
    const action = { accion: 'back', valor: 3 };
    component.wizardComponent = wizard as unknown as WizardComponent; // Ensure wizardComponent is set
    component.getValorIndice(action);
    expect(component.indice).toBe(3);
    expect(wizard.atras).toHaveBeenCalled();
    expect(wizard.siguiente).not.toHaveBeenCalled();
  });

  it('should not call any wizard method when valor is out of valid range', () => {
    const actionLow = { accion: 'cont', valor: 0 };
    const actionHigh = { accion: 'cont', valor: 5 };

    component.getValorIndice(actionLow);
    component.getValorIndice(actionHigh);

    expect(wizard.siguiente).not.toHaveBeenCalled();
    expect(wizard.atras).not.toHaveBeenCalled();
    // indice should remain default
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should have correct initial class and indice values', () => {
    expect(component.class).toBe('alert-danger');
    expect(component.indice).toBe(1);
  });
});
