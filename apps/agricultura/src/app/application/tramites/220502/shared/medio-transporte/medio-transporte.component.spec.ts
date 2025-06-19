import { By } from '@angular/platform-browser';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TableComponent,
} from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ControlContainer } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MedioTransporteComponent } from './medio-transporte.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-host',
  standalone: true,
  imports: [MedioTransporteComponent, ReactiveFormsModule, CommonModule],
  template: `<form [formGroup]="form">
    <app-medio-transporte
      [claveDeControl]="'testControl'"
      [hMercanciaTabla]="hMercanciaTabla"
      [dMercanciaBody]="dMercanciaBody"
      [mediodetransporte]="mediodetransporte"
    ></app-medio-transporte>
  </form>`,
})
class TestHostComponent {
  form: FormGroup;
  hMercanciaTabla: string[] = [
    'Fracción arancelaria',
    'Descripción de la fracción',
    'Nico',
    'Descripción Nico',
    'Cantidad solicitada en UMT',
    'Unidad de medida de tarifa (UMT)',
    'Cantidad total UMT',
    'Saldo pendiente',
  ];

  dMercanciaBody = [
    {
      tbodyData: [
        '1001.10.10',
        'Trigo duro',
        'Sí',
        'Trigo para molienda',
        50,
        'kg',
        500,
        100,
      ],
    },
  ];

  mediodetransporte: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      { id: 1, descripcion: 'transporte 1' },
      { id: 2, descripcion: 'transporte 2' },
      { id: 3, descripcion: 'transporte 3' },
    ],
  };

  constructor() {
    this.form = new FormGroup({});
  }
}

describe('MedioTransporteComponent', () => {
  let component: MedioTransporteComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        TestHostComponent,
        MedioTransporteComponent,
        TituloComponent,
        TableComponent,
        InputRadioComponent,
        CatalogoSelectComponent,
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ControlContainer,
          useValue: { control: new FormGroup({}) },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(
      By.directive(MedioTransporteComponent)
    )?.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls on ngOnInit', () => {
    component.ngOnInit();
    expect(component.grupoFormularioPadre).toBeTruthy();

    const FORMGROUP = component.grupoFormularioPadre.get(
      component.claveDeControl
    ) as FormGroup;
    expect(FORMGROUP).toBeTruthy();
    expect(FORMGROUP.get('transporteIdMedio')).toBeTruthy();
    expect(FORMGROUP.get('identificacionTransporte')).toBeTruthy();
    expect(FORMGROUP.get('esSolicitudFerros')).toBeTruthy();
    expect(FORMGROUP.get('totalDeGuiasAmparadas')).toBeTruthy();
  });

  it('should remove control on ngOnDestroy', () => {
    component.ngOnInit();
    expect(
      component.grupoFormularioPadre.contains(component.claveDeControl)
    ).toBe(true);

    component.ngOnDestroy();
    expect(
      component.grupoFormularioPadre.contains(component.claveDeControl)
    ).toBe(false);
  });

  it('should handle catalog selection correctly', () => {
    component.ngOnInit();
    const CATALOGO = {
      id: 1,
      descripcion: 'transporte 1',
      tam: 'transporte 1',
      dpi: 'transporte 1',
    };
    component.seleccionMedioDeTransporte(CATALOGO);

    const FORMGROUP = component.grupoFormularioPadre.get(
      component.claveDeControl
    ) as FormGroup;
    expect(FORMGROUP.get('transporteIdMedio')?.value).toBe('transporte 1');
  });

  it('should render table headers correctly', () => {
    const COMPILED = fixture.nativeElement;
    const HEADERS = COMPILED.querySelectorAll('th');

    expect(HEADERS.length).toBe(9);
    expect(HEADERS[0].textContent.trim()).toBe('');
    expect(HEADERS[1].textContent.trim()).toBe('Fracción arancelaria');
    expect(HEADERS[2].textContent.trim()).toBe('Descripción de la fracción');
    expect(HEADERS[3].textContent.trim()).toBe('Nico');
    expect(HEADERS[4].textContent.trim()).toBe('Descripción Nico');
    expect(HEADERS[5].textContent.trim()).toBe('Cantidad solicitada en UMT');
    expect(HEADERS[6].textContent.trim()).toBe(
      'Unidad de medida de tarifa (UMT)'
    );
    expect(HEADERS[7].textContent.trim()).toBe('Cantidad total UMT');
    expect(HEADERS[8].textContent.trim()).toBe('Saldo pendiente');
  });

  it('should render table rows correctly', () => {
    const COMPILED = fixture.nativeElement;
    const ROWS = COMPILED.querySelectorAll('tbody tr');

    expect(ROWS.length).toBe(1);

    const CELLS = ROWS[0].querySelectorAll('td');
    expect(CELLS.length).toBe(9);
    expect(CELLS[0].textContent.trim()).toBe('');
    expect(CELLS[1].textContent.trim()).toBe('1001.10.10');
    expect(CELLS[2].textContent.trim()).toBe('Trigo duro');
    expect(CELLS[3].textContent.trim()).toBe('Sí');
    expect(CELLS[4].textContent.trim()).toBe('Trigo para molienda');
    expect(CELLS[5].textContent.trim()).toBe('50');
    expect(CELLS[6].textContent.trim()).toBe('kg');
    expect(CELLS[7].textContent.trim()).toBe('500');
    expect(CELLS[8].textContent.trim()).toBe('100');
  });

  it('should update tableData on ngOnChanges', () => {
    const CHANGES: SimpleChanges = {
      hMercanciaTabla: {
        currentValue: ['Header1', 'Header2'],
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
      dMercanciaBody: {
        currentValue: [
          {
            fraccionArancelaria: '1001.10.10',
            descripcionFraccion: 'Trigo duro',
          },
        ],
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    };

    component.ngOnChanges(CHANGES);

    expect(component.tableData.tableHeader).toEqual(['Header1', 'Header2']);
    expect(component.tableData.tableBody).toEqual([
      { fraccionArancelaria: '1001.10.10', descripcionFraccion: 'Trigo duro' },
    ]);
  });

  it('should not update tableData if changes are empty', () => {
    const CHANGES: SimpleChanges = {};

    component.ngOnChanges(CHANGES);

    expect(component.tableData.tableHeader).toEqual([
      'Fracción arancelaria',
      'Descripción de la fracción',
      'Nico',
      'Descripción Nico',
      'Cantidad solicitada en UMT',
      'Unidad de medida de tarifa (UMT)',
      'Cantidad total UMT',
      'Saldo pendiente',
    ]);
    expect(component.tableData.tableBody).toEqual([
      {
        tbodyData: [
          '1001.10.10',
          'Trigo duro',
          'Sí',
          'Trigo para molienda',
          50,
          'kg',
          500,
          100,
        ],
      },
    ]);
  });
});
