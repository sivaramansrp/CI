import { By } from '@angular/platform-browser';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ControlContainer } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MedioTransporteComponent } from './medio-transporte.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { datosDeMercancias } from '../../../../core/models/220502/solicitud-pantallas.model';

@Component({
  selector: 'app-test-host',
  template: `<form [formGroup]="form">
               <app-medio-transporte [claveDeControl]="'testControl'" [hMercanciaTabla]="hMercanciaTabla" [dMercanciaBody]="dMercanciaBody" [mediodetransporte]="mediodetransporte"></app-medio-transporte>
             </form>`
})
class TestHostComponent {
  form: FormGroup;
  hMercanciaTabla: string[] = ['Fracción arancelaria', 'Descripción de la fracción', 'Nico', 'Descripción Nico', 'Cantidad solicitada en UMT', 'Unidad de medida de tarifa (UMT)', 'Cantidad total UMT', 'Saldo pendiente'];
  dMercanciaBody: datosDeMercancias[] = [
    {
      fraccionArancelaria: '1001.10.10',
      descripcionFraccion: 'Trigo duro',
      nico: 'Sí',
      nicoDescripcion: 'Trigo para molienda',
      cantidadSolicitadaUMT: 50,
      unidadMedidaUMT: 'kg',
      cantidadTotalUMT: 500,
      saldoPendiente: 100
    }
  ];
  mediodetransporte: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'transporte 1',
        tam: 'transporte 1',
        dpi: 'transporte 1',
      },
      {
        id: 2,
        descripcion: 'transporte 2',
        tam: 'transporte 2',
        dpi: 'transporte 2',
      },
      {
        id: 3,
        descripcion: 'transporte 3',
        tam: 'transporte 3',
        dpi: 'transporte 3',
      },
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
      declarations: [TestHostComponent],
      imports: [ReactiveFormsModule, MedioTransporteComponent, TituloComponent, CatalogoSelectComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ControlContainer,
          useValue: {
            control: new FormGroup({})
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.children[0].componentInstance;
    component = fixture.debugElement.query(By.directive(MedioTransporteComponent))?.componentInstance;
      
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls on ngOnInit', () => {
    component.ngOnInit();
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('transporteIdMedio')).toBeTruthy();
    expect(formGroup.get('identificacionTransporte')).toBeTruthy();
    expect(formGroup.get('esSolicitudFerros')).toBeTruthy();
    expect(formGroup.get('totalDeGuiasAmparadas')).toBeTruthy();
  });

  it('should remove control on ngOnDestroy', () => {
    component.ngOnInit();
    expect(component.grupoformulariopadre.contains(component.claveDeControl)).toBeTrue();
    component.ngOnDestroy();
    expect(component.grupoformulariopadre.contains(component.claveDeControl)).toBeFalse();
  });

  it('should handle catalog selection correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'transporte 1', tam: 'transporte 1', dpi: 'transporte 1' };
    component.selecctionMediodetransporte(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('transporteIdMedio').value).toBe('transporte 1');
  });

  it('should render table headers correctly', () => {
    const compiled = fixture.nativeElement;
    const headers = compiled.querySelectorAll('th');
    expect(headers.length).toBe(9);
    expect(headers[1].textContent.trim()).toContain('Fracción arancelaria');
    expect(headers[2].textContent.trim()).toContain('Descripción de la fracción');
    expect(headers[3].textContent.trim()).toContain('Nico');
    expect(headers[4].textContent.trim()).toContain('Descripción Nico');
    expect(headers[5].textContent.trim()).toContain('Cantidad solicitada en UMT');
    expect(headers[6].textContent.trim()).toContain('Unidad de medida de tarifa (UMT)');
    expect(headers[7].textContent.trim()).toContain('Cantidad total UMT');
    expect(headers[8].textContent.trim()).toContain('Saldo pendiente');
  });

  it('should render table rows correctly', () => {
    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    const cells = rows[0].querySelectorAll('td');
    expect(cells.length).toBe(9); // Including the checkbox column
    expect(cells[1].textContent).toContain('1001.10.10');
    expect(cells[2].textContent).toContain('Trigo duro');
    expect(cells[3].textContent).toContain('Sí');
    expect(cells[4].textContent).toContain('Trigo para molienda');
    expect(cells[5].textContent).toContain('50');
    expect(cells[6].textContent).toContain('kg');
    expect(cells[7].textContent).toContain('500');
    expect(cells[8].textContent).toContain('100');
  });
});