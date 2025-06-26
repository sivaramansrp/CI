import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitantePageComponent } from './solicitante-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src';

describe('SolicitantePageComponent', () => {
  let component: SolicitantePageComponent;
  let fixture: ComponentFixture<SolicitantePageComponent>;
  let mockWizardComponent: { siguiente: jest.Mock; atras: jest.Mock };

  beforeEach(async () => {
    mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitantePageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Asignar el mock después de detectChanges para que @ViewChild esté definido
    component.wizardComponent = mockWizardComponent as any;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar indice en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debe actualizar indice y llamar a wizardComponent.siguiente al ejecutar getValorIndice con "cont"', () => {
    component.wizardComponent = mockWizardComponent as any;
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(mockWizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debe actualizar indice y llamar a wizardComponent.atras al ejecutar getValorIndice con "atras"', () => {
    component.wizardComponent = mockWizardComponent as any;
    component.getValorIndice({ valor: 3, accion: 'atras' });
    expect(component.indice).toBe(3);
    expect(mockWizardComponent.atras).toHaveBeenCalled();
  });

  it('no debe actualizar indice ni llamar métodos de wizardComponent si valor está fuera de rango', () => {
    component.wizardComponent = mockWizardComponent as any;
    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
  });

  it('debe tener TEXTOS definido', () => {
    expect(component.TEXTOS).toBeDefined();
    expect(component.TEXTOS.AVISO).toBeDefined();
    expect(component.TEXTOS.FIRMAR).toBeDefined();
  });

  it('debe inicializar datosPasos correctamente', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });
});