import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { of } from 'rxjs';

describe('DatosDeLaSolicitudComponent', () => {
  let componente: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let mockService: jest.Mocked<RetornoImportacionTemporalService>;
  let mockStore: jest.Mocked<Tramite630303Store>;
  let mockQuery: jest.Mocked<Tramite630303Query>;

  beforeEach(async () => {
    mockService = {
      getAduanaDeIngreso: jest.fn(),
      getSeccionAduanera: jest.fn(),
      getProrroga: jest.fn(),
    } as unknown as jest.Mocked<RetornoImportacionTemporalService>;

    mockStore = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    mockQuery = {
      selectTramite630303State$: of({ cuentaProrroga: '1' }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDeLaSolicitudComponent],
      providers: [
        FormBuilder,
        { provide: RetornoImportacionTemporalService, useValue: mockService },
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    componente = fixture.componentInstance;

    mockService.getAduanaDeIngreso.mockReturnValue(of([]));
    mockService.getSeccionAduanera.mockReturnValue(of([]));
    mockService.getProrroga.mockReturnValue(of([]));

    componente.formularioDatosSolicitud = [
      {
        id: 'cveAduana', opciones: [],
        labelNombre: '',
        campo: '',
        clase: '',
        tipoInput: '',
        desactivado: false
      },
      {
        id: 'cveSeccionAduanera', opciones: [],
        labelNombre: '',
        campo: '',
        clase: '',
        tipoInput: '',
        desactivado: false
      },
      {
        id: 'cuentaProrroga', opciones: [],
        labelNombre: '',
        campo: '',
        clase: '',
        tipoInput: '',
        desactivado: false
      },
    ];

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario y obtener datos en ngOnInit', () => {
    const GET_VALOR_STORE_SPY = jest.spyOn(componente, 'getValorStore');
    const INIZIALIZAR_FORMULARIO_SPY = jest.spyOn(componente, 'inizializarFormulario');
    const GET_ADUANA_DE_INGRESO_SPY = jest.spyOn(componente, 'getAduanaDeIngreso');
    const GET_SECCION_ADUANERA_SPY = jest.spyOn(componente, 'getSeccionAduanera');
    const GET_PRORROGA_SPY = jest.spyOn(componente, 'getProrroga');
    const CAMBIAR_CUENTA_PRORROGA_SPY = jest.spyOn(componente, 'cambiarCuentaProrroga');

    componente.ngOnInit();

    expect(GET_VALOR_STORE_SPY).toHaveBeenCalled();
    expect(INIZIALIZAR_FORMULARIO_SPY).toHaveBeenCalled();
    expect(GET_ADUANA_DE_INGRESO_SPY).toHaveBeenCalled();
    expect(GET_SECCION_ADUANERA_SPY).toHaveBeenCalled();
    expect(GET_PRORROGA_SPY).toHaveBeenCalled();
    expect(CAMBIAR_CUENTA_PRORROGA_SPY).toHaveBeenCalled();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    componente.inizializarFormulario();
    expect(componente.datosImportacionTemporalFormulario).toBeTruthy();
  });

  it('debería obtener las opciones de aduana de ingreso', () => {
    const MOCK_DATA = [{ id: 1, descripcion: 'Aduana 1' }];
    mockService.getAduanaDeIngreso.mockReturnValue(of(MOCK_DATA));

    componente.getAduanaDeIngreso();

    expect(mockService.getAduanaDeIngreso).toHaveBeenCalled();
    const ADUANA_INGRESO = componente.formularioDatosSolicitud.find((item) => item.id === 'cveAduana');
    expect(ADUANA_INGRESO?.opciones).toEqual(MOCK_DATA);
  });

  it('debería obtener las opciones de sección aduanera', () => {
    const MOCK_DATA = [{ id: 2, descripcion: 'Sección 1' }];
    mockService.getSeccionAduanera.mockReturnValue(of(MOCK_DATA));

    componente.getSeccionAduanera();

    expect(mockService.getSeccionAduanera).toHaveBeenCalled();
    const SECCION_ADUANERA = componente.formularioDatosSolicitud.find((item) => item.id === 'cveSeccionAduanera');
    expect(SECCION_ADUANERA?.opciones).toEqual(MOCK_DATA);
  });

  it('debería obtener las opciones de prórroga', () => {
    const MOCK_DATA = [{ id: 3, descripcion: 'Prórroga 1' }];
    mockService.getProrroga.mockReturnValue(of(MOCK_DATA));

    componente.getProrroga();

    expect(mockService.getProrroga).toHaveBeenCalled();
    const PRORROGA = componente.formularioDatosSolicitud.find((item) => item.id === 'cuentaProrroga');
    expect(PRORROGA?.opciones).toEqual(MOCK_DATA);
  });

  it('debería obtener el estado actual del store', () => {
    componente.getValorStore();
    expect(componente.estadoSeleccionado).toEqual({ cuentaProrroga: '1' });
  });

  it('debería actualizar el store y llamar a cambiarCuentaProrroga cuando se invoque establecerCambioDeValor', () => {
    const MOCK_EVENT = { campo: 'cuentaProrroga', valor: '1' };
    const CAMBIAR_CUENTA_PRORROGA_SPY = jest.spyOn(componente, 'cambiarCuentaProrroga');

    componente.establecerCambioDeValor(MOCK_EVENT);

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('cuentaProrroga', '1');
    expect(CAMBIAR_CUENTA_PRORROGA_SPY).toHaveBeenCalled();
  });

  it('debería alternar showDatosRetornoProrroga según el valor de cuentaProrroga', () => {
    componente.estadoSeleccionado = { cuentaProrroga: '1' } as any;
    componente.cambiarCuentaProrroga();
    expect(componente.showDatosRetornoProrroga).toBe(true);

    componente.estadoSeleccionado = { cuentaProrroga: '0' } as any;
    componente.cambiarCuentaProrroga();
    expect(componente.showDatosRetornoProrroga).toBe(false);
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const DESTROYED_SPY = jest.spyOn((componente as any).destroyed$, 'next');
    const COMPLETE_SPY = jest.spyOn((componente as any).destroyed$, 'complete');

    componente.ngOnDestroy();

    expect(DESTROYED_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});