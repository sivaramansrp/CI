import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder,FormGroup,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevolverComponent } from './devolver.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';


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

    const FOLIOCONTROL = component.DevolverForm.get('DevolverData.folio');
    const DISPONSIBLECONTROL = component.DevolverForm.get('DevolverData.disponible');
    const TOTALCONTROL = component.DevolverForm.get('DevolverData.total');
    const CUADRADOS_CONTROL = component.DevolverForm.get('DevolverData.cuadrados');

    expect(FOLIOCONTROL?.disabled).toBe(true);
    expect(DISPONSIBLECONTROL?.disabled).toBe(true);
    expect(TOTALCONTROL?.disabled).toBe(true);
    expect(CUADRADOS_CONTROL?.disabled).toBe(true);
  });

  it('should set form values correctly in updateformfied()', () => {
    component.updateformfied();

    const FOLIOCONTROL = component.DevolverForm.get('DevolverData.folio');
    const DISPONSIBLECONTROL = component.DevolverForm.get('DevolverData.disponible');
    const TOTALCONTROL = component.DevolverForm.get('DevolverData.total');
    const CUADRADOS_CONTROL = component.DevolverForm.get('DevolverData.cuadrados');

    expect(FOLIOCONTROL?.value).toBe('4MX216520');
    expect(DISPONSIBLECONTROL?.value).toBe('12');
    expect(TOTALCONTROL?.value).toBe('12');
    expect(CUADRADOS_CONTROL?.value).toBe('133');
  });

 
});
