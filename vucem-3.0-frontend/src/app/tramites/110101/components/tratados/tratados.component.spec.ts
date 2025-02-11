import { Catalogo } from '../../../../core/models/shared/catalogos.model';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TratadosComponent } from './tratados.component';
import tratadosDropdown from '../../../../../assets/json/110101/tratdos-dropdown.json';

describe('TratadosComponent', () => {
  let component: TratadosComponent;
  let fixture: ComponentFixture<TratadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratadosComponent] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select values correctly', () => {
    const pais: Catalogo = tratadosDropdown.pais.find(item => item.descripcion === 'CANADA');
    const tratado: Catalogo = tratadosDropdown.tratado.find(item => item.descripcion === 'Free Trade Agreement');
    const origen: Catalogo = tratadosDropdown.origen.find(item => item.descripcion === 'Preferential Origin');

    component.seleccionar(pais, 0);
    component.seleccionar(tratado, 1);
    component.seleccionar(origen, 2);

    expect(component.selectedValues).toEqual({
      pais,
      tratado,
      origen
    });
  });

  it('should add tratado when all values are selected', () => {
    const pais = tratadosDropdown.pais.find(item => item.descripcion === 'CANADA');
    const tratado = tratadosDropdown.tratado.find(item => item.descripcion === 'Free Trade Agreement');
    const origen = tratadosDropdown.origen.find(item => item.descripcion === 'Preferential Origin');

    component.selectedValues = { pais, tratado, origen };
    component.agregarTratado();
    expect(component.tableBody.length).toBe(1);
    expect(component.tableBody[0].tbodyData).toEqual([
      'CANADA',
      'Free Trade Agreement',
      'Preferential Origin'
    ]);
  });

  it('should not add tratado if values are missing', () => {
    const pais = tratadosDropdown.pais.find(item => item.descripcion === 'CANADA');
    const tratado = tratadosDropdown.tratado.find(item => item.descripcion === 'Free Trade Agreement');

    component.selectedValues = { pais, tratado };
    component.agregarTratado();
    expect(component.tableBody.length).toBe(0);
  });

  it('should clear selectedValues after adding tratado', () => {
    const pais = tratadosDropdown.pais.find(item => item.descripcion === 'CANADA');
    const tratado = tratadosDropdown.tratado.find(item => item.descripcion === 'Free Trade Agreement');
    const origen = tratadosDropdown.origen.find(item => item.descripcion === 'Preferential Origin');

    component.selectedValues = { pais, tratado, origen };
    component.agregarTratado();
    expect(component.selectedValues).toEqual({});
  });

  it('should log an error if values are missing', () => {
    spyOn(console, 'error');

    const pais = tratadosDropdown.pais.find(item => item.descripcion === 'CANADA');
    const tratado = tratadosDropdown.tratado.find(item => item.descripcion === 'Free Trade Agreement');

    component.selectedValues = { pais, tratado };
    component.agregarTratado();
    expect(console.error).toHaveBeenCalledWith("Some values are missing!");
  });
});
