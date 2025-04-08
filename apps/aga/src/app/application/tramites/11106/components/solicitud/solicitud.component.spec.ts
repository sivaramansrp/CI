import { TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, TituloComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    const fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    const initializeFormSpy = jest.spyOn(component, 'initializeSolicitudForm');
    component.ngOnInit();
    expect(initializeFormSpy).toHaveBeenCalled();
    expect(component.solicitudForm).toBeDefined();
  });

  it('should initialize the form with correct structure', () => {
    component.initializeSolicitudForm();
    expect(component.solicitudForm.contains('cancelacionDonaciones')).toBe(true);
    const cancelacionDonaciones = component.solicitudForm.get('cancelacionDonaciones') as any;
    expect(cancelacionDonaciones.contains('esAutorizacion')).toBe(true);
  });

  it('should return the cancelacionDonaciones form group', () => {
    component.initializeSolicitudForm();
    const cancelacionDonaciones = component.cancelacionDonaciones;
    expect(cancelacionDonaciones).toBe(component.solicitudForm.get('cancelacionDonaciones'));
  });

  it('should mark all fields as touched if the form is invalid', () => {
    component.initializeSolicitudForm();
    component.solicitudForm.get('cancelacionDonaciones.esAutorizacion')?.setValue('');
    component.validarDestinatarioFormulario();
    expect(component.solicitudForm.touched).toBe(true);
  });

  it('should emit continuarEvento when continuar is called', () => {
    const emitSpy = jest.spyOn(component.continuarEvento, 'emit');
    component.continuar();
    expect(emitSpy).toHaveBeenCalledWith('');
  });
});