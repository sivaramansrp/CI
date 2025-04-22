import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { SolicitudComponent } from './solicitud.component';
import { SolicitudPantallasService } from '../../../220502/services/solicitud-pantallas.service';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let solicitudServiceMock: any;

  beforeEach(async () => {
    solicitudServiceMock = {
      getData: jest.fn().mockReturnValue(of({
        hHistorialinspeccion: ['hist1', 'hist2'],
        dHistorialInspecciones: [],
        dCarrosDeFerrocarril: [],
        hCarroFerrocarril: ['car1', 'car2'],
        hSolicitud: ['sol1', 'sol2'],
        dSolicitud: []
      }))
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      providers: [
        FormBuilder,
        { provide: SolicitudPantallasService, useValue: solicitudServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on creation', () => {
    expect(component.form).toBeDefined();
  });

  it('should call cargarDatosIniciales on ngOnInit', () => {
    const cargarDatosInicialesSpy = jest.spyOn(component, 'cargarDatosIniciales');
    component.ngOnInit();
    expect(cargarDatosInicialesSpy).toHaveBeenCalled();
  });

  it('should load initial data from the service', () => {
    component.cargarDatosIniciales();
    expect(solicitudServiceMock.getData).toHaveBeenCalled();
    expect(component.hHistorialinspeccion).toEqual(['hist1', 'hist2']);
    expect(component.hCarroFerrocarril).toEqual(['car1', 'car2']);
    expect(component.hSolicitud).toEqual(['sol1', 'sol2']);
  });

  it('should handle onTransporteSeleccionado correctly', () => {
    component.onTransporteSeleccionado(false);
    expect(component.mostrarSeccion).toBe(false);

    component.onTransporteSeleccionado(true);
    expect(component.mostrarSeccion).toBe(true);
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});