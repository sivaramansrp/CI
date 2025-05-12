import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { createInitialState, Tramite30401Store } from '../../estados/tramites30401.store';
import { ConsolidacionDeCargasComponent } from './consolidacion-de-cargas.component';

describe('ConsolidacionDeCargasComponent', () => {
  let component: ConsolidacionDeCargasComponent;
  let tramite30401QueryMock: Partial<Tramite30401Query>;
  let tramite30401StoreMock: Partial<Tramite30401Store>;

  beforeEach(() => {
    tramite30401QueryMock = {
      selectTramite30401$: of({
        ...createInitialState(),
      }),
    };

    tramite30401StoreMock = {
      establecerDatos: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ConsolidacionDeCargasComponent],
      providers: [
        FormBuilder,
        { provide: Tramite30401Query, useValue: tramite30401QueryMock },
        { provide: Tramite30401Store, useValue: tramite30401StoreMock },
      ],
    });

    const fixture = TestBed.createComponent(ConsolidacionDeCargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values from the store', () => {
    expect(component.forma.value).toEqual({
      consolidacionCargas: '',
      noConsolidadoET: '',
    });
  });

  it('should call enPatchStoredFormData and subscribe to store data', () => {
    const spy = jest.spyOn(tramite30401QueryMock.selectTramite30401$ as any, 'subscribe');
    component.enPatchStoredFormData();
    expect(spy).toHaveBeenCalled();
    expect(component.seccionState).toEqual({
      ...createInitialState(),
    });
  });

  it('should call setValoresStore and update the store with form values', () => {
    const form = component.forma;
    form.get('consolidacionCargas')?.setValue('');
    component.setValoresStore(form, 'consolidacionCargas');
    expect(tramite30401StoreMock.establecerDatos).toHaveBeenCalledWith({
      consolidacionCargas: '',
    });
  });

  it('should not call setValoresStore if form is null', () => {
    component.setValoresStore(null, 'consolidacionCargas');
    expect(tramite30401StoreMock.establecerDatos).not.toHaveBeenCalled();
  });

  it('should update esConsolidatedET to true when valor is "1"', () => {
    component.enCambioDeValor('1');
    expect(component.esConsolidatedET).toBe(true);
  });

  it('should update esConsolidatedET to false when valor is not "1"', () => {
    component.enCambioDeValor('0');
    expect(component.esConsolidatedET).toBe(false);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const spy = jest.spyOn(component.destroyed$, 'next');
    const completeSpy = jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should create the form with required validators', () => {
    const form = component.forma;
    expect(form.get('consolidacionCargas')?.valid).toBe(false);
    expect(form.get('noConsolidadoET')?.valid).toBe(false);
  });
});