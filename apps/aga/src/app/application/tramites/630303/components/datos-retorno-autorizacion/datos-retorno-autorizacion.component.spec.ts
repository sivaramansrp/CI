import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { DatosRetornoAutorizacionComponent } from './datos-retorno-autorizacion.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { of } from 'rxjs';

describe('DatosRetornoAutorizacionComponent', () => {
  let componente: DatosRetornoAutorizacionComponent;
  let fixture: ComponentFixture<DatosRetornoAutorizacionComponent>;
  let mockService: jest.Mocked<RetornoImportacionTemporalService>;
  let mockStore: jest.Mocked<Tramite630303Store>;
  let mockQuery: jest.Mocked<Tramite630303Query>;

  beforeEach(async () => {
    mockService = {
      getAduanaDeIngreso: jest.fn(),
      getSeccionAduanera: jest.fn(),
    } as unknown as jest.Mocked<RetornoImportacionTemporalService>;

    mockStore = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    mockQuery = {
      selectTramite630303State$: of({
        campo: 'valor',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      imports: [DatosRetornoAutorizacionComponent],
      providers: [
        FormBuilder,
        { provide: RetornoImportacionTemporalService, useValue: mockService },
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosRetornoAutorizacionComponent);
    componente = fixture.componentInstance;

    mockService.getAduanaDeIngreso.mockReturnValue(of([]));
    mockService.getSeccionAduanera.mockReturnValue(of([]));

    componente.formularioDatosAutorizacion = [
      {
        id: 'aduanaDeIngreso', opciones: [],
        labelNombre: '',
        campo: '',
        clase: '',
        tipoInput: '',
        desactivado: false
      },
      {
        id: 'seccionAduanera', opciones: [],
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

  it('debería inicializar el formulario y obtener valores en ngOnInit', () => {
    const inicializarFormularioSpy = jest.spyOn(componente, 'inicializarFormulario');
    const getValorStoreSpy = jest.spyOn(componente, 'getValorStore');
    const getAduanaDeIngresoSpy = jest.spyOn(componente, 'getAduanaDeIngreso');
    const getSeccionAduaneraSpy = jest.spyOn(componente, 'getSeccionAduanera');

    componente.ngOnInit();

    expect(inicializarFormularioSpy).toHaveBeenCalled();
    expect(getValorStoreSpy).toHaveBeenCalled();
    expect(getAduanaDeIngresoSpy).toHaveBeenCalled();
    expect(getSeccionAduaneraSpy).toHaveBeenCalled();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    componente.inicializarFormulario();
    expect(componente.datosImportacionRetornoAutorizacionGeneralFormulario).toBeTruthy();
  });

  it('debería obtener las opciones de aduana de ingreso', () => {
    const mockData = [{ id: 1, descripcion: 'Aduana 1' }];
    mockService.getAduanaDeIngreso.mockReturnValue(of(mockData));

    componente.getAduanaDeIngreso();

    expect(mockService.getAduanaDeIngreso).toHaveBeenCalled();
    const aduanaIngreso = componente.formularioDatosAutorizacion.find((item) => item.id === 'aduanaDeIngreso');
    expect(aduanaIngreso?.opciones).toEqual(mockData);
  });

  it('debería obtener las opciones de sección aduanera', () => {
    const mockData = [{ id: 2, descripcion: 'Sección 1' }];
    mockService.getSeccionAduanera.mockReturnValue(of(mockData));

    componente.getSeccionAduanera();

    expect(mockService.getSeccionAduanera).toHaveBeenCalled();
    const seccionAduanera = componente.formularioDatosAutorizacion.find((item) => item.id === 'seccionAduanera');
    expect(seccionAduanera?.opciones).toEqual(mockData);
  });

  it('debería obtener el estado actual del store', () => {
    componente.getValorStore();
    expect(componente.estadoSeleccionado).toEqual({ campo: 'valor' });
  });

  it('debería actualizar el store cuando se invoque establecerCambioDeValor', () => {
    const mockEvent = { campo: 'campoTest', valor: 'valorTest' };

    componente.establecerCambioDeValor(mockEvent);

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('campoTest', 'valorTest');
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn((componente as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((componente as any).destroyed$, 'complete');

    componente.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});