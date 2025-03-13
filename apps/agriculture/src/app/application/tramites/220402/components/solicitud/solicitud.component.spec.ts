import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [ReactiveFormsModule],
      providers: [ValidacionesFormularioService]
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
    component.datosGeneralesArr.push({});
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
