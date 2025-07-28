import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcuicolaComponent } from './acuicola.component';

describe('AcuicolaComponent', () => {
  let fixture: ComponentFixture<AcuicolaComponent>;
  let component: AcuicolaComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AcuicolaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AcuicolaComponent);
    component = fixture.componentInstance;

    // Mock wizardComponent
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call wizardComponent.siguiente when accion is "cont"', () => {
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should call wizardComponent.atras when accion is not "cont"', () => {
    component.getValorIndice({ valor: 3, accion: 'back' });
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not change indice or call wizardComponent methods when valor is out of range', () => {
    component.indice = 1;
    component.getValorIndice({ valor: 0, accion: 'cont' }); // valor < 1
    component.getValorIndice({ valor: 5, accion: 'cont' }); // valor > 4

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should have default tituloMensaje set', () => {
    expect(component.tituloMensaje).toBe('Zoosanitario para importación');
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });
});
