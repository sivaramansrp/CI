import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OficioComponent } from './oficio.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BtnContinuarComponent, TituloComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { DetalleComponent } from '../detalle/detalle.component';
import { oficiodata } from 'libs/shared/theme/assets/json/140103/oficiotable.json';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

describe('OficioComponent', () => {
  let component: OficioComponent;
  let fixture: ComponentFixture<OficioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, OficioComponent, BtnContinuarComponent, TituloComponent, TablaDinamicaComponent, DetalleComponent],
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
    const assignedControl = component.OficioForm.get('oficioData.asignado');
    const amountControl = component.OficioForm.get('oficioData.monto');
    const cancelControl = component.OficioForm.get('oficioData.cancelar');
    
    expect(assignedControl?.value).toBe('2500');
    expect(amountControl?.value).toBe('-3991');
    expect(cancelControl?.value).toBe('12');
    expect(assignedControl?.disabled).toBe(true);
    expect(amountControl?.disabled).toBe(true);
  });

  it('should filter data correctly by unidadPrimaria', () => {
    const filteredData = component.filteredData;
    expect(filteredData.length).toBeGreaterThan(0);
    expect(filteredData.every(item => item.unidadPrimaria === 12)).toBe(true);
  });

  it('should update form fields and disable them in updateformfied()', () => {
    component.updateformfied();

    const assignedControl = component.OficioForm.get('oficioData.asignado');
    const amountControl = component.OficioForm.get('oficioData.monto');
    const cancelControl = component.OficioForm.get('oficioData.cancelar');

    expect(assignedControl?.value).toBe('2500');
    expect(amountControl?.value).toBe('-3991');
    expect(cancelControl?.value).toBe('12');
    expect(assignedControl?.disabled).toBe(true);
    expect(amountControl?.disabled).toBe(true);
  });

  it('should configure table columns correctly', () => {
    expect(component.configuracionTabla.length).toBeGreaterThan(0);
    expect(component.configuracionTabla[0].encabezado).toBe('Folio del oficio de certificado');
    expect(component.configuracionTabla[0].clave).toBeDefined();
  });
});
