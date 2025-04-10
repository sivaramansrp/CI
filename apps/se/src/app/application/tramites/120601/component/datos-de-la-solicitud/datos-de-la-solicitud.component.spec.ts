import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
      declarations: [DatosDeLaSolicitudComponent],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form correctly', () => {
    expect(component.solicitudForm).toBeDefined();
    expect(component.solicitudForm.controls['tipoDeEmpresa']).toBeDefined();
    expect(component.solicitudForm.controls['actividadEconomicaClave']).toBeDefined();
  });
  
  it('should validate that tipoDeEmpresa is required', () => {
    const CONTROL = component.solicitudForm.controls['tipoDeEmpresa'];
    
    CONTROL.setValue('');
    expect(CONTROL.valid).toBeFalsy();
  });
  
  it('should validate that denominacionExposicion has a max length of 120 characters', () => {
    const CONTROL = component.solicitudForm.controls['denominacionExposicion'];
    CONTROL.setValue('a'.repeat(121)); // More than 120 characters
    expect(CONTROL.valid).toBeFalsy();
  });
  

  it('should fetch the list of company types correctly', () => {
    component.getTipoDeEmpresa();
    expect(component.tipoDeEmpresa.length).toBeGreaterThan(0);
    expect(component.tipoDeEmpresa).toEqual([
      { id: 1, descripcion: 'SINALOA' },
      { id: 2, descripcion: 'Opción 1' }
    ]);
  });
});
