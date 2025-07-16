import { TestBed } from '@angular/core/testing';
import { MedioTransporteComponent } from './medio-transporte.component';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { AlertComponent, CatalogoSelectComponent, CatalogosSelect, ConsultaioQuery, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';


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
  let fixture: any;
  let mockSolicitud220503Query: any;
  let mockSolicitud220503Store: any;
  let mockConsultaioQuery: any;
  let parentFormGroup: FormGroup;

  beforeEach(async () => {
    mockSolicitud220503Query = {
      selectSolicitud$: of({
        transporteIdMedio: '1',
        identificacionTransporte: 'ABC123',
        esSolicitudFerros: 'NO',
        totalDeGuiasAmparadas: '5',
      }),
    };
    mockSolicitud220503Store = {
      setEsSolicitudFerros: jest.fn(),
      setTransporteIdMedio: jest.fn(),
      setIdentificacionTransporte: jest.fn(),
      setTotalDeGuiasAmparadas: jest.fn(),
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MedioTransporteComponent,
         CommonModule,
            TituloComponent,
            CatalogoSelectComponent,
            TableComponent,
            InputRadioComponent,
            AlertComponent,
            HttpClientTestingModule
      ],
      providers: [
        { provide: Solicitud220503Query, useValue: mockSolicitud220503Query },
        { provide: Solicitud220503Store, useValue: mockSolicitud220503Store },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        {
          provide: ControlContainer,
          useValue: {
            control: new FormGroup({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MedioTransporteComponent);
    component = fixture.componentInstance;
    parentFormGroup = (component as any).parentContainer.control as FormGroup;
    component.claveDeControl = 'testControl';
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a dynamic FormGroup to parent form on inicializarFormulario', () => {
    component.solicitud220502State = {
      transporteIdMedio: '2',
      identificacionTransporte: 'DEF456',
      esSolicitudFerros: 'SI',
      totalDeGuiasAmparadas: '10',
    } as any;
    component.inicializarFormulario();
    expect(parentFormGroup.contains('testControl')).toBe(true);
    const fg = parentFormGroup.get('testControl') as FormGroup;
    expect(fg.value.transporteIdMedio).toBe('2');
    expect(fg.value.identificacionTransporte).toBe('DEF456');
    expect(fg.value.esSolicitudFerros).toBe('SI');
    expect(fg.value.totalDeGuiasAmparadas).toBe('10');
  });

  it('should patch form values when selectSolicitud$ emits', () => {
    component.inicializarFormulario();
    const fg = parentFormGroup.get('testControl') as FormGroup;
    expect(fg.value.transporteIdMedio).toBe('1');
    expect(fg.value.identificacionTransporte).toBe('ABC123');
    expect(fg.value.esSolicitudFerros).toBe('NO');
    expect(fg.value.totalDeGuiasAmparadas).toBe('5');
  });

  it('should update tableData on ngOnChanges', () => {
    const changes: any = {
      hMercanciaTabla: { currentValue: ['col1', 'col2'] },
      dMercanciaBody: { currentValue: [{ a: 1 }, { a: 2 }] },
    };
    component.ngOnChanges(changes);
    expect(component.tableData.tableHeader).toEqual(['col1', 'col2']);
    expect(component.tableData.tableBody).toEqual([{ a: 1 }, { a: 2 }]);
  });

  it('should call setEsSolicitudFerros on enCambioDeValor', () => {
    component.enCambioDeValor('SI');
    expect(component.enCambioValor).toBe('SI');
    expect(mockSolicitud220503Store.setEsSolicitudFerros).toHaveBeenCalledWith('SI');
  });

  it('should patch transporteIdMedio on seleccionMedioDeTransporte', () => {
    component.inicializarFormulario();
    const catalogo: Catalogo = { id: 1, descripcion: 'CAMION' } as any;
    component.seleccionMedioDeTransporte(catalogo);
    const fg = parentFormGroup.get('testControl') as FormGroup;
    expect(fg.value.transporteIdMedio).toBe('CAMION');
  });

  it('should call setTransporteIdMedio', () => {
    const catalogo: Catalogo = { id: 99, descripcion: 'BARCO' } as any;
    component.setTransporteIdMedio(catalogo);
    expect(mockSolicitud220503Store.setTransporteIdMedio).toHaveBeenCalledWith(99);
  });

  it('should call setIdentificacionTransporte', () => {
    const event = { target: { value: 'XYZ789' } } as any;
    component.setIdentificacionTransporte(event);
    expect(mockSolicitud220503Store.setIdentificacionTransporte).toHaveBeenCalledWith('XYZ789');
  });

  it('should call setTotalDeGuiasAmparadas', () => {
    const event = { target: { value: '20' } } as any;
    component.setTotalDeGuiasAmparadas(event);
    expect(mockSolicitud220503Store.setTotalDeGuiasAmparadas).toHaveBeenCalledWith('20');
  });

  it('should remove control and complete destroyed$ on ngOnDestroy', () => {
    component.inicializarFormulario();
    const destroyed$ = component['destroyed$'];
    jest.spyOn(destroyed$, 'next');
    jest.spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(parentFormGroup.contains('testControl')).toBe(false);
    expect(destroyed$.next).toHaveBeenCalled();
    expect(destroyed$.complete).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toBeDefined();
    expect(spy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if esFormularioSoloLectura is false', () => {
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.inicializarFormulario).toBeDefined();
    expect(spy).toHaveBeenCalled();
  });
});