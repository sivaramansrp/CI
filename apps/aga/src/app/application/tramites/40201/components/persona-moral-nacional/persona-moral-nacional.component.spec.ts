import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { PersonaMoralNacionalComponent } from './persona-moral-nacional.component';
import { Tramite40201Store } from '../../../../core/estados/tramites/tramite40201.store';
import { Tramite40201Query } from '../../../../core/queries/tramite40201.query';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';

describe('PersonaMoralNacionalComponent', () => {
  let component: PersonaMoralNacionalComponent;
  let fixture: ComponentFixture<PersonaMoralNacionalComponent>;
  let tramite40201StoreMock: jest.Mocked<Tramite40201Store>;
  let tramite40201QueryMock: jest.Mocked<Tramite40201Query>;
  let transportacionMaritimaServiceMock: jest.Mocked<TransportacionMaritimaService>;

  beforeEach(async () => {
    tramite40201StoreMock = {
      setPersonaMoralNacionalTabla: jest.fn(),
      setPaisPMN: jest.fn(),
      setEstadoPMN: jest.fn(),
      setMunicipioPMN: jest.fn(),
      setColoniaPMN: jest.fn(),
      setBuscarRfcPMN: jest.fn(),
      setRfcPMN: jest.fn(),
      setDenominacionPMN: jest.fn(),
      setCorreoPMN: jest.fn(),
      setCodigoPostalPMN: jest.fn(),
      setLocalidadPMN: jest.fn(),
      setCallePMN: jest.fn(),
      setNumeroExteriorPMN: jest.fn(),
      setNumeroInteriorPMN: jest.fn(),
      setNombreDirectorGeneral: jest.fn(),
      setApellidoPaternoDirectorGeneral: jest.fn(),
      setApellidoMaternoDirectorGeneral: jest.fn(),
    } as unknown as jest.Mocked<Tramite40201Store>;

    tramite40201QueryMock = {
      selectSeccionState$: of({
          personaMoralNacionalTabla: [],
          buscarRfcPMN: '',
          rfcPMN: '',
          denominacionPMN: '',
          correoPMN: '',
          paisPMN: '',
          codigoPostalPMN: '',
          estadoPMN: '',
          municipioPMN: '',
          localidadPMN: '',
          coloniaPMN: '',
          callePMN: '',
          numeroExteriorPMN: '',
          numeroInteriorPMN: '',
          nombreDirectorGeneral: '',
          apellidoPaternoDirectorGeneral: '',
          apellidoMaternoDirectorGeneral: '',
        }),
    } as unknown as jest.Mocked<Tramite40201Query>;

    transportacionMaritimaServiceMock = {
      getPaisCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      getEstadoCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      getMunicipioCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      getColoniaCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      buscarContribuyentePMN: jest.fn().mockReturnValue(of({ data: [] })),
    } as unknown as jest.Mocked<TransportacionMaritimaService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PersonaMoralNacionalComponent],
      providers: [
        FormBuilder,
        { provide: Tramite40201Store, useValue: tramite40201StoreMock },
        { provide: Tramite40201Query, useValue: tramite40201QueryMock },
        { provide: TransportacionMaritimaService, useValue: transportacionMaritimaServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaMoralNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.personaMoralForm).toBeDefined();
    expect(component.pais).toEqual([]);
    expect(component.estado).toEqual([]);
    expect(component.municipio).toEqual([]);
    expect(component.colonia).toEqual([]);
  });

  it('should fetch catalogs on inicializaCatalogos', () => {
    const mockPais = [{ id: 1, descripcion: 'México' }];
    transportacionMaritimaServiceMock.getPaisCatalogo.mockReturnValue(of({ code: 200, data: mockPais, message: 'Success' }));
    component.inicializaCatalogos();
    expect(component.pais).toEqual(mockPais);
  });

  it('should update the store when a country is selected', () => {
    component.personaMoralForm.get('paisPMN')?.setValue('1');
    component.paisSeleccion();
    expect(tramite40201StoreMock.setPaisPMN).toHaveBeenCalledWith('1');
  });

  it('should add a new person to the table on agregarPMN', () => {
    const mockFormData = {
      denominacionPMN: 'Empresa 1',
      rfcPMN: 'RFC123',
      correoPMN: 'empresa1@example.com',
      localidadPMN: 'Localidad',
      callePMN: 'Calle',
      coloniaPMN: '1',
      paisPMN: '1',
      estadoPMN: '1',
      municipioPMN: '1',
      numeroExteriorPMN: '123',
    };
    const mockPais = [{ id: 1, descripcion: 'México' }];
    const mockEstado = [{ id: 1, descripcion: 'Estado' }];
    const mockMunicipio = [{ id: 1, descripcion: 'Municipio' }];
    const mockColonia = [{ id: 1, descripcion: 'Colonia' }];
    component.pais = mockPais;
    component.estado = mockEstado;
    component.municipio = mockMunicipio;
    component.colonia = mockColonia;

    component.agregarPMN(mockFormData as any);

    expect(component.personaMoralNacionalTabla.length).toBe(1);
    expect(component.personaMoralNacionalTabla[0]).toEqual({
      denominacionPMN: 'Empresa 1',
      rfcPMN: 'RFC123',
      correoPMN: 'empresa1@example.com',
      localidadPMN: 'Localidad',
      callePMN: 'Calle',
      coloniaPMN: 'Colonia',
      paisPMN: 'México',
      estadoPMN: 'Estado',
      municipioPMN: 'Municipio',
      nombreDirectorGeneral: '',
      domicilioPMN: 'Calle 123 Colonia Estado Municipio México',
    });
    expect(tramite40201StoreMock.setPersonaMoralNacionalTabla).toHaveBeenCalledWith(component.personaMoralNacionalTabla);
  });
});