import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PersonaMoralComponent } from './persona-moral.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PersonaMoralComponent', () => {
  let component: PersonaMoralComponent;
  let fixture: ComponentFixture<PersonaMoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, PersonaMoralComponent, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaMoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open the modal when "Agregar" button is clicked', () => {
    const agregarButton = fixture.debugElement.query(By.css('button[name="AgregarPME"]'));
    agregarButton.nativeElement.click();
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('#modalAgregarPME'));
    expect(modal.nativeElement.classList).toContain('show');
  });

  it('should bind form fields to personaMoralExtranjeraForm', () => {
    const denominacionInput = fixture.debugElement.query(By.css('input[formControlName="denominacionPME"]'));
    const correoInput = fixture.debugElement.query(By.css('input[formControlName="correoPME"]'));

    denominacionInput.nativeElement.value = 'Test Denomination';
    denominacionInput.nativeElement.dispatchEvent(new Event('input'));
    correoInput.nativeElement.value = 'test@example.com';
    correoInput.nativeElement.dispatchEvent(new Event('input'));

    expect(component.personaMoralExtranjeraForm.get('denominacionPME')?.value).toBe('Test Denomination');
    expect(component.personaMoralExtranjeraForm.get('correoPME')?.value).toBe('test@example.com');
  });

  it('should call agregarPME with form data when "Guardar" button is clicked', () => {
    const agregarPMESpy = jest.spyOn(component, 'agregarPME');
    component.personaMoralExtranjeraForm.setValue({
      denominacionPME: 'Test Denomination',
      correoPME: 'test@example.com',
      paisPME: '1',
      codigoPostalPME: '12345',
      ciudadPME: 'Test City',
      estadoPME: 'Test State',
      callePME: 'Test Street',
      numeroExteriorPME: '123',
      numeroInteriorPME: '456',
      nombreDG: 'John',
      apellidoPaternoDG: 'Doe',
      apellidoMaternoDG: 'Smith',
    });

    const guardarButton = fixture.debugElement.query(By.css('button[name="guardar"]'));
    guardarButton.nativeElement.click();

    expect(agregarPMESpy).toHaveBeenCalledWith(component.personaMoralExtranjeraForm.getRawValue());
  });

  it('should call limpiarDatosPME when "Limpiar" button is clicked', () => {
    const limpiarSpy = jest.spyOn(component, 'limpiarDatosPME');
    const limpiarButton = fixture.debugElement.query(By.css('button[name="limpiar"]'));
    limpiarButton.nativeElement.click();

    expect(limpiarSpy).toHaveBeenCalled();
  });

  it('should close the modal when "Cancelar" button is clicked', () => {
    const cancelarButton = fixture.debugElement.query(By.css('button[name="cancelar"]'));
    const closeModalSpy = jest.spyOn(component.closeModal.nativeElement, 'click');

    cancelarButton.nativeElement.click();
    expect(closeModalSpy).toHaveBeenCalled();
  });
});