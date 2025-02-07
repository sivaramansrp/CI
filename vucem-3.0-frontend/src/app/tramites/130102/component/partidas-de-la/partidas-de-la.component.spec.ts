import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { UppercaseDirective } from '../../../../shared/directives/Uppercase/uppercase.directive';

import { PartidasDeLaComponent } from './partidas-de-la.component';

describe('PartidasDeLaComponent', () => {
  let component: PartidasDeLaComponent;
  let fixture: ComponentFixture<PartidasDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidasDeLaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('PartidasDeLaComponent', () => {
  let component: PartidasDeLaComponent;
  let fixture: ComponentFixture<PartidasDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        UppercaseDirective,
        AlertComponent,
        SelectCatalogosComponent,
        TableComponent,
        PartidasDeLaComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.formForTotalCount).toBeDefined();
  });

  it('should create form with default values', () => {
    component.crearFormulario();
    expect(component.form.controls['cantidad'].value).toBe('');
    expect(component.form.controls['descripcion'].value).toBe('');
    expect(component.form.controls['valorPartidaUSD'].value).toBe('');
  });

  it('should calculate totals correctly', () => {
    component.tableBodyData = [
      { tbodyData: ['10', '', '', '', '', '100'] },
      { tbodyData: ['20', '', '', '', '', '200'] }
    ];
    component.calculateTotals();
    expect(component.formForTotalCount.controls['cantidadTotal'].value).toBe(30);
    expect(component.formForTotalCount.controls['valorTotalUSD'].value).toBe(300);
  });

  it('should create form for total count with default values', () => {
    component.formularioTotalCount();
    expect(component.formForTotalCount.controls['cantidadTotal'].value).toBe('');
    expect(component.formForTotalCount.controls['valorTotalUSD'].value).toBe('');
  });

  it('should get establecimiento data correctly', () => {
    component.getEstablecimiento();
    expect(component.tableHeaderData).toEqual(component.getEstablecimientoTableData.tableHeader);
    expect(component.tableBodyData).toEqual(component.getEstablecimientoTableData.tableBody);
  });
});
