import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { of } from 'rxjs';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
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
    component = fixture.componentInstance;

    mockService.getAduanaDeIngreso.mockReturnValue(of([]));
    mockService.getSeccionAduanera.mockReturnValue(of([]));
    mockService.getProrroga.mockReturnValue(of([]));

    
    component.formularioDatosSolicitud = [
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and fetch data on ngOnInit', () => {
    const getValorStoreSpy = jest.spyOn(component, 'getValorStore');
    const inizializarFormularioSpy = jest.spyOn(component, 'inizializarFormulario');
    const getAduanaDeIngresoSpy = jest.spyOn(component, 'getAduanaDeIngreso');
    const getSeccionAduaneraSpy = jest.spyOn(component, 'getSeccionAduanera');
    const getProrrogaSpy = jest.spyOn(component, 'getProrroga');
    const cambiarCuentaProrrogaSpy = jest.spyOn(component, 'cambiarCuentaProrroga');

    component.ngOnInit();

    expect(getValorStoreSpy).toHaveBeenCalled();
    expect(inizializarFormularioSpy).toHaveBeenCalled();
    expect(getAduanaDeIngresoSpy).toHaveBeenCalled();
    expect(getSeccionAduaneraSpy).toHaveBeenCalled();
    expect(getProrrogaSpy).toHaveBeenCalled();
    expect(cambiarCuentaProrrogaSpy).toHaveBeenCalled();
  });

  it('should initialize the form with default values', () => {
    component.inizializarFormulario();
    expect(component.datosImportacionTemporalFormulario).toBeTruthy();
  });

  it('should fetch aduana de ingreso options', () => {
    const mockData = [{ id: 1, descripcion: 'Aduana 1' }];
    mockService.getAduanaDeIngreso.mockReturnValue(of(mockData));

    component.getAduanaDeIngreso();

    expect(mockService.getAduanaDeIngreso).toHaveBeenCalled();
    const aduanaIngreso = component.formularioDatosSolicitud.find((item) => item.id === 'cveAduana');
    expect(aduanaIngreso?.opciones).toEqual(mockData);
  });

  it('should fetch seccion aduanera options', () => {
    const mockData = [{ id: 2, descripcion: 'Sección 1' }];
    mockService.getSeccionAduanera.mockReturnValue(of(mockData));

    component.getSeccionAduanera();

    expect(mockService.getSeccionAduanera).toHaveBeenCalled();
    const seccionAduanera = component.formularioDatosSolicitud.find((item) => item.id === 'cveSeccionAduanera');
    expect(seccionAduanera?.opciones).toEqual(mockData);
  });

  it('should fetch prorroga options', () => {
    const mockData = [{ id: 3, descripcion: 'Prórroga 1' }];
    mockService.getProrroga.mockReturnValue(of(mockData));

    component.getProrroga();

    expect(mockService.getProrroga).toHaveBeenCalled();
    const prorroga = component.formularioDatosSolicitud.find((item) => item.id === 'cuentaProrroga');
    expect(prorroga?.opciones).toEqual(mockData);
  });

  it('should fetch the current state from the store', () => {
    component.getValorStore();
    expect(component.estadoSeleccionado).toEqual({ cuentaProrroga: '1' });
  });

  it('should update the store and call cambiarCuentaProrroga when establecerCambioDeValor is called', () => {
    const mockEvent = { campo: 'cuentaProrroga', valor: '1' };
    const cambiarCuentaProrrogaSpy = jest.spyOn(component, 'cambiarCuentaProrroga');

    component.establecerCambioDeValor(mockEvent);

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('cuentaProrroga', '1');
    expect(cambiarCuentaProrrogaSpy).toHaveBeenCalled();
  });

  it('should toggle showDatosRetornoProrroga based on cuentaProrroga value', () => {
    component.estadoSeleccionado = { cuentaProrroga: '1' } as any;
    component.cambiarCuentaProrroga();
    expect(component.showDatosRetornoProrroga).toBe(true);

    component.estadoSeleccionado = { cuentaProrroga: '0' } as any;
    component.cambiarCuentaProrroga();
    expect(component.showDatosRetornoProrroga).toBe(false);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
