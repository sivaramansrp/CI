/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable dot-notation */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AgregarMiembroDeLaEmpresaComponent } from './agregar-miembro-de-la-empresa.component';
import { CatalogoSelectComponent } from "../../../../shared/components/catalogo-select/catalogo-select.component";
import { InputRadioComponent } from "../../../../shared/components/input-radio/input-radio.component";
import { TableComponent } from "../../../../shared/components/table/table.component";
import { TablePaginationComponent } from "../../../../shared/components/table-pagination/table-pagination.component";


fdescribe('AgregarMiembroDeLaEmpresaComponent', () => {
  let component: AgregarMiembroDeLaEmpresaComponent;
  let fixture: ComponentFixture<AgregarMiembroDeLaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AgregarMiembroDeLaEmpresaComponent,
        ReactiveFormsModule,
        TableComponent,
        TablePaginationComponent,
        CatalogoSelectComponent,
        InputRadioComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMiembroDeLaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.agregarMiembroDeLaEmpresaFrom).toBeDefined();
    expect(component.agregarMiembroDeLaEmpresaFrom.controls['ensucarácterde'].value).toBe(1);
    expect(component.agregarMiembroDeLaEmpresaFrom.controls['obligadoaTributarenMéxico'].value).toBe(true);
    expect(component.agregarMiembroDeLaEmpresaFrom.controls['nacionalidad'].value).toBe(1);
    expect(component.agregarMiembroDeLaEmpresaFrom.controls['registroFederaldeContribuyentes'].value).toBe('HEJE780514BVA');
    expect(component.agregarMiembroDeLaEmpresaFrom.controls['rfc'].value).toBe('HEJE780514BVA');
    expect(component.agregarMiembroDeLaEmpresaFrom.controls['nombreCompleto'].value).toBe('ERNESTO HERNÁNDEZ URI');
  });

  it('should get establishment data on getEstablecimiento', () => {
    component.getEstablecimiento();
    expect(component.miembrodelaempresaHeaderData).toEqual(component.getEstablecimientoTableData.tableHeader);
    expect(component.miembrodelaempresaBodyData).toEqual(component.getEstablecimientoTableData.tableBody);
  });

  it('should update pagination on updatePagination', () => {
    component.miembrodelaempresaBodyData = Array(10).fill({});
    component.updatePagination();
    expect(component.miembrodelaempresaBodyData.length).toBe(component.itemsPerPage);
  });

  it('should change page on onPageChange', () => {
    spyOn(component, 'updatePagination');
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
    expect(component.updatePagination).toHaveBeenCalled();
  });

  it('should change items per page on onItemsPerPageChange', () => {
    spyOn(component, 'updatePagination');
    component.onItemsPerPageChange(10);
    expect(component.itemsPerPage).toBe(10);
    expect(component.currentPage).toBe(1);
    expect(component.updatePagination).toHaveBeenCalled();
  });

  it('should initialize modal on ngAfterViewInit', () => {
    const modalElement = fixture.debugElement.query(By.css('#Agregar')).nativeElement;
    component.AgregarMOdel = { nativeElement: modalElement };
    component.ngAfterViewInit();
    expect(component.AgregarModelInstance).toBeDefined();
  });

  it('should open modal on openAgregarModal', () => {
    component.AgregarModelInstance = jasmine.createSpyObj('Modal', ['show']);
    component.openAgregarModal();
    expect(component.AgregarModelInstance.show).toHaveBeenCalled();
  });

  it('should close modal on closeAgregarModal', () => {
    component.AgregarModelInstance = jasmine.createSpyObj('Modal', ['hide']);
    component.closeAgregarModal();
    expect(component.AgregarModelInstance.hide).toHaveBeenCalled();
  });
});