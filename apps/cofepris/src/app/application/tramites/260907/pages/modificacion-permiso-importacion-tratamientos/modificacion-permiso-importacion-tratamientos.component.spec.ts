import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionPermisoImportacionTratamientosComponent } from './modificacion-permiso-importacion-tratamientos.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoPagesComponent } from '../paso-uno-pages/paso-uno-pages.component';
import { AccionBoton } from '@libs/shared/data-access-user/src';

describe('ModificacionPermisoImportacionTratamientosComponent', () => {
  let component: ModificacionPermisoImportacionTratamientosComponent;
  let fixture: ComponentFixture<ModificacionPermisoImportacionTratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ModificacionPermisoImportacionTratamientosComponent,
        WizardComponent,
        PasoUnoPagesComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionPermisoImportacionTratamientosComponent);
    component = fixture.componentInstance;

    // Provide mock instances
    component.pasoUnoComponent = jasmine.createSpyObj<PasoUnoPagesComponent>('PasoUnoPagesComponent', ['collectFormValues']);
    component.wizardComponent = jasmine.createSpyObj<WizardComponent>('WizardComponent', ['siguiente', 'atras']);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default values', () => {
    expect(component.infoAlert).toBe('alert-info');
    expect(component.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update payload and call wizard.siguiente on accion "cont"', () => {
    const mockFormValues = {
      solicitante: { nombre: 'Test' },
      datosSolicitud: [],
      tercerosRelacionados: [],
      pagoDeDerechos: [],
      tramitesAsociados: [],
    };
    (component.pasoUnoComponent.collectFormValues as jasmine.Spy).and.returnValue(mockFormValues);

    const action: AccionBoton = { accion: 'cont', valor: 2 };

    component.getValorIndice(action);

    expect(component.payload).toEqual(mockFormValues);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should call wizard.atras on non-"cont" action', () => {
    const action: AccionBoton = { accion: 'back', valor: 3 };
    (component.pasoUnoComponent.collectFormValues as jasmine.Spy).and.returnValue({});

    component.getValorIndice(action);

    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should ignore out-of-range valor', () => {
    const action: AccionBoton = { accion: 'cont', valor: 10 };
    component.getValorIndice(action);
    expect(component.indice).toBe(1); // still the default
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should log error when pasoUnoComponent is undefined', () => {
    spyOn(console, 'error');
    component.pasoUnoComponent = undefined as any;

    const action: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(action);

    expect(console.error).toHaveBeenCalledWith('PasoUnoPagesComponent is not initialized.');
  });

  it('should return collected values from collectAllFormValues()', () => {
    const mockFormValues = {
      solicitante: { nombre: 'Test' },
      datosSolicitud: [],
      tercerosRelacionados: [],
      pagoDeDerechos: [],
      tramitesAsociados: [],
    };
    (component.pasoUnoComponent.collectFormValues as jasmine.Spy).and.returnValue(mockFormValues);

    const result = component.collectAllFormValues();

    expect(result.pasoUno).toEqual(mockFormValues);
  });

  it('should return empty object if pasoUnoComponent is not initialized in collectAllFormValues()', () => {
    component.pasoUnoComponent = undefined as any;

    const result = component.collectAllFormValues();

    expect(result).toEqual({});
  });
});
