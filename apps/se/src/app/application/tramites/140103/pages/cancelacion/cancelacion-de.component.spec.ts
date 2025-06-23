import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionDeComponent } from './cancelacion-de.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CancelacionDeComponent', () => {
  let component: CancelacionDeComponent;
  let fixture: ComponentFixture<CancelacionDeComponent>;

  class MockWizardComponent {
    siguiente = jest.fn();
    atras = jest.fn();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelacionDeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(CancelacionDeComponent, {
        set: {
          providers: [],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CancelacionDeComponent);
    component = fixture.componentInstance;
   
    component.wizardComponent = new MockWizardComponent() as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update indice and call wizardComponent.siguiente when getValorIndice is called with accion "cont"', () => {
    component.wizardComponent = new MockWizardComponent() as any; 
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras when getValorIndice is called with accion "atras"', () => {
    component.wizardComponent = new MockWizardComponent() as any; 
    component.getValorIndice({ valor: 3, accion: 'atras' });
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods when getValorIndice is called with invalid valor', () => {
  component.wizardComponent = {
    siguiente: jest.fn(),
    atras: jest.fn()
  } as any;

  const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
  const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
  const initialIndice = component.indice;

  component.getValorIndice({ valor: 0, accion: 'cont' });
  expect(component.indice).toBe(initialIndice);
  expect(spySiguiente).not.toHaveBeenCalled();
  expect(spyAtras).not.toHaveBeenCalled();

  component.getValorIndice({ valor: 5, accion: 'atras' });
  expect(component.indice).toBe(initialIndice);
  expect(spySiguiente).not.toHaveBeenCalled();
  expect(spyAtras).not.toHaveBeenCalled();
});
});
