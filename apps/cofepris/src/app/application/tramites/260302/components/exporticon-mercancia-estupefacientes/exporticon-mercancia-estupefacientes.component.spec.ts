import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ExporticonMercanciaEstupefacientesComponent } from './exporticon-mercancia-estupefacientes.component';
import { HttpClientModule } from '@angular/common/http';

describe('ExporticonMercanciaEstupefacientesComponent', () => {
  let component: ExporticonMercanciaEstupefacientesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,ExporticonMercanciaEstupefacientesComponent,HttpClientModule],
      declarations: [],
    }).compileComponents();

    const fixture = TestBed.createComponent(ExporticonMercanciaEstupefacientesComponent);
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
      marcaComercialDenominacion: '',
      denominacionCumonInternacional: '',
      tipoProducto: '',
      formaFarmaceutica: '',
      estadoFisico: '',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUMT: '',
      cantidadUMC: '',
      numeroCAS: '',
      cantidadDeLotes: '',
      paisDeDestino: '101',
      presentacion: '',
      usoEspecifico: '',
      paisDeProcedencia: '',
      unidadMedidaComercializacion: '',
      unidadMedidaTarifa: '',
    });
  });

 
});