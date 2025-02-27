import { TestBed } from '@angular/core/testing';
import {
  
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';

import { AltaPlantaComponent } from './alta-planta.component';
import { FormBuilder } from '@angular/forms';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';

@Injectable()
class MockModificacionSolicitudeService {}


describe('AltaPlantaComponent', () => {
  let fixture;
  let component;


  beforeEach(() => {
   
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        {
          provide: ModificacionSolicitudeService,
          useClass: MockModificacionSolicitudeService,
        },
      ],
    })
      .overrideComponent(AltaPlantaComponent, {
        set: {
          providers: [
            {
              provide: ModificacionSolicitudeService,
              useClass: MockModificacionSolicitudeService,
            },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(AltaPlantaComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar GetterDeclaration #formularioControl', async () => {
    component.formulario = component.formulario || {};
    component.formulario.get = jest.fn();
    const formularioControl = component.formularioControl;
    expect(component.formulario.get).toHaveBeenCalled();
  });

  it('debería ejecutar #ngOnInit()', async () => {
    component.cargarEstados = jest.fn();
    component.ngOnInit();
    expect(component.cargarEstados).toHaveBeenCalled();
  });

  it('debe ejecutar #cargarEstados()', async () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerListaEstado = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.cargarEstados();
    expect(component.modificionService.obtenerListaEstado).toHaveBeenCalled();
  });

  it('debe ejecutar #buscarDomicilios()', async () => {
    component.formularioControl.value = 'value';
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerDomicilios = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.buscarDomicilios();
    expect(component.modificionService.obtenerDomicilios).toHaveBeenCalled();
  });

  it('debe ejecutar #seleccionarDomicilios()', async () => {
    component.seleccionarDomicilios({});
 });

  it('debe ejecutar #aplicarAccion()', async () => {
    component.aplicarAccion();
  });

  it('debería ejecutar #eliminarPlantas()', async () => {
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados = ['domiciliosSeleccionados'];
    component.eliminarPlantas({
      id: {},
    });
  });
});
