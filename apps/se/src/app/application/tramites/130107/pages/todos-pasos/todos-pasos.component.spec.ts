import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TodosPasosComponent } from './todos-pasos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PANTA_PASOS, TITULO_PASO_DOS, TITULO_PASO_TRES, TITULO_PASO_UNO } from '../../constantes/importaciones-agropecuarias.enum';
import { Subject } from 'rxjs';

describe('TodosPasosComponent', () => {
  let component: TodosPasosComponent;
  let fixture: ComponentFixture<TodosPasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosPasosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Suppress unknown element errors
    }).compileComponents();

    fixture = TestBed.createComponent(TodosPasosComponent);
    component = fixture.componentInstance;

    // Mock the WizardComponent
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.pantallasPasos).toEqual(PANTA_PASOS);
    expect(component.indice).toBe(1);
    expect(component.titulo).toBe(TITULO_PASO_UNO);
    expect(component.datosPasos).toEqual({
      nroPasos: PANTA_PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
