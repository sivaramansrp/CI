import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPageComponent } from './registro-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from 'libs/shared/data-access-user/src/tramites/constantes/certificado-zoosanitario.enum';
import { AccionBoton } from 'libs/shared/data-access-user/src/core/models/220202/fitosanitario.model';

describe('RegistroPageComponent', () => {
  let component: RegistroPageComponent;
  let fixture: ComponentFixture<RegistroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPageComponent, WizardComponent]
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
      txtBtnAnt: 'Guardar',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update indice and tituloMensaje on getValorIndice', () => {
    const accionBoton: AccionBoton = { accion: 'cont', valor: 2 };
    jest.spyOn(component.wizardComponent, 'siguiente');

    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(accionBoton.valor);
    expect(component.tituloMensaje).toBe('Cargar archivos');
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should call wizardComponent.atras on getValorIndice with accion "atras"', () => {
    const accionBoton: AccionBoton = { accion: 'atras', valor: 2 };
    jest.spyOn(component.wizardComponent, 'atras');

    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(accionBoton.valor);
    expect(component.tituloMensaje).toBe('Cargar archivos');
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should return correct tituloMensaje on obtenerNombreDelTítulo', () => {
    expect(component.obtenerNombreDelTítulo(1)).toBe('Zoosanitario para importación');
    expect(component.obtenerNombreDelTítulo(2)).toBe('Cargar archivos');
    expect(component.obtenerNombreDelTítulo(3)).toBe('Cargar archivos');
    expect(component.obtenerNombreDelTítulo(4)).toBe('Firmar');
    expect(component.obtenerNombreDelTítulo(5)).toBe('Zoosanitario para importación');
  });

  it('should update tituloMensaje on enTabChange', () => {
    component.enTabChange(1);
    expect(component.tituloMensaje).toBe('Registro de solicitud IMMEX modalidad ampliación servicios');

    component.enTabChange(2);
    expect(component.tituloMensaje).toBe('Registro de solicitud IMMEX modalidad ampliación servicios');
  });
});