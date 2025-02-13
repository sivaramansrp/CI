/* eslint-disable dot-notation */
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { TratadosComponent } from './tratados.component';
import tratadosDropdown from '../../../../../assets/json/110101/tratdos-dropdown.json';
import tratadosTable from '../../../../../assets/json/110101/tratados-table.json';


fdescribe('TratadosComponent', () => {
  let component: TratadosComponent;
  let fixture: ComponentFixture<TratadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TratadosComponent,
        CommonModule,
        TableComponent,
        AlertComponent,
        TituloComponent,
        CatalogoSelectComponent,
        ReactiveFormsModule
      ],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratadosComponent);
    component = fixture.componentInstance;
    component.cuerpoTabla = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty table body initially', () => {
    console.log('Initial cuerpoTabla:', component.cuerpoTabla);
    expect(component.cuerpoTabla).toEqual([]);
  });


  it('should initialize form on ngOnInit', () => {
    expect(component.formularioTratados).toBeDefined();
    // eslint-disable-next-line dot-notation
    expect(component.formularioTratados.controls['pais']).toBeDefined();
    // eslint-disable-next-line dot-notation
    expect(component.formularioTratados.controls['tratado']).toBeDefined();
    expect(component.formularioTratados.controls['origen']).toBeDefined();
  });


  it('should not add tratado if form is invalid', () => {
    spyOn(component.cuerpoTabla, 'push');
    component.agregarTratado();
    expect(component.cuerpoTabla.push).not.toHaveBeenCalled();
  });

  it('should add tratado to table if form is valid', () => {
    component.formularioTratados.setValue({
      pais: 'CANADA',
      tratado: 'Free Trade Agreement',
      origen: 'Preferential Origin'
    });

    component.agregarTratado();
    expect(component.cuerpoTabla.length).toBe(1);
    expect(component.cuerpoTabla[0]).toEqual({
      pais: 'CANADA',
      tratado: 'Free Trade Agreement',
      origen: 'Preferential Origin'
    });
  });

  it('should reset form after adding tratado', () => {
    spyOn(component.formularioTratados, 'reset');
    component.formularioTratados.setValue({
      pais: 'CANADA',
      tratado: 'Free Trade Agreement',
      origen: 'Preferential Origin'
    });
    component.agregarTratado();
    expect(component.formularioTratados.reset).toHaveBeenCalled();
  });

  it('should initialize dropdown configurations correctly', () => {
    expect(component.configuracionesDropdown.length).toBe(3);
    expect(component.configuracionesDropdown[0].catalogos).toEqual(tratadosDropdown.pais);
    expect(component.configuracionesDropdown[1].catalogos).toEqual(tratadosDropdown.tratado);
    expect(component.configuracionesDropdown[2].catalogos).toEqual(tratadosDropdown.origen);
  });

  it('should have correct table headers', () => {
    expect(component.encabezadosComunesTabla).toEqual(tratadosTable.tableHeader);
  });

  it('should have empty table body initially', () => {
    expect(component.cuerpoTabla).toEqual([]);
  });
});