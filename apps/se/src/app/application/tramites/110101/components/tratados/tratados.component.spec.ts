import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TratadosComponent } from './tratados.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TratadosStore } from '../../estados/tramites/tratados110101.store';
import { TratadosQuery } from '../../estados/queries/tratados110101.query';


jest.mock('libs/shared/theme/assets/json/110101/tratdos-dropdown.json', () => ({
  __esModule: true,
  default: {
    pais: ['MX', 'US'],
    tratado: ['TLCAN'],
    origen: ['CDMX']
  }
}));

jest.mock('libs/shared/theme/assets/json/110101/tratados-table.json', () => ({
  __esModule: true,
  default: {
    tableHeader: ['País', 'Tratado', 'Origen'],
    tableBody: []
  }
}));

describe('TratadosComponent', () => {
  let component: TratadosComponent;
  let fixture: ComponentFixture<TratadosComponent>;

  const mockStore = {
    updateTratado: jest.fn()
  };

  const mockQuery = {
    selectTratados$: of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratadosComponent, ReactiveFormsModule],
      providers: [
        { provide: TratadosStore, useValue: mockStore },
        { provide: TratadosQuery, useValue: mockQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    const form = component.formularioTratados;
    expect(form.contains('pais')).toBeTruthy();
    expect(form.contains('tratado')).toBeTruthy();
    expect(form.contains('origen')).toBeTruthy();
  });

  it('should set dropdown values correctly from JSON', () => {
    expect(component.configuracionesDropdown[0].catalogos).toEqual(['MX', 'US']);
    expect(component.configuracionesDropdown[1].catalogos).toEqual(['TLCAN']);
    expect(component.configuracionesDropdown[2].catalogos).toEqual(['CDMX']);
  });

  it('should not add tratado when form is invalid', () => {
    component.formularioTratados.setValue({ pais: '', tratado: '', origen: '' });
    const resetSpy = jest.spyOn(component.formularioTratados, 'reset');
    component.agregarTratado();
    expect(resetSpy).not.toHaveBeenCalled();
  });

  it('should reset form when valid tratado is added', () => {
    component.formularioTratados.setValue({
      pais: 'MX',
      tratado: 'TLCAN',
      origen: 'CDMX'
    });
    const resetSpy = jest.spyOn(component.formularioTratados, 'reset');
    component.agregarTratado();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should update store on form value change', () => {
    component.formularioTratados.setValue({
      pais: 'MX',
      tratado: 'TLCAN',
      origen: 'CDMX'
    });
    component['actualizarEstado']();
    expect(mockStore.updateTratado).toHaveBeenCalledWith({
      pais: 'MX',
      tratado: 'TLCAN',
      origen: 'CDMX'
    });
  });

  it('should clean up subscriptions on destroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
