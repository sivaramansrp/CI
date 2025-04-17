import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { DatosRetornoAutorizacionComponent } from './datos-retorno-autorizacion.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';

describe('DatosRetornoAutorizacionComponent', () => {
  let component: DatosRetornoAutorizacionComponent;
  let fixture: ComponentFixture<DatosRetornoAutorizacionComponent>;
  let mockRetornoService: jest.Mocked<RetornoImportacionTemporalService>;
  let mockStore: jest.Mocked<Tramite630307Store>;
  let mockQuery: jest.Mocked<Tramite630307Query>;

  beforeEach(async () => {
    mockRetornoService = {
      getAduanaDeIngreso: jest.fn(),
      getSeccionAduanera: jest.fn(),
    } as unknown as jest.Mocked<RetornoImportacionTemporalService>;

    mockStore = {
      setTramite630307State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630307Store>;

    mockQuery = {
      selectTramite630307State$: of({
        folioInformacionGeneralAutorizacion: '12345',
        aduanaIngreso: '001',
        seccionAduanera: '002',
        fechaIngreso: '2025-01-01',
        fechaVencimiento: '2025-12-31',
      }),
    } as unknown as jest.Mocked<Tramite630307Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosRetornoAutorizacionComponent],
      providers: [
        { provide: RetornoImportacionTemporalService, useValue: mockRetornoService },
        { provide: Tramite630307Store, useValue: mockStore },
        { provide: Tramite630307Query, useValue: mockQuery },
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
      folioInformacionGeneralAutorizacion: '12345',
      aduanaIngreso: '001',
      seccionAduanera: '002',
      fechaIngreso: '2025-01-01',
      fechaVencimiento: '2025-12-31',
    });
  });

  it('should call getAduanaDeIngreso and populate aduanaDeingresOpciones', () => {
    const mockData = [{ id: 1, descripcion: 'Aduana 1' }];
    mockRetornoService.getAduanaDeIngreso.mockReturnValue(of(mockData));

    component.getAduanaDeIngreso();

    expect(mockRetornoService.getAduanaDeIngreso).toHaveBeenCalled();
    expect(component.aduanaDeingresOpciones).toEqual(mockData);
  });

  it('should call getSeccionAduanera and populate seccionAduaneraOpciones', () => {
    const mockData = [{ id: 2, descripcion: 'Sección 1' }];
    mockRetornoService.getSeccionAduanera.mockReturnValue(of(mockData));

    component.getSeccionAduanera();

    expect(mockRetornoService.getSeccionAduanera).toHaveBeenCalled();
    expect(component.seccionAduaneraOpciones).toEqual(mockData);
  });

  it('should update fechaIngreso in the form and store when cambioFechaIngreso is called', () => {
    const newDate = '2025-02-01';
    component.cambioFechaIngreso(newDate);

    expect(component.datosImportacionRetornoAutorizacionGeneralFormulario.get('fechaIngreso')?.value).toBe(newDate);
    expect(mockStore.setTramite630307State).toHaveBeenCalledWith({ fechaIngreso: newDate });
  });

  it('should update fechaVencimiento in the form and store when cambioFechaVencimiento is called', () => {
    const newDate = '2025-11-30';
    component.cambioFechaVencimiento(newDate);

    expect(component.datosImportacionRetornoAutorizacionGeneralFormulario.get('fechaVencimiento')?.value).toBe(newDate);
    expect(mockStore.setTramite630307State).toHaveBeenCalledWith({ fechaVencimiento: newDate });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});