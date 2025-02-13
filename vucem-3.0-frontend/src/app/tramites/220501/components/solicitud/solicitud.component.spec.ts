import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SolicitudComponent } from './solicitud.component';
import { SolicitudPantallasService } from '../../../../core/services/220502/solicitud-pantallas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let solicitudService: SolicitudPantallasService;
  
  beforeEach(async () => {    
    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [HttpClientTestingModule],
      providers: [
        FormBuilder,
        { 
          provide: SolicitudPantallasService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    solicitudService = TestBed.inject(SolicitudPantallasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on initialization', () => {
    expect(component.form).toBeDefined();
  });
  
  it('should call cargarDatosIniciales on ngOnInit', () => {
    spyOn(component, 'cargarDatosIniciales');
    component.ngOnInit();
    expect(component.cargarDatosIniciales).toHaveBeenCalled();
  });
  
  it('should create the form in crearFormulario', () => {
    component.crearFormulario();
    expect(component.form).toBeDefined();
  });

  it('should handle transporteSeleccionado event', () => {
    component.onTransporteSeleccionado(true);
    expect(component.mostrarSeccion).toBeTrue();

    component.onTransporteSeleccionado(false);
    expect(component.mostrarSeccion).toBeFalse();
  });
  
  it('should set mostrarSeccion when onTransporteSeleccionado is called', () => {
    component.onTransporteSeleccionado(true);
    expect(component.mostrarSeccion).toBeTrue();
    component.onTransporteSeleccionado(false);
    expect(component.mostrarSeccion).toBeFalse();
  });  
});
