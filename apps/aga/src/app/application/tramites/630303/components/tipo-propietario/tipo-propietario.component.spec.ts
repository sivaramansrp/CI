import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoPropietarioComponent } from './tipo-propietario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';

describe('TipoPropietarioComponent', () => {
  let componente: TipoPropietarioComponent;
  let fixture: ComponentFixture<TipoPropietarioComponent>;
  let STORE_MOCK: Partial<Tramite630303Store>;
  let QUERY_MOCK: Partial<Tramite630303Query>;
  let SERVICE_MOCK: Partial<RetornoImportacionTemporalService>;

  beforeEach(async () => {
    STORE_MOCK = {
      setTramite630303State: jest.fn(),
    };

    QUERY_MOCK = {
      selectTramite630303State$: of({
        propietario: '1',
        tipoDePropietario: '2',
      }),
    };

    SERVICE_MOCK = {
      getPropietario: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Persona' }])),
      getTipoDePropietario: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Física' }])),
      getPais: jest.fn().mockReturnValue(of([{ id: 'MX', descripcion: 'México' }])),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TipoPropietarioComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite630303Store, useValue: STORE_MOCK },
        { provide: Tramite630303Query, useValue: QUERY_MOCK },
        { provide: RetornoImportacionTemporalService, useValue: SERVICE_MOCK },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoPropietarioComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario con datos del estado', () => {
    expect(componente.tipoPropietarioFormulario.value).toEqual({
      propietario: '1',
      tipoDePropietario: '2',
    });
  });

  it('debería llamar a getPropietario y llenar propietarioOpciones', () => {
    expect(componente.propietarioOpciones.length).toBeGreaterThan(0);
  });

  it('debería llamar a getTipoDePropietario y llenar tipoDePropietarioOpciones', () => {
    expect(componente.tipoDePropietarioOpciones.length).toBeGreaterThan(0);
  });
  it('debería alternar mostrarTipoPropietario y mostrarSolicitante en cambiarPropietario()', () => {
    componente.tipoPropietarioFormulario.get('propietario')?.setValue('2');
    componente.cambiarPropietario();
    expect(componente.mostrarSolicitante).toBe(true);
    expect(componente.mostrarTipoPropietario).toBe(false);
  });

  it('debería establecer un valor en el store con establecerCambioDeValor (primitivo)', () => {
    componente.establecerCambioDeValor({ campo: 'propietario', valor: '1' });
    expect(STORE_MOCK.setTramite630303State).toHaveBeenCalledWith('propietario', '1');
  });

  it('debería establecer un valor en el store con establecerCambioDeValor (objeto con id)', () => {
    componente.establecerCambioDeValor({ campo: 'tipoDePropietario', valor: { id: 5 } });
    expect(STORE_MOCK.setTramite630303State).toHaveBeenCalledWith('tipoDePropietario', '5');
  });

  it('debería completar destroyed$ al destruir el componente', () => {
    const COMPLETE_SPY = jest.spyOn(componente['destroyed$'], 'complete');
    componente.ngOnDestroy();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});