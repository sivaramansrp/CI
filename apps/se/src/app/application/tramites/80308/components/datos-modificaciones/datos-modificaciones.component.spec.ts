import { TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { DatosModificacionesComponent } from './datos-modificaciones.component';
import { FormBuilder } from '@angular/forms';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';

@Injectable()
class MockModificacionSolicitudeService {}

describe('DatosModificacionesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }
      ]
    }).overrideComponent(DatosModificacionesComponent, {

      set: { providers: [{ provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(DatosModificacionesComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar #ngOnInit()', async () => {
    component.iniciarFormulario = jest.fn();
    component.cargarDatos = jest.fn();
    component.ngOnInit();
    expect(component.iniciarFormulario).toHaveBeenCalled();
    expect(component.cargarDatos).toHaveBeenCalled();
  });

  it('debe ejecutar #iniciarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.iniciarFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('debe ejecutar #cargarDatos()', async () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerDatosGenerales = jest.fn().mockReturnValue(observableOf({}));
    component.formularioDatosGenerales = component.formularioDatosGenerales || {};
    component.formularioDatosGenerales.patchValue = jest.fn();
    component.cargarDatos();
    expect(component.modificionService.obtenerDatosGenerales).toHaveBeenCalled();
    expect(component.formularioDatosGenerales.patchValue).toHaveBeenCalled();
  });

});