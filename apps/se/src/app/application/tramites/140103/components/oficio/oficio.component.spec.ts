import { BtnContinuarComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DetalleComponent } from '../detalle/detalle.component';
import { OficioComponent } from './oficio.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OficioComponent', () => {
  let component: OficioComponent;
  let fixture: ComponentFixture<OficioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, HttpClientTestingModule, OficioComponent, BtnContinuarComponent, TituloComponent, TablaDinamicaComponent, DetalleComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(OficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize form', () => {
    expect(component).toBeTruthy();
    expect(component.OficioForm).toBeDefined();
  });

  it('should initialize the form with default values', () => {
    const ASSIGNED_CONTROL = component.OficioForm.get('oficioData.asignado');
    const AMOUNT_CONTROL = component.OficioForm.get('oficioData.monto');
    const CANCEL_CONTROL = component.OficioForm.get('oficioData.cancelar');
    
    expect(ASSIGNED_CONTROL?.value).toBe('2500');
    expect(AMOUNT_CONTROL?.value).toBe('-3991');
    expect(CANCEL_CONTROL?.value).toBe('12');
    expect(ASSIGNED_CONTROL?.disabled).toBe(true);
    expect(AMOUNT_CONTROL?.disabled).toBe(true);
  });

  it('should filter data correctly by unidadPrimaria', () => {
    const FILTERED_DATA = component.filteredData;
    expect(FILTERED_DATA.length).toBeGreaterThan(0);
    expect(FILTERED_DATA.every(item => item.unidadPrimaria === 12)).toBe(true);
  });

  it('should update form fields and disable them in updateformfied()', () => {
    component.updateformfied();

    const ASSIGNED_CONTROL = component.OficioForm.get('oficioData.asignado');
    const AMOUNT_CONTROL = component.OficioForm.get('oficioData.monto');
    const CANCEL_CONTROL = component.OficioForm.get('oficioData.cancelar');

    expect(ASSIGNED_CONTROL?.value).toBe('2500');
    expect(AMOUNT_CONTROL?.value).toBe('-3991');
    expect(CANCEL_CONTROL?.value).toBe('12');
    expect(ASSIGNED_CONTROL?.disabled).toBe(true);
    expect(AMOUNT_CONTROL?.disabled).toBe(true);
  });

  it('should configure table columns correctly', () => {
    expect(component.configuracionTabla.length).toBeGreaterThan(0);
    expect(component.configuracionTabla[0].encabezado).toBe('Folio del oficio de certificado');
    expect(component.configuracionTabla[0].clave).toBeDefined();
  });
});
