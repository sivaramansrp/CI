import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevolverComponent } from './devolver.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';


describe('DevolverComponent', () => {
  let component: DevolverComponent;
  let fixture: ComponentFixture<DevolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TituloComponent,
        TablaDinamicaComponent,
        FormsModule,
        ReactiveFormsModule,
        DevolverComponent
      ],
      declarations: [],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize facturas and facturase arrays with data from the JSON', () => {
    expect(component.facturas).toBeDefined();
    expect(component.facturas.length).toBeGreaterThan(0);
  });

  it('should initialize the form with the correct controls', () => {
    expect(component.DevolverForm).toBeTruthy();
    expect(component.DevolverForm instanceof FormGroup).toBe(true);
    expect(component.DevolverForm.get('DevolverData')).toBeTruthy();
    expect(component.DevolverForm.get('DevolverData.folio')).toBeTruthy();
    expect(component.DevolverForm.get('DevolverData.cantidad')).toBeTruthy();
    expect(component.DevolverForm.get('DevolverData.cantidad')?.hasValidator(Validators.required)).toBe(true);
  });

  it('should disable form controls after calling updateformfied()', () => {
    component.updateformfied();

    const folioControl = component.DevolverForm.get('DevolverData.folio');
    const disponibleControl = component.DevolverForm.get('DevolverData.disponible');
    const totalControl = component.DevolverForm.get('DevolverData.total');
    const cuadradosControl = component.DevolverForm.get('DevolverData.cuadrados');

    expect(folioControl?.disabled).toBe(true);
    expect(disponibleControl?.disabled).toBe(true);
    expect(totalControl?.disabled).toBe(true);
    expect(cuadradosControl?.disabled).toBe(true);
  });

  it('should set form values correctly in updateformfied()', () => {
    component.updateformfied();

    const folioControl = component.DevolverForm.get('DevolverData.folio');
    const disponibleControl = component.DevolverForm.get('DevolverData.disponible');
    const totalControl = component.DevolverForm.get('DevolverData.total');
    const cuadradosControl = component.DevolverForm.get('DevolverData.cuadrados');

    expect(folioControl?.value).toBe('4MX216520');
    expect(disponibleControl?.value).toBe('12');
    expect(totalControl?.value).toBe('12');
    expect(cuadradosControl?.value).toBe('133');
  });

 
});
