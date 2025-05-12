import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoPropietarioComponent } from './tipo-propietario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { FORMULARIO_DATOS_PROPIETARIO_NOMBRE } from '../../enum/retorno-importacion-temporal.enum';

describe('TipoPropietarioComponent', () => {
  let componente: TipoPropietarioComponent;
  let fixture: ComponentFixture<TipoPropietarioComponent>;
  let storeMock: Partial<Tramite630307Store>;
  let queryMock: Partial<Tramite630307Query>;
  let servicioMock: Partial<RetornoImportacionTemporalService>;

  beforeEach(async () => {
    storeMock = {
      setTramite630307State: jest.fn(),
    };

    queryMock = {
      selectTramite630307State$: of({
        propietario: '1',
        tipoDePropietario: '2',
      }),
    };

    servicioMock = {
      getPropietario: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Persona' }])),
      getTipoDePropietario: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Física' }])),
      getPais: jest.fn().mockReturnValue(of([{ id: 'MX', descripcion: 'México' }])),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TipoPropietarioComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite630307Store, useValue: storeMock },
        { provide: Tramite630307Query, useValue: queryMock },
        { provide: RetornoImportacionTemporalService, useValue: servicioMock },
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

  it('debería actualizar la visibilidad de los campos en cambiarTipoPropietario()', () => {
    componente.tipoPropietarioFormulario.get('tipoDePropietario')?.setValue('1');
    componente.formularioDatosPropietarioNombre = structuredClone(FORMULARIO_DATOS_PROPIETARIO_NOMBRE);
    componente.cambiarTipoPropietario();

    const nombreCampo = componente.formularioDatosPropietarioNombre.find(c => c.id === 'nombre');
    expect(nombreCampo?.mostrar).toBe(true);
  });

  it('debería alternar mostrarTipoPropietario y mostrarSolicitante en cambiarPropietario()', () => {
    componente.tipoPropietarioFormulario.get('propietario')?.setValue('2');
    componente.cambiarPropietario();
    expect(componente.mostrarSolicitante).toBe(true);
    expect(componente.mostrarTipoPropietario).toBe(false);
  });

  it('debería establecer un valor en el store con establecerCambioDeValor (primitivo)', () => {
    componente.establecerCambioDeValor({ campo: 'propietario', valor: '1' });
    expect(storeMock.setTramite630307State).toHaveBeenCalledWith('propietario', '1');
  });

  it('debería establecer un valor en el store con establecerCambioDeValor (objeto con id)', () => {
    componente.establecerCambioDeValor({ campo: 'tipoDePropietario', valor: { id: 5 } });
    expect(storeMock.setTramite630307State).toHaveBeenCalledWith('tipoDePropietario', '5');
  });

  it('debería completar destroyed$ al destruir el componente', () => {
    const completeSpy = jest.spyOn(componente['destroyed$'], 'complete');
    componente.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});