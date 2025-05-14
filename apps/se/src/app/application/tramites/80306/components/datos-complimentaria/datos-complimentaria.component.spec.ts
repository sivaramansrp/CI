import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosComplimentariaComponent } from './datos-complimentaria.component';
import { ImmerModificacionService } from '../../service/immer-modificacion.service';
import { ToastrService } from 'ngx-toastr';
import { of as observableOf } from 'rxjs';

@Injectable()
class MockImmerModificacionService {}

@Injectable()
class MockToastrService {
  success(message?: string, title?: string): void {}
  error(message?: string, title?: string): void {}
  info(message?: string, title?: string): void {}
  warning(message?: string, title?: string): void {}
}

describe('DatosComplimentariaComponent', () => {
  let fixture: ComponentFixture<DatosComplimentariaComponent>;
  let component: { ngOnDestroy: () => void; solicitudService: { obtenerComplimentaria?: any; obtenerFederetarios?: any; obtenerOperacion?: any; obtenerPlanta?: any; obtenerServicios?: any; }; toastr: { error?: any; }; obtenerComplimentaria: () => void; obtenerFederetarios: () => void; obtenerOperacions: () => void; obtenerPlanta: () => void; obtenerServicios: () => void; destroyNotifier$: { next?: any; unsubscribe?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, DatosComplimentariaComponent ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ImmerModificacionService, useClass: MockImmerModificacionService },
        ToastrService
      ]
    }).overrideComponent(DatosComplimentariaComponent, {

      set: { providers: [{ provide: ImmerModificacionService, useClass: MockImmerModificacionService },
{ provide: ToastrService, useClass: MockToastrService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(DatosComplimentariaComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #obtenerComplimentaria()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.obtenerComplimentaria = jest.fn().mockReturnValue(observableOf({}));
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.obtenerComplimentaria();
    expect(component.solicitudService.obtenerComplimentaria).toHaveBeenCalled();
    expect(component.toastr.error).toHaveBeenCalled();
  });

  it('should run #obtenerFederetarios()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.obtenerFederetarios = jest.fn().mockReturnValue(observableOf({}));
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.obtenerFederetarios();
    expect(component.solicitudService.obtenerFederetarios).toHaveBeenCalled();
    expect(component.toastr.error).toHaveBeenCalled();
  });

  it('should run #obtenerOperacions()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.obtenerOperacion = jest.fn().mockReturnValue(observableOf({}));
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.obtenerOperacions();
    expect(component.solicitudService.obtenerOperacion).toHaveBeenCalled();
    expect(component.toastr.error).toHaveBeenCalled();
  });

  it('should run #obtenerPlanta()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.obtenerPlanta = jest.fn().mockReturnValue(observableOf({}));
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.obtenerPlanta();
    expect(component.solicitudService.obtenerPlanta).toHaveBeenCalled();
    expect(component.toastr.error).toHaveBeenCalled();
  });

  it('should run #obtenerServicios()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.obtenerServicios = jest.fn().mockReturnValue(observableOf({}));
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.obtenerServicios();
    expect(component.solicitudService.obtenerServicios).toHaveBeenCalled();
    expect(component.toastr.error).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.unsubscribe = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.unsubscribe).toHaveBeenCalled();
  });

});