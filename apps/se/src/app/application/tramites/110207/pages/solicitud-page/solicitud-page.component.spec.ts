import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  const wizardMock = {
    atras: jest.fn(),
    siguiente: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;

    component.wizardComponent = {
      atras: jest.fn(),
      siguiente: jest.fn()
    } as unknown as WizardComponent;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set indice in seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should handle all paths in getValorIndice correctly', () => {
  const wizardMock = {
    siguiente: jest.fn(),
    atras: jest.fn()
  };
  component.wizardComponent = wizardMock as any;

  component.getValorIndice({ accion: 'cont', valor: 2 });
  expect(component.indice).toBe(2);
  expect(wizardMock.siguiente).toHaveBeenCalled();

  component.getValorIndice({ accion: 'back', valor: 3 });
  expect(component.indice).toBe(3);
  expect(wizardMock.atras).toHaveBeenCalled();

  component.indice = 1;
  component.getValorIndice({ accion: 'cont', valor: 0 });
  expect(component.indice).toBe(1); 

  component.indice = 1;
  component.getValorIndice({ accion: 'back', valor: 5 });
  expect(component.indice).toBe(1); 
});
});
