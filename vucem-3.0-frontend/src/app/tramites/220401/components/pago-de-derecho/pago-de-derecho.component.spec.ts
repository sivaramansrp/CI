import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechoComponent } from './pago-de-derecho.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';

describe('PagoDeDerechoComponent', () => {
  let component: PagoDeDerechoComponent;
  let fixture: ComponentFixture<PagoDeDerechoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        SelectCatalogosComponent,
      ],
      declarations: [PagoDeDerechoComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDeDerechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct controls', () => {
    expect(component.FormSolicitud).toBeDefined();
    expect(component.FormSolicitud.get('datosImportadorExportador.exentoDePago')).toBeTruthy();
    expect(component.FormSolicitud.get('datosImportadorExportador.Justificacion')).toBeTruthy();
    expect(component.FormSolicitud.get('datosImportadorExportador.Banco')).toBeTruthy();
  });

  it('should call getJustificacion and set Justificacion correctly', () => {
    component.getJustificacion();
    expect(component.Justificacion).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ]);
  });

  it('should call getBanco and set Banco correctly', () => {
    component.getBanco();
    expect(component.Banco).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ]);
  });

  it('should update form fields when "exentoDePago" is "No"', () => {
    component.updateFormFieldsBasedOnExentoDePago('No');
    
    expect(component.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.value).toBe('454000554');
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.value).toBe('0001012A0000EX');
    expect(component.FormSolicitud.get('datosImportadorExportador.importePago')?.value).toBe('594.0');
  });

  it('should reset form fields when "exentoDePago" is not "No"', () => {
    component.updateFormFieldsBasedOnExentoDePago('Si');
    
    expect(component.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.value).toBeNull();
    expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.value).toBeNull();
    expect(component.FormSolicitud.get('datosImportadorExportador.importePago')?.value).toBeNull();
  });

  it('should handle form submission logic when "validarFormulario" is called', () => {
    spyOn(console, 'log'); // To check if the form values are logged in the console
    component.validarFormulario();
    // Assuming the form is invalid at first because no values are set
    expect(console.log).toHaveBeenCalledWith(component.FormSolicitud.value);
  });
});
