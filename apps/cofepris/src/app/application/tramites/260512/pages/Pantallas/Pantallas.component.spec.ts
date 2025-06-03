import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PantallasComponent } from './Pantallas.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WizardComponent, PASOS } from '@ng-mf/data-access-user';
import { LISTA_PASOS_WIZARD } from '../../../../shared/constantes/lista-pasos-wizard.enum';

// Mock WizardComponent
@Component({ selector: 'app-wizard', template: '' })
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallasComponent, MockWizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ignore unknown elements like btn-continuar
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    // Inject the mock wizardComponent
    component.wizardComponent = new MockWizardComponent() as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have solicitudePasos equal to LISTA_PASOS_WIZARD', () => {
    expect(component.solicitudePasos).toBe(LISTA_PASOS_WIZARD);
  });

  it('should have pasos equal to PASOS', () => {
    expect(component.pasos).toBe(PASOS);
  });

  it('should have indice initialized to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should have datosPasos initialized correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Guardar');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call wizardComponent.siguiente for accion "cont"', () => {
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras for accion not "cont"', () => {
    component.getValorIndice({ accion: 'atras', valor: 3 });
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not change indice or call wizard methods for valor <= 0', () => {
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should not change indice or call wizard methods for valor >= 5', () => {
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});
