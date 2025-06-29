import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    // Mock the wizardComponent with spies for siguiente and atras
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set indice in seleccionaTab', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

 it('should set indice and call wizardComponent.siguiente on getValorIndice with accion "cont"', () => {
  component.indice = 1;
  // Assign the mock just before calling the method
  component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
  component.getValorIndice({ accion: 'cont', valor: 2 });
  expect(component.indice).toBe(2);
  expect(component.wizardComponent.siguiente).toHaveBeenCalled();
});

it('should set indice and call wizardComponent.atras on getValorIndice with accion not "cont"', () => {
  component.indice = 2;
  component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
  component.getValorIndice({ accion: 'back', valor: 1 });
  expect(component.indice).toBe(1);
  expect(component.wizardComponent.atras).toHaveBeenCalled();
});

it('should not change indice or call wizardComponent methods if valor is out of range', () => {
  component.indice = 2;
  component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
  component.getValorIndice({ accion: 'cont', valor: 0 });
  expect(component.indice).toBe(2);
  expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  expect(component.wizardComponent.atras).not.toHaveBeenCalled();

  component.getValorIndice({ accion: 'cont', valor: 5 });
  expect(component.indice).toBe(2);
  expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  expect(component.wizardComponent.atras).not.toHaveBeenCalled();
});
});