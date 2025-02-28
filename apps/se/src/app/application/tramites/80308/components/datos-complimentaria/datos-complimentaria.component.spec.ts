import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosComplimentariaComponent } from './datos-complimentaria.component';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs';

@Injectable()
class MockModificacionSolicitudeService {}


describe('DatosComplimentariaComponent', () => {
  let fixture;
  let component!: DatosComplimentariaComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }
      ]
    }).overrideComponent(DatosComplimentariaComponent, {

      set: { providers: [{ provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(DatosComplimentariaComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('debería ejecutar #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar #ngOnInit()', () => {
    component.obtenerFederetarios = jest.fn();
    component.obtenerOperacions = jest.fn();
    component.obtenerComplimentaria = jest.fn();
    component.ngOnInit();
    expect(component.obtenerFederetarios).toHaveBeenCalled();
    expect(component.obtenerOperacions).toHaveBeenCalled();
    expect(component.obtenerComplimentaria).toHaveBeenCalled();
  });

  it('debe ejecutar #obtenerComplimentaria()', () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerComplimentaria = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerComplimentaria();
    expect(component.modificionService.obtenerComplimentaria).toHaveBeenCalled();
  });

  it('debe ejecutar #obtenerFederetarios()', () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerFederetarios = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerFederetarios();
    expect(component.modificionService.obtenerFederetarios).toHaveBeenCalled();
  });

  it('debería ejecutar #obtenerOperacions()', () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerOperacion = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerOperacions();
    expect(component.modificionService.obtenerOperacion).toHaveBeenCalled();
  });

});