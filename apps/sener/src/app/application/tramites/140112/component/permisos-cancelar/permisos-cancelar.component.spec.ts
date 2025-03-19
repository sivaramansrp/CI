import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisosCancelarComponent } from './permisos-cancelar.component';
import { PermisosCancelarService } from '../../service/permisos-cancelar.service';
import { Tramite140112Store } from '../../estados/tramite-140112.store';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MockService } from 'ng-mocks'; // Para simular servicios como PermisosCancelarService

/**
 * Test suite for PermisosCancelarComponent
 */
describe('PermisosCancelarComponent', () => {
  let component: PermisosCancelarComponent;
  let fixture: ComponentFixture<PermisosCancelarComponent>;
  let permisosCancelarService: PermisosCancelarService;
  let tramiteStore: Tramite140112Store;

  /**
   * Asynchronous beforeEach to compile components
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PermisosCancelarComponent],
      providers: [
        { provide: PermisosCancelarService, useClass: MockService(PermisosCancelarService) },
        { provide: Tramite140112Store, useClass: MockService(Tramite140112Store) },
      ],
    }).compileComponents();
  });

  /**
   * Synchronous beforeEach to initialize component and services
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosCancelarComponent);
    component = fixture.componentInstance;
    permisosCancelarService = TestBed.inject(PermisosCancelarService);
    tramiteStore = TestBed.inject(Tramite140112Store);
    fixture.detectChanges();
  });

  /**
   * Test to check if the component is created
   */
  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test to check if the component initializes with default values
   */
  it('debe inicializar con valores predeterminados', () => {
    expect(component.TablaSeleccion).toBeDefined();
    expect(component.configuracionTabla.length).toBeGreaterThan(0);
    expect(component.PermisosCancelar).toEqual([]);
  });

  /**
   * Test to check if loadPermisoCancelar is called in ngOnInit
   */
  it('debe llamar a loadPermisoCancelar en ngOnInit', () => {
    jest.spyOn(permisosCancelarService, 'getPermisosCancelar').mockReturnValue(of([]));
    component.ngOnInit();
    expect(permisosCancelarService.getPermisosCancelar).toHaveBeenCalled();
  });

  /**
   * Test to check if permisosCancelar is updated when loadPermisoCancelar is successful
   */
  it('debe actualizar permisosCancelar cuando loadPermisoCancelar sea exitoso', () => {
    const mockData = [{  code: 'code', data: [], message: 'message' }];
    jest.spyOn(permisosCancelarService, 'getPermisosCancelar').mockReturnValue(of(mockData));
    
    component.loadPermisoCancelar();
    fixture.detectChanges();

    expect(component.permisosCancelar).toEqual(mockData);
  });

  /**
   * Test to check if loadPermisoCancelar handles error correctly
   */
  it('debe manejar el error de loadPermisoCancelar correctamente', () => {
    jest.spyOn(permisosCancelarService, 'getPermisosCancelar').mockReturnValue(throwError('error'));
    
    component.loadPermisoCancelar();
    fixture.detectChanges();

    expect(component.permisosCancelar).toEqual([]);
  });

  /**
   * Test to check if obtenerFilasSeleccionadas is updated when handleListaDeFilaSeleccionada is called
   */
  it('debe actualizar obtenerFilasSeleccionadas cuando se llame a handleListaDeFilaSeleccionada', () => {
    const mockData = { FolioTtrámite: 1, TipoSolicitud: 'Test' };
    component.handleListaDeFilaSeleccionada(mockData);
    expect(component.obtenerFilasSeleccionadas).toEqual(mockData);
  });

  /**
   * Test to check if confirmarVeracidad is updated when seleccionarDeseleccionarTodos is called with checked=true
   */
  it('debe actualizar confirmarVeracidad cuando se llame a seleccionarDeseleccionarTodos con checked=true', () => {
    const event = { target: { checked: true } };
    component.seleccionarDeseleccionarTodos(event);
    expect(component.estmarcado).toBe(true);
    expect(component.confirmarVeracidad).toBe('De conformidad con el artículo 57, fracción 11, y 58 de la ley Federal de Procedimiento Administrativo* Manifiesto decir verdad');
  });

  /**
   * Test to check if confirmarVeracidad is updated when seleccionarDeseleccionarTodos is called with checked=false
   */
  it('debe actualizar confirmarVeracidad cuando se llame a seleccionarDeseleccionarTodos con checked=false', () => {
    const event = { target: { checked: false } };
    component.seleccionarDeseleccionarTodos(event);
    expect(component.estmarcado).toBe(false);
    expect(component.confirmarVeracidad).toBe('');
  });

  /**
   * Test to check if setValoresStore is called when setValoresStore is called
   */
  it('debe llamar a setValoresStore cuando se llame a setValoresStore', () => {
    const mockDesistimiento = 'Test Desistimiento';
    component.solicitud.patchValue({ desistimiento: mockDesistimiento });

    jest.spyOn(tramiteStore, 'setDesistimiento');
    component.setValoresStore();

    expect(tramiteStore.setDesistimiento).toHaveBeenCalledWith(mockDesistimiento);
  });

  /**
   * Test to check if the form validity is returned when isValid is called
   */
  it('debe devolver la validez del formulario cuando se llame a isValid', () => {
    const field = 'desistimiento';
    jest.spyOn(permisosCancelarService, 'isValid').mockReturnValue(true);
    const result = component.isValid(field);
    expect(result).toBe(true);
  });
});