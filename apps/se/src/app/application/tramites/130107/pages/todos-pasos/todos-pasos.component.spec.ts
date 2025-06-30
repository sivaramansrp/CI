import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosPasosComponent } from './todos-pasos.component';
import { TITULO_PASO_UNO, TITULO_PASO_DOS, TITULO_PASO_TRES, PANTA_PASOS } from '../../constantes/importaciones-agropecuarias.enum';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TodosPasosComponent', () => {
  let component: TodosPasosComponent;
  let fixture: ComponentFixture<TodosPasosComponent>;
  let mockWizardComponent: { siguiente: jest.Mock; atras: jest.Mock };

  beforeEach(async () => {
    mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [TodosPasosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosPasosComponent);
    component = fixture.componentInstance;
    component.wizardComponent = mockWizardComponent as any;
    fixture.detectChanges();
  });

  beforeEach(() => {
    mockWizardComponent.siguiente.mockClear();
    mockWizardComponent.atras.mockClear();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar con los valores por defecto correctos', () => {
    expect(component.indice).toBe(1);
    expect(component.titulo).toBe(TITULO_PASO_UNO);
    expect(component.pantallasPasos).toBe(PANTA_PASOS);
    expect(component.datosPasos.nroPasos).toBe(PANTA_PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('debe actualizar indice y titulo a TITULO_PASO_DOS y llamar siguiente en getValorIndice con valor 2 y accion "cont"', () => {
    component.indice = 1;
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(component.titulo).toBe(TITULO_PASO_DOS);
  });

  it('debe actualizar indice y titulo a TITULO_PASO_TRES y llamar atras en getValorIndice con valor 3 y accion "atras"', () => {
    component.indice = 2;
    component.getValorIndice({ valor: 3, accion: 'atras' });
    expect(component.indice).toBe(3);
    expect(component.titulo).toBe(TITULO_PASO_TRES);
  });

  it('debe establecer titulo a TITULO_PASO_UNO para otros índices', () => {
    component.indice = 2;
    component.getValorIndice({ valor: 1, accion: 'cont' });
    expect(component.titulo).toBe(TITULO_PASO_UNO);
  });

  it('no debe actualizar indice ni llamar métodos del wizardComponent si valor está fuera de rango', () => {
    component.indice = 1;
    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();

    component.getValorIndice({ valor: 5, accion: 'atras' });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });
});
