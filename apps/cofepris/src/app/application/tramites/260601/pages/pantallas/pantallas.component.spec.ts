import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { AlertComponent, BtnContinuarComponent, WizardComponent } from '@ng-mf/data-access-user';
import { AVISO_PRIVACIDAD } from '../../constantes/aviso-enum';
import { PASOS } from '@ng-mf/data-access-user';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { FirmarSolicitudComponent } from '../firmar-solicitud/firmar-solicitud.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallasComponent],
      imports: [
        CommonModule,
        WizardComponent,
        PasoDosComponent,
        FirmarSolicitudComponent,
        BtnContinuarComponent,
        AlertComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos property correctly', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('should initialize TEXTOS property correctly', () => {
    expect(component.TEXTOS).toBe(AVISO_PRIVACIDAD);
  });

  it('should set indice correctly in seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should set indice and call siguiente method in getValorIndice with action "cont"', () => {
    const mockAccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(mockAccionBoton);

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should set indice and call atras method in getValorIndice with action other than "cont"', () => {
    const mockAccionBoton = { accion: 'ant', valor: 1 };
    component.getValorIndice(mockAccionBoton);

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call any method if valor is out of range in getValorIndice', () => {
    const mockAccionBoton = { accion: 'cont', valor: 6 };
    component.getValorIndice(mockAccionBoton);

    expect(component.indice).not.toBe(6);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});