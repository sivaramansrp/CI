import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UsoEspicificoComponent } from './uso-especifico.component'

import { CatalogoSelectComponent } from "../../../../shared/components/catalogo-select/catalogo-select/catalogo-select.component";
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from "../../../../shared/components/titulo/titulo.component";

import fraccionOptionJson from '../../../../../assets/json/130102/fracciónarancelaria-options.json';


describe('UsoEspicificoComponent', () => {
  let component: UsoEspicificoComponent;
  let fixture: ComponentFixture<UsoEspicificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsoEspicificoComponent],
      imports: [
        ReactiveFormsModule,
        CommonModule,
        TableComponent,
        TituloComponent,
        CatalogoSelectComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsoEspicificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.usoEspicificoForm).toBeDefined();
    expect(component.usoEspicificoForm.get('fracciónarancelaria')?.value).toBe('');
    expect(component.usoEspicificoForm.get('descripción')?.value).toBe('');
  });

  it('should have table columns defined', () => {
    expect(component.tableColumns).toEqual(['Fracción arancelaria', 'Descripción']);
  });

  it('should have table data defined', () => {
    expect(component.tableData.length).toBe(2);
    expect(component.tableData[0].tbodyData).toEqual([
      '980200011',
      'Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizará la mercancía a importar) '
    ]);
    expect(component.tableData[1].tbodyData).toEqual([
      '01039101',
      'Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizara ta mercancia a importar) '
    ]);
  });

  it('should have catalogos defined', () => {
    expect(component.catalogos).toEqual(fraccionOptionJson);
  });

  it('should update descripción when obtenerRequisitosFraccionArancelariaEsquema is called', () => {
    component.obtenerRequisitosFraccionArancelariaEsquema();
    expect(component.usoEspicificoForm.get('descripción')?.value).toBe('Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizará la mercancía a importar) ');
  });
});