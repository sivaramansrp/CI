import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PersonaMoralExtranjeraComponent } from './persona-moral-extranjera.component';
import { Tramite40201Store } from '../../../../core/estados/tramites/tramite40201.store';
import { Tramite40201Query } from '../../../../core/queries/tramite40201.query';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';

describe('PersonaMoralExtranjeraComponent', () => {
  let component: PersonaMoralExtranjeraComponent;
  let fixture: ComponentFixture<PersonaMoralExtranjeraComponent>;
  let tramite40201StoreMock: jest.Mocked<Tramite40201Store>;
  let tramite40201QueryMock: jest.Mocked<Tramite40201Query>;
  let transportacionMaritimaServiceMock: jest.Mocked<TransportacionMaritimaService>;

  beforeEach(async () => {
    tramite40201StoreMock = {
      setPersonaMoralExtranjeraTabla: jest.fn(),
      setPaisPME: jest.fn(),
      setCodigoPostalPME: jest.fn(),
      setCiudadPME: jest.fn(),
      setEstadoPME: jest.fn(),
      setCallePME: jest.fn(),
      setNumeroExteriorPME: jest.fn(),
      setNumeroInteriorPME: jest.fn(),
      setNombreDG: jest.fn(),
      setApellidoPaternoDG: jest.fn(),
      setApellidoMaternoDG: jest.fn(),
      setDenominacionPME: jest.fn(),
      setCorreoPME: jest.fn(),
    } as unknown as jest.Mocked<Tramite40201Store>;

    tramite40201QueryMock = {
      selectSeccionState$: of({
          personaMoralExtranjeraTabla: [],
          paisPME: '',
          codigoPostalPME: '',
          ciudadPME: '',
          estadoPME: '',
          callePME: '',
          numeroExteriorPME: '',
          numeroInteriorPME: '',
          nombreDG: '',
          apellidoPaternoDG: '',
          apellidoMaternoDG: '',
          denominacionPME: '',
          correoPME: '',
        }),
    } as unknown as jest.Mocked<Tramite40201Query>;

    transportacionMaritimaServiceMock = {
      getPaisCatalogo: jest.fn().mockReturnValue(of({ data: [] })),
    } as unknown as jest.Mocked<TransportacionMaritimaService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PersonaMoralExtranjeraComponent],
      providers: [
        FormBuilder,
        { provide: Tramite40201Store, useValue: tramite40201StoreMock },
        { provide: Tramite40201Query, useValue: tramite40201QueryMock },
        { provide: TransportacionMaritimaService, useValue: transportacionMaritimaServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaMoralExtranjeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.personaMoralExtranjeraForm).toBeDefined();
    expect(component.pais).toEqual([]);
  });

  it('should fetch catalogs on inicializaCatalogos', () => {
    const mockPais = [{ id: 1, descripcion: 'México' }];
    transportacionMaritimaServiceMock.getPaisCatalogo.mockReturnValue(of({ code: 200, data: mockPais, message: 'Success' }));
    component.inicializaCatalogos();
    expect(component.pais).toEqual(mockPais);
  });

  it('should update the store when a country is selected', () => {
    component.personaMoralExtranjeraForm.get('cvePais')?.setValue('1');
    component.paisSeleccion();
    expect(tramite40201StoreMock.setPaisPME).toHaveBeenCalledWith('1');
  });

  it('should add a new person to the table on agregarPME', () => {
    const mockFormData = {
      denominacionPME: 'Empresa 1',
      paisPME: '1',
      estadoPME: 'Estado',
      codigoPostalPME: '12345',
      correoPME: 'empresa1@example.com',
      nombreDirectorGeneral: 'John',
      apellidoPaternoDG: 'Doe',
      apellidoMaternoDG: 'Smith',
      callePME: 'Calle',
      numeroExteriorPME: '123',
    };
    const mockPais = [{ id: 1, descripcion: 'México' }];
    component.pais = mockPais;

    component.agregarPME(mockFormData as any);

    expect(component.personaMoralExtranjeraTabla.length).toBe(1);
    expect(component.personaMoralExtranjeraTabla[0]).toEqual({
      denominacionPME: 'Empresa 1',
      paisPME: '1',
      estadoPME: 'Estado',
      codigoPostalPME: '12345',
      correoPME: 'empresa1@example.com',
      nombreDirectorGeneral: 'John Doe Smith',
      domicilioPME: 'Calle 123 Estado México 12345',
    });
    expect(tramite40201StoreMock.setPersonaMoralExtranjeraTabla).toHaveBeenCalledWith(component.personaMoralExtranjeraTabla);
  });

  it('should reset the form and update the store on limpiarDatosPME', () => {
    jest.spyOn(component, 'actualizarFormularioState');
    component.limpiarDatosPME();
    expect(component.personaMoralExtranjeraForm.pristine).toBeTruthy();
    expect(component.actualizarFormularioState).toHaveBeenCalled();
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