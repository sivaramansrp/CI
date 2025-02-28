import { CommonModule } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
 
import { DatosDeLaMercanciaComponent } from './datos-de-la-mercancia.component';

import { TituloComponent } from '@ng-mf/data-access-user';

describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DatosDeLaMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        DatosDeLaMercanciaComponent,
        ReactiveFormsModule,
        CommonModule,
        TituloComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.datosDeLamercanciaFrom).toBeDefined();
    expect(component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.value).toBe('');
    expect(component.datosDeLamercanciaFrom.get('solicitud.idSolicitud')?.value).toBeNull();
    expect(component.datosDeLamercanciaFrom.get('solicitud.idSolicitudProductor')?.value).toBe('');
  });

  it('should return true if a control is invalid', () => {
    const CONTROL_NAME = 'cveRegistroProductor';
    component.datosDeLamercanciaFrom.get(CONTROL_NAME)?.markAsTouched();
    component.datosDeLamercanciaFrom.get(CONTROL_NAME)?.setValue('');
    expect(component.esInvalido(CONTROL_NAME)).toBe(true);
  });

  it('should return false if a control is valid', () => {
    const CONTROL_NAME = 'cveRegistroProductor';
    component.datosDeLamercanciaFrom.get(CONTROL_NAME)?.markAsTouched();
    component.datosDeLamercanciaFrom.get(CONTROL_NAME)?.setValue('valid value');
    expect(component.esInvalido(CONTROL_NAME)).toBe(false);
  });

  it('should enable cveRegistroProductor if idSolicitud is null', () => {
    component.datosDeLamercanciaFrom.get('solicitud.idSolicitud')?.setValue(null);
    component.actualizaGridComercializadoresProductos();
    expect(component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.enabled).toBe(true);
  });

  it('should disable cveRegistroProductor if idSolicitud is not null', () => {
    component.datosDeLamercanciaFrom.get('solicitud.idSolicitud')?.setValue(1);
    component.actualizaGridComercializadoresProductos();
    expect(component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.disabled).toBe(true);
  });
});