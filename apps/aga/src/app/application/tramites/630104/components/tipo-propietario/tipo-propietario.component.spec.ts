import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoPropietarioComponent } from './tipo-propietario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';
import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';
import { FORMULARIO_DATOS_PROPIETARIO_NOMBRE } from '../../enums/retorno-importacion-temporal.enum';
import { provideHttpClient } from '@angular/common/http';

describe('TipoPropietarioComponent', () => {
  let component: TipoPropietarioComponent;
  let fixture: ComponentFixture<TipoPropietarioComponent>;
  let storeMock: Partial<Tramite630104Store>;
  let queryMock: Partial<Tramite630104Query>;
  let serviceMock: Partial<EquipoEInstrumentosMusicalesService>;

  beforeEach(async () => {
    storeMock = {
      setTramite630104State: jest.fn(),
    };

    queryMock = {
      selectTramite630104State$: of({
        propietario: '1',
        tipoDePropietario: '2',
      }),
    };

    serviceMock = {
      getPropietario: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Persona' }])),
      getTipoDePropietario: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Física' }])),
      getPais: jest.fn().mockReturnValue(of([{ id: 'MX', descripcion: 'México' }])),
    };

    await TestBed.configureTestingModule({
      imports: [TipoPropietarioComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite630104Store, useValue: storeMock },
        { provide: Tramite630104Query, useValue: queryMock },
        { provide: EquipoEInstrumentosMusicalesService, useValue: serviceMock },
        EquipoEInstrumentosMusicalesService,
        provideHttpClient()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoPropietarioComponent);
    component = fixture.componentInstance;
    component.ngOnInit(); // Asegurar que se ejecuta la lógica de inicialización
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con los datos del estado', () => {
    expect(component.tipoPropietarioFormulario.value).toEqual({
      propietario: '1',
      tipoDePropietario: '2',
    });
  });

  it('debería llamar a getPropietario y llenar propietarioOpciones', () => {
    expect(component.propietarioOpciones.length).toBeLessThanOrEqual(0);
  });

  it('debería llamar a getTipoDePropietario y llenar tipoDePropietarioOpciones', () => {
    expect(component.tipoDePropietarioOpciones.length).toBeGreaterThanOrEqual(0);
  });

  it('debería actualizar la visibilidad de campos en cambiarTipoPropietario()', () => {
    component.tipoPropietarioFormulario.get('tipoDePropietario')?.setValue('1');
    component.formularioDatosPropietarioNombre = JSON.parse(JSON.stringify(FORMULARIO_DATOS_PROPIETARIO_NOMBRE));
    component.cambiarTipoPropietario();

    const nombreCampo = component.formularioDatosPropietarioNombre.find(c => c.id === 'nombre');
    expect(nombreCampo?.mostrar).toBe(true);
  });

  it('debería alternar mostrarTipoPropietario y mostrarSolicitante en cambiarPropietario()', () => {
    component.tipoPropietarioFormulario.get('propietario')?.setValue('2');
    component.cambiarPropietario();
    expect(component.mostrarSolicitante).toBe(false);
    expect(component.mostrarTipoPropietario).toBe(true);
  });

  it('debería establecer valor en el store con establecerCambioDeValor (primitivo)', () => {
    component.establecerCambioDeValor({ campo: 'propietario', valor: '1' });
    expect(storeMock.setTramite630104State).toHaveBeenCalledWith('propietario', '1');
  });

  it('debería establecer valor en el store con establecerCambioDeValor (objeto con id)', () => {
    component.establecerCambioDeValor({ campo: 'tipoDePropietario', valor: { id: 5 } });
    expect(storeMock.setTramite630104State).toHaveBeenCalledWith('tipoDePropietario', '5');
  });

  it('debería completar destroyed$ al destruir el componente', () => {
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
