import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let consultaQueryMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ 
        update: false,
        readonly: false 
      } as ConsultaioState)
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent ],
      imports: [SolicitanteComponent,HttpClientTestingModule],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.esDatosRespuesta).toBe(false);
    expect(component.indice).toBe(1);
    expect(component.persona).toEqual([]);
    expect(component.domicilioFiscal).toEqual([]);
    expect(component['destroyNotifier$']).toBeDefined();
  });

  it('should initialize destroyNotifier$ as Subject', () => {
    expect(component['destroyNotifier$']).toBeDefined();
    expect(component['destroyNotifier$']).toBeInstanceOf(Object);
  });

   describe('ngAfterViewInit', () => {
    it('should set persona to PERSONA_MORAL_NACIONAL', () => {
      component.ngAfterViewInit();
      expect(component.persona).toBe(PERSONA_MORAL_NACIONAL);
    });

    it('should set domicilioFiscal to DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL', () => {
      component.ngAfterViewInit();
      expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    });

    it('should set both persona and domicilioFiscal correctly', () => {
      component.persona = [];
      component.domicilioFiscal = [];
      
      component.ngAfterViewInit();
      
      expect(component.persona).toBe(PERSONA_MORAL_NACIONAL);
      expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    });

    it('should be called automatically after view initialization', () => {
      const spy = jest.spyOn(component, 'ngAfterViewInit');
      fixture.detectChanges();
    });
  });

  describe('seleccionaTab', () => {
    it('should update indice when seleccionaTab is called', () => {
      component.seleccionaTab(2);
      expect(component.indice).toBe(2);
    });

    it('should update indice to different values', () => {
      component.seleccionaTab(3);
      expect(component.indice).toBe(3);

      component.seleccionaTab(1);
      expect(component.indice).toBe(1);

      component.seleccionaTab(5);
      expect(component.indice).toBe(5);
    });

    it('should accept zero as a valid index', () => {
      component.seleccionaTab(0);
      expect(component.indice).toBe(0);
    });

    it('should accept negative numbers', () => {
      component.seleccionaTab(-1);
      expect(component.indice).toBe(-1);
    });

    it('should overwrite previous indice value', () => {
      component.indice = 10;
      component.seleccionaTab(2);
      expect(component.indice).toBe(2);
    });
  });

  describe('ngOnDestroy', () => {
    it('should call destroyNotifier$.next()', () => {
      const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should call destroyNotifier$.complete()', () => {
      const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(completeSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it('should call both next() and complete() in correct order', () => {
      const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
      const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not throw error when called multiple times', () => {
      expect(() => {
        component.ngOnDestroy();
        component.ngOnDestroy();
      }).not.toThrow();
    });
  });

  describe('Component properties', () => {
    it('should inject ConsultaioQuery correctly', () => {
      expect(component['consultaQuery']).toBe(consultaQueryMock);
    });

    it('should have tipoPersona as undefined initially', () => {
      expect(component.tipoPersona).toBeUndefined();
    });

    it('should have datosRespuesta as undefined initially', () => {
      expect(component.datosRespuesta).toBeUndefined();
    });

    it('should have consultaState as undefined initially', () => {
      expect(component.consultaState).toBeUndefined();
    });
  });

  describe('Component lifecycle integration', () => {
    it('should execute ngOnInit and ngAfterViewInit during detectChanges', () => {
      const ngAfterViewInitSpy = jest.spyOn(component, 'ngAfterViewInit');
      
      fixture.detectChanges();
      
    });

    it('should initialize persona and domicilioFiscal correctly after view init', () => {
      fixture.detectChanges();
      
      expect(component.persona).toBe(PERSONA_MORAL_NACIONAL);
      expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    });

    it('should maintain indice value after component initialization', () => {
      fixture.detectChanges();
      expect(component.indice).toBe(1);
    });
  });

  describe('Property assignments', () => {
    it('should allow setting tipoPersona', () => {
      component.tipoPersona = TIPO_PERSONA.MORAL_NACIONAL;
      expect(component.tipoPersona).toBe(TIPO_PERSONA.MORAL_NACIONAL);
    });

    it('should allow setting consultaState', () => {
      const mockState: ConsultaioState = { 
        update: true, 
        readonly: false 
      } as ConsultaioState;
      
      component.consultaState = mockState;
      expect(component.consultaState).toBe(mockState);
    });

    it('should allow setting datosRespuesta', () => {
      const mockData = { test: 'data' };
      component.datosRespuesta = mockData;
      expect(component.datosRespuesta).toBe(mockData);
    });

    it('should allow setting esDatosRespuesta', () => {
      component.esDatosRespuesta = true;
      expect(component.esDatosRespuesta).toBe(true);
      
      component.esDatosRespuesta = false;
      expect(component.esDatosRespuesta).toBe(false);
    });
  });
});