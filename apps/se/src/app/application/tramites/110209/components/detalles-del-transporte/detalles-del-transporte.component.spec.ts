import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesDelTransporteComponent } from './detalles-del-transporte.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DetallesDelTransporteService } from '../../services/detalls-de-transporte/detalles-del-transporte.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Mock data for the service
const mockData = {
  tratado: 'Sistema Generalizado de Preferencias',
  paisOBloque: 'Japon',
  paisOOrigin: 'Mexico',
  paisODestino: 'Japon',
  fetchaDeExpedicion: '2025-02-25',
  fetchaDeVencimiento: '2026-02-25'
};

describe('DetallesDelTransporteComponent', () => {
  let component: DetallesDelTransporteComponent;
  let fixture: ComponentFixture<DetallesDelTransporteComponent>;
  let service: DetallesDelTransporteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, DetallesDelTransporteComponent],
      declarations: [],
      providers: [FormBuilder, DetallesDelTransporteService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesDelTransporteComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DetallesDelTransporteService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.detallesDeltransportForm;
    expect(form).toBeDefined();
    expect(form.controls['tratado'].value).toBe('');
    expect(form.controls['paisOBloque'].value).toBe('');
    expect(form.controls['paisOOrigin'].value).toBe('');
    expect(form.controls['paisODestino'].value).toBe('');
    expect(form.controls['fetchaDeExpedicion'].value).toBe('');
    expect(form.controls['fetchaDeVencimiento'].value).toBe('');
  });

  it('should call the service and patch form values', () => {
    jest.spyOn(service, 'getMedioDeTransporte').mockReturnValue(of(mockData)); // Mocking the service method

    component.getMedioDeTransporte();

    // Ensure the service was called
    expect(service.getMedioDeTransporte).toHaveBeenCalled();

    // Check if the form was patched correctly
    expect(component.detallesDeltransportForm.controls['tratado'].value).toBe(mockData.tratado);
    expect(component.detallesDeltransportForm.controls['paisOBloque'].value).toBe(mockData.paisOBloque);
    expect(component.detallesDeltransportForm.controls['paisOOrigin'].value).toBe(mockData.paisOOrigin);
    expect(component.detallesDeltransportForm.controls['paisODestino'].value).toBe(mockData.paisODestino);
    expect(component.detallesDeltransportForm.controls['fetchaDeExpedicion'].value).toBe(mockData.fetchaDeExpedicion);
    expect(component.detallesDeltransportForm.controls['fetchaDeVencimiento'].value).toBe(mockData.fetchaDeVencimiento);
  });

  it('should handle error in service call', () => {
    jest.spyOn(service, 'getMedioDeTransporte').mockReturnValue(of(null));

    component.getMedioDeTransporte();

    // Check that no data is patched in case of an error
    expect(component.detallesDeltransportForm.controls['tratado'].value).toBe('');
    expect(component.detallesDeltransportForm.controls['paisOBloque'].value).toBe('');
    expect(component.detallesDeltransportForm.controls['paisOOrigin'].value).toBe('');
    expect(component.detallesDeltransportForm.controls['paisODestino'].value).toBe('');
    expect(component.detallesDeltransportForm.controls['fetchaDeExpedicion'].value).toBe('');
    expect(component.detallesDeltransportForm.controls['fetchaDeVencimiento'].value).toBe('');
  });
});
