import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;

  let fixture: ComponentFixture<PagoDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoDeDerechosComponent, HttpClientTestingModule],
      providers: [DatosSolicitudService],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.pagoDerechosForm;
    expect(form.value).toEqual({
      claveReferencia: '',
      cadenaDependencia: '',
      llavePago: '',
      fechaPago: '',
      importePago: '',
      banco: '',
    });
  });

  it('should emit updated form values on value change', () => {
    const emitSpy = jest.spyOn(component.updatePagoDerechos, 'emit');
    const form = component.pagoDerechosForm;
    form.patchValue({ claveReferencia: '12345' });
    expect(emitSpy).toHaveBeenCalledWith({
      claveReferencia: '12345',
      cadenaDependencia: '',
      llavePago: '',
      fechaPago: '',
      importePago: '',
      banco: '',
    });
  });

  it('should reset the form when onReset is called', () => {
    const form = component.pagoDerechosForm;
    form.patchValue({ claveReferencia: '12345' });
    component.onReset();
    expect(form.value).toEqual({
      fechaPago: null,

      banco: null,
      cadenaDependencia: null,
      claveReferencia: null,

      importePago: null,
      llavePago: null,
    });
  });

  it('should update fechaPago when onFechaCambiada is called', () => {
    component.onFechaCambiada('2023-01-01');
    expect(component.pagoDerechosForm.value.fechaPago).toBe('2023-01-01');
  });
});
