import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CombioDeModalidadComponent } from './combio-de-modalidad.component';
import { CambioModalidadService } from 'libs/shared/data-access-user/src/core/services/80208/cambio-modalidad.service';

describe('CombioDeModalidadComponent', () => {
  let component: CombioDeModalidadComponent;
  let fixture: ComponentFixture<CombioDeModalidadComponent>;
  let mockCambioModalidadService: jest.Mocked<CambioModalidadService>;

  beforeEach(async () => {
    mockCambioModalidadService = {
      getDatosSimulados: jest.fn().mockReturnValue(of(null)),
      getServiciosImmx: jest.fn().mockReturnValue(of({ code: 200, message: 'Success', data: [] })),
      getCambioDeModalidad: jest.fn().mockReturnValue(of({ cambioModalidad: { data: [] } }))
    } as unknown as jest.Mocked<CambioModalidadService>;

    await TestBed.configureTestingModule({
      declarations: [CombioDeModalidadComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CambioModalidadService, useValue: mockCambioModalidadService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombioDeModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    expect(component.cambioDeModalidadForm).toBeDefined();
    expect(component.serviciosImmxForm).toBeDefined();
  });

  it('should call getcargarDatos on ngOnInit', () => {
    const spy = jest.spyOn(component, 'getcargarDatos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call getServiciosImmx on ngOnInit', () => {
    const spy = jest.spyOn(component, 'getServiciosImmx');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call getCambioDeModalidad on ngOnInit', () => {
    const spy = jest.spyOn(component, 'getCambioDeModalidad');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should disable form controls on ngOnInit', () => {
    const spy = jest.spyOn(component, 'disableFormControls');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should toggle espectaculoServiciosImmx based on selected modalidad', () => {
    component.cambioDeModalidad = [{ id: 1, descripcion: 'SERVICIOS' }];
    component.toggleServiciosImmx(1);
    expect(component.espectaculoServiciosImmx).toBe(true);

    component.toggleServiciosImmx(2);
    expect(component.espectaculoServiciosImmx).toBe(false);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
