import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ControlContainer } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MedioTransporteComponent } from './medio-transporte.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CatalogoSelectComponent, CatalogosSelect, TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-test-host',
  template: `<form [formGroup]="form">
               <app-medio-transporte [claveDeControl]="'testControl'" [hMercanciaTabla]="hMercanciaTabla" [dMercanciaBody]="dMercanciaBody" [mediodetransporte]="mediodetransporte"></app-medio-transporte>
             </form>`
})
class TestHostComponent {
  form: FormGroup;
  hMercanciaTabla: string[] = [
    'Fracción arancelaria', 'Descripción de la fracción', 'Nico', 'Descripción Nico', 
    'Cantidad solicitada en UMT', 'Unidad de medida de tarifa (UMT)', 'Cantidad total UMT', 'Saldo pendiente'
  ];
  
dMercanciaBody = [
  {
    tbodyData: [
      "1001.10.10",
      "Trigo duro",
      "Sí",
      "Trigo para molienda",
      50,
      "kg",
      500,
      100
    ]
  }
];
  
  mediodetransporte: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      { id: 1, descripcion: 'transporte 1', tam: 'transporte 1', dpi: 'transporte 1' },
      { id: 2, descripcion: 'transporte 2', tam: 'transporte 2', dpi: 'transporte 2' },
      { id: 3, descripcion: 'transporte 3', tam: 'transporte 3', dpi: 'transporte 3' }
    ]
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
      declarations: [TestHostComponent, MedioTransporteComponent, TituloComponent, CatalogoSelectComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ControlContainer,
          useValue: { control: new FormGroup({}) }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(MedioTransporteComponent))?.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls on ngOnInit', () => {
    component.ngOnInit();
    expect(component.grupoFormularioPadre).toBeTruthy();
    
    const formGroup = component.grupoFormularioPadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('transporteIdMedio')).toBeTruthy();
    expect(formGroup.get('identificacionTransporte')).toBeTruthy();
    expect(formGroup.get('esSolicitudFerros')).toBeTruthy();
    expect(formGroup.get('totalDeGuiasAmparadas')).toBeTruthy();
  });

  it('should remove control on ngOnDestroy', () => {
    component.ngOnInit();
    expect(component.grupoFormularioPadre.contains(component.claveDeControl)).toBe(true);
    
    component.ngOnDestroy();
    expect(component.grupoFormularioPadre.contains(component.claveDeControl)).toBe(true);
  });

  it('should handle catalog selection correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'transporte 1', tam: 'transporte 1', dpi: 'transporte 1' };
    component.seleccionMedioDeTransporte(catalogo);

    const formGroup = component.grupoFormularioPadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('transporteIdMedio')?.value).toBe('transporte 1');
  });

  it('should render table headers correctly', () => {
    const compiled = fixture.nativeElement;
    const headers = compiled.querySelectorAll('th');

    expect(headers.length).toBe(8);
    expect(headers[0].textContent.trim()).toBe('Fracción arancelaria');
    expect(headers[1].textContent.trim()).toBe('Descripción de la fracción');
    expect(headers[2].textContent.trim()).toBe('Nico');
    expect(headers[3].textContent.trim()).toBe('Descripción Nico');
    expect(headers[4].textContent.trim()).toBe('Cantidad solicitada en UMT');
    expect(headers[5].textContent.trim()).toBe('Unidad de medida de tarifa (UMT)');
    expect(headers[6].textContent.trim()).toBe('Cantidad total UMT');
    expect(headers[7].textContent.trim()).toBe('Saldo pendiente');
  });

  it('should render table rows correctly', () => {
    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('tbody tr');

    expect(rows.length).toBe(1);

    const cells = rows[0].querySelectorAll('td');
    expect(cells.length).toBe(8);
    expect(cells[0].textContent.trim()).toBe('1001.10.10');
    expect(cells[1].textContent.trim()).toBe('Trigo duro');
    expect(cells[2].textContent.trim()).toBe('Sí');
    expect(cells[3].textContent.trim()).toBe('Trigo para molienda');
    expect(cells[4].textContent.trim()).toBe('50');
    expect(cells[5].textContent.trim()).toBe('kg');
    expect(cells[6].textContent.trim()).toBe('500');
    expect(cells[7].textContent.trim()).toBe('100');
  });

  it('should update tableData on ngOnChanges', () => {
    const changes: SimpleChanges = {
      hMercanciaTabla: {
        currentValue: ['Header1', 'Header2'],
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
      dMercanciaBody: {
        currentValue: [{ fraccionArancelaria: '1001.10.10', descripcionFraccion: 'Trigo duro' }],
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    };
  
    component.ngOnChanges(changes);
  
    expect(component.tableData.tableHeader).toEqual(['Header1', 'Header2']);
    expect(component.tableData.tableBody).toEqual([{ fraccionArancelaria: '1001.10.10', descripcionFraccion: 'Trigo duro' }]);
  });
  
  it('should not update tableData if changes are empty', () => {
    const changes: SimpleChanges = {};
  
    component.ngOnChanges(changes);
  
    expect(component.tableData.tableHeader).toEqual([]);
    expect(component.tableData.tableBody).toEqual([]);
  });
});
