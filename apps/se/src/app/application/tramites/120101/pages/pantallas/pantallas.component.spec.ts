import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import {
  AccionBoton,
  AlertComponent,
  BtnContinuarComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { DatosGeneralesComponent } from '../../components/datos-generales/datos-generales.component';
import { DomicilioFiscalComponent } from '../../components/domicilio-fiscal/domicilio-fiscal.component';
import { ConsultarCupoComponent } from '../../components/consultar-cupo/consultar-cupo.component';
import { DescripcionDelCupoComponent } from '../../components/descripcion-del-cupo/descripcion-del-cupo.component';
import { RepresentacionFederalComponent } from '../../components/representacion-federal/representacion-federal.component';
import { BienFinalComponent } from '../../components/bien-final/bien-final.component';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { CUPOS_PASOS } from '../../constantes/solicitud-de-registro-tpl.enum';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;
  let mockServicioDeFormularioService: any;
  let mockWizardService: any;
  let mockWizardComponent: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockWizardService = { cambio_indice: jest.fn() };
    mockWizardComponent = { siguiente: jest.fn(), atras: jest.fn() };

    mockServicioDeFormularioService = {
      isFormValid: jest.fn().mockReturnValue(true),
      registerForm: jest.fn(),
    };

    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      declarations: [PantallasComponent, PasoUnoComponent, PasoDosComponent],
      imports: [
        WizardComponent,
        AlertComponent,
        BtnContinuarComponent,
        DatosGeneralesComponent,
        DomicilioFiscalComponent,
        ConsultarCupoComponent,
        DescripcionDelCupoComponent,
        RepresentacionFederalComponent,
        BienFinalComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ServicioDeFormularioService, useValue: mockServicioDeFormularioService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    component.wizardService = mockWizardService;
    component.wizardComponent = mockWizardComponent;
    component.datosPasos = {
      indice: 1,
      txtBtnSig: 'Continuar',
      txtBtnAnt: 'Anterior',
      nroPasos: CUPOS_PASOS.length
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties correctly', () => {
    expect(component.pantallasPasos).toEqual(CUPOS_PASOS);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should return true if all forms are valid in verificarLaValidezDelFormulario', () => {
    mockServicioDeFormularioService.isFormValid.mockReturnValue(true);
    const result = component.verificarLaValidezDelFormulario();
    expect(result).toBe(true);
  });

  it('should return false if any form is invalid in verificarLaValidezDelFormulario', () => {
    mockServicioDeFormularioService.isFormValid
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const result = component.verificarLaValidezDelFormulario();
    expect(result).toBe(false);
  });

  it('should return false if any form validity is undefined', () => {
    jest.spyOn(component['servicioDeFormularioService'], 'isFormValid').mockImplementation((formName: string) => {
      return formName === 'representacionFederalForm' ? undefined : true;
    });
    const result = component.verificarLaValidezDelFormulario();
    expect(result).toBe(false);
  });

  it('should update subpestanaSeleccionada when event is a truthy number', () => {
    component.pestanaCambiado(2);
    expect(component.subpestanaSeleccionada).toBe(2);
  });

  it('should not update subpestanaSeleccionada when event is 0 or undefined', () => {
    component.subpestanaSeleccionada = 5;
    component.pestanaCambiado(0);
    expect(component.subpestanaSeleccionada).toBe(5);
    component.pestanaCambiado(undefined as any);
    expect(component.subpestanaSeleccionada).toBe(5);
  });

  it('should show alert and set form valid when special form condition met', () => {
    component.subpestanaSeleccionada = 2;
    Object.defineProperty(component, 'esConsultarCupoFormValid', { value: true });
    Object.defineProperty(component, 'esBienFinalFormValid', { value: true });
    Object.defineProperty(component, 'esRepresentacionFederalFormValid', { value: true });
    component.esFormaValido = false;
    const accionBoton = { valor: 3 } as AccionBoton;
    component.continuar(accionBoton);
    expect(component.mostrarAplicacionRegistradaAlerta).toBe(true);
    expect(component.pestanaDosFormularioValido).toBe(true);
    expect(mockWizardService.cambio_indice).not.toHaveBeenCalled();
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should set mostrarAplicacionRegistradaAlerta to false when no conditions match', () => {
    component.subpestanaSeleccionada = 1;
    Object.defineProperty(component, 'esConsultarCupoFormValid', { value: false });
    Object.defineProperty(component, 'esBienFinalFormValid', { value: false });
    Object.defineProperty(component, 'esRepresentacionFederalFormValid', { value: false });
    component.esFormaValido = false;
    const accionBoton = { valor: 5 } as AccionBoton;
    component.continuar(accionBoton);
    expect(component.mostrarAplicacionRegistradaAlerta).toBe(false);
    expect(mockWizardService.cambio_indice).not.toHaveBeenCalled();
    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should continue to next step when form is valid', () => {
    component.consultaState = { readonly: false } as any;
    component.esFormaValido = true;
    component.indice = 2;
    jest.spyOn(component, 'verificarLaValidezDelFormulario').mockReturnValue(true);
    const siguienteSpy = jest.fn();
    component.wizardComponent = { ...mockWizardComponent, siguiente: siguienteSpy };
    const accionBoton: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(3);
    expect(component.datosPasos.indice).toBe(3);
    expect(mockWizardService.cambio_indice).toHaveBeenCalledWith(3);
    expect(siguienteSpy).toHaveBeenCalled();
  });

  it('should not go back if accion is ant and form is invalid', () => {
    component.consultaState = { readonly: false } as any;
    component.esFormaValido = false;
    Object.assign(component.wizardComponent, { atras: jest.fn() });
    const accionBoton: AccionBoton = { valor: 3, accion: 'ant' };
    component.getValorIndice(accionBoton);
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should move forward if readonly is true and accion is cont', () => {
    component.consultaState = { readonly: true } as any;
    Object.assign(component.wizardComponent, { siguiente: jest.fn() });
    const accionBoton: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should go back if readonly is true and accion is ant', () => {
    component.consultaState = { readonly: true } as any;
    Object.assign(component.wizardComponent, { atras: jest.fn() });
    const accionBoton: AccionBoton = { valor: 3, accion: 'ant' };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should set pestanaDosFormularioValido to true if consultaState.readonly is true on init', () => {
  const mockState = { readonly: true } as ConsultaioState;
  mockConsultaioQuery.selectConsultaioState$ = of(mockState);
  component.ngOnInit();
  expect(component.consultaState.readonly).toBe(true);
  expect(component.pestanaDosFormularioValido).toBe(true);
});

it('should not set pestanaDosFormularioValido if consultaState.readonly is false on init', () => {
  const mockState = { readonly: false } as ConsultaioState;
  mockConsultaioQuery.selectConsultaioState$ = of(mockState);
  component.ngOnInit();
  expect(component.consultaState.readonly).toBe(false);
  expect(component.pestanaDosFormularioValido).toBe(false);
});

it('should return false if any of the forms are undefined in verificarLaValidezDelFormulario', () => {
  jest.spyOn(mockServicioDeFormularioService, 'isFormValid').mockImplementation((form) => {
    if (form === 'insumosForm') return undefined;
    return true;
  });
  expect(component.verificarLaValidezDelFormulario()).toBe(false);
});

  it('should not update subpestanaSeleccionada if event is 0 or undefined', () => {
    component.subpestanaSeleccionada = 2;
    component.pestanaCambiado(0);
    expect(component.subpestanaSeleccionada).toBe(2);

    component.pestanaCambiado(undefined as any);
    expect(component.subpestanaSeleccionada).toBe(2);
  });

  it('should hide alert if esFormaValido is false and subpestanaSeleccionada is not 2', () => {
    component.subpestanaSeleccionada = 1;
    component.esFormaValido = false;
    const accion: AccionBoton = { valor: 2, accion: 'cont' };
    component.continuar(accion);
    expect(component.mostrarAplicacionRegistradaAlerta).toBe(false);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
