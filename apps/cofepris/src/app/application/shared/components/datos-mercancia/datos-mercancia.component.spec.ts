import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaComponent } from './datos-mercancia.component';

describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosMercanciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form with default values', () => {
    expect(component.mercanciaForm).toBeDefined();
    expect(component.mercanciaForm.value).toEqual({
      clasificacionProducto: null,
      especificarClasificacionProducto: null,
      denominacionEspecificaProducto: null,
      denominacionDistintiva: null,
      denominacionComun: null,
      tipoProducto: null,
      formaFarmaceutica: null,
      estadoFisico: null,
      fraccionArancelaria: null,
      descripcionFraccion: null,
      cantidadUmtValor: null,
      cantidadUmt: null,
      cantidadUmcValor: null,
      cantidadUmc: null,
      presentacion: null,
      numeroRegistroSanitario: null,
      fechaCaducidad: null,
      paisDeOriginDatos: [],
      paisDeProcedenciaDatos: [],
    });
  });

  it('should toggle paisDeOriginColapsable when mostrarColapsable is called with 1', () => {
    component.paisDeOriginColapsable = false;
    component.mostrarColapsable(1);
    expect(component.paisDeOriginColapsable).toBe(true);
  });

  it('should toggle paisDeProcedenciaColapsable when mostrarColapsable is called with 2', () => {
    component.paisDeProcedenciaColapsable = false;
    component.mostrarColapsable(2);
    expect(component.paisDeProcedenciaColapsable).toBe(true);
  });

  it('should toggle usoEspesificoColapsable when mostrarColapsable is called with 3', () => {
    component.usoEspesificoColapsable = false;
    component.mostrarColapsable(3);
    expect(component.usoEspesificoColapsable).toBe(true);
  });

  it('should emit mercanciaSeleccionado when agregarMercancia is called', () => {
    spyOn(component.mercanciaSeleccionado, 'emit');
    component.mercanciaForm.patchValue({ clasificacionProducto: 'test' });
    component.agregarMercancia();
    expect(component.mercanciaSeleccionado.emit).toHaveBeenCalledWith(component.mercanciaForm.value);
  });

  it('should reset the form when limpiarMercancia is called', () => {
    component.mercanciaForm.patchValue({ clasificacionProducto: 'test' });
    component.limpiarMercancia();
    expect(component.mercanciaForm.value.clasificacionProducto).toBeNull();
  });

  it('should navigate back when cancelar is called', () => {
    const locationSpy = spyOn(component['ubicaccion'], 'back');
    component.cancelar();
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should update seleccionadasPaisDeOriginDatos and patch the form when paisDeOriginSeleccionadasChange is called', () => {
    const selectedCountries = ['Country1', 'Country2'];
    component.paisDeOriginSeleccionadasChange(selectedCountries);
    expect(component.seleccionadasPaisDeOriginDatos).toEqual(selectedCountries);
    expect(component.mercanciaForm.value.paisDeOriginDatos).toEqual(selectedCountries);
  });

  it('should update seleccionadasPaisDeProcedenciaDatos and patch the form when paisDeProcedenciaSeleccionadasChange is called', () => {
    const selectedCountries = ['Country1', 'Country2'];
    component.paisDeProcedenciaSeleccionadasChange(selectedCountries);
    expect(component.seleccionadasPaisDeProcedenciaDatos).toEqual(selectedCountries);
    expect(component.mercanciaForm.value.paisDeProcedenciaDatos).toEqual(selectedCountries);
  });

  it('should update seleccionadasUsoEspesificoDatos and patch the form when usoEspesificoSeleccionadasChange is called', () => {
    const selectedUsos = ['Uso1', 'Uso2'];
    component.usoEspesificoSeleccionadasChange(selectedUsos);
    expect(component.seleccionadasUsoEspesificoDatos).toEqual(selectedUsos);
    expect(component.mercanciaForm.value.usoEspecifico).toEqual(selectedUsos);
  });
});
