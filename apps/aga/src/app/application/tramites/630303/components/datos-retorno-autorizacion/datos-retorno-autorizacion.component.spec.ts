import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { DatosRetornoAutorizacionComponent } from './datos-retorno-autorizacion.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';

describe('DatosRetornoAutorizacionComponent', () => {
  let component: DatosRetornoAutorizacionComponent;
  let fixture: ComponentFixture<DatosRetornoAutorizacionComponent>;
  let mockRetornoService: jest.Mocked<RetornoImportacionTemporalService>;
  let mockStore: jest.Mocked<Tramite630303Store>;
  let mockQuery: jest.Mocked<Tramite630303Query>;

  beforeEach(async () => {
    mockRetornoService = {
      getAduanaDeIngreso: jest.fn(),
      getSeccionAduanera: jest.fn(),
    } as unknown as jest.Mocked<RetornoImportacionTemporalService>;

    mockStore = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    mockQuery = {
      selectTramite630303State$: of({
        seccionAduanera: 'Sección 1',
        fechaIngreso: '2025-01-01',
        fechaVencimiento: '2025-12-31',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosRetornoAutorizacionComponent],
      providers: [
        { provide: RetornoImportacionTemporalService, useValue: mockRetornoService },
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosRetornoAutorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.datosImportacionRetornoAutorizacionGeneralFormulario.value).toEqual({
      seccionAduanera: 'Sección 1',
      fechaIngreso: '2025-01-01',
      fechaVencimiento: '2025-12-31',
    });
  });

  it('should fetch aduana de ingreso options', () => {
    const mockData = [{ id: 1, descripcion: 'Aduana 1' }];
    mockRetornoService.getAduanaDeIngreso.mockReturnValue(of(mockData));

    component.getAduanaDeIngreso();

    expect(mockRetornoService.getAduanaDeIngreso).toHaveBeenCalled();
    const aduanaIngreso = component.formularioDatosAutorizacion.find((item) => item.id === 'aduanaDeIngreso');
    expect(aduanaIngreso?.opciones).toEqual(mockData);
  });

  it('should fetch seccion aduanera options', () => {
    const mockData = [{ id: 2, descripcion: 'Sección 1' }];
    mockRetornoService.getSeccionAduanera.mockReturnValue(of(mockData));

    component.getSeccionAduanera();

    expect(mockRetornoService.getSeccionAduanera).toHaveBeenCalled();
    expect(component.seccionAduaneraOpciones).toEqual(mockData);
  });

  it('should update tramite630303Store when establecerCambioDeValor is called', () => {
    component.establecerCambioDeValor({ campo: 'seccionAduanera', valor: 'Sección 2' });

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('seccionAduanera', 'Sección 2');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});