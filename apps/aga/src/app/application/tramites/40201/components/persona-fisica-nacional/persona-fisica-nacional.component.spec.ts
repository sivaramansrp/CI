import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PersonaFisicaNacionalComponent } from './persona-fisica-nacional.component';
import { Tramite40201Store } from '../../../../core/estados/tramites/tramite40201.store';
import { Tramite40201Query } from '../../../../core/queries/tramite40201.query';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';

describe('PersonaFisicaNacionalComponent', () => {
  let component: PersonaFisicaNacionalComponent;
  let fixture: ComponentFixture<PersonaFisicaNacionalComponent>;
  let tramite40201StoreMock: jest.Mocked<Tramite40201Store>;
  let tramite40201QueryMock: jest.Mocked<Tramite40201Query>;
  let transportacionMaritimaServiceMock: jest.Mocked<TransportacionMaritimaService>;

  beforeEach(async () => {
    tramite40201StoreMock = {
      setPersonaFisicaNacionalTabla: jest.fn(),
      setPaisPFN: jest.fn(),
      setEstadoPFN: jest.fn(),
      setMunicipioPFN: jest.fn(),
      setColoniaPFN: jest.fn(),
      setBuscarRfcPFN: jest.fn(),
      setRfcPFN: jest.fn(),
      setNombrePFN: jest.fn(),
      setApellidoPaternoPFN: jest.fn(),
      setApellidoMaternoPFN: jest.fn(),
      setCodigoPostalPFN: jest.fn(),
      setLocalidadPFN: jest.fn(),
      setCallePFN: jest.fn(),
      setNumeroExteriorPFN: jest.fn(),
      setNumeroInteriorPFN: jest.fn(),
    } as unknown as jest.Mocked<Tramite40201Store>;

    tramite40201QueryMock = {
      selectSeccionState$: of({
        personaFisicaNacionalTabla: [],
        buscarRfcPFN: '',
        rfcPFN: '',
        nombrePFN: '',
        apellidoPaternoPFN: '',
        apellidoMaternoPFN: '',
        paisPFN: '',
        codigoPostalPFN: '',
        estadoPFN: '',
        municipioPFN: '',
        localidadPFN: '',
        coloniaPFN: '',
        callePFN: '',
        numeroExteriorPFN: '',
        numeroInteriorPFN: '',
      }),
    } as unknown as jest.Mocked<Tramite40201Query>;

    transportacionMaritimaServiceMock = {
      getPaisCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      getEstadoCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      getMunicipioCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      getColoniaCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
      buscarContribuyentePFN: jest.fn().mockReturnValue(of({ data: [] })),
    } as unknown as jest.Mocked<TransportacionMaritimaService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PersonaFisicaNacionalComponent],
      providers: [
        FormBuilder,
        { provide: Tramite40201Store, useValue: tramite40201StoreMock },
        { provide: Tramite40201Query, useValue: tramite40201QueryMock },
        { provide: TransportacionMaritimaService, useValue: transportacionMaritimaServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaFisicaNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.personaFisicaForm).toBeDefined();
    expect(component.pais).toEqual([]);
    expect(component.estado).toEqual([]);
    expect(component.municipio).toEqual([]);
    expect(component.colonia).toEqual([]);
  });

  it('should reset form fields and update the store on limpiarDatosPFN', () => {
    jest.spyOn(component, 'actualizarFormularioState');
    component.limpiarDatosPFN();
    expect(component.personaFisicaForm.pristine).toBeTruthy();
    expect(component.actualizarFormularioState).toHaveBeenCalled();
  });

  it('should fetch catalogs on inicializaCatalogos', () => {
    const mockPais = [{ id: 1, descripcion: 'México' }];
    transportacionMaritimaServiceMock.getPaisCatalogo.mockReturnValue(of({ code: 200, data: mockPais, message: 'Success' }));
    component.inicializaCatalogos();
    expect(component.pais).toEqual(mockPais);
  });

  it('should update the store when a country is selected', () => {
    component.personaFisicaForm.get('paisPFN')?.setValue('1');
    component.paisSeleccion();
    expect(tramite40201StoreMock.setPaisPFN).toHaveBeenCalledWith('1');
  });

  it('should add a new person to the table on agregarPFN', () => {
    const mockFormData = {
      nombrePFN: 'John',
      rfcPFN: 'RFC123',
      codigoPostalPFN: '12345',
      localidadPFN: 'Localidad',
      callePFN: 'Calle',
      coloniaPFN: '1',
      paisPFN: '1',
      estadoPFN: '1',
      municipioPFN: '1',
      numeroExteriorPFN: '123',
    };
    const mockPais = [{ id: 1, descripcion: 'México' }];
    const mockEstado = [{ id: 1, descripcion: 'Estado' }];
    const mockMunicipio = [{ id: 1, descripcion: 'Municipio' }];
    const mockColonia = [{ id: 1, descripcion: 'Colonia' }];
    component.pais = mockPais;
    component.estado = mockEstado;
    component.municipio = mockMunicipio;
    component.colonia = mockColonia;

    component.agregarPFN(mockFormData as any);

    expect(component.personaFisicaNacionalTabla.length).toBe(1);
    expect(component.personaFisicaNacionalTabla[0]).toEqual({
      nombrePFN: 'John',
      rfcPFN: 'RFC123',
      codigoPostalPFN: '12345',
      localidadPFN: 'Localidad',
      callePFN: 'Calle',
      coloniaPFN: 'Colonia',
      paisPFN: 'México',
      estadoPFN: 'Estado',
      municipioPFN: 'Municipio',
      domicilioPFN: 'Calle 123 Colonia Estado Municipio México 12345',
    });
    expect(tramite40201StoreMock.setPersonaFisicaNacionalTabla).toHaveBeenCalledWith(component.personaFisicaNacionalTabla);
  });

  it('should update the store with form values on actualizarFormularioState', () => {
    component.personaFisicaForm.get('nombrePFN')?.setValue('John');
    component.actualizarFormularioState();
    expect(tramite40201StoreMock.setNombrePFN).toHaveBeenCalledWith('John');
  });

  it('should close the modal on cerrarModal', () => {
    const closeModalMock = { nativeElement: { click: jest.fn() } };
    component.closeModal = closeModalMock as any;
    component.cerrarModal();
    expect(closeModalMock.nativeElement.click).toHaveBeenCalled();
  });

  it('should complete destruirNotificador$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destruirNotificador$'], 'next');
    const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});