import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder,FormGroup,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevolverComponent } from './devolver.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite140103Store } from '../../../../estados/tramites/tramite140103.store';
import { Tramite140103Query } from '../../../../estados/queries/tramite140103.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

// Mock facturasdata JSON
jest.mock('@libs/shared/theme/assets/json/140103/fracturastable.json', () => ({
  __esModule: true,
  default: {
    facturas: [
      { numeroDeFactura: 'F001', importeInicial: '1000', saldoaDevolver: '500' }
    ],
    facturase: [
      { numeroDeFactura: 'F002', importeInicial: '2000' }
    ]
  }
}));

// Mock services
const mockStore = {
  someStoreMethod: jest.fn()
};

const solicitud$ = new Subject<any>();
const readonly$ = new Subject<any>();

const mockQuery = {
  selectSolicitud$: of({ cantidad: '123' })
};

const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: false })
};

describe('DevolverComponent', () => {
  let component: DevolverComponent;
  let fixture: ComponentFixture<DevolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TituloComponent,
        TablaDinamicaComponent,
        FormsModule,
        ReactiveFormsModule,
        DevolverComponent,
        CommonModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite140103Store, useValue: mockStore },
        { provide: Tramite140103Query, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolverComponent);
    component = fixture.componentInstance;

    readonly$.next({ readonly: false });
    solicitud$.next({ cantidad: '123' });

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize facturas and facturase arrays with data from the JSON', () => {
    expect(component.facturas).toBeDefined();
    expect(component.facturas.length).toBeGreaterThan(0);
  });

  it('should initialize form with default values', () => {
    const form = component.DevolverForm;
    expect(form.get('folio')?.value).toBe('4MX216520');
    expect(form.get('disponible')?.value).toBe('12');
    expect(form.get('cantidad')?.value).toBe('123');
    expect(form.get('total')?.value).toBe('12');
    expect(form.get('cuadrados')?.value).toBe('133');
  });

  it('should initialize the form with the correct controls', () => {
    expect(component.DevolverForm).toBeTruthy();
    expect(component.DevolverForm instanceof FormGroup).toBe(true);
    expect(component.DevolverForm.get('DevolverData')).toBeTruthy();
    expect(component.DevolverForm.get('DevolverData.folio')).toBeTruthy();
    expect(component.DevolverForm.get('DevolverData.cantidad')).toBeTruthy();
    expect(component.DevolverForm.get('DevolverData.cantidad')?.hasValidator(Validators.required)).toBe(true);
  });

  it('should disable form controls after calling updateformfied()', () => {
    component.updateformfied();

    const FOLIOCONTROL = component.DevolverForm.get('DevolverData.folio');
    const DISPONSIBLECONTROL = component.DevolverForm.get('DevolverData.disponible');
    const TOTALCONTROL = component.DevolverForm.get('DevolverData.total');
    const CUADRADOS_CONTROL = component.DevolverForm.get('DevolverData.cuadrados');

    expect(FOLIOCONTROL?.disabled).toBe(true);
    expect(DISPONSIBLECONTROL?.disabled).toBe(true);
    expect(TOTALCONTROL?.disabled).toBe(true);
    expect(CUADRADOS_CONTROL?.disabled).toBe(true);
  });

  it('should set form values correctly in updateformfied()', () => {
    component.updateformfied();

    const FOLIOCONTROL = component.DevolverForm.get('DevolverData.folio');
    const DISPONSIBLECONTROL = component.DevolverForm.get('DevolverData.disponible');
    const TOTALCONTROL = component.DevolverForm.get('DevolverData.total');
    const CUADRADOS_CONTROL = component.DevolverForm.get('DevolverData.cuadrados');

    expect(FOLIOCONTROL?.value).toBe('4MX216520');
    expect(DISPONSIBLECONTROL?.value).toBe('12');
    expect(TOTALCONTROL?.value).toBe('12');
    expect(CUADRADOS_CONTROL?.value).toBe('133');
  });

    it('should disable form in readonly mode (guardarDatosFormulario)', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.DevolverForm.disabled).toBe(true);
  });

  it('should enable form in editable mode (guardarDatosFormulario)', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.DevolverForm.enabled).toBe(true);
  });

  it('should clean up observables on destroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
 
});

