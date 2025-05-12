import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosMercanciaEstupefacientesComponent } from './datos-mercancia-estupefacientes.component';
import { HttpClientModule } from '@angular/common/http';

describe('DatosMercanciaEstupefacientesComponent', () => {
  let component: DatosMercanciaEstupefacientesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosMercanciaEstupefacientesComponent,HttpClientModule],
      declarations: [],
    }).compileComponents();

    const fixture = TestBed.createComponent(DatosMercanciaEstupefacientesComponent);
    component = fixture.componentInstance;
    component.mercanciaFormState = {
      clasificacionProducto: '',
      especificarClasificacionProducto: '',
      marcaComercialDenominacion: '',
      denominacionCumonInternacional: '',
      tipoProducto: '',
      formaFarmaceutica:'',
      estadoFisico: '',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUmtValor: '',
      cantidadUmt: '',
      cantidadUmcValor: '',
      cantidadUmc: '',
      numeroCAS: '',
      cantidadDeLotes: '',
      kgPorLote: '',
      paisDeDestino:'',
      paisDeProcedencia: '',
      detallarUsoEspecifico:'',
      numeroDePiezasAFabricar:'',
      descripcionNumeroDePiezas:'',
      presentacion: '',
      numeroRegistroSanitario: '',
      usoEspecifico:'',
      paisOrigen:'',

    };
    component.crearMercanciaForm();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.mercanciaForm.value).toEqual({
      clasificacionProducto: '',
      especificarClasificacionProducto: '',
      marcaComercialDenominación: '', // Corrected property name
      denominacionCumonInternacional: '',
      tipoProducto: '',
      formaFarmaceutica: '',
      estadoFisico: '',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUmtValor: '',
      cantidadUmt: '',
      cantidadUmcValor: '',
      cantidadUmc: '',
      numeroCAS: '',
      cantidadDeLotes: '',
      kgPorLote: '',
      paisDeDestino: '101',
      paisDeProcedencia: '',
      detallarUsoEspecifico: '',
      nummeroDePiezasAFabricar: '', 
      descripcionNumeroDePiezas: '',
      presentacion: '',
      numeroRegistroSanitario: '',
      usoEspecifico:'',
      paisOrigen:'',
    });
  });

  it('should not add a new detail if form fields are empty', () => {
    component.mercanciaForm.patchValue({
      presentacion: '',
      numeroDePiezasAFabricar: '',
      descripcionNumeroDePiezas: '',
      numeroRegistroSanitario: '',
    });

    component.agregarDetalleMercancia();

    expect(component.detalleMercanciaDatos.length).toBe(0);
  });

 
});