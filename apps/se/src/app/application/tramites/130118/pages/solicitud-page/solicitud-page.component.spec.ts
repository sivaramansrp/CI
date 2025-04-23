import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPageComponent } from './solicitud-page.component';
import { AlertComponent, AVISO, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { HttpClientModule } from '@angular/common/http';
import { ALERTA } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';

interface AccionBoton {
  accion: string;
  valor: number;
}

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SolicitudPageComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent
      ],
      imports: [
        WizardComponent,
        BtnContinuarComponent,
        AlertComponent,
        SolicitanteComponent,
        HttpClientModule
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set the correct tab index when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should validate the form and set esValido to false if validation fails in getValorIndice', () => {
    const mockAccionBoton: AccionBoton = { accion: 'cont', valor: 2 };
    const solicitudComponentMock = { validarFormulario: jest.fn().mockReturnValue(false) };
    component.pasoUnoComponent = { solicitudComponent: solicitudComponentMock } as any;

    component.getValorIndice(mockAccionBoton);

    expect(solicitudComponentMock.validarFormulario).toHaveBeenCalled();
    expect(component.esValido).toBe(false);
    expect(component.datosPasos.indice).toBe(1);
  });

  it('should validate the form and proceed to the next step if validation passes in getValorIndice', () => {
    const mockAccionBoton: AccionBoton = { accion: 'cont', valor: 2 };
    const solicitudComponentMock = { validarFormulario: jest.fn().mockReturnValue(true) };
    const wizardComponentMock = { siguiente: jest.fn() };
    component.pasoUnoComponent = { solicitudComponent: solicitudComponentMock } as any;
    component.wizardComponent = wizardComponentMock as any;

    component.getValorIndice(mockAccionBoton);

    expect(solicitudComponentMock.validarFormulario).toHaveBeenCalled();
    expect(component.esValido).toBe(true);
    expect(component.indice).toBe(2);
    expect(wizardComponentMock.siguiente).toHaveBeenCalled();
  });

  it('should call wizardComponent.atras when accion is not "cont" and form is valid', () => {
    const mockAccionBoton = { valor: 2, accion: 'back' };
  
    const validarFormularioMock = jest.fn().mockReturnValue(true);
  
    component.pasoUnoComponent = {
      solicitudComponent: {
        validarFormulario: validarFormularioMock
      }
    } as any;
  
    component.indice = 1;
    component.datosPasos = { 
      indice: 0, 
      nroPasos: component.pasos.length, 
      txtBtnAnt: 'Anterior', 
      txtBtnSig: 'Continuar' 
    };
  
    const atrasMock = jest.fn();
    const siguienteMock = jest.fn();
  
    component.wizardComponent = {
      atras: atrasMock,
      siguiente: siguienteMock
    } as any;
  
    component.getValorIndice(mockAccionBoton);
  
    expect(validarFormularioMock).toHaveBeenCalled();
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not change indice if valor is out of range in getValorIndice', () => {
    const mockAccionBoton: AccionBoton = { accion: 'cont', valor: 6 };

    component.getValorIndice(mockAccionBoton);

    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should have default values for infoAlert and infoError', () => {
    expect(component.infoAlert).toBe('alert-info');
    expect(component.infoError).toBe('alert-danger');
  });

  it('should have default values for TEXTOS and ALERTA', () => {
    expect(component.TEXTOS).toBe(AVISO.Aviso);
    expect(component.ALERTA).toBe(ALERTA);
  });

});
