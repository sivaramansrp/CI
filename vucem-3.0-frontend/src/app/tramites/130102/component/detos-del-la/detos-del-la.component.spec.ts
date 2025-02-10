import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DetosDelLaComponent } from './detos-del-la.component';

describe('DetosDelLaComponent', () => {
  let component: DetosDelLaComponent;
  let fixture: ComponentFixture<DetosDelLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetosDelLaComponent,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetosDelLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('descripcion')?.value).toBe('');
  });

  it('should mark description as invalid if empty', () => {
    const descripcion = component.form.get('descripcion');
    descripcion?.setValue('');
    expect(descripcion?.valid).toBeFalsy();
  });

  it('should mark description as valid if it meets requirements', () => {
    const descripcion = component.form.get('descripcion');
    descripcion?.setValue('Valid Description');
    expect(descripcion?.valid).toBeTruthy();
  });

  it('should update selectedValue when onValueChange is called', () => {
    component.onValueChange('Updated Value');
    expect(component.selectedValue).toBe('Updated Value');
  });

  it('should fetch product options', () => {
    spyOn(component['http'], 'get').and.callThrough();
    component.fetchProductoOptions();
    expect(component['http'].get).toHaveBeenCalledWith('/assets/json/130102/producto-otions.json');
  });

  it('should fetch unidad data', () => {
    spyOn(component['http'], 'get').and.callThrough();
    component.fetchUnidadDe();
    expect(component['http'].get).toHaveBeenCalledWith('/assets/json/130102/unidad_da.json');
  });

  it('should fetch fraccion data', () => {
    spyOn(component['http'], 'get').and.callThrough();
    component.fetchFraccionarOptions();
    expect(component['http'].get).toHaveBeenCalledWith('/assets/json/130102/fraccion_arancelaria.json');
  });
});
