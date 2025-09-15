import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent } from '@ng-mf/data-access-user';
import { SolicitudPageComponent } from '../../../110201/pages/solicitud-page/solicitud-page.component'; 
import { WizardComponent } from '@ng-mf/data-access-user';

describe('SolicitudPageComponent', () => {
  let fixture: ComponentFixture<SolicitudPageComponent>;
  let component: SolicitudPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        ReactiveFormsModule,
        WizardComponent,
        AlertComponent,
        BtnContinuarComponent
      ],
      declarations: [
        SolicitudPageComponent        
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should run #seleccionaTab()', () => {
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });

  describe('getValorIndice', () => {
    beforeEach(() => {
      component.pasos = [
        { nombre: 'Paso 1', activo: true },
        { nombre: 'Paso 2', activo: false },
        { nombre: 'Paso 3', activo: false }
      ] as any;
      component.wizardComponent = {
        siguiente: jest.fn(),
        atras: jest.fn()
      } as any;
      component.pasoUnoComponent = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;
    });

    it('should set esFormaValido to false initially', () => {
      const accion = { accion: 'cont', valor: 2 };
      component.getValorIndice(accion);
      expect(component.esFormaValido).toBe(false);
    });

    it('should validate forms when on step 1 and action is continue', () => {
      component.indice = 1;
      const accion = { accion: 'cont', valor: 1 };
      jest.spyOn(component, 'validarTodosFormulariosPasoUno' as any).mockReturnValue(true);
      
      component.getValorIndice(accion);
      
      expect(component['validarTodosFormulariosPasoUno']).toHaveBeenCalled();
    });

    it('should set esFormaValido to true and return when validation fails on step 1', () => {
      component.indice = 1;
      const accion = { accion: 'cont', valor: 1 };
      jest.spyOn(component, 'validarTodosFormulariosPasoUno' as any).mockReturnValue(false);
      
      component.getValorIndice(accion);
      
      expect(component.esFormaValido).toBe(true);
    });

    it('should increment index when action is continue', () => {
      const accion = { accion: 'cont', valor: 1 };
      
      component.getValorIndice(accion);
      
      expect(component.indice).toBe(1);
      expect(component.datosPasos.indice).toBe(2);
    });

    it('should decrement index when action is anterior', () => {
      component.indice = 2;
      const accion = { accion: 'ant', valor: 2 };
      
      component.getValorIndice(accion);
      
      expect(component.indice).toBe(2);
      expect(component.datosPasos.indice).toBe(1);
    });

    it('should not update index when it exceeds maximum steps', () => {
      component.indice = 3;
      const accion = { accion: 'cont', valor: 3 };
      const initialIndex = component.indice;
      
      component.getValorIndice(accion);
      
      expect(component.indice).toBe(initialIndex);
    });

    it('should not update index when it goes below minimum (0)', () => {
      component.indice = 1;
      const accion = { accion: 'ant', valor: 1 };
      const initialIndex = component.indice;
      
      component.getValorIndice(accion);
      
      expect(component.indice).toBe(initialIndex);
    });

    it('should call wizardComponent.siguiente when action is continue and value is in valid range', () => {
      const accion = { accion: 'cont', valor: 2 };
      
      component.getValorIndice(accion);
      
      expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    });

    it('should call wizardComponent.atras when action is anterior and value is in valid range', () => {
      const accion = { accion: 'ant', valor: 2 };
      
      component.getValorIndice(accion);
      
      expect(component.wizardComponent.atras).toHaveBeenCalled();
    });

    it('should not call wizard methods when value is 0', () => {
      const accion = { accion: 'cont', valor: 0 };
      
      component.getValorIndice(accion);
      
      expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
      expect(component.wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should not call wizard methods when value is 5 or greater', () => {
      const accion = { accion: 'cont', valor: 5 };
      
      component.getValorIndice(accion);
      
      expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
      expect(component.wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should handle unknown action types', () => {
      const accion = { accion: 'unknown', valor: 2 };
      
      component.getValorIndice(accion);
      
      expect(component.indice).toBe(2);
      expect(component.datosPasos.indice).toBe(2);
    });
  });

  describe('validarTodosFormulariosPasoUno', () => {
    it('should return true when pasoUnoComponent is not available', () => {
      component.pasoUnoComponent = null as any;
      
      const result = component['validarTodosFormulariosPasoUno']();
      
      expect(result).toBe(true);
    });

    it('should return true when pasoUnoComponent validation passes', () => {
      component.pasoUnoComponent = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;
      
      const result = component['validarTodosFormulariosPasoUno']();
      
      expect(result).toBe(true);
      expect(component.pasoUnoComponent.validarFormularios).toHaveBeenCalled();
    });

    it('should return false when pasoUnoComponent validation fails', () => {
      component.pasoUnoComponent = {
        validarFormularios: jest.fn().mockReturnValue(false)
      } as any;
      
      const result = component['validarTodosFormulariosPasoUno']();
      
      expect(result).toBe(false);
      expect(component.pasoUnoComponent.validarFormularios).toHaveBeenCalled();
    });

    it('should return true when pasoUnoComponent is undefined', () => {
      component.pasoUnoComponent = undefined as any;
      
      const result = component['validarTodosFormulariosPasoUno']();
      
      expect(result).toBe(true);
    });
  });

  describe('cargaArchivo', () => {
    it('should set cargarArchivo to true when called with true', () => {
      component.cargaArchivo(true);
      expect(component.cargarArchivo).toBe(true);
    });

    it('should set cargarArchivo to false when called with false', () => {
      component.cargaArchivo(false);
      expect(component.cargarArchivo).toBe(false);
    });

    it('should update cargarArchivo property with the provided value', () => {
      component.cargarArchivo = true;
      component.cargaArchivo(false);
      expect(component.cargarArchivo).toBe(false);
      
      component.cargaArchivo(true);
      expect(component.cargarArchivo).toBe(true);
    });
  });
  
});