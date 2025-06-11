// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CambioDeModalidadComponent } from '../cambio-de-modalidad/cambio-de-modalidad.component';
import { CambioModalidadService } from '../../service/cambio-modalidad.service';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of as observableOf } from 'rxjs';

describe('CambioDeModalidadComponent', () => {
  let fixture: ComponentFixture<CambioDeModalidadComponent>;
  let component: CambioDeModalidadComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, CambioDeModalidadComponent],
      declarations: [
        
      ],
      providers: [FormBuilder, CambioModalidadService],
    }).compileComponents();
    fixture = TestBed.createComponent(CambioDeModalidadComponent);
    component = fixture.componentInstance;
  });

  it('should run #ngOnInit()', () => {
    component.getCargarDatos = jest.fn();
    component.disableFormControls = jest.fn();
    component.getCambioDeModalidad = jest.fn();
    component.getServiciosImmx = jest.fn();
    component.ngOnInit();
    expect(component.getCargarDatos).toHaveBeenCalled();

    expect(component.getCambioDeModalidad).toHaveBeenCalled();
    expect(component.getServiciosImmx).toHaveBeenCalled();
  });

  it('should run #getcargarDatos()', () => {
    component.modalidadService = component.modalidadService || {};
    component.modalidadService.getDatosSimulados = jest.fn().mockReturnValue(observableOf({}));
    component.cambioDeModalidadForm = component.cambioDeModalidadForm || {};
    component.cambioDeModalidadForm.patchValue = jest.fn();
    component.getCargarDatos();
    expect(component.modalidadService.getDatosSimulados).toHaveBeenCalled();
    expect(component.cambioDeModalidadForm.patchValue).toHaveBeenCalled();
  });

  it('should run #getServiciosImmx()', () => {
    component.modalidadService = component.modalidadService || {};
    component.modalidadService.getServiciosImmx = jest.fn().mockReturnValue(observableOf({ data: {} }));
    component.getServiciosImmx();
    expect(component.modalidadService.getServiciosImmx).toHaveBeenCalled();
  });

  it('should run #getCambioDeModalidad()', () => {
    component.modalidadService = component.modalidadService || {};
    component.modalidadService.getCambioDeModalidad = jest.fn().mockReturnValue(observableOf({ cambioModalidad: { data: {} } }));
    component.cambioDeModalidadForm = component.cambioDeModalidadForm || {};
    component.cambioDeModalidadForm.get = jest.fn().mockReturnValue({ value: {} });
    component.toggleServiciosImmx = jest.fn();
    component.getCambioDeModalidad();
    expect(component.modalidadService.getCambioDeModalidad).toHaveBeenCalled();
    expect(component.cambioDeModalidadForm.get).toHaveBeenCalled();
    expect(component.toggleServiciosImmx).toHaveBeenCalled();
  });

  it('should run #disableFormControls()', () => {
    component.cambioDeModalidadForm = component.cambioDeModalidadForm || {};
    component.cambioDeModalidadForm.get = jest.fn().mockReturnValue({ disable: jest.fn() });


  });

  it('should run #toggleServiciosImmx()', () => {
    component.cambioDeModalidad = [{ id: 1, descripcion: 'desc1' }, { id: 2, descripcion: 'desc2' }];
    component.cambioDeModalidad.find = jest.fn().mockReturnValue({ id: {} });
    component.toggleServiciosImmx(1);
    expect(component.cambioDeModalidad.find).toHaveBeenCalled();
  });

  it('should run #onDropdownSelect()', () => {
    component.toggleServiciosImmx = jest.fn();
    component.onDropdownSelect({ id: {} });
    expect(component.toggleServiciosImmx).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });
});