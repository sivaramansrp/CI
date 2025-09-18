import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { RegistroService } from '../../services/registro.service';
import { ConsultaioQuery, TIPO_PERSONA, FormularioDinamico, ConsultaioState } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let registroServiceMock: any;
  let consultaQueryMock: any;

  
  beforeEach(async () => {
    registroServiceMock = {
      getCatalogoById: jest.fn().mockReturnValue(of({ data: JSON.stringify({ domicilioFiscal: { entidadFederativa: [{ id: 1, nombre: 'Entidad' }] } }) })),
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ tratado: [], pais: [], fraccionArancelaria: '' })),
      actualizarEstadoFormulario: jest.fn(),
    };

    consultaQueryMock = {
      selectConsultaioState$: of({ update: false } as ConsultaioState),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent,HttpClientModule],
      providers: [
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set entidadFederativa on ngOnInit', () => {
    component.ngOnInit();
    expect(registroServiceMock.getCatalogoById).toHaveBeenCalledWith(21);
    expect(component.entidadFederativa).toEqual([{ id: 1, nombre: 'Entidad' }]);
  });

  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    component.consultaState = { update: false } as ConsultaioState;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

it('should call guardarDatosFormularios if consultaState.update is true', async () => {
  consultaQueryMock.selectConsultaioState$ = of({ update: true } as ConsultaioState);
  const guardarSpy = jest.spyOn(component, 'guardarDatosFormularios');
  component.ngOnInit();
  await fixture.whenStable();
  fixture.detectChanges();
  expect(guardarSpy).toHaveBeenCalled();
});

  it('guardarDatosFormularios should call actualizarEstadoFormulario and set esDatosRespuesta', () => {
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    fixture.detectChanges();
    expect(registroServiceMock.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(registroServiceMock.actualizarEstadoFormulario).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
  });

  describe('validarFormularios', () => {
    it('should return true when all child components are valid', () => {
      // Mock all child components with valid forms
      component.solicitante = {
        form: { invalid: false, markAllAsTouched: jest.fn() }
      } as any;
      
      component.certificadoOrigen = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;
      
      component.datosCertificado = {
        validarFormulariosDatos: jest.fn().mockReturnValue(true)
      } as any;
      
      component.destinatario = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(true);
    });

    it('should return false when solicitante form is invalid', () => {
      component.solicitante = {
        form: { invalid: true, markAllAsTouched: jest.fn() }
      } as any;
      
      component.certificadoOrigen = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;
      
      component.datosCertificado = {
        validarFormulariosDatos: jest.fn().mockReturnValue(true)
      } as any;
      
      component.destinatario = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(false);
      expect(component.solicitante.form.markAllAsTouched).toHaveBeenCalled();
    });

    it('should return false when solicitante component is not available', () => {
      component.solicitante = null as any;
      
      component.certificadoOrigen = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;
      
      component.datosCertificado = {
        validarFormulariosDatos: jest.fn().mockReturnValue(true)
      } as any;
      
      component.destinatario = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(false);
    });

    it('should return false when certificadoOrigen component is not available', () => {
      component.solicitante = {
        form: { invalid: false, markAllAsTouched: jest.fn() }
      } as any;
      
      component.certificadoOrigen = null as any;
      
      component.datosCertificado = {
        validarFormulariosDatos: jest.fn().mockReturnValue(true)
      } as any;
      
      component.destinatario = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(false);
    });

    it('should return false when certificadoOrigen validation fails', () => {
      component.solicitante = {
        form: { invalid: false, markAllAsTouched: jest.fn() }
      } as any;
      
      component.certificadoOrigen = {
        validarFormularios: jest.fn().mockReturnValue(false)
      } as any;
      
      component.datosCertificado = {
        validarFormulariosDatos: jest.fn().mockReturnValue(true)
      } as any;
      
      component.destinatario = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(false);
    });

    it('should return false when datosCertificado component is not available', () => {
      component.solicitante = {
        form: { invalid: false, markAllAsTouched: jest.fn() }
      } as any;
      
      component.certificadoOrigen = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;
      
      component.datosCertificado = null as any;
      
      component.destinatario = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(false);
    });

    it('should return false when datosCertificado validation fails', () => {
      component.solicitante = {
        form: { invalid: false, markAllAsTouched: jest.fn() }
      } as any;
      
      component.certificadoOrigen = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;
      
      component.datosCertificado = {
        validarFormulariosDatos: jest.fn().mockReturnValue(false)
      } as any;
      
      component.destinatario = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(false);
    });

    it('should return false when destinatario component is not available', () => {
      component.solicitante = {
        form: { invalid: false, markAllAsTouched: jest.fn() }
      } as any;
      
      component.certificadoOrigen = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;
      
      component.datosCertificado = {
        validarFormulariosDatos: jest.fn().mockReturnValue(true)
      } as any;
      
      component.destinatario = null as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(false);
    });

    it('should return false when destinatario validation fails', () => {
      component.solicitante = {
        form: { invalid: false, markAllAsTouched: jest.fn() }
      } as any;
      
      component.certificadoOrigen = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;
      
      component.datosCertificado = {
        validarFormulariosDatos: jest.fn().mockReturnValue(true)
      } as any;
      
      component.destinatario = {
        validarFormularios: jest.fn().mockReturnValue(false)
      } as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(false);
    });

    it('should return false when solicitante form is undefined', () => {
      component.solicitante = {
        form: undefined
      } as any;
      
      component.certificadoOrigen = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;
      
      component.datosCertificado = {
        validarFormulariosDatos: jest.fn().mockReturnValue(true)
      } as any;
      
      component.destinatario = {
        validarFormularios: jest.fn().mockReturnValue(true)
      } as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(false);
    });

    it('should return false when multiple components are invalid', () => {
      component.solicitante = {
        form: { invalid: true, markAllAsTouched: jest.fn() }
      } as any;
      
      component.certificadoOrigen = {
        validarFormularios: jest.fn().mockReturnValue(false)
      } as any;
      
      component.datosCertificado = {
        validarFormulariosDatos: jest.fn().mockReturnValue(false)
      } as any;
      
      component.destinatario = {
        validarFormularios: jest.fn().mockReturnValue(false)
      } as any;

      const result = component.validarFormularios();
      
      expect(result).toBe(false);
      expect(component.solicitante.form.markAllAsTouched).toHaveBeenCalled();
    });
  });

  describe('seleccionaTab', () => {
    it('should set indice to the provided value', () => {
      component.seleccionaTab(3);
      expect(component.indice).toBe(3);
    });

    it('should change indice from default value', () => {
      component.indice = 1;
      component.seleccionaTab(2);
      expect(component.indice).toBe(2);
    });

    it('should accept any numeric value', () => {
      component.seleccionaTab(0);
      expect(component.indice).toBe(0);
      
      component.seleccionaTab(5);
      expect(component.indice).toBe(5);
      
      component.seleccionaTab(-1);
      expect(component.indice).toBe(-1);
    });
  });

  describe('cargaArchivo', () => {
    it('should emit true when called with true', () => {
      jest.spyOn(component.archivo, 'emit');
      
      component.cargaArchivo(true);
      
      expect(component.archivo.emit).toHaveBeenCalledWith(true);
    });

    it('should emit false when called with false', () => {
      jest.spyOn(component.archivo, 'emit');
      
      component.cargaArchivo(false);
      
      expect(component.archivo.emit).toHaveBeenCalledWith(false);
    });

    it('should emit the exact value passed as parameter', () => {
      jest.spyOn(component.archivo, 'emit');
      
      component.cargaArchivo(true);
      expect(component.archivo.emit).toHaveBeenCalledWith(true);
      
      component.cargaArchivo(false);
      expect(component.archivo.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('ngOnDestroy', () => {
    it('should call next and complete on destroyNotifier$', () => {
      jest.spyOn(component.destroyNotifier$, 'next');
      jest.spyOn(component.destroyNotifier$, 'complete');
      
      component.ngOnDestroy();
      
      expect(component.destroyNotifier$.next).toHaveBeenCalled();
      expect(component.destroyNotifier$.complete).toHaveBeenCalled();
    });
  });
  
});