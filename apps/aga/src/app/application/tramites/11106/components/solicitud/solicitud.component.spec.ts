import { TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, SolicitudComponent],
      providers: [FormBuilder],
    }).compileComponents();

    const fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario en ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
    expect(component.solicitudForm.get('cancelacionDonaciones')).toBeDefined();
    expect(
      component.solicitudForm.get('cancelacionDonaciones.esAutorizacion')
    ).toBeDefined();
  });

  it('debería establecer los valores iniciales del formulario en setFormValues', () => {
    component.ngOnInit();
    component.setFormValues();
    const valorEsAutorizacion = component.solicitudForm
      .get('cancelacionDonaciones')
      ?.get('esAutorizacion')?.value;
    expect(valorEsAutorizacion).toBe('ES_AUTORIZACION'); // Reemplazar con el valor real de `SOLICITUD.ES_AUTORIZACION`
  });

  it('debería devolver el grupo de formulario cancelacionDonaciones', () => {
    component.ngOnInit();
    const cancelacionDonaciones = component.cancelacionDonaciones;
    expect(cancelacionDonaciones).toBe(
      component.solicitudForm.get('cancelacionDonaciones')
    );
  });

  it('debería marcar todos los campos como tocados si el formulario es inválido', () => {
    component.ngOnInit();
    // Establecer el formulario en un estado inválido
    component.solicitudForm
      .get('cancelacionDonaciones.esAutorizacion')
      ?.setValue('');
    component.solicitudForm
      .get('cancelacionDonaciones.esAutorizacion')
      ?.setValidators(() => ({ required: true }));
    component.solicitudForm.updateValueAndValidity();

    component.validarDestinatarioFormulario();

    expect(component.solicitudForm.get('cancelacionDonaciones')?.touched).toBe(
      true
    );
    expect(
      component.solicitudForm.get('cancelacionDonaciones.esAutorizacion')
        ?.touched
    ).toBe(true);
  });

  it('debería emitir continuarEvento cuando se llame a continuar', () => {
    const emitSpy = jest.spyOn(component.continuarEvento, 'emit');
    component.continuar();
    expect(emitSpy).toHaveBeenCalledWith('');
  });
});
