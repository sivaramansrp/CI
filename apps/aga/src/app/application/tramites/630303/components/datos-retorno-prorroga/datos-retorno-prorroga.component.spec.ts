import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { DatosRetornoProrrogaComponent } from './datos-retorno-prorroga.component';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';

describe('DatosRetornoProrrogaComponent', () => {
  let component: DatosRetornoProrrogaComponent;
  let fixture: ComponentFixture<DatosRetornoProrrogaComponent>;
  let mockStore: jest.Mocked<Tramite630303Store>;
  let mockQuery: jest.Mocked<Tramite630303Query>;

  beforeEach(async () => {
    mockStore = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    mockQuery = {
      selectTramite630303State$: of({
        folioInformacionGeneralProrroga: '12345',
        fechaInicioProrroga: '2025-01-01',
        fechaVencimientoProrroga: '2025-12-31',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosRetornoProrrogaComponent],
      providers: [
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery },
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
      folioInformacionGeneralProrroga: '12345',
      fechaInicioProrroga: '2025-01-01',
      fechaVencimientoProrroga: '2025-12-31',
    });
  });

  it('should update fechaInicioProrroga in the form and store when cambioFechaInicioProrroga is called', () => {
    const newDate = '2025-02-01';
    component.cambioFechaInicioProrroga(newDate);

    expect(component.datosImportacionRetornoProrrogaGeneralFormulario.get('fechaInicioProrroga')?.value).toBe(newDate);
    expect(mockStore.setTramite630303State).toHaveBeenCalledWith({ fechaInicioProrroga: newDate });
  });

  it('should update fechaVencimientoProrroga in the form and store when cambioFechaVencimientoProrroga is called', () => {
    const newDate = '2025-11-30';
    component.cambioFechaVencimientoProrroga(newDate);

    expect(component.datosImportacionRetornoProrrogaGeneralFormulario.get('fechaVencimientoProrroga')?.value).toBe(newDate);
    expect(mockStore.setTramite630303State).toHaveBeenCalledWith({ fechaVencimientoProrroga: newDate });
  });

  it('should call setValorStore and update the store', () => {
    component.setValorStore(component.datosImportacionRetornoProrrogaGeneralFormulario, 'fechaInicioProrroga');

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith({
      fechaInicioProrroga: '2025-01-01',
    });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});