import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDeLaMercaciaComponent } from './datos-de-la-mercacia.component';
import { CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@ng-mf/data-access-user';
import productoOptions from 'libs/shared/theme/assets/json/130109/producto-otions.json';
import unidadOptions from 'libs/shared/theme/assets/json/130109/unidad_da.json';
import fractionValues from 'libs/shared/theme/assets/json/130109/fraccion_arancelaria.json';

describe('DatosDeLaMercaciaComponent', () => {
  let component: DatosDeLaMercaciaComponent;
  let fixture: ComponentFixture<DatosDeLaMercaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        InputRadioComponent,
        TituloComponent,
      ],
      declarations: [DatosDeLaMercaciaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaMercaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formDelLa with default values', () => {
    expect(component.formDelLa).toBeDefined();
    expect(component.formDelLa.get('descripcion')?.value).toBe('');
    expect(component.formDelLa.get('fraccion')?.value).toBe('');
    expect(component.formDelLa.get('unidadMedida')?.value).toBe('');
    expect(component.formDelLa.get('cantidad')?.value).toBe('');
    expect(component.formDelLa.get('valorFacturaUSD')?.value).toBe('');
  });

  it('should call fetchProductoOptions on ngOnInit', () => {
    spyOn(component, 'fetchProductoOptions');
    component.ngOnInit();
    expect(component.fetchProductoOptions).toHaveBeenCalled();
  });

  it('should update selectedValue when onValueChange is called', () => {
    component.onValueChange('testValue');
    expect(component.selectedValue).toBe('testValue');
  });

  it('should set producto options and defaultSelect on fetchProductoOptions', () => {
    component.fetchProductoOptions();
    expect(component.producto).toEqual(productoOptions.options);
    expect(component.defaultSelect).toBe(productoOptions.defaultSelect);
  });

  it('should set unidadMedida to first Unidad id on fetchFraccion', () => {
    component.fetchFraccion();
    expect(component.formDelLa.get('unidadMedida')?.value).toBe(component.Unidad[0].id);
  });

  it('should reset selectedValue to Nuevo on fetchUnidad', () => {
    component.fetchUnidad();
    expect(component.selectedValue).toBe('Nuevo');
  });

  it('should validate descripcion field correctly', () => {
    const descripcion = component.formDelLa.get('descripcion');
    descripcion?.setValue('');
    expect(descripcion?.valid).toBeFalsy();
    descripcion?.setValue('short');
    expect(descripcion?.valid).toBeFalsy();
    descripcion?.setValue('valid description with sufficient length');
    expect(descripcion?.valid).toBeTruthy();
  });

  it('should validate cantidad field correctly', () => {
    const cantidad = component.formDelLa.get('cantidad');
    cantidad?.setValue('');
    expect(cantidad?.valid).toBeFalsy();
    cantidad?.setValue('invalid');
    expect(cantidad?.valid).toBeFalsy();
    cantidad?.setValue(0);
    expect(cantidad?.valid).toBeFalsy();
    cantidad?.setValue(10);
    expect(cantidad?.valid).toBeTruthy();
  });

  it('should validate valorFacturaUSD field correctly', () => {
    const valorFacturaUSD = component.formDelLa.get('valorFacturaUSD');
    valorFacturaUSD?.setValue('');
    expect(valorFacturaUSD?.valid).toBeFalsy();
    valorFacturaUSD?.setValue('invalid');
    expect(valorFacturaUSD?.valid).toBeFalsy();
    valorFacturaUSD?.setValue(0);
    expect(valorFacturaUSD?.valid).toBeFalsy();
    valorFacturaUSD?.setValue(10.5);
    expect(valorFacturaUSD?.valid).toBeTruthy();
  });

  it('should validate fraccion field correctly', () => {
    const fraccion = component.formDelLa.get('fraccion');
    fraccion?.setValue('');
    expect(fraccion?.valid).toBeFalsy();
    fraccion?.setValue('validFraccion');
    expect(fraccion?.valid).toBeTruthy();
  });

  it('should validate unidadMedida field correctly', () => {
    const unidadMedida = component.formDelLa.get('unidadMedida');
    unidadMedida?.setValue('');
    expect(unidadMedida?.valid).toBeFalsy();
    unidadMedida?.setValue('validUnidad');
    expect(unidadMedida?.valid).toBeTruthy();
  });

  it('should fetch product options correctly', () => {
    component.fetchProductoOptions();
    expect(component.producto).toEqual(productoOptions.options);
    expect(component.defaultSelect).toBe(productoOptions.defaultSelect);
  });

  it('should fetch fraccion correctly', () => {
    component.fetchFraccion();
    expect(component.selectedValue).toBe('Nuevo');
    expect(component.formDelLa.get('unidadMedida')?.value).toBe(unidadOptions[0].id);
  });

  it('should fetch unidad correctly', () => {
    component.fetchUnidad();
    expect(component.selectedValue).toBe('Nuevo');
  });
});
