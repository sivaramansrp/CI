import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261103.store';
import { DatosProcedureState } from '../../../../estados/tramites/tramites261103.store';
import { ModificacionPermisoImportacionMedicamentosService } from '../../services/modificacion-permiso-importacion-medicamentos.service';

jest.mock('../../services/modificacion-permiso-importacion-medicamentos.service');

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let mockStore: DatosProcedureStore;
  let mockQuery: DatosProcedureQuery;
  let destroy$: Subject<void>;

  const mockState: DatosProcedureState = {
    ideGenerica1: '',
    observaciones: '',
    denominacion: '',
    codigo: '',
    estado: '',
    municipio: '',
    localidad: '',
    colonia: '',
    calle: '',
    correo: '',
    sanitario: '',
    lada: '',
    telefono: '',
    funcionamiento: '',
    licencia: '',
    representanteLegalRFC: '',
    representanteLegalNombre: '',
    buscar: '',
    representanteLegalApPaterno: '',
    representanteLegalApMaterno: '',
    regimen: '',
    informacionConfidencial: '',
    aduanas: '1',
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    bancoClave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
  };

  beforeEach(async () => {
    mockStore = {
      establecerDatos: jest.fn()
    } as unknown as DatosProcedureStore;

    mockQuery = {
      selectProrroga$: of(mockState)
    } as unknown as DatosProcedureQuery;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RepresentanteLegalComponent],
      providers: [
        FormBuilder,
        { provide: DatosProcedureStore, useValue: mockStore },
        { provide: DatosProcedureQuery, useValue: mockQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    destroy$ = new Subject<void>();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.domicilioEstablecimiento).toBeDefined();
    expect(component.domicilioEstablecimiento.controls['representanteLegalNombre'].value).toBe('Juan');
  });

  it('should set form as read-only if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.establecerdomicilioEstablecimiento();
    expect(component.domicilioEstablecimiento.disabled).toBe(true);
  });

  it('should call store.establecerDatos in setValoresStore()', () => {
    component.domicilioEstablecimiento = component['fb'].group({
      representanteLegalNombre: ['Carlos']
    });
    component.setValoresStore(component.domicilioEstablecimiento, 'representanteLegalNombre');
    expect(mockStore.establecerDatos).toHaveBeenCalledWith({ representanteLegalNombre: 'Carlos' });
  });

  it('should call destroy$.next and destroy$.complete on ngOnDestroy()', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should return true for isValid when service returns true', () => {
    (ModificacionPermisoImportacionMedicamentosService.isValid as jest.Mock).mockReturnValue(true);
    component.domicilioEstablecimiento = component['fb'].group({
      representanteLegalNombre: ['Carlos']
    });
    const result = component.isValid('representanteLegalNombre');
    expect(result).toBe(true);
  });

  it('should initialize state with obtenerDatosFormulario', () => {
    component.obtenerDatosFormulario();
    expect(component['seccionState']).toEqual(mockState);
  });

  it('should call both obtenerDatosFormulario and establecerdomicilioEstablecimiento in inicializarEstadoFormulario()', () => {
    const obtenerSpy = jest.spyOn(component, 'obtenerDatosFormulario');
    const establecerSpy = jest.spyOn(component, 'establecerdomicilioEstablecimiento');
    component.inicializarEstadoFormulario();
    expect(obtenerSpy).toHaveBeenCalled();
    expect(establecerSpy).toHaveBeenCalled();
  });
});
