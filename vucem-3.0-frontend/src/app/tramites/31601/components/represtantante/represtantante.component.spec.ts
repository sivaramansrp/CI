import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReprestantanteComponent } from './represtantante.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

fdescribe('ReprestantanteComponent', () => {
  let component: ReprestantanteComponent;
  let fixture: ComponentFixture<ReprestantanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule, CommonModule,ReprestantanteComponent, TituloComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ReprestantanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.represtantante).toBeDefined();
    expect(component.represtantante.get('datosImportadorExportador.resigtro')).toBeDefined();
    expect(component.represtantante.get('datosImportadorExportador.RFC')).toBeDefined();
    expect(component.represtantante.get('datosImportadorExportador.Nombre')).toBeDefined();
    expect(component.represtantante.get('datosImportadorExportador.ApellidoPaterno')).toBeDefined();
    expect(component.represtantante.get('datosImportadorExportador.ApellidoMaterno')).toBeDefined();
    expect(component.represtantante.get('datosImportadorExportador.Telefono')).toBeDefined();
    expect(component.represtantante.get('datosImportadorExportador.Correo')).toBeDefined();
  });

  it('should disable specific form controls', () => {
    const rfc = component.represtantante.get('datosImportadorExportador.RFC');
    const nombre = component.represtantante.get('datosImportadorExportador.Nombre');
    const apellidoPaterno = component.represtantante.get('datosImportadorExportador.ApellidoPaterno');
    const apellidoMaterno = component.represtantante.get('datosImportadorExportador.ApellidoMaterno');

    expect(rfc?.disabled).toBeTrue();
    expect(nombre?.disabled).toBeTrue();
    expect(apellidoPaterno?.disabled).toBeTrue();
    expect(apellidoMaterno?.disabled).toBeTrue();
  });

  it('should patch form values correctly', () => {
    const representativeData = component.representativeData;

    const resigtro = component.represtantante.get('datosImportadorExportador.resigtro');
    const RFC = component.represtantante.get('datosImportadorExportador.RFC');
    const Nombre = component.represtantante.get('datosImportadorExportador.Nombre');
    const ApellidoPaterno = component.represtantante.get('datosImportadorExportador.ApellidoPaterno');
    const ApellidoMaterno = component.represtantante.get('datosImportadorExportador.ApellidoMaterno');
    const Telefono = component.represtantante.get('datosImportadorExportador.Telefono');
    const Correo = component.represtantante.get('datosImportadorExportador.Correo');

    expect(resigtro?.value).toBe(representativeData.resigtro);
    expect(RFC?.value).toBe(representativeData.RFC);
    expect(Nombre?.value).toBe(representativeData.Nombre);
    expect(ApellidoPaterno?.value).toBe(representativeData.ApellidoPaterno);
    expect(ApellidoMaterno?.value).toBe(representativeData.ApellidoMaterno);
    expect(Telefono?.value).toBe(representativeData.Telefono);
    expect(Correo?.value).toBe(representativeData.Correo);
  });

  it('should call ngOnInit and set up the form correctly', () => {
    // We are verifying that ngOnInit() was called and the patching and disabling happens
    const spyPatchValue = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();

    // Verify that patching and disabling of form fields happened correctly
    expect(spyPatchValue).toHaveBeenCalled();
    expect(component.represtantante.get('datosImportadorExportador.RFC')?.disabled).toBeTrue();
    expect(component.represtantante.get('datosImportadorExportador.Nombre')?.disabled).toBeTrue();
    expect(component.represtantante.get('datosImportadorExportador.ApellidoPaterno')?.disabled).toBeTrue();
    expect(component.represtantante.get('datosImportadorExportador.ApellidoMaterno')?.disabled).toBeTrue();
  });

});

