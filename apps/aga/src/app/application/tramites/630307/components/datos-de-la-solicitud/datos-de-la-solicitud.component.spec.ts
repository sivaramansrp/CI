import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';

describe('DatosDeLaSolicitudComponent (Jest)', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  let mockService: jest.Mocked<RetornoImportacionTemporalService>;
  let tramiteStoreMock: jest.Mocked<Tramite630307Store>;
  let tramiteQueryMock: Partial<jest.Mocked<Tramite630307Query>>;

  const mockEstado = {
    cveAduana: '001',
    cveSeccionAduanal: 'A1',
    fechaLimiteRetorno: '2025-05-01',
    cuentaProrroga: '1',
    folioInformacionGeneralProrroga: '12345',
    fechaInicioProrroga: '2025-01-01',
    fechaVencimientoProrroga: '2025-12-31',
    folioInformacionGeneralAutorizacion: '67890',
    otraPropiedad1: 'valor1',
    otraPropiedad2: 'valor2',
    aduanaIngreso: 'Aduana 1',
    seccionAduanera: 'Sección A1',
    fechaIngreso: '2025-04-01',
    fechaVencimiento: '2025-12-31',
    descripcionMercancia: 'Mercancía de prueba',
    motivo: 'Motivo de prueba',
    listaMercancia: '',
    declaracion: true
  };

  beforeEach(async () => {
    mockService = {
      getAduanaDeIngreso: jest.fn(),
      getSeccionAduanera: jest.fn(),
      getProrroga: jest.fn()
    } as unknown as jest.Mocked<RetornoImportacionTemporalService>;

    tramiteStoreMock = {
      setTramite630307State: jest.fn()
    } as unknown as jest.Mocked<Tramite630307Store>;

    tramiteQueryMock = {
      selectTramite630307State$: of(mockEstado)
    };

    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent, ReactiveFormsModule],
      providers: [
        { provide: RetornoImportacionTemporalService, useValue: mockService },
        { provide: Tramite630307Store, useValue: tramiteStoreMock },
        { provide: Tramite630307Query, useValue: tramiteQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;

    mockService.getAduanaDeIngreso.mockReturnValue(of([{ id: 1, descripcion: 'Aduana 1' }]));
    mockService.getSeccionAduanera.mockReturnValue(of([{ id:2,  descripcion: 'Sección A1' }]));
    mockService.getProrroga.mockReturnValue(of([{ id: 1, descripcion: 'Sí' }]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with store values', () => {
    expect(component.datosImportacionTemporalFormulario.value).toEqual({
      cveAduana: '001',
      cveSeccionAduanal: 'A1',
      fechaLimiteRetorno: '2025-05-01',
      cuentaProrroga: '1'
    });
  });

  it('should get aduana de ingreso options', () => {
    expect(component.aduanaDeingresOpciones.length).toBe(1);
    expect(mockService.getAduanaDeIngreso).toHaveBeenCalled();
  });

  it('should get seccion aduanera options', () => {
    expect(component.seccionAduaneraOpciones.length).toBe(1);
    expect(mockService.getSeccionAduanera).toHaveBeenCalled();
  });

  it('should get prorroga options', () => {
    expect(component.prorrogaOpciones.length).toBe(1);
    expect(mockService.getProrroga).toHaveBeenCalled();
  });

  it('should update store when fecha is changed', () => {
    component.cambioFechaFinal('2025-06-01');
    expect(component.datosImportacionTemporalFormulario.get('fechaLimiteRetorno')?.value).toBe('2025-06-01');
    expect(tramiteStoreMock.setTramite630307State).toHaveBeenCalledWith({
      fechaLimiteRetorno: '2025-06-01'
    });
  });

  it('should set showRetornoProrroga to true and update store when cuentaProrroga is "1"', () => {
    component.inizializarFormulario();
    component.datosImportacionTemporalFormulario.get('cuentaProrroga')?.setValue('1');

    component.onChangeTipoImportacionRetorno();

    expect(component.showRetornoProrroga).toBe(true);
    expect(tramiteStoreMock.setTramite630307State).toHaveBeenCalledWith({
      cuentaProrroga: '1'
    });
  });

  it('should set showRetornoProrroga to false when cuentaProrroga is not "1"', () => {
    component.inizializarFormulario();
    component.datosImportacionTemporalFormulario.get('cuentaProrroga')?.setValue('0');

    component.onChangeTipoImportacionRetorno();

    expect(component.showRetornoProrroga).toBe(false);
    expect(tramiteStoreMock.setTramite630307State).toHaveBeenCalledWith({
      cuentaProrroga: '0'
    });
  });

  it('should clean up on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
