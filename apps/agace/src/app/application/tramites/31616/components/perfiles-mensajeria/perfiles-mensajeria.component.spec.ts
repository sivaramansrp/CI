import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PerfilesMensajeriaComponent } from './perfiles-mensajeria.component';

describe('PerfilesMensajeriaComponent', () => {
  let component: PerfilesMensajeriaComponent;
  let fixture: ComponentFixture<PerfilesMensajeriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilesMensajeriaComponent,ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilesMensajeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formValues = component.profileForm.value;
    expect(formValues).toEqual({
      domicilio: '',
      antiguedad: '',
      productos: '',
      embarquesExp: '',
      embarquesImp: '',
      empleados: '',
      superficie: '',
      nombre: '',
      categoria: '',
      vigencia: '',
      nombre2: '',
      categoria2: '',
      vigencia2: '',
      nombre3: '',
      categoria3: '',
      vigencia3: '',
    });
  });

  it('should toggle mostrarContenido when alternarContenido is called', () => {
    expect(component.mostrarContenido).toBe(false);
    component.alternarContenido();
    expect(component.mostrarContenido).toBe(true);
    component.alternarContenido();
    expect(component.mostrarContenido).toBe(false);
  });

  it('should toggle mostrarSeguridad when alternarSeguridad is called', () => {
    expect(component.mostrarSeguridad).toBe(false);
    component.alternarSeguridad();
    expect(component.mostrarSeguridad).toBe(true);
    component.alternarSeguridad();
    expect(component.mostrarSeguridad).toBe(false);
  });

  it('should toggle mostrarAccesoFisico when alternarAccesoFisico is called', () => {
    expect(component.mostrarAccesoFisico).toBe(false);
    component.alternarAccesoFisico();
    expect(component.mostrarAccesoFisico).toBe(true);
    component.alternarAccesoFisico();
    expect(component.mostrarAccesoFisico).toBe(false);
  });

  it('should toggle mostrarSociosComeciales when alternarSociosComerciales is called', () => {
    expect(component.mostrarSociosComeciales).toBe(false);
    component.alternarSociosComerciales();
    expect(component.mostrarSociosComeciales).toBe(true);
    component.alternarSociosComerciales();
    expect(component.mostrarSociosComeciales).toBe(false);
  });

  it('should toggle mostrarSeguridadProcesos when alternarSeguridadProcesos is called', () => {
    expect(component.mostrarSeguridadProcesos).toBe(false);
    component.alternarSeguridadProcesos();
    expect(component.mostrarSeguridadProcesos).toBe(true);
    component.alternarSeguridadProcesos();
    expect(component.mostrarSeguridadProcesos).toBe(false);
  });

  it('should toggle mostrarGestionAduanera when alternarGestionAduanera is called', () => {
    expect(component.mostrarGestionAduanera).toBe(false);
    component.alternarGestionAduanera();
    expect(component.mostrarGestionAduanera).toBe(true);
    component.alternarGestionAduanera();
    expect(component.mostrarGestionAduanera).toBe(false);
  });

  it('should toggle mostrarSeguridadVehiculos when alternarSeguridadVehiculos is called', () => {
    expect(component.mostrarSeguridadVehiculos).toBe(false);
    component.alternarSeguridadVehiculos();
    expect(component.mostrarSeguridadVehiculos).toBe(true);
    component.alternarSeguridadVehiculos();
    expect(component.mostrarSeguridadVehiculos).toBe(false);
  });

  it('should toggle mostrarSeguridadPersonal when alternarSeguridadPersonal is called', () => {
    expect(component.mostrarSeguridadPersonal).toBe(false);
    component.alternarSeguridadPersonal();
    expect(component.mostrarSeguridadPersonal).toBe(true);
    component.alternarSeguridadPersonal();
    expect(component.mostrarSeguridadPersonal).toBe(false);
  });

  it('should toggle mostrarSeguridadInformacion when alternarSeguridadInformacion is called', () => {
    expect(component.mostrarSeguridadInformacion).toBe(false);
    component.alternarSeguridadInformacion();
    expect(component.mostrarSeguridadInformacion).toBe(true);
    component.alternarSeguridadInformacion();
    expect(component.mostrarSeguridadInformacion).toBe(false);
  });

  it('should toggle mostrarCapacitacionSeguridad when alternarCapacitacionSeguridad is called', () => {
    expect(component.mostrarCapacitacionSeguridad).toBe(false);
    component.alternarCapacitacionSeguridad();
    expect(component.mostrarCapacitacionSeguridad).toBe(true);
    component.alternarCapacitacionSeguridad();
    expect(component.mostrarCapacitacionSeguridad).toBe(false);
  });

  it('should toggle mostrarManejoInvestigacion when alternarManejoInvestigacion is called', () => {
    expect(component.mostrarManejoInvestigacion).toBe(false);
    component.alternarManejoInvestigacion();
    expect(component.mostrarManejoInvestigacion).toBe(true);
    component.alternarManejoInvestigacion();
    expect(component.mostrarManejoInvestigacion).toBe(false);
  });
});