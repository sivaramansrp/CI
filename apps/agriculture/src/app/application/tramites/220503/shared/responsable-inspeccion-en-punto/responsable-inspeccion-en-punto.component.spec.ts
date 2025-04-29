import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormGroup,
  ControlContainer,
} from '@angular/forms';
import { of } from 'rxjs';
import { ResponsableInspeccionEnPuntoComponent } from './responsable-inspeccion-en-punto.component';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { Catalogo } from '@ng-mf/data-access-user';

describe('ResponsableInspeccionEnPuntoComponent', () => {
  let component: ResponsableInspeccionEnPuntoComponent;
  let fixture: ComponentFixture<ResponsableInspeccionEnPuntoComponent>;
  let mockSolicitudQuery: jest.Mocked<Solicitud220503Query>;
  let mockSolicitudStore: jest.Mocked<Solicitud220503Store>;
  let mockSolicitudService: jest.Mocked<SolicitudPantallasService>;
  let mockControlContainer: jest.Mocked<ControlContainer>;

  beforeEach(async () => {
    mockSolicitudQuery = {
      selectSolicitud$: jest.fn(),
    } as unknown as jest.Mocked<Solicitud220503Query>;

    mockSolicitudStore = {} as jest.Mocked<Solicitud220503Store>;

    mockSolicitudService = {
      getDataResponsableInspeccion: jest.fn(),
    } as unknown as jest.Mocked<SolicitudPantallasService>;

    mockControlContainer = {
      control: new FormGroup({}),
    } as unknown as jest.Mocked<ControlContainer>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ResponsableInspeccionEnPuntoComponent],
      providers: [
        { provide: Solicitud220503Query, useValue: mockSolicitudQuery },
        { provide: Solicitud220503Store, useValue: mockSolicitudStore },
        { provide: SolicitudPantallasService, useValue: mockSolicitudService },
        { provide: ControlContainer, useValue: mockControlContainer },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableInspeccionEnPuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a control to the form group on ngOnInit if claveDeControl is set', () => {
    component.claveDeControl = 'testControl';
    component.ngOnInit();
    expect(component.grupoFormularioPadre.contains('testControl')).toBeTruthy();
  });

  it('should patch form values when selectSolicitud$ emits', () => {
    const mockState = {
      nombre: 'John',
      primerapellido: 'Doe',
      segundoapellido: 'Smith',
      mercancia: 'Goods',
      tipocontenedor: 'ContainerType',
    };
    (
      mockSolicitudQuery.selectSolicitud$ as unknown as jest.Mock
    ).mockReturnValue(of(mockState));
    component.claveDeControl = 'testControl';
    component.ngOnInit();
    const formGroup = component.grupoFormularioPadre.get(
      'testControl'
    ) as FormGroup;
    expect(formGroup.value).toEqual(mockState);
  });

  it('should call cargarDatosIniciales on ngOnInit', () => {
    jest.spyOn(component, 'cargarDatosIniciales');
    component.ngOnInit();
    expect(component.cargarDatosIniciales).toHaveBeenCalled();
  });

  it('should update tipoContenedor on tipoContenedorSeleccion', () => {
    const mockCatalogo: Catalogo = { id: 1, descripcion: 'Test Description' };
    component.claveDeControl = 'testControl';
    component.ngOnInit();
    component.tipoContenedorSeleccion(mockCatalogo);
    const formGroup = component.grupoFormularioPadre.get(
      'testControl'
    ) as FormGroup;
    expect(formGroup.value.tipocontenedor).toEqual('Test Description');
  });

  it('should call getDataResponsableInspeccion on cargarDatosIniciales', () => {
    const mockData = {
      tipoContenedor: {
        labelNombre: 'string',
        required: false,
        primerOpcion: 'string',
        catalogos: [],
      },
    };
    mockSolicitudService.getDataResponsableInspeccion.mockReturnValue(
      of(mockData)
    );
    component.cargarDatosIniciales();
    expect(component.tipoContenedor).toEqual(mockData.tipoContenedor);
  });

  it('should remove control from form group on ngOnDestroy', () => {
    component.claveDeControl = 'testControl';
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.grupoFormularioPadre.contains('testControl')).toBeFalsy();
  });

  it('should complete destroyed$ subject on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
  });
});
