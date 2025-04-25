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
    const getValorStoreSpy = jest.spyOn(componente, 'getValorStore');
    const inizializarFormularioSpy = jest.spyOn(componente, 'inizializarFormulario');
    const getAduanaDeIngresoSpy = jest.spyOn(componente, 'getAduanaDeIngreso');
    const getSeccionAduaneraSpy = jest.spyOn(componente, 'getSeccionAduanera');
    const getProrrogaSpy = jest.spyOn(componente, 'getProrroga');
    const cambiarCuentaProrrogaSpy = jest.spyOn(componente, 'cambiarCuentaProrroga');

    componente.ngOnInit();

    expect(getValorStoreSpy).toHaveBeenCalled();
    expect(inizializarFormularioSpy).toHaveBeenCalled();
    expect(getAduanaDeIngresoSpy).toHaveBeenCalled();
    expect(getSeccionAduaneraSpy).toHaveBeenCalled();
    expect(getProrrogaSpy).toHaveBeenCalled();
    expect(cambiarCuentaProrrogaSpy).toHaveBeenCalled();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    componente.inizializarFormulario();
    expect(componente.datosImportacionTemporalFormulario).toBeTruthy();
  });

  it('debería obtener las opciones de aduana de ingreso', () => {
    const mockData = [{ id: 1, descripcion: 'Aduana 1' }];
    mockService.getAduanaDeIngreso.mockReturnValue(of(mockData));

    componente.getAduanaDeIngreso();

    expect(mockService.getAduanaDeIngreso).toHaveBeenCalled();
    const aduanaIngreso = componente.formularioDatosSolicitud.find((item) => item.id === 'cveAduana');
    expect(aduanaIngreso?.opciones).toEqual(mockData);
  });

  it('debería obtener las opciones de sección aduanera', () => {
    const mockData = [{ id: 2, descripcion: 'Sección 1' }];
    mockService.getSeccionAduanera.mockReturnValue(of(mockData));

    componente.getSeccionAduanera();

    expect(mockService.getSeccionAduanera).toHaveBeenCalled();
    const seccionAduanera = componente.formularioDatosSolicitud.find((item) => item.id === 'cveSeccionAduanera');
    expect(seccionAduanera?.opciones).toEqual(mockData);
  });

  it('debería obtener las opciones de prórroga', () => {
    const mockData = [{ id: 3, descripcion: 'Prórroga 1' }];
    mockService.getProrroga.mockReturnValue(of(mockData));

    componente.getProrroga();

    expect(mockService.getProrroga).toHaveBeenCalled();
    const prorroga = componente.formularioDatosSolicitud.find((item) => item.id === 'cuentaProrroga');
    expect(prorroga?.opciones).toEqual(mockData);
  });

  it('debería obtener el estado actual del store', () => {
    componente.getValorStore();
    expect(componente.estadoSeleccionado).toEqual({ cuentaProrroga: '1' });
  });

  it('debería actualizar el store y llamar a cambiarCuentaProrroga cuando se invoque establecerCambioDeValor', () => {
    const mockEvent = { campo: 'cuentaProrroga', valor: '1' };
    const cambiarCuentaProrrogaSpy = jest.spyOn(componente, 'cambiarCuentaProrroga');

    componente.establecerCambioDeValor(mockEvent);

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('cuentaProrroga', '1');
    expect(cambiarCuentaProrrogaSpy).toHaveBeenCalled();
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
    const destroyedSpy = jest.spyOn((componente as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((componente as any).destroyed$, 'complete');

    componente.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});