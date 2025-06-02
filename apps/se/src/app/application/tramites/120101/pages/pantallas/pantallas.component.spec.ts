import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;
  let mockServicioDeFormularioService: any;
  let mockWizardService: any;
  let mockWizardComponent: any;

  beforeEach(async () => {
    mockWizardService = { cambio_indice: jest.fn() };
    mockWizardComponent = { siguiente: jest.fn() };

    mockServicioDeFormularioService = {
      isFormValid: jest.fn().mockReturnValue(true),
      registerForm: jest.fn(),
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
    const event = 2;
    component.pestanaCambiado(event);
    expect(component.subpestanaSeleccionada).toBe(event);
  });

  it('should not update subpestanaSeleccionada when event is 0', () => {
    component.subpestanaSeleccionada = 5;
    component.pestanaCambiado(0);
    expect(component.subpestanaSeleccionada).toBe(5);
  });

  it('should not update subpestanaSeleccionada when event is undefined', () => {
    component.subpestanaSeleccionada = 3;
    component.pestanaCambiado(undefined as any);
    expect(component.subpestanaSeleccionada).toBe(3);
  });

  it('should show alert and set form valid when conditions for first if are met', () => {
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

  it('should set mostrarAplicacionRegistradaAlerta to false when neither condition matches', () => {
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
});
