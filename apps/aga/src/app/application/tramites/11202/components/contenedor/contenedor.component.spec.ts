import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ContenedorComponent } from './contenedor.component';
import { DatosTramiteService } from 'libs/shared/data-access-user/src/core/services/11202/datos-tramite.service';
import { Contenedor11202Store } from '../../../../estados/tramites/contenedor11202.store';
import { Contenedor11202Query } from '../../../../estados/queries/contenedor11202.query';

describe('ContenedorComponent', () => {
  let component: ContenedorComponent;
  let fixture: ComponentFixture<ContenedorComponent>;
  let datosTramiteService: jest.Mocked<DatosTramiteService>;
  let contenedorStore: jest.Mocked<Contenedor11202Store>;
  let contenedorQuery: jest.Mocked<Contenedor11202Query>;

  beforeEach(async () => {
    const datosTramiteServiceMock = {
      getAduanas: jest.fn(),
      getContenedores: jest.fn(),
      submitSolicitud: jest.fn(),
    };

    const contenedorStoreMock = {
      setTipoBusqueda: jest.fn(),
    };

    const contenedorQueryMock = {
      selectSolicitud$: of({}),
    };

    await TestBed.configureTestingModule({
      declarations: [ContenedorComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: DatosTramiteService, useValue: datosTramiteServiceMock },
        { provide: Contenedor11202Store, useValue: contenedorStoreMock },
        { provide: Contenedor11202Query, useValue: contenedorQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedorComponent);
    component = fixture.componentInstance;
    datosTramiteService = TestBed.inject(DatosTramiteService) as jest.Mocked<DatosTramiteService>;
    contenedorStore = TestBed.inject(Contenedor11202Store) as jest.Mocked<Contenedor11202Store>;
    contenedorQuery = TestBed.inject(Contenedor11202Query) as jest.Mocked<Contenedor11202Query>;

   // contenedorQuery.selectSolicitud$.mockReturnValue(of({}));
    datosTramiteService.getAduanas.mockReturnValue(of([]));
    datosTramiteService.getContenedores.mockReturnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
  });

  it('should call cargarCatalogAduanas on ngOnInit', () => {
    jest.spyOn(component, 'cargarCatalogAduanas');
    component.ngOnInit();
    expect(component.cargarCatalogAduanas).toHaveBeenCalled();
  });

  it('should call cargarCatalogContenedores on ngOnInit', () => {
    jest.spyOn(component, 'cargarCatalogContenedores');
    component.ngOnInit();
    expect(component.cargarCatalogContenedores).toHaveBeenCalled();
  });

  it('should call mostrarCampos when tipoBusqueda changes', () => {
    component.ngOnInit();
    jest.spyOn(component, 'mostrarCampos');
    component.solicitudForm.get('tipoBusqueda')?.setValue('Contenedor');
    expect(component.mostrarCampos).toHaveBeenCalled();
  });

  

  it('should not call submitSolicitud on datosCaptura if form is invalid', () => {
    component.ngOnInit();
    component.solicitudForm.setValue({
      idSolicitud: null,
      tipoBusqueda: '',
      datosGenerales: { aduana: '' },
      datosContenedor: { inicialesContenedor: '', numeroContenedor: '', tipoContenedor: '' },
    });
    component.datosCaptura();
    expect(datosTramiteService.submitSolicitud).not.toHaveBeenCalled();
  });

  it('should add a new contenedor to the grid on agregarAGrid', () => {
    component.ngOnInit();
    component.solicitudForm.setValue({
      idSolicitud: 1,
      tipoBusqueda: 'Contenedor',
      datosGenerales: { aduana: 'Aduana1' },
      datosContenedor: { inicialesContenedor: 'ABC', numeroContenedor: '123', tipoContenedor: 'Tipo1' },
    });
    component.agregarAGrid();
    expect(component.contenedores.length).toBe(1);
  });

  

  it('should call setValoresStore on tipoBusqueda value change', () => {
    jest.spyOn(component, 'setValoresStore');
    component.ngOnInit();
    component.solicitudForm.get('tipoBusqueda')?.setValue('Archivo CSV');
    expect(component.setValoresStore).toHaveBeenCalledWith(component.solicitudForm, 'tipoBusqueda', 'setTipoBusqueda');
  });
});