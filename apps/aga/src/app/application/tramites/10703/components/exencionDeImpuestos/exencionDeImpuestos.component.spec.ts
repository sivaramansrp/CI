import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExencionDeImpuestosComponent } from './exencionDeImpuestos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExencionDeImpuestosService } from '../../services/exencion-de-impuestos.service';
import { Tramite10703Store } from '../../estados/tramite10703.store';
import { Tramite10703Query } from '../../estados/tramite10703.query';
import { of } from 'rxjs';
import { MECANCIA_OPTIONS } from '../../enums/exencionDeImpuestos.enum';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  Catalogo,
  CatalogoSelectComponent,
  InputCheckComponent,
  InputRadioComponent,
  TableComponent,
  TituloComponent,
  FirmaElectronicaComponent, SharedModule, WizardComponent
} from '@libs/shared/data-access-user/src';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
const MOCK_PAISES: Catalogo[] = [
  { id: 1, descripcion: 'País 1' },
  { id: 2, descripcion: 'País 2' }
];
describe('ExencionDeImpuestosComponent', () => {
  let component: ExencionDeImpuestosComponent;
  let fixture: ComponentFixture<ExencionDeImpuestosComponent>;
  let exencionDeImpuestosServiceMock: any;
  let tramite10703StoreMock: any;
  let tramite10703QueryMock: any;

  beforeEach(async () => {
    exencionDeImpuestosServiceMock = {
      getAduanaIngresara: jest.fn().mockReturnValue(of({ data: [] })),
      getusoEspecifico: jest.fn().mockReturnValue(of({ data: [] })),
      getPais: jest.fn().mockReturnValue(of({ data: [] })),
      getAno: jest.fn().mockReturnValue(of({ data: [] })),
      getUnidadMedida: jest.fn().mockReturnValue(of({ data: [] })),
      getCondicionMercancia: jest.fn().mockReturnValue(of({ data: [] })),
      getMercanciaTbl: jest.fn().mockReturnValue(of({ tableHeader: [], tableBody: [] })),
      getInicializarMercancias: jest.fn().mockReturnValue(of({ code: 200, data: [{}] })),
      getInicializarDatos: jest.fn().mockReturnValue(of({})),
    };

    tramite10703StoreMock = {
      updateFormState: jest.fn(),
      setAduana: jest.fn(),
    };

    tramite10703QueryMock = {
      selectSolicitud$: of({}),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ExencionDeImpuestosComponent, ReactiveFormsModule, CommonModule,
          TituloComponent,
          CatalogoSelectComponent,
          InputCheckComponent,
          TableComponent,
          InputRadioComponent,
          FirmaElectronicaComponent,
          RouterModule,
          FormsModule,
          HttpClientModule,
          WizardComponent,
          SharedModule,
          HttpClientTestingModule,
  
        ],
      providers: [
        FormBuilder,
        { provide: ExencionDeImpuestosService, useValue: exencionDeImpuestosServiceMock },
        { provide: Tramite10703Store, useValue: tramite10703StoreMock },
        { provide: Tramite10703Query, useValue: tramite10703QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExencionDeImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize catalogs on ngOnInit', () => {
    const inicializaCatalogosSpy = jest.spyOn(component as any, 'inicializaCatalogos');
    component.ngOnInit();
    expect(inicializaCatalogosSpy).toHaveBeenCalled();
  });

  it('should initialize exencion de impuestos data on ngOnInit', () => {
    const inicializaExencionDelmpustosSpy = jest.spyOn(component as any, 'inicializaExencionDelmpustos');
    component.ngOnInit();
    expect(inicializaExencionDelmpustosSpy).toHaveBeenCalled();
  });

  it('should initialize mercancias on ngOnInit', () => {
    const inicializaMercanciasSpy = jest.spyOn(component as any, 'inicializaMercancias');
    component.ngOnInit();
    expect(inicializaMercanciasSpy).toHaveBeenCalled();
  });

  it('should call getMercanciaTbl on ngOnInit', () => {
    const getMercanciaTblSpy = jest.spyOn(component, 'getMercanciaTbl');
    component.ngOnInit();
    expect(getMercanciaTblSpy).toHaveBeenCalled();
  });

  it('should set radioOptions to MECANCIA_OPTIONS on ngOnInit', () => {
    component.ngOnInit();
    expect(component.radioOptions).toEqual(MECANCIA_OPTIONS);
  });

  it('should initialize tramiteForm in getExencionDelmpuestor', () => {
    component.solicitudState = { aduana: 'test' } as any;
    component.getExencionDelmpuestor();
    expect(component.tramiteForm.get('importadorExportador.aduana')?.value).toEqual('test');
  });

  it('should initialize agregarMercanciasForm in initagregarMercanciasForm', () => {
    component.solicitudState = { tipoDeMercancia: 'test' } as any;
    component.initagregarMercanciasForm();
    expect(component.agregarMercanciasForm.get('datosMercancia.tipoDeMercancia')?.value).toEqual('test');
  });

  it('should open modal in abrirDialogoMercancias', () => {
    const modalElementMock = { nativeElement: document.createElement('div') };
    component.modalElement = modalElementMock as any;
    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.abrirDialogoMercancias();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });

  it('should fetch and set mercancia table data in getMercanciaTbl', () => {
    component.getMercanciaTbl();
    expect(exencionDeImpuestosServiceMock.getMercanciaTbl).toHaveBeenCalled();
  });

  it('should update aduana in aduanaSeleccion', () => {
    component.tramiteForm = new FormBuilder().group({
      importadorExportador: new FormBuilder().group({
        aduana: ['123'],
      }),
    });
    component.aduanaSeleccion();
    expect(tramite10703StoreMock.setAduana).toHaveBeenCalledWith(123);
  });
});