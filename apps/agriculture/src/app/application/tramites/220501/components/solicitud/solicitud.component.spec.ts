import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SolicitudComponent } from './solicitud.component';
import { SolicitudPantallasService } from '@ng-mf/data-access-user';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  
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
    expect(component.mostrarSeccion).toBe(true);

    component.onTransporteSeleccionado(false);
    expect(component.mostrarSeccion).toBe(false);
  });
  
  it('should set mostrarSeccion when onTransporteSeleccionado is called', () => {
    component.onTransporteSeleccionado(true);
    expect(component.mostrarSeccion).toBe(true);
    component.onTransporteSeleccionado(false);
    expect(component.mostrarSeccion).toBe(false);
  });  
});
