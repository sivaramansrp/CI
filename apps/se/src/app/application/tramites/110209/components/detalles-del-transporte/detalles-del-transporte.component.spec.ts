import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesDelTransporteComponent } from './detalles-del-transporte.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DetallesDelTransporteService } from '../../services/detalls-de-transporte/detalles-del-transporte.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const TRATADO = 'Tratado X';
const PAIS_O_BLOQUE = 'Bloque Y';
const PAIS_O_ORIGIN = 'País Origen';
const PAIS_O_DESTINO = 'País Destino';
const FECHA_DE_EXPEDICION = '2024-01-01';
const FECHA_DE_VENCIMIENTO = '2025-01-01';

describe('DetallesDelTransporteComponent', () => {
  let component: DetallesDelTransporteComponent;
  let fixture: ComponentFixture<DetallesDelTransporteComponent>;
  let serviceMock: any;

  beforeEach(async () => {
    serviceMock = {
      getMedioDeTransporte: jest.fn().mockReturnValue(of({
        tratado: TRATADO,
        paisOBloque: PAIS_O_BLOQUE,
        paisOOrigin: PAIS_O_ORIGIN,
        paisODestino: PAIS_O_DESTINO,
        fetchaDeExpedicion: FECHA_DE_EXPEDICION,
        fetchaDeVencimiento: FECHA_DE_VENCIMIENTO
      }))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DetallesDelTransporteComponent],
      providers: [
        FormBuilder,
        { provide: DetallesDelTransporteService, useValue: serviceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesDelTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario correctamente', () => {
    expect(component.detallesDelTransporteForm).toBeDefined();
    expect(component.detallesDelTransporteForm.get('tratado')).toBeDefined();
    expect(component.detallesDelTransporteForm.get('fechaDeExpedicion')).toBeDefined();
  });

  it('ngOnInit debe llamar a getMedioDeTransporte', () => {
    const SPY = jest.spyOn(component, 'getMedioDeTransporte');
    component.ngOnInit();
    expect(SPY).toHaveBeenCalled();
  });

  it('getMedioDeTransporte debe llenar el formulario con los datos del servicio', () => {
    component.getMedioDeTransporte();
    expect(serviceMock.getMedioDeTransporte).toHaveBeenCalled();
    expect(component.detallesDelTransporteForm.get('tratado')?.value).toBe(TRATADO);
    expect(component.detallesDelTransporteForm.get('paisOBloque')?.value).toBe(PAIS_O_BLOQUE);
    expect(component.detallesDelTransporteForm.get('paisOOrigin')?.value).toBe(PAIS_O_ORIGIN);
    expect(component.detallesDelTransporteForm.get('paisODestino')?.value).toBe(PAIS_O_DESTINO);
    expect(component.detallesDelTransporteForm.get('fechaDeExpedicion')?.value).toBe(FECHA_DE_EXPEDICION);
    expect(component.detallesDelTransporteForm.get('fechaDeVencimiento')?.value).toBe(FECHA_DE_VENCIMIENTO);
  });

  it('ngOnDestroy debe completar el subject destroyed$', () => {
    const NEXT_SPY = jest.spyOn(component['destroyed$'], 'next');
    const COMPLETE_SPY = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(NEXT_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});