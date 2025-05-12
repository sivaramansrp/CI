import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccionBoton } from '../../models/datos-info.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegistroPageComponent } from './registro-page.component';
import { PASOS} from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

describe('RegistroPageComponent', () => {
  let component: RegistroPageComponent;
  let fixture: ComponentFixture<RegistroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RegistroPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default pasos defined', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('should have default tituloMensaje', () => {
    expect(component.tituloMensaje).toBe('Registro de solicitud IMMEX modalidad ampliación servicios ');
  });

  it('should have default indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should have default datosPasos', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update indice and tituloMensaje on getValorIndice', () => {
    const ACCIONBOTON: AccionBoton = { accion: 'cont', valor: 2 };
    jest.spyOn(component.wizardComponent, 'siguiente');

    component.getValorIndice(ACCIONBOTON);

    expect(component.indice).toBe(ACCIONBOTON.valor);
    expect(component.tituloMensaje).toBe('Registro de solicitud IMMEX modalidad ampliación servicios ');
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should call wizardComponent.atras on getValorIndice with accion "atras"', () => {
    const ACCIONBOTON: AccionBoton = { accion: 'atras', valor: 2 };
    jest.spyOn(component.wizardComponent, 'atras');

    component.getValorIndice(ACCIONBOTON);

    expect(component.indice).toBe(ACCIONBOTON.valor);
    expect(component.tituloMensaje).toBe('Registro de solicitud IMMEX modalidad ampliación servicios ');
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should update tituloMensaje on enTabChange', () => {
    component.enTabChange(1);
    expect(component.tituloMensaje).toBe('Registro de solicitud IMMEX modalidad ampliación servicios');

    component.enTabChange(2);
    expect(component.tituloMensaje).toBe('Registro de solicitud IMMEX modalidad ampliación servicios');
  });
});
