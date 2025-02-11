
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { DeLaMuestraComponent } from './de-la-muestra.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';


describe('DeLaMuestraComponent', () => {
  let component: DeLaMuestraComponent;
  let fixture: ComponentFixture<DeLaMuestraComponent>;
  let _fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
   
      imports: [ReactiveFormsModule,DeLaMuestraComponent,
        SelectCatalogosComponent,
        TituloComponent,
        AlertComponent],
      providers: [FormBuilder]
    });

    fixture = TestBed.createComponent(DeLaMuestraComponent);
    component = fixture.componentInstance;
    _fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.Informaciondela).toBeDefined();
    expect(component.Informaciondela.get('datosImportadorExportador.follo')).toBeTruthy();
  });

  it('should disable the follo field when "No" is selected in docSeleccionado', () => {
    component.ngOnInit();
    component.docSeleccionado({ descripcion: 'No' });
    expect(component.Informaciondela.get('datosImportadorExportador.follo')?.disabled).toBeTrue();
  });

  it('should enable the follo field when "Si" is selected in docSeleccionado', () => {
    component.ngOnInit();
    component.docSeleccionado({ descripcion: 'Si' });
    expect(component.Informaciondela.get('datosImportadorExportador.follo')?.enabled).toBeTrue();
  });

  it('should initialize mercancia data correctly', () => {
    component.ngOnInit();
    expect(component.mercancia).toBeDefined();
    expect(component.mercancia.labelNombre).toBe('¿El producto al que hace referencia a esta solicitud ha sido previamente inscrito en el registro para la toma de muestras?');
    expect(component.mercancia.catalogos.length).toBe(2);
    expect(component.mercancia.catalogos[0].descripcion).toBe('Si');
    expect(component.mercancia.catalogos[1].descripcion).toBe('No');
  });

  it('should call getMercancia on ngOnInit', () => {
    spyOn(component, 'getMercancia');
    component.ngOnInit();
    expect(component.getMercancia).toHaveBeenCalled();
  });

});
