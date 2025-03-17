import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cancelaciones140201Component } from './cancelaciones-140201.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccionBoton } from '../../../80205/models/datos-info.model';

describe('Cancelaciones140201Component', () => {
  let component: Cancelaciones140201Component;
  let fixture: ComponentFixture<Cancelaciones140201Component>;
  let wizardComponentMock: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as jest.Mocked<WizardComponent>;

    await TestBed.configureTestingModule({
      imports: [WizardComponent], 
      declarations: [Cancelaciones140201Component],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cancelaciones140201Component);
    component = fixture.componentInstance;

    component.wizardComponent = wizardComponentMock;

    fixture.detectChanges();
  });

  it('should not update indice if accion is invalid', () => {
    const event: AccionBoton = { valor: 10, accion: 'invalid' };

    component.getValorIndice(event);

    expect(component.indice).toBe(1); 
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });
});
