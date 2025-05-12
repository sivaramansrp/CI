import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomiciliosDePlantasComponent } from './domicilios-de-plantas.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { DomiciliosDePlantasTabla } from 'libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import DomiciliosTabla from 'libs/shared/theme/assets/json/90201/domicilios-de-plantas-tabla.json';

describe('DomiciliosDePlantasComponent', () => {
  let component: DomiciliosDePlantasComponent;
  let fixture: ComponentFixture<DomiciliosDePlantasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomiciliosDePlantasComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomiciliosDePlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values and disabled fields', () => {
    const form = component.formDomiciliosDePlantas;
    expect(form).toBeDefined();
    expect(form.get('representacionFederal')?.value).toBe('');
    expect(form.get('representacionFederal')?.disabled).toBe(true);
    expect(form.get('actividadProductiva')?.value).toBe('');
    expect(form.get('actividadProductiva')?.disabled).toBe(true);
  });

  it('should initialize the table configuration correctly', () => {
    const configuracionTabla: ConfiguracionColumna<any>[] = component.configuracionTabla;
    expect(configuracionTabla).toBeDefined();
    expect(configuracionTabla.length).toBe(7);
    expect(configuracionTabla[0].encabezado).toBe('Calle');
    expect(configuracionTabla[0].clave({ calle: 'Test Calle' })).toBe('Test Calle');
    expect(configuracionTabla[1].encabezado).toBe('Número exterior');
    expect(configuracionTabla[1].clave({ numero: '123' })).toBe('123');
  });

  it('should initialize the table data with values from DomiciliosTabla', () => {
    
    const domiciliosTabla: DomiciliosDePlantasTabla[] = component.domiciliosTabla;
    expect(domiciliosTabla).toBeDefined();
    expect(domiciliosTabla).toEqual(DomiciliosTabla);
  });

  it('should call establecerFormDomiciliosDePlantas to initialize the form', () => {
    const spy = jest.spyOn(component, 'establecerFormDomiciliosDePlantas');
    component.establecerFormDomiciliosDePlantas();
    expect(spy).toHaveBeenCalled();
    const form = component.formDomiciliosDePlantas;
    expect(form.get('representacionFederal')?.value).toBe('');
    expect(form.get('actividadProductiva')?.value).toBe('');
  });
});