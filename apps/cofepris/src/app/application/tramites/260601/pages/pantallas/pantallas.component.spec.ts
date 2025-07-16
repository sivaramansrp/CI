import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import {
  AlertComponent,
  BtnContinuarComponent,
  ListaPasosWizard,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { DatosComponent } from '../datos/datos.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FirmarSolicitudComponent } from '../firmar-solicitud/firmar-solicitud.component';
import { AvisoSanitarioRoutingModule } from '../../aviso-sanitario-routing.module';
import { PASOS } from './pantallas.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        WizardComponent,
        BtnContinuarComponent,
        DatosComponent,
        PasoDosComponent,
        AlertComponent,
        FirmarSolicitudComponent,
        AvisoSanitarioRoutingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should set infoAlert to alert-info', () => {
    expect(component.infoAlert).toBe('alert-info');
  });

  it('should set TEXTOS to AVISO.Aviso', () => {
    expect(component.TEXTOS).toBe(AVISO.Aviso);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call siguiente on getValorIndice with accion "cont"', () => {
    const paso = 2;
    component.getValorIndice({ valor: paso, accion: 'cont' });
    expect(component.indice).toBe(paso);
    expect(component.datosPasos.indice).toBe(paso);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call atras on getValorIndice with accion not "cont"', () => {
    const paso = 2;
    component.getValorIndice({ valor: paso, accion: 'back' });
    expect(component.indice).toBe(paso);
    expect(component.datosPasos.indice).toBe(paso);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range', () => {
    const initialIndice = component.indice;
    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(initialIndice);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();

    expect(component.indice).toBe(initialIndice);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});
