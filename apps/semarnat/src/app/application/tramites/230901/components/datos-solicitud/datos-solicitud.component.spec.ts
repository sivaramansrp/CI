import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';
import { ConfiguracionItem } from '../../enum/mercancia-table-constants';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let tramite230901Store: Tramite230901Store;
  let tramite230901Query: Tramite230901Query;
  let autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService;

  beforeEach(async () => {
    // Mock dependencies
    const tramite230901StoreMock = {
      setTipoDeMovimiento: jest.fn(),
      setTipoDeRegimen: jest.fn(),
    };

    const tramite230901QueryMock = {
      selectSolicitud$: of({
        tipoDeMovimiento: '1',
        tipoDeRegimen: '2',
      }),
    };

    const autorizacionesDeVidaSilvestreServiceMock = {
      inicializaDatosSolicitudDatosCatalogos: jest.fn(),
      inicializaMercanciaDatosCatalogos: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Tramite230901Store, useValue: tramite230901StoreMock },
        { provide: Tramite230901Query, useValue: tramite230901QueryMock },
        { provide: AutorizacionesDeVidaSilvestreService, useValue: autorizacionesDeVidaSilvestreServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    tramite230901Store = TestBed.inject(Tramite230901Store);
    tramite230901Query = TestBed.inject(Tramite230901Query);
    autorizacionesDeVidaSilvestreService = TestBed.inject(AutorizacionesDeVidaSilvestreService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formSolicitud).toBeDefined();
    expect(component.formSolicitud.get('tipodemovimiento')?.value).toBe('1');
    expect(component.formSolicitud.get('tipoderegimen')?.value).toBe('2');
  });

  it('should call inicializaDatosSolicitudDatosCatalogos on ngOnInit', () => {
    component.ngOnInit();
    expect(autorizacionesDeVidaSilvestreService.inicializaDatosSolicitudDatosCatalogos).toHaveBeenCalled();
  });

  it('should call setTipoDeMovimiento when onTipoMovimientoChange is triggered', () => {
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.onTipoMovimientoChange();
    expect(tramite230901Store.setTipoDeMovimiento).toHaveBeenCalledWith('2');
  });

  it('should call setTipoDeRegimen when onTipoRegimenChange is triggered', () => {
    component.formSolicitud.get('tipoderegimen')?.setValue('3');
    component.onTipoRegimenChange();
    expect(tramite230901Store.setTipoDeRegimen).toHaveBeenCalledWith('3');
  });

  it('should toggle showDatosMercanciaModal when toggleDivMercancia is called', () => {
    component.showDatosMercanciaModal = false;
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(true);

    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBeFalsy();
  });

  it('should call inicializaMercanciaDatosCatalogos and createFormMercancia when toggleDivMercancia is called with "open"', () => {
    const createFormMercanciaSpy = jest.spyOn(component, 'createFormMercancia');
    component.toggleDivMercancia('open');
    expect(autorizacionesDeVidaSilvestreService.inicializaMercanciaDatosCatalogos).toHaveBeenCalled();
    expect(createFormMercanciaSpy).toHaveBeenCalledWith(component.filaSeleccionada);
  });

  it('should update filaSeleccionada when onFilaSeleccionada is called', () => {
    const mockEvent = {
      fraccionArancelaria: '123456',
      descripcion: 'Test Description',
    } as ConfiguracionItem;
    component.onFilaSeleccionada(mockEvent);
    expect(component.filaSeleccionada).toEqual(mockEvent);
  });

  it('should clear lname when seleccionOtraFraccion is called', () => {
    component.lname = 'Test';
    component.seleccionOtraFraccion();
    expect(component.lname).toBe('');
  });

  it('should clear fname when submitMercanciaForm is called', () => {
    component.fname = 'Test';
    component.submitMercanciaForm();
    expect(component.fname).toBe('');
  });
});