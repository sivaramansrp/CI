import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarResiduosComponent } from './administrar-residuos.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import administrarResiduosMesa from '../../../../../assets/json/231001/administrar-residuos-mesa.json';

describe('AdministrarResiduosComponent', () => {
  let component: AdministrarResiduosComponent;
  let fixture: ComponentFixture<AdministrarResiduosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, TituloComponent, TableComponent, AdministrarResiduosComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarResiduosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tableHeaderData and tableBodyData on getEstablecimiento', () => {
    component.getEstablecimiento();
    expect(component.tableHeaderData).toEqual(administrarResiduosMesa.tableHeader);
    expect(component.tableBodyData).toEqual(administrarResiduosMesa.tableBody);
  });

  it('should create formForTotalCount on formularioTotalCount', () => {
    component.formularioTotalCount();
    expect(component.formForTotalCount).toBeTruthy();
    expect(component.formForTotalCount.get('recuentoTotalDeFilas')).toBeTruthy();
  });

  it('should update recuentoTotalDeFilas on actualizarRecuentoTotalDeFilas', () => {
    component.tableBodyData = administrarResiduosMesa.tableBody;
    component.formularioTotalCount();
    component.actualizarRecuentoTotalDeFilas();
    expect(component.formForTotalCount.get('recuentoTotalDeFilas')?.value).toBe(component.tableBodyData.length);
  });

  it('should call getEstablecimiento, formularioTotalCount, and actualizarRecuentoTotalDeFilas on ngOnInit', () => {
    spyOn(component, 'getEstablecimiento').and.callThrough();
    spyOn(component, 'formularioTotalCount').and.callThrough();
    spyOn(component, 'actualizarRecuentoTotalDeFilas').and.callThrough();

    component.ngOnInit();

    expect(component.getEstablecimiento).toHaveBeenCalled();
    expect(component.formularioTotalCount).toHaveBeenCalled();
    expect(component.actualizarRecuentoTotalDeFilas).toHaveBeenCalled();
  });
});