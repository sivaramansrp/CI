import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDeLaMercanciaComponent } from './datos-de-la-mercancia.component';
import { CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@ng-mf/data-access-user';
import productoOptions from 'libs/shared/theme/assets/json/130109/producto-otions.json';
import unidadOptions from 'libs/shared/theme/assets/json/130109/unidad_da.json';
import fraccionArancelariaOpciones from 'libs/shared/theme/assets/json/130109/fraccion_arancelaria.json';
 
describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DatosDeLaMercanciaComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        InputRadioComponent,
        TituloComponent,
        DatosDeLaMercanciaComponent,
      ],
    }).compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('should initialize formularioDatosMercancia with default values', () => {
    expect(component.formularioDatosMercancia).toBeDefined();
    expect(component.formularioDatosMercancia.get('descripcion')?.value).toBe('');
    expect(component.formularioDatosMercancia.get('fraccion')?.value).toBe('');
    expect(component.formularioDatosMercancia.get('unidadMedida')?.value).toBe('');
    expect(component.formularioDatosMercancia.get('cantidad')?.value).toBe('');
    expect(component.formularioDatosMercancia.get('valorFacturaUSD')?.value).toBe('');
  });
 
  it('should call fetchProductoOptions on ngOnInit', () => {
    spyOn(component, 'fetchProductoOptions');
    component.ngOnInit();
    expect(component.fetchProductoOptions).toHaveBeenCalled();
  });
 
  it('should update valorSeleccionado when onValueChange is called', () => {
    component.onValueChange('testValue');
    expect(component.valorSeleccionado).toBe('testValue');
  });
 
  it('should set producto options and predeterminadoSeleccionar on fetchProductoOptions', () => {
    component.fetchProductoOptions();
    expect(component.opcionesProducto).toEqual(productoOptions.opciones);
    expect(component.predeterminadoSeleccionar).toBe(productoOptions.predeterminadoSeleccionar);
  });
 
  it('should set unidadMedida to first Unidad id on fetchFraccion', () => {
    component.fetchFraccion();
    expect(component.formularioDatosMercancia.get('unidadMedida')?.value).toBe(component.unidad[0].id);
  });
 
  it('should reset valorSeleccionado to Nuevo on fetchUnidad', () => {
    component.fetchUnidad();
    expect(component.valorSeleccionado).toBe('Nuevo');
  });
 
  it('should validate descripcion field correctly', () => {
    const descripcion = component.formularioDatosMercancia.get('descripcion');
    descripcion?.setValue('');
    expect(descripcion?.valid).toBeFalsy();
    descripcion?.setValue('short');
    expect(descripcion?.valid).toBeFalsy();
    descripcion?.setValue('valid description with sufficient length');
    expect(descripcion?.valid).toBeTruthy();
  });
 
  it('should validate cantidad field correctly', () => {
    const cantidad = component.formularioDatosMercancia.get('cantidad');
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
    const valorFacturaUSD = component.formularioDatosMercancia.get('valorFacturaUSD');
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
    const fraccion = component.formularioDatosMercancia.get('fraccion');
    fraccion?.setValue('');
    expect(fraccion?.valid).toBeFalsy();
    fraccion?.setValue('validFraccion');
    expect(fraccion?.valid).toBeTruthy();
  });
 
  it('should validate unidadMedida field correctly', () => {
    const unidadMedida = component.formularioDatosMercancia.get('unidadMedida');
    unidadMedida?.setValue('');
    expect(unidadMedida?.valid).toBeFalsy();
    unidadMedida?.setValue('validUnidad');
    expect(unidadMedida?.valid).toBeTruthy();
  });
 
  it('should fetch product options correctly', () => {
    component.fetchProductoOptions();
    expect(component.opcionesProducto).toEqual(productoOptions.opciones);
    expect(component.predeterminadoSeleccionar).toBe(productoOptions.predeterminadoSeleccionar);
  });
 
  it('should fetch fraccion correctly', () => {
    component.fetchFraccion();
    expect(component.valorSeleccionado).toBe('Nuevo');
    expect(component.formularioDatosMercancia.get('unidadMedida')?.value).toBe(unidadOptions[0].id);
  });
 
  it('should fetch unidad correctly', () => {
    component.fetchUnidad();
    expect(component.valorSeleccionado).toBe('Nuevo');
  });
});