import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let mockRetornoService: jest.Mocked<RetornoImportacionTemporalService>;
  let mockStore: jest.Mocked<Tramite630303Store>;
  let mockQuery: jest.Mocked<Tramite630303Query>;

  beforeEach(async () => {
    mockRetornoService = {
      getAduanaDeIngreso: jest.fn(),
      getSeccionAduanera: jest.fn(),
      getProrroga: jest.fn(),
    } as unknown as jest.Mocked<RetornoImportacionTemporalService>;

    mockStore = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    mockQuery = {
      selectTramite630303State$: of({
        fechaLimiteRetorno: '2025-12-31',
        cuentaProrroga: '1',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosDeLaSolicitudComponent],
      providers: [
        { provide: RetornoImportacionTemporalService, useValue: mockRetornoService },
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.datosImportacionTemporalFormulario.value).toEqual({
      fechaLimiteRetorno: '2025-12-31',
      cuentaProrroga: '1',
    });
  });

  it('should fetch aduana de ingreso options', () => {
    const mockData = [{ id: 1, descripcion: 'Aduana 1' }];
    mockRetornoService.getAduanaDeIngreso.mockReturnValue(of(mockData));

    component.getAduanaDeIngreso();

    expect(mockRetornoService.getAduanaDeIngreso).toHaveBeenCalled();
    expect(component.formularioDatosSolicitud[component.ADUANA_INDEX].opciones).toEqual(mockData);
  });

  it('should fetch seccion aduanera options', () => {
    const mockData = [{ id: 2, descripcion: 'Sección 1' }];
    mockRetornoService.getSeccionAduanera.mockReturnValue(of(mockData));

    component.getSeccionAduanera();

    expect(mockRetornoService.getSeccionAduanera).toHaveBeenCalled();
    expect(component.formularioDatosSolicitud[component.SECCION_INDEX].opciones).toEqual(mockData);
  });

  it('should fetch prorroga options', () => {
    const mockData = [{ id: 3, descripcion: 'Prórroga 1' }];
    mockRetornoService.getProrroga.mockReturnValue(of(mockData));

    component.getProrroga();

    expect(mockRetornoService.getProrroga).toHaveBeenCalled();
    expect(component.prorrogaOpciones).toEqual(mockData);
  });

  it('should update showRetornoProrroga when cuentaProrroga changes', () => {
    component.datosImportacionTemporalFormulario.patchValue({ cuentaProrroga: '1' });

    component.onChangeTipoImportacionRetorno();

    expect(component.showRetornoProrroga).toBe(true);
    expect(mockStore.setTramite630303State).toHaveBeenCalledWith({
      cuentaProrroga: '1',
    });
  });

  it('should call establecerCambioDeValor with correct parameters', () => {
    const spy = jest.spyOn(component, 'establecerCambioDeValor');
    component.onChangeTipoImportacionRetorno();

    expect(spy).toHaveBeenCalledWith({
      campo: 'cuentaProrroga',
      valor: '1',
    });
  });

  it('should update tramite630303Store when establecerCambioDeValor is called', () => {
    component.establecerCambioDeValor({ campo: 'cuentaProrroga', valor: '1' });

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('cuentaProrroga', '1');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});