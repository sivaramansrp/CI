import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { DatosRetornoAutorizacionComponent } from './datos-retorno-autorizacion.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { of } from 'rxjs';

describe('DatosRetornoAutorizacionComponent', () => {
  let component: DatosRetornoAutorizacionComponent;
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
    component = fixture.componentInstance;

  
    mockService.getAduanaDeIngreso.mockReturnValue(of([]));
    mockService.getSeccionAduanera.mockReturnValue(of([]));

  
    component.formularioDatosAutorizacion = [
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and fetch values on ngOnInit', () => {
    const inicializarFormularioSpy = jest.spyOn(component, 'inicializarFormulario');
    const getValorStoreSpy = jest.spyOn(component, 'getValorStore');
    const getAduanaDeIngresoSpy = jest.spyOn(component, 'getAduanaDeIngreso');
    const getSeccionAduaneraSpy = jest.spyOn(component, 'getSeccionAduanera');

    component.ngOnInit();

    expect(inicializarFormularioSpy).toHaveBeenCalled();
    expect(getValorStoreSpy).toHaveBeenCalled();
    expect(getAduanaDeIngresoSpy).toHaveBeenCalled();
    expect(getSeccionAduaneraSpy).toHaveBeenCalled();
  });

  it('should initialize the form with default values', () => {
    component.inicializarFormulario();
    expect(component.datosImportacionRetornoAutorizacionGeneralFormulario).toBeTruthy();
  });

  it('should fetch aduana de ingreso options', () => {
    const mockData = [{ id: 1, descripcion: 'Aduana 1' }];
    mockService.getAduanaDeIngreso.mockReturnValue(of(mockData));

    component.getAduanaDeIngreso();

    expect(mockService.getAduanaDeIngreso).toHaveBeenCalled();
    const aduanaIngreso = component.formularioDatosAutorizacion.find((item) => item.id === 'aduanaDeIngreso');
    expect(aduanaIngreso?.opciones).toEqual(mockData);
  });

  it('should fetch seccion aduanera options', () => {
    const mockData = [{ id: 2, descripcion: 'Sección 1' }];
    mockService.getSeccionAduanera.mockReturnValue(of(mockData));

    component.getSeccionAduanera();

    expect(mockService.getSeccionAduanera).toHaveBeenCalled();
    const seccionAduanera = component.formularioDatosAutorizacion.find((item) => item.id === 'seccionAduanera');
    expect(seccionAduanera?.opciones).toEqual(mockData);
  });

  it('should fetch current state from the store', () => {
    component.getValorStore();
    expect(component.estadoSeleccionado).toEqual({ campo: 'valor' });
  });

  it('should update store when establecerCambioDeValor is called', () => {
    const mockEvent = { campo: 'campoTest', valor: 'valorTest' };

    component.establecerCambioDeValor(mockEvent);

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('campoTest', 'valorTest');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
