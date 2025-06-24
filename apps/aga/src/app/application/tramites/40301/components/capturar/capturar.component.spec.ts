import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturarComponent } from './capturar.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CapturarService } from '../../services/capturar.service';
import { Tramite40301Store } from '../../estados/tramite40301.store';
import { of } from 'rxjs';
import { CaatNaviroMetaInfo } from '../../modelos/caat-naviero.modalidad.model';
import { Catalogo, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';

describe('CapturarComponent', () => {
  let component: CapturarComponent;
  let fixture: ComponentFixture<CapturarComponent>;
  let mockCapturarService: jest.Mocked<CapturarService>;
  let mockSolicitudStore: jest.Mocked<Tramite40301Store>;

  beforeEach(async () => {
    mockCapturarService = {
      obtenerMetaInfo: jest.fn(),
      obtenerRolesUsuario: jest.fn(),
      getCatalogo: jest.fn(),
      setInitialValues: jest.fn(),
      getSolicitudState: jest.fn(),
    } as unknown as jest.Mocked<CapturarService>;

    mockSolicitudStore = {
      setRol: jest.fn(),
      setDirectorGeneralNombre: jest.fn(),
      setPrimerApellido: jest.fn(),
      setSegundoApellido: jest.fn(),
    } as unknown as jest.Mocked<Tramite40301Store>;

    await TestBed.configureTestingModule({
      declarations: [CapturarComponent],
      imports: [ReactiveFormsModule, TituloComponent, WizardComponent],
      providers: [
        FormBuilder,
        { provide: CapturarService, useValue: mockCapturarService },
        { provide: Tramite40301Store, useValue: mockSolicitudStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CapturarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component creation', () => {
    component.establecerSolicitudForm();
    expect(component.solicitudForm).toBeDefined();
    expect(component.solicitudForm.get('tipoAgente')).toBeTruthy();
  });

  it('should call setInitialValues and readMetaInfo on ngOnInit', () => {
    jest.spyOn(component, 'readMetaInfo');
    jest.spyOn(component, 'suscribirseAlEstado');
    component.ngOnInit();
    expect(mockCapturarService.setInitialValues).toHaveBeenCalled();
    expect(component.readMetaInfo).toHaveBeenCalled();
    expect(component.suscribirseAlEstado).toHaveBeenCalled();
  });

  it('should fetch metadata and update component properties', () => {
    const mockMetaInfo: CaatNaviroMetaInfo = {
      tutilo: 'Test Title',
      tipoAgenteLabel: 'Test Label',
    };
    mockCapturarService.obtenerMetaInfo.mockReturnValue(of(mockMetaInfo));

    component.readMetaInfo();

    expect(mockCapturarService.obtenerMetaInfo).toHaveBeenCalled();
    expect(component.titulo).toBe('Test Title');
    expect(component.tipoAgenteLabel).toBe('Test Label');
  });

  it('should fetch user roles and update rolesUsuario', () => {
    const mockRoles = ['Admin', 'User'];
    mockCapturarService.obtenerRolesUsuario.mockReturnValue(of(mockRoles));

    component.readMetaInfo();

    expect(mockCapturarService.obtenerRolesUsuario).toHaveBeenCalled();
    expect(component.rolesUsuario).toEqual(mockRoles);
  });

  it('should fetch agent catalog and update agentCatalog', () => {
    const mockCatalog: Catalogo[] = [{ id: 1, clave: 'Agent 1', descripcion: 'Description 1' }];
    mockCapturarService.getCatalogo.mockReturnValue(of(mockCatalog));

    component.readMetaInfo();

    expect(mockCapturarService.getCatalogo).toHaveBeenCalled();
    expect(component.agentCatalog).toEqual(mockCatalog);
  });

  it('should update the store with the agent role', () => {
    component.solicitudForm = new FormBuilder().group({
      tipoAgente: ['Test Role'],
    });

    component.conTipoAgenteData('tipoAgente');

    expect(mockSolicitudStore.setRol).toHaveBeenCalledWith('Test Role');
  });

  it('should update the store with the director general name', () => {
    component.solicitudForm = new FormBuilder().group({
      directorGeneralNombre: ['John Doe'],
    });

    component.actualizarDirectorGeneralNombre('directorGeneralNombre');

    expect(mockSolicitudStore.setDirectorGeneralNombre).toHaveBeenCalledWith('John Doe');
  });

  it('should update the store with the first surname', () => {
    component.solicitudForm = new FormBuilder().group({
      primerApellido: ['Doe'],
    });

    component.actualizarPrimerApellido('primerApellido');

    expect(mockSolicitudStore.setPrimerApellido).toHaveBeenCalledWith('Doe');
  });

  it('should update the store with the second surname', () => {
    component.solicitudForm = new FormBuilder().group({
      segundoApellido: ['Smith'],
    });

    component.actualizarApellidoMaterno('segundoApellido');

    expect(mockSolicitudStore.setSegundoApellido).toHaveBeenCalledWith('Smith');
  });

  it('should reset the form when limpiarAgente is called', () => {
    component.solicitudForm = new FormBuilder().group({
      tipoAgente: ['Test Role'],
    });

    component.limpiarAgente();

    expect(component.solicitudForm.value.tipoAgente).toBeNull();
  });

  it('should unsubscribe from observables on component destruction', () => {
    const destroyNotifierSpy = jest.spyOn(component['destruirNotificador$'], 'next');
    const destroyCompleteSpy = jest.spyOn(component['destruirNotificador$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyCompleteSpy).toHaveBeenCalled();
  });
});