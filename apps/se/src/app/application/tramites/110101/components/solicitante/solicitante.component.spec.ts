import { ComponentFixture, TestBed } from '@angular/core/testing';
// import mockData from '../../../../../assets/json/110101/solicitante-mockdata.json';
import mockData from 'libs/shared/theme/assets/json/110101/solicitante-mockdata.json';

import { Tramite110101Store } from '../../estados/tramites/solicitante110101.store';

import { SolicitanteComponent } from './solicitante.component';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

fdescribe('SolicitanteComponent', () => {
  let component: SolicitanteComponent;
  let fixture: ComponentFixture<SolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // REMOVE declarations array since it's a standalone component
      imports: [SolicitanteComponent, ReactiveFormsModule], // ADD it here instead
      providers: [FormBuilder],
    })
    .compileComponents();
    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with mockData values', () => {
    expect(component.solicitudForm.value).toEqual({
      rfc: mockData.rfc,
      denominacion: mockData.denominacion,
      actividadEconomica: mockData.actividadEconomica,
      correoElectronico: mockData.correoElectronico
    });
  });

  it('should set form values from mockData', () => {
    component.setFormValues();
    expect(component.solicitudForm.get('rfc')?.value).toBe(mockData.rfc);
    expect(component.solicitudForm.get('denominacion')?.value).toBe(mockData.denominacion);
    expect(component.solicitudForm.get('actividadEconomica')?.value).toBe(mockData.actividadEconomica);
    expect(component.solicitudForm.get('correoElectronico')?.value).toBe(mockData.correoElectronico);
  });

  it('should render form fields as readonly', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#rfc').readOnly).toBeTruthy();
    expect(compiled.querySelector('#denominacion').readOnly).toBeTruthy();
    expect(compiled.querySelector('#actividad-economica').readOnly).toBeTruthy();
    expect(compiled.querySelector('#correo-electronico').readOnly).toBeTruthy();
  });

  it('should update the store with form values', () => {
    // Arrange: Set form values
    component.solicitudForm.setValue({
      rfc: 'TEST123456789',
      denominacion: 'Test Denominacion',
      actividadEconomica: 'Test Actividad',
      correoElectronico: 'test@example.com',
    });
  
    // Act: Call the updateStore method
    component['updateStore']();
  
    // Assert: Verify that the store methods are called with the correct values
    const store = TestBed.inject(Tramite110101Store);
    expect(store.setRfc).toHaveBeenCalledWith('TEST123456789');
    expect(store.setDenominacion).toHaveBeenCalledWith('Test Denominacion');
    expect(store.setActividadEconomica).toHaveBeenCalledWith('Test Actividad');
    expect(store.setCorreoElectronico).toHaveBeenCalledWith('test@example.com');
  });
});
