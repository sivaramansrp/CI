import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarDestinatarioComponent } from './agregar-destinatario.component';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
import { CatalogoSelectComponent, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { of, ReplaySubject } from 'rxjs';

describe('AgregarDestinatarioComponent', () => {
  let component: AgregarDestinatarioComponent;
  let fixture: ComponentFixture<AgregarDestinatarioComponent>;
  let mockMediodetransporteService: any;
  let mockSolicitud220402Store: any;
  let mockSolicitud220402Query: any;
  let mockValidacionesFormularioService: any;

  beforeEach(async () => {
    mockMediodetransporteService = {
      getMedioDeTransporte: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Transporte A' }])),
    };

    mockSolicitud220402Store = {
      setTipoPersona: jest.fn(),
      setNombre: jest.fn(),
      setPrimerApellido: jest.fn(),
      setSegundoApellido: jest.fn(),
      setDenominacion: jest.fn(),
      setPais: jest.fn(),
      setDomicilio: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setCorreoElectronico: jest.fn(),
    };

    mockSolicitud220402Query = {
      selectSolicitud$: of({
        tipoPersona: 'fisica',
        nombre: 'John',
        primerApellido: 'Doe',
        segundoApellido: 'Smith',
        denominacion: 'Empresa X',
        pais: 'México',
        domicilio: 'Calle 123',
        lada: '52',
        telefono: '1234567890',
        correoElectronico: 'john.doe@example.com',
      }),
    };

    mockValidacionesFormularioService = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      declarations: [AgregarDestinatarioComponent],
      imports: [ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, FormsModule,],
      providers: [
        { provide: MediodetransporteService, useValue: mockMediodetransporteService },
        { provide: Solicitud220402Store, useValue: mockSolicitud220402Store },
        { provide: Solicitud220402Query, useValue: mockSolicitud220402Query },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesFormularioService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.destinatarioForm).toBeDefined();
    expect(component.destinatarioForm.get('agregarDestinatario.tipoPersona')?.value).toBe('fisica');
    expect(component.destinatarioForm.get('datosPersonales.nombre')?.value).toBe('John');
  });

  it('should fetch tipos de documentos', () => {
    expect(mockMediodetransporteService.getMedioDeTransporte).toHaveBeenCalled();
    expect(component.tiposDocumentos.catalogos).toEqual([{ id: 1, nombre: 'Transporte A' }]);
  });
  
  it('should set values in the store', () => {
    const formGroup = component.destinatarioForm.get('datosPersonales') as FormGroup;
    component.setValoresStore(formGroup, 'nombre', 'setNombre');
    expect(mockSolicitud220402Store.setNombre).toHaveBeenCalledWith('John');
  });

  it('should handle inputChecked correctly', () => {
    component.inputChecked('Fisica');
    expect(component.fisica).toBe(true);
    expect(component.moral).toBe(false);

    component.inputChecked('Moral');
    expect(component.fisica).toBe(false);
    expect(component.moral).toBe(true);
  });

  it('should disable the form in solo lectura mode', () => {
    component.soloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.destinatarioForm.disabled).toBe(true);
  });

  it('should enable the form when not in solo lectura mode', () => {
    component.soloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.destinatarioForm.enabled).toBe(true);
  });
});