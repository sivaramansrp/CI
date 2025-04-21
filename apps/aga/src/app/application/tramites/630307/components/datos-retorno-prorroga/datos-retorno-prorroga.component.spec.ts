import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { DatosRetornoProrrogaComponent } from './datos-retorno-prorroga.component';
import { Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';

describe('DatosRetornoProrrogaComponent', () => {
  let component: DatosRetornoProrrogaComponent;
  let fixture: ComponentFixture<DatosRetornoProrrogaComponent>;
  let mockStore: jest.Mocked<Tramite630307Store>;
  let mockQuery: jest.Mocked<Tramite630307Query>;

  beforeEach(async () => {
    mockStore = {
      setTramite630307State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630307Store>;

    mockQuery = {
      selectTramite630307State$: of({
        folioInformacionGeneralProrroga: 'F12345',
        fechaInicioProrroga: '2025-01-01',
        fechaVencimientoProrroga: '2025-12-31',
      }),
    } as unknown as jest.Mocked<Tramite630307Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosRetornoProrrogaComponent],
      providers: [
        { provide: Tramite630307Store, useValue: mockStore },
        { provide: Tramite630307Query, useValue: mockQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosRetornoProrrogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.datosImportacionRetornoProrrogaGeneralFormulario.value).toEqual({
      folioInformacionGeneralProrroga: 'F12345',
      fechaInicioProrroga: '2025-01-01',
      fechaVencimientoProrroga: '2025-12-31',
    });
  });

  it('should update fechaInicioProrroga in the form and store when cambioFechaInicioProrroga is called', () => {
    const newValue = '2025-02-01';
    component.cambioFechaInicioProrroga(newValue);

    expect(component.datosImportacionRetornoProrrogaGeneralFormulario.get('fechaInicioProrroga')?.value).toBe(newValue);
    expect(mockStore.setTramite630307State).toHaveBeenCalledWith('fechaInicioProrroga', newValue);
  });

  it('should update fechaVencimientoProrroga in the form and store when cambioFechaVencimientoProrroga is called', () => {
    const newValue = '2025-11-30';
    component.cambioFechaVencimientoProrroga(newValue);

    expect(component.datosImportacionRetornoProrrogaGeneralFormulario.get('fechaVencimientoProrroga')?.value).toBe(newValue);
    expect(mockStore.setTramite630307State).toHaveBeenCalledWith('fechaVencimientoProrroga', newValue);
  });

  it('should fetch the state from the store and set estadoSeleccionado', () => {
    component.getValorStore();
    expect(component.estadoSeleccionado).toEqual({
      folioInformacionGeneralProrroga: 'F12345',
      fechaInicioProrroga: '2025-01-01',
      fechaVencimientoProrroga: '2025-12-31',
    });
  });

  it('should update tramite630307Store when setValorStore is called', () => {
    const formGroup = component.datosImportacionRetornoProrrogaGeneralFormulario;
    formGroup.patchValue({ folioInformacionGeneralProrroga: 'F67890' });

    component.setValorStore(formGroup, 'folioInformacionGeneralProrroga');

    expect(mockStore.setTramite630307State).toHaveBeenCalledWith('folioInformacionGeneralProrroga', 'F67890');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});