import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { CatalogoSelectComponent, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { provideHttpClient } from '@angular/common/http';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, FormsModule],
      providers: [ValidacionesFormularioService, provideHttpClient(),]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on component init', () => {
    expect(component.FormSolicitud).toBeDefined();
  });

  it('should add a new item to datosGeneralesArr when mercanciaAgregar is called', () => {
    component.datosGeneralesArr = [];
    const initialLength = component.datosGeneralesArr.length;
    component.mercanciaAgregar();
    expect(component.datosGeneralesArr.length).toBe(initialLength + 1);
  });

  it('should toggle mercanciaCollapsable when mercancia_colapsable is called', () => {
    const initialState = component.mercanciaCollapsable;
    component.mercanciaColapsable();
    expect(component.mercanciaCollapsable).toBe(!initialState);
  });

  it('should remove an item from datosGeneralesArr when mercancia_borrar is called', () => {
    component.datosGeneralesArr = [];
    component.datosGeneralesArr.push({
      "UMC": "2",
      "UMT": "valor ficticio",
      "USO": "2",
      "cantidadUMC": "valor ficticio",
      "cantidadUMT": "valor ficticio",
      "descdelaFraccion": "valor ficticio",
      "entidadFederativadeOrigen": "2",
      "fraccionArancelaria": "valor ficticio",
      "marcasDistintivas": "valor ficticio",
      "municipiodeOrigen": [
        "Municipio 2"
      ],
      "paisdeOrigen": "3"
    });
    const initialLength = component.datosGeneralesArr.length;
    component.mercanciaBorrar(0);
    expect(component.datosGeneralesArr.length).toBe(initialLength - 1);
  });

  it('should add a municipality to origenArr when municipioAgregar is called', () => {
    component.datosGenerales.get('entidadFederativadeOrigen')?.setValue('Test Entity');
    component.datosGenerales.get('municipiodeOrigen')?.setValue(['Test Municipality']);
    component.municipioAgregar();
    expect(component.origenArr.length).toBe(1);
  });

  it('should remove a municipality from origenArr when municipioEliminar is called', () => {
    component.origenArr = ['Test Municipality'];
    component.datosGenerales.get('municipiodeOrigen')?.setValue('Test Municipality');
    component.municipioEliminar();
    expect(component.origenArr.length).toBe(0);
  });
});
