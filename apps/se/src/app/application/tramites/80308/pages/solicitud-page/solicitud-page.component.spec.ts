import { TestBed } from '@angular/core/testing';
import {  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { SolicitudPageComponent } from './solicitud-page.component';

describe('SolicitudPageComponent', () => {
  let fixture;
  let component;

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


  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar #seleccionaTab()', async () => {

    component.seleccionaTab({});

  });

  it('debería ejecutar #getValorIndice()', async () => {
    component.obtenerNombreDelTítulo = jest.fn();
    component.wizardComponent = component.wizardComponent || {};
    component.wizardComponent.siguiente = jest.fn();
    component.wizardComponent.atras = jest.fn();
    component.getValorIndice({
      valor: 1,
      accion: 'cont'
    });
    expect(component.obtenerNombreDelTítulo).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debe ejecutar #obtenerNombreDelTítulo()', async () => {

    component.obtenerNombreDelTítulo({});

  });

});