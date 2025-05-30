import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosEmpresaComponent } from './datos-empresa.component';
import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Tramite120602Store } from '../../../../estados/tramites/tramite120602.store';
import { Tramite120602Query } from '../../../../estados/queries/tramite120602.query';
import { of, Subject } from 'rxjs';

jest.mock('libs/shared/theme/assets/json/120602/drop-down.json', () => ({
  __esModule: true,
  default: {
    listaDesplegable: [
      { id: 1, descripcion: 'CHIHUAHUA' },
      { id: 2, descripcion: 'CIUDAD JUAREZ' },
    ],
  },
}));


describe('DatosEmpresaComponent', () => {
  let component: DatosEmpresaComponent;
  let fixture: ComponentFixture<DatosEmpresaComponent>;
  let tramiteStoreMock: Partial<Tramite120602Store>;
  let tramiteQueryMock: Partial<Tramite120602Query>;
  let consultaioQueryMock: Partial<ConsultaioQuery>;

  beforeEach(async () => {
    tramiteStoreMock = {
      setTipoEmpresa: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      // add other store methods used in tests if needed
    };

    tramiteQueryMock = {
      selectSolicitud$: of({
        estado: 'Estado1',
        representacionFederal: 'Federal1',
        tipoEmpresa: 'Empresa1',
        especifique: 'Especifique1',
        actividadEconomicaPreponderante: 'Actividad1',
        descripcion: 'Descripcion1',
        pais: 'Pais1',
        codigoPostal: '12345',
        estadoDomicilio: 'EstadoDomicilio1',
        municipioAlcaldia: 'Municipio1',
        localidad: 'Localidad1',
        colonia: 'Colonia1',
        calle: 'Calle1',
        numeroExterior: '1',
        numeroInterior: '2',
        lada: '123',
        telefono: '4567890',
        nacionalidad: 'Mexicana',
        tipoDePersona: 'Fisica',
        taxId: 'Tax123',
        denominacion: 'Denominacion1',
        datosPais: 'PaisDatos',
        datosCodigoPostal: '54321',
        datosEstado: 'EstadoDatos',
        correoElectronico: 'email@test.com'
      })
    };

  consultaioQueryMock = {
    selectConsultaioState$: of({
      procedureId: '',
      parameter: '',
      department: '',
      folioTramite: '',
      tipoDeTramite: '',
      estadoDeTramite: '',
      readonly: false,
      create: false,
      update: false,
      consultaioSolicitante: null
    })
  };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        TituloComponent,
        AlertComponent,
        InputRadioComponent,
        TablaDinamicaComponent,
        BtnContinuarComponent,
        DatosEmpresaComponent
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite120602Store, useValue: tramiteStoreMock },
        { provide: Tramite120602Query, useValue: tramiteQueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formularioEmpresa form on init', () => {
    expect(component.formularioEmpresa).toBeDefined();
    expect(component.formularioEmpresa.get('estado')).toBeDefined();
    expect(component.formularioEmpresa.get('representacionFederal')).toBeDefined();
  });

  it('should fill default values in the form', () => {
    expect(component.formularioEmpresa.get('pais')?.value).toBe('ESTADOS UNIDOS MEXICANOS');
    expect(component.formularioEmpresa.get('codigoPostal')?.value).toBe('32679');
    expect(component.formularioEmpresa.get('estado')?.value).toBe('CHIHUAHUA');
  });

  it('should set federalEstatal catalog options', () => {
    component.obtenerFederalEstatal();
    expect(component.federalEstatal.length).toBeGreaterThan(0);
  });


  it('should have table configurations defined', () => {
    expect(component.configuracionTabla.length).toBeGreaterThan(0);
    expect(component.tableHeader.length).toBeGreaterThan(0);
    expect(component.tableHeaderExtranjeros.length).toBeGreaterThan(0);
  });

  it('should have default data for tables', () => {
    expect(component.datosTablaExtranjeros).toBeDefined();
    expect(component.datosGenerales).toBeDefined();
    expect(component.tablaDatosSucursal).toBeDefined();
  });

  it('should initialize formularioEmpresa with values from tramiteQuery', done => {
    setTimeout(() => {
      expect(component.formularioEmpresa).toBeDefined();
      expect(component.formularioEmpresa.get('estado')?.value).toBe('Estado1');
      expect(component.formularioEmpresa.get('representacionFederal')?.value).toBe('Federal1');
      done();
    }, 10);
  });

   it('should disable all form controls when esFormularioSoloLectura is true', done => {
    consultaioQueryMock.selectConsultaioState$ = of({
      procedureId: '',
      parameter: '',
      department: '',
      folioTramite: '',
      tipoDeTramite: '',
      estadoDeTramite: '',
      readonly: true,
      create: false,
      update: false,
      consultaioSolicitante: null
    });
    component['destroyNotifier$'] = new Subject<void>();

    component.ngOnInit();
    setTimeout(() => {
      expect(component.esFormularioSoloLectura).toBe(true);
      const allDisabled = Object.keys(component.formularioEmpresa.controls).every(control =>
        component.formularioEmpresa.get(control)?.disabled
      );
      expect(allDisabled).toBe(true);
      done();
    }, 10);
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should set federalEstatal on obtenerFederalEstatal call', () => {
    component.obtenerFederalEstatal();
    expect(component.federalEstatal).toBeDefined();
    expect(component.federalEstatal.length).toBeGreaterThan(0);
  });
});
