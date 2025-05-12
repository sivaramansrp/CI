import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PersonaFisicaExtranjeraComponent } from './persona-fisica-extranjera.component';
import { Tramite40201Store } from '../../../../core/estados/tramites/tramite40201.store';
import { Tramite40201Query } from '../../../../core/queries/tramite40201.query';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';

describe('PersonaFisicaExtranjeraComponent', () => {
  let component: PersonaFisicaExtranjeraComponent;
  let fixture: ComponentFixture<PersonaFisicaExtranjeraComponent>;
  let tramite40201StoreMock: jest.Mocked<Tramite40201Store>;
  let tramite40201QueryMock: jest.Mocked<Tramite40201Query>;
  let transportacionMaritimaServiceMock: jest.Mocked<TransportacionMaritimaService>;

  beforeEach(async () => {
    tramite40201StoreMock = {
      setPersonaFisicaExtranjeraTabla: jest.fn(),
      setPaisPFE: jest.fn(),
      setNombrePFE: jest.fn(),
      setSeguroNumero: jest.fn(),
      setApellidoMaternoPFE: jest.fn(),
      setCorreoPFE: jest.fn(),
      setCodigoPostalPFE: jest.fn(),
      setCiudadPFE: jest.fn(),
      setEstadoPFE: jest.fn(),
      setCallePFE: jest.fn(),
      setNumeroExteriorPFE: jest.fn(),
      setNumeroInteriorPFE: jest.fn(),
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
    } as unknown as jest.Mocked<TransportacionMaritimaService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PersonaFisicaExtranjeraComponent],
      providers: [
        FormBuilder,
        { provide: Tramite40201Store, useValue: tramite40201StoreMock },
        { provide: Tramite40201Query, useValue: tramite40201QueryMock },
        { provide: TransportacionMaritimaService, useValue: transportacionMaritimaServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaFisicaExtranjeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.personaFisicaExtranjeraForm).toBeDefined();
    expect(component.pais).toEqual([]);
  });

  it('should reset form fields and update the store on limpiarDatosPFE', () => {
    jest.spyOn(component, 'actualizarFormularioState');
    component.limpiarDatosPFE();
    expect(component.personaFisicaExtranjeraForm.pristine).toBeTruthy();
    expect(component.actualizarFormularioState).toHaveBeenCalled();
  });

  it('should fetch country catalog on inicializaCatalogos', () => {
    const mockPais = [{ id: 1, descripcion: 'México' }];
    transportacionMaritimaServiceMock.getPaisCatalogo.mockReturnValue(of({ code: 200, data: mockPais, message: 'Success' }));
    component.inicializaCatalogos();
    expect(component.pais).toEqual(mockPais);
  });

  it('should update the store when a country is selected', () => {
    component.personaFisicaExtranjeraForm.get('paisPFE')?.setValue('1');
    component.paisSeleccion();
    expect(tramite40201StoreMock.setPaisPFE).toHaveBeenCalledWith('1');
  });

  it('should add a new person to the table on agregarPFE', () => {
    const mockFormData = {
      nombrePFE: 'John',
      apellidoPaternoPFE: 'Doe',
      apellidoMaternoPFE: 'Smith',
      seguroNumero: '12345678901',
      correoPFE: 'john.doe@example.com',
      paisPFE: '1',
      codigoPostalPFE: '12345',
      ciudadPFE: 'Ciudad',
      estadoPFE: 'Estado',
      callePFE: 'Calle',
      numeroExteriorPFE: '123',
      numeroInteriorPFE: '456',
    };
    const mockPais = [{ id: 1, descripcion: 'México' }];
    component.pais = mockPais;

    component.agregarPFE(mockFormData as any);

    expect(component.personaFisicaExtranjeraTabla.length).toBe(1);
    expect(component.personaFisicaExtranjeraTabla[0]).toEqual({
      nombrePFE: 'John Doe Smith',
      seguroNumero: '12345678901',
      estadoPFE: 'Estado',
      correoPFE: 'john.doe@example.com',
      paisPFE: 'México',
      domicilioPFE: 'Calle 123 Ciudad Estado México 12345',
    });
    expect(tramite40201StoreMock.setPersonaFisicaExtranjeraTabla).toHaveBeenCalledWith(component.personaFisicaExtranjeraTabla);
  });

  it('should update the store with form values on actualizarFormularioState', () => {
    component.personaFisicaExtranjeraForm.get('nombrePFE')?.setValue('John');
    component.actualizarFormularioState();
    expect(tramite40201StoreMock.setNombrePFE).toHaveBeenCalledWith('John');
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