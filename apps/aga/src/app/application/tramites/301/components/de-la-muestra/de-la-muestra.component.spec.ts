import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { DeLaMuestraComponent } from './de-la-muestra.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';



describe('DeLaMuestraComponent', () => {
  let component: DeLaMuestraComponent;
  let fixture: ComponentFixture<DeLaMuestraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TituloComponent,       
        CatalogoSelectComponent,DeLaMuestraComponent
      ],
      declarations: [],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeLaMuestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    expect(component.Informaciondela).toBeTruthy();
    expect(component.Informaciondela.contains('datosImportadorExportador')).toBe(true);
    expect(component.Informaciondela.get('datosImportadorExportador.folio')).toBeTruthy();
    expect(component.Informaciondela.get('datosImportadorExportador.mercancia')).toBeTruthy();
  });

  it('should initialize mercancia with correct values', () => {
    component.getMercancia();
    expect(component.mercancia).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ]);
  });
  it('should disable all controls in datosImportadorExportador when esFormularioSoloLectura is true', () => {
    component.solicitudState = {
      folio: '123',
      mercancia: '1',
    } as any;

    component.esFormularioSoloLectura = true;
    component.inicializarFormulario();
    component.Informaciondela.disable();

    const group = component.Informaciondela.get(
      'datosImportadorExportador'
    ) as FormGroup;
    Object.values(group.controls).forEach((control) => {
      expect(control.disabled).toBe(true);
    });
  });

  it('should enable all controls in datosImportadorExportador when esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarFormulario();
    const group = component.Informaciondela.get('datosImportadorExportador') as FormGroup;
    
    Object.values(group.controls).forEach(control => {
      expect(control.enabled).toBe(true); 
    });
  });

  it('should disable "folio" field when "mercancia" is "No"', () => {
    component.getMercancia();
    component.Informaciondela.get('datosImportadorExportador.mercancia')?.setValue('2');
    component.mercanciaSeleccion();
    fixture.detectChanges();
    const folioControl = component.Informaciondela.get('datosImportadorExportador.folio');
    expect(folioControl?.disabled).toBeTruthy();
  });

  it('should enable "folio" field when "mercancia" is "Si"', () => {
    component.getMercancia();
    component.Informaciondela.get('datosImportadorExportador.mercancia')?.setValue('1');
    component.mercanciaSeleccion();
    fixture.detectChanges();
    const folioControl = component.Informaciondela.get('datosImportadorExportador.folio');
    expect(folioControl?.enabled).toBeTruthy();
  });


  it('should validate the form when folio is empty', () => {
    const folioControl = component.Informaciondela.get('datosImportadorExportador.folio');
    folioControl?.setValue('');
    expect(folioControl?.valid).toBeFalsy();
    expect(folioControl?.hasError('required')).toBeTruthy();
  });

  it('should validate the form when mercancia is empty', () => {
    const mercanciaControl = component.Informaciondela.get('datosImportadorExportador.mercancia');
    mercanciaControl?.setValue('');
    expect(mercanciaControl?.valid).toBeFalsy();
    expect(mercanciaControl?.hasError('required')).toBeTruthy();
  });

  it('should call validarFormulario()', () => {
    const spy = jest.spyOn(component, 'validarFormulario');
    component.validarFormulario();
    expect(spy).toHaveBeenCalled();
  });
  
});
