import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FechaDeImportacionComponent } from './fecha-de-importacion.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';
import { Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('FechaDeImportacionComponent', () => {
  let component: FechaDeImportacionComponent;
  let fixture: ComponentFixture<FechaDeImportacionComponent>;

  const mockStore = {
    setTramite630104State: jest.fn(),
  };

  const mockQuery = {
    selectTramite630104State$: of({
      fechaLimiteRetorno: '2025-12-31',
      fechaIngreso: '2025-06-15',
    }),
    selectSeccionState$: of({
      fechaLimiteRetorno: '2025-12-31',
      fechaIngreso: '2025-06-15',
    }),
  };

  const mockConsultaioQuery = {
    selectConsultaioState$: of({ readonly: false }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FechaDeImportacionComponent, 
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: Tramite630104Query, useValue: mockQuery },
        { provide: Tramite630104Store, useValue: mockStore },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FechaDeImportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with values from store', () => {
    expect(component.FechaDeImportacionTemporalFormulario.value).toEqual({
      fechaLimiteRetorno: '2025-12-31',
      fechaIngreso: '2025-06-15',
    });
  });

  it('should disable the form in readonly mode', () => {
    component.esSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.FechaDeImportacionTemporalFormulario.disabled).toBe(true);
  });

  it('should enable the form if not readonly', () => {
    component.esSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.FechaDeImportacionTemporalFormulario.enabled).toBe(true);
  });

  it('should update store with correct value (primitive)', () => {
    component.establecerCambioDeValor({ campo: 'fechaIngreso', valor: '2025-07-01' });
    expect(mockStore.setTramite630104State).toHaveBeenCalledWith('fechaIngreso', '2025-07-01');
  });

  it('should update store with correct value (object with id)', () => {
    component.establecerCambioDeValor({ campo: 'fechaIngreso', valor: { id: '123' } });
    expect(mockStore.setTramite630104State).toHaveBeenCalledWith('fechaIngreso', '123');
  });

  it('should unsubscribe on destroy', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
