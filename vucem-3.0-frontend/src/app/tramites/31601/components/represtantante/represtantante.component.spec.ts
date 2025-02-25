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
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ReprestantanteComponent,
        TituloComponent,
      ],
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
    expect(
      component.represtantante.get('datosImportadorExportador.resigtro')
    ).toBeDefined();
    expect(
      component.represtantante.get('datosImportadorExportador.rfc')
    ).toBeDefined();
    expect(
      component.represtantante.get('datosImportadorExportador.nombre')
    ).toBeDefined();
    expect(
      component.represtantante.get('datosImportadorExportador.apellidoPaterno')
    ).toBeDefined();
    expect(
      component.represtantante.get('datosImportadorExportador.apellidoMaterno')
    ).toBeDefined();
    expect(
      component.represtantante.get('datosImportadorExportador.telefono')
    ).toBeDefined();
    expect(
      component.represtantante.get('datosImportadorExportador.correo')
    ).toBeDefined();
  });

  it('should disable specific form controls', () => {
    const rfc = component.represtantante.get('datosImportadorExportador.rfc');
    const nombre = component.represtantante.get(
      'datosImportadorExportador.nombre'
    );
    const apellidoPaterno = component.represtantante.get(
      'datosImportadorExportador.apellidoPaterno'
    );
    const apellidoMaterno = component.represtantante.get(
      'datosImportadorExportador.apellidoMaterno'
    );

    expect(rfc?.disabled).toBeTrue();
    expect(nombre?.disabled).toBeTrue();
    expect(apellidoPaterno?.disabled).toBeTrue();
    expect(apellidoMaterno?.disabled).toBeTrue();
  });

  it('should patch form values correctly', () => {
    const representativeData = component.representativeData;

    const resigtro = component.represtantante.get(
      'datosImportadorExportador.resigtro'
    );
    const rfc = component.represtantante.get('datosImportadorExportador.rfc');
    const nombre = component.represtantante.get(
      'datosImportadorExportador.nombre'
    );
    const apellidoPaterno = component.represtantante.get(
      'datosImportadorExportador.apellidoPaterno'
    );
    const apellidoMaterno = component.represtantante.get(
      'datosImportadorExportador.apellidoMaterno'
    );
    const telefono = component.represtantante.get(
      'datosImportadorExportador.telefono'
    );
    const correo = component.represtantante.get(
      'datosImportadorExportador.correo'
    );

    expect(resigtro?.value).toBe(representativeData.resigtro);
    expect(rfc?.value).toBe(representativeData.rfc);
    expect(nombre?.value).toBe(representativeData.nombre);
    expect(apellidoPaterno?.value).toBe(representativeData.apellidoPaterno);
    expect(apellidoMaterno?.value).toBe(representativeData.apellidoMaterno);
    expect(telefono?.value).toBe(representativeData.telefono);
    expect(correo?.value).toBe(representativeData.correo);
  });

  it('should call ngOnInit and set up the form correctly', () => {
    // We are verifying that ngOnInit() was called and the patching and disabling happens
    const spyPatchValue = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();

    // Verify that patching and disabling of form fields happened correctly
    expect(spyPatchValue).toHaveBeenCalled();
    expect(
      component.represtantante.get('datosImportadorExportador.rfc')?.disabled
    ).toBeTrue();
    expect(
      component.represtantante.get('datosImportadorExportador.nombre')?.disabled
    ).toBeTrue();
    expect(
      component.represtantante.get('datosImportadorExportador.apellidoPaterno')
        ?.disabled
    ).toBeTrue();
    expect(
      component.represtantante.get('datosImportadorExportador.apellidoMaterno')
        ?.disabled
    ).toBeTrue();
  });
});
