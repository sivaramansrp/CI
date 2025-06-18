import { AccionBoton, WizardComponent,BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SolicitudPasoComponent } from './solicitud-paso.component';
import { PASOS } from "@libs/shared/data-access-user/src/core/enums/6502/modificacion.enum";
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudPasoComponent', () => {
  let component: SolicitudPasoComponent;
  let fixture: ComponentFixture<SolicitudPasoComponent>;
  let mockWizardComponent: Partial<WizardComponent>;

  beforeEach(async () => {
    mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudPasoComponent,
        PasoUnoComponent,
        PasoDosComponent
      ],
      imports: [WizardComponent,
        BtnContinuarComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: WizardComponent, useValue: mockWizardComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize with correct default values', () => {
      expect(component.indice).toBe(1);
      expect(component.pasos).toEqual(PASOS);
      expect(component.datosPasos).toEqual({
        nroPasos: PASOS.length,
        indice: 1,
        txtBtnAnt: 'Anterior',
        txtBtnSig: 'Continuar'
      });
    });
  });

  describe('getValorIndice', () => {
    beforeEach(() => {
      component.wizardComponent = mockWizardComponent as WizardComponent;
    });

    it('should handle "cont" action correctly', () => {
      const testAction: AccionBoton = { accion: 'cont', valor: 2 };
      
      component.getValorIndice(testAction);
      
      expect(component.indice).toBe(2);
      expect(mockWizardComponent.siguiente).toHaveBeenCalled();
      expect(component.datosPasos.indice).toBe(2);
    });

    it('should handle "atras" action correctly', () => {
      component.indice = 3; // Set to higher value first
      const testAction: AccionBoton = { accion: 'atras', valor: 2 };
      
      component.getValorIndice(testAction);
      
      expect(component.indice).toBe(2);
      expect(mockWizardComponent.atras).toHaveBeenCalled();
      expect(component.datosPasos.indice).toBe(2);
    });

    it('should not change index for invalid values (less than 1)', () => {
      const initialIndex = component.indice;
      const testAction: AccionBoton = { accion: 'cont', valor: 0 };
      
      component.getValorIndice(testAction);
      
      expect(component.indice).toBe(initialIndex);
      expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    });

    it('should not change index for invalid values (greater than 4)', () => {
      const initialIndex = component.indice;
      const testAction: AccionBoton = { accion: 'cont', valor: 5 };
      
      component.getValorIndice(testAction);
      
      expect(component.indice).toBe(initialIndex);
      expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    });

    it('should handle edge case when wizardComponent is not initialized', () => {
      component.wizardComponent = undefined as any;
      const testAction: AccionBoton = { accion: 'cont', valor: 2 };
      
      expect(() => component.getValorIndice(testAction)).not.toThrow();
      expect(component.indice).toBe(2); // Should still update index
    });
  });

  describe('Template Integration', () => {
    it('should pass correct datosPasos to wizard component', () => {
      const wizardDebugElement = fixture.debugElement.query(By.directive(WizardComponent));
      expect(wizardDebugElement).toBeTruthy();
      
      const wizardInstance = wizardDebugElement.componentInstance;
      expect(wizardInstance.datosPasos).toEqual(component.datosPasos);
    });

    it('should update wizard component when index changes', () => {
      component.indice = 2;
      fixture.detectChanges();
      
      const wizardDebugElement = fixture.debugElement.query(By.directive(WizardComponent));
      const wizardInstance = wizardDebugElement.componentInstance;
      expect(wizardInstance.datosPasos.indice).toBe(2);
    });
  });
});