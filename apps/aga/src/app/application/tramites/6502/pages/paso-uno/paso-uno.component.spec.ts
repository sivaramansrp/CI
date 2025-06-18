import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { By } from '@angular/platform-browser';
import { AvisoDeCambioComponent } from '../../components/aviso-de-cambio/aviso-de-cambio.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockSolicitanteComponent: Partial<SolicitanteComponent>;

  beforeEach(waitForAsync(() => {
    mockSolicitanteComponent = {
      obtenerTipoPersona: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [AvisoDeCambioComponent,HttpClientTestingModule],
      providers: [
        { provide: SolicitanteComponent, useValue: mockSolicitanteComponent }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize with indice = 1', () => {
      expect(component.indice).toBe(1);
    });
  });

  describe('ngAfterViewInit', () => {
    it('should call obtenerTipoPersona on SolicitanteComponent', () => {
      // Simulate ViewChild being set
      component.solicitante = mockSolicitanteComponent as SolicitanteComponent;
      
      component.ngAfterViewInit();
      
      expect(mockSolicitanteComponent.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
    });

    it('should not throw if solicitante is not initialized', () => {
      component.solicitante = undefined as any;
      
      expect(() => component.ngAfterViewInit()).not.toThrow();
    });
  });

  describe('seleccionaTab', () => {
    it('should update indice with provided value', () => {
      const testIndex = 2;
      
      component.seleccionaTab(testIndex);
      
      expect(component.indice).toBe(testIndex);
    });

    it('should handle edge cases (zero, negative numbers)', () => {
      component.seleccionaTab(0);
      expect(component.indice).toBe(0);
      
      component.seleccionaTab(-1);
      expect(component.indice).toBe(-1);
    });
  });

  describe('Template', () => {
    it('should render tab navigation buttons', () => {
      const buttons = fixture.debugElement.queryAll(By.css('.nav-link'));
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should apply active class to selected tab', () => {
      component.indice = 2;
      fixture.detectChanges();
      
      const buttons = fixture.debugElement.queryAll(By.css('.nav-link'));
      // Assuming the template uses index-based comparison for active class
      expect(buttons[1].classes['active']).toBeTruthy(); // 0-based index
    });

    it('should call seleccionaTab when clicking a tab', () => {
      const seleccionaTabSpy = jest.spyOn(component, 'seleccionaTab');
      const buttons = fixture.debugElement.queryAll(By.css('.nav-link'));
      
      buttons[1].triggerEventHandler('click', null);
      
      expect(seleccionaTabSpy).toHaveBeenCalledWith(2); // Assuming buttons are 1-based
    });
  });
});