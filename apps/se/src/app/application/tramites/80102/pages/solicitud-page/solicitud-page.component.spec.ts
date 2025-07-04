import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudPageComponent } from './solicitud-page.component';
import { TestBed } from '@angular/core/testing';
import {
  PASOS,
  TITULOMENSAJE,
} from '../../constantes/autorizacion-programa-nuevo.enum';

describe('SolicitudPageComponent', () => {
  let fixture;
  let component: SolicitudPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(SolicitudPageComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('debería ejecutar #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar #seleccionaTab()', () => {

    component.seleccionaTab(1);

  });

  it('debería ejecutar #getValorIndice()', () => {
    component.wizardComponent = component.wizardComponent || {};
    component.wizardComponent.siguiente = jest.fn();
    component.wizardComponent.atras = jest.fn();
    component.getValorIndice({
      valor: 1,
      accion: 'cont'
    });
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    component.getValorIndice({
      valor: 2,
      accion: 'test'
    });
    expect(component.wizardComponent.atras).toHaveBeenCalled();

  });

  it('debe ejecutar #obtenerNombreDelTítulo()', () => {

    component.pasos = PASOS;
    const res = TITULOMENSAJE;
    component.obtenerNombreDelTítulo(1);
    expect(component.tituloMensaje).toBe(res);
    component.obtenerNombreDelTítulo(2);
    expect(component.tituloMensaje).toBe(component.pasos[1].titulo);
    component.obtenerNombreDelTítulo(3);
    expect(component.tituloMensaje).toBe(component.pasos[2].titulo);

  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
  });

});