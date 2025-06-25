import { ComponentFixture, TestBed } from '@angular/core/testing';
// filepath: c:\Users\harshada.darekar\Documents\Vucem\Vucem-sprint1_2_3\frontend\apps\se\src\app\application\tramites\130107\pages\todos-pasos\todos-pasos.component.spec.ts
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
    // Assign the mock after detectChanges so @ViewChild is set
    component.wizardComponent = mockWizardComponent as any;
    fixture.detectChanges();
  });

  beforeEach(() => {
    // Clear mocks before each test to avoid call count issues
    mockWizardComponent.siguiente.mockClear();
    mockWizardComponent.atras.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.indice).toBe(1);
    expect(component.titulo).toBe(TITULO_PASO_UNO);
    expect(component.pantallasPasos).toBe(PANTA_PASOS);
    expect(component.datosPasos.nroPasos).toBe(PANTA_PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and titulo to TITULO_PASO_DOS and call siguiente on getValorIndice with valor 2 and accion "cont"', () => {
    component.indice = 1; // Ensure starting from a different index
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(component.titulo).toBe(TITULO_PASO_DOS);
  });

  it('should update indice and titulo to TITULO_PASO_TRES and call atras on getValorIndice with valor 3 and accion "atras"', () => {
    component.indice = 2; // Ensure starting from a different index
    component.getValorIndice({ valor: 3, accion: 'atras' });
    expect(component.indice).toBe(3);
    expect(component.titulo).toBe(TITULO_PASO_TRES);
  
  });

  it('should set titulo to TITULO_PASO_UNO for other indices', () => {
    component.indice = 2; // Ensure starting from a different index
    component.getValorIndice({ valor: 1, accion: 'cont' });
    expect(component.titulo).toBe(TITULO_PASO_UNO);
   
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    component.indice = 1;
    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();

    component.getValorIndice({ valor: 5, accion: 'atras' });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });
});
