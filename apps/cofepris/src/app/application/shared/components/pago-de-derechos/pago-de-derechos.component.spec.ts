import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoDeDerechosComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should run #ngOnInit()', async () => {

    component.pagoDerechoFormState = component.pagoDerechoFormState || {};
    component.pagoDerechoFormState.claveReferencia = 'claveReferencia';
    component.pagoDerechoFormState.cadenaDependencia = 'cadenaDependencia';
    component.pagoDerechoFormState.estado = 'estado';
    component.pagoDerechoFormState.llavePago = 'llavePago';
    component.pagoDerechoFormState.fechaPago = 'fechaPago';
    component.pagoDerechoFormState.importePago = 'importePago';
    component.updatePagoDerechos = component.updatePagoDerechos || {};
    component.updatePagoDerechos.emit = jest.fn();
    component.cargarDatos = jest.fn();
    component.ngOnInit();
  });

  it('should run #alReiniciar()', async () => {
    component.pagoDerechosForm = component.pagoDerechosForm || {};
    component.pagoDerechosForm.reset = jest.fn();
    component.alReiniciar();
     expect(component.pagoDerechosForm.reset).toHaveBeenCalled();
  });
});
