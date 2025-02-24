import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CambioDeModalidadComponent } from './cambio-de-modalidad.component';
import { CambioModalidadService } from '../../../../core/services/80208/cambio-modalidad.service';

describe('CambioDeModalidadComponent', () => {
  let component: CambioDeModalidadComponent;
  let fixture: ComponentFixture<CambioDeModalidadComponent>;
  let mockCambioModalidadService: jasmine.SpyObj<CambioModalidadService>;

  beforeEach(async () => {
    mockCambioModalidadService = jasmine.createSpyObj('CambioModalidadService', ['getDatosSimulados', 'getServiciosImmx', 'getCambioDeModalidad']);
    mockCambioModalidadService.getDatosSimulados.and.returnValue(of(null));
    mockCambioModalidadService.getServiciosImmx.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    mockCambioModalidadService.getCambioDeModalidad.and.returnValue(of({ cambioModalidad: { data: [] } }));

    await TestBed.configureTestingModule({
      declarations: [CambioDeModalidadComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CambioModalidadService, useValue: mockCambioModalidadService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambioDeModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.cambioDeModalidadForm).toBeDefined();
    expect(component.serviciosImmxForm).toBeDefined();
  });

  it('should call getcargarDatos on ngOnInit', () => {
    spyOn(component, 'getcargarDatos');
    component.ngOnInit();
    expect(component.getcargarDatos).toHaveBeenCalled();
  });

  it('should call getServiciosImmx on ngOnInit', () => {
    spyOn(component, 'getServiciosImmx');
    component.ngOnInit();
    expect(component.getServiciosImmx).toHaveBeenCalled();
  });

  it('should call getCambioDeModalidad on ngOnInit', () => {
    spyOn(component, 'getCambioDeModalidad');
    component.ngOnInit();
    expect(component.getCambioDeModalidad).toHaveBeenCalled();
  });

  it('should disable form controls on ngOnInit', () => {
    spyOn(component, 'disableFormControls');
    component.ngOnInit();
    expect(component.disableFormControls).toHaveBeenCalled();
  });

  it('should toggle espectaculoServiciosImmx based on selected id', () => {
    component.cambioDeModalidad = [{ id: 1, descripcion: 'SERVICIOS' }];
    component.toggleServiciosImmx(1);
    expect(component.espectaculoServiciosImmx).toBeTrue();

    component.toggleServiciosImmx(2);
    expect(component.espectaculoServiciosImmx).toBeFalse();
  });

  it('should call toggleServiciosImmx on dropdown select', () => {
    spyOn(component, 'toggleServiciosImmx');
    component.onDropdownSelect({ id: 1 });
    expect(component.toggleServiciosImmx).toHaveBeenCalledWith(1);
  });
});
