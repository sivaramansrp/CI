import {
  CUSTOM_ELEMENTS_SCHEMA,
  Injectable,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaPlantaComponent } from './alta-planta.component';
import { FormBuilder } from '@angular/forms';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { of as observableOf } from 'rxjs';
import { provideToastr } from 'ngx-toastr';

@Injectable()
class MockModificacionSolicitudeService {}


describe('AltaPlantaComponent', () => {
  let fixture: ComponentFixture<AltaPlantaComponent>;
  let component: AltaPlantaComponent;


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
        provideToastr({
          positionClass: 'toast-top-right',
        }),
      ]
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


  it('debería ejecutar #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar #ngOnInit()', () => {
    component.cargarEstados = jest.fn();
    component.ngOnInit();
    expect(component.cargarEstados).toHaveBeenCalled();
  });

  it('debe ejecutar #cargarEstados()', () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerListaEstado = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.cargarEstados();
    expect(component.modificionService.obtenerListaEstado).toHaveBeenCalled();
  });

  it('debe ejecutar #buscarDomicilios()', () => {
    component.formularioControl.setValue('value');
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerDomicilios = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.buscarDomicilios();
    expect(component.modificionService.obtenerDomicilios).toHaveBeenCalled();
  });

  it('debe ejecutar #seleccionarDomicilios()', () => {
    component.seleccionarDomicilios({});
 });

  it('debe ejecutar #aplicarAccion()', () => {
    component.aplicarAccion();
  });

  it('debería ejecutar #eliminarPlantas()', () => {
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados = [{id: 1}];
    component.eliminarPlantas({
      id: 1,
    });
  });
});
