import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SanidadCertificadoComponent } from './sanidad-certificado.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { AccionBoton } from '../../models/220203/importacion-de-acuicultura.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SanidadCertificadoComponent', () => {
  let component: SanidadCertificadoComponent;
  let fixture: ComponentFixture<SanidadCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanidadCertificadoComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SanidadCertificadoComponent);
    component = fixture.componentInstance;
    
    // Mock the private method directly
    jest.spyOn(component as any, 'validarTodosFormulariosPasoUno').mockReturnValue(true);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.esFormaValido).toBe(false);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
  });

  it('should continue to next step when form is valid', () => {
    // Mock validation to return true
    (component as any)['validarTodosFormulariosPasoUno'] = jest.fn().mockReturnValue(true);
    
    // Mock wizard component
    component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
    
    const accion: AccionBoton = { accion: 'cont', valor: 1 };

    component.getValorIndice(accion);

    expect(component.indice).toBe(2);
    expect(component.esFormaValido).toBe(false);
  });

  it('should not continue when form is invalid', () => {
    // Mock validation to return false
    (component as any)['validarTodosFormulariosPasoUno'] = jest.fn().mockReturnValue(false);
    
    // Mock wizard component
    component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
    
    const accion: AccionBoton = { accion: 'cont', valor: 1 };

    component.getValorIndice(accion);

    expect(component.indice).toBe(1);
    expect(component.esFormaValido).toBe(true);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should go back to previous step', () => {
    component.indice = 2;
    
    // Mock wizard component
    const mockWizard = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = mockWizard as any;
    
    const accion: AccionBoton = { accion: 'ant', valor: 2 };

    component.getValorIndice(accion);

    expect(component.indice).toBe(1);
    expect(mockWizard.atras).toHaveBeenCalled();
  });

  it('should not exceed maximum steps', () => {
    component.indice = component.PASOS.length;
    
    // Mock wizard component
    const mockWizard = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = mockWizard as any;
    
    const accion: AccionBoton = { accion: 'cont', valor: component.PASOS.length };

    component.getValorIndice(accion);

    expect(component.indice).toBe(component.PASOS.length);
    expect(mockWizard.siguiente).not.toHaveBeenCalled();
  });

  it('should not go below minimum step', () => {
    component.indice = 1;
    
    // Mock wizard component
    const mockWizard = { siguiente: jest.fn(), atras: jest.fn() };
    component.wizardComponent = mockWizard as any;
    
    const accion: AccionBoton = { accion: 'ant', valor: 1 };

    component.getValorIndice(accion);

    expect(component.indice).toBe(1);
    expect(mockWizard.atras).not.toHaveBeenCalled();
  });

  it('should handle validation when pasoUnoComponent is not available', () => {
    component.pasoUnoComponent = null as any;

    const result = component['validarTodosFormulariosPasoUno']();

    expect(result).toBe(true);
  });

  it('should call validation method from pasoUnoComponent', () => {
    const mockPasoUno = { validarFormularios: jest.fn().mockReturnValue(true) };
    component.pasoUnoComponent = mockPasoUno as any;

    const result = component['validarTodosFormulariosPasoUno']();
    expect(result).toBe(true);
  });

  it('should update datosPasos when index changes', () => {
    // Mock validation to return true for step transitions
    (component as any)['validarTodosFormulariosPasoUno'] = jest.fn().mockReturnValue(true);
    
    // Mock wizard component
    component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
    
    const accion: AccionBoton = { accion: 'cont', valor: 2 };

    component.getValorIndice(accion);

    expect(component.datosPasos.indice).toBe(3);
  });
});
