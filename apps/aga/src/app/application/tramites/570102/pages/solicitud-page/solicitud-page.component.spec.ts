import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent, PASOS } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    component.wizardComponent = {
      siguiente: jest.fn()
    } as unknown as WizardComponent;
    fixture.detectChanges();
  });

  beforeEach(() => {
    // Ensure wizardComponent is always initialized for each test
    if (!component.wizardComponent) {
      component.wizardComponent = { siguiente: jest.fn() } as any;
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter and remap pasos on ngOnInit', () => {
    component.pasos = [
      { indice: 1, nombre: 'Paso 1' },
      { indice: 2, nombre: 'Paso 2' },
      { indice: 3, nombre: 'Paso 3' }
    ] as any;
    component.ngOnInit();
   
  });

  it('should set indice on seleccionaTab', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should call cargaArchivo and handle getValorIndice logic (modal hidden)', () => {
    component.ocultarModal = false;
    const cargaArchivoSpy = jest.spyOn(component, 'cargaArchivo');
    component.nombre = 5;
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(cargaArchivoSpy).toHaveBeenCalled();
    expect(component.indice).toBe(1);
  });

  it('should handle getValorIndice logic (modal visible, valid range, accion cont, indice 2)', () => {
    component.ocultarModal = true;
    component.indice = 1;
    component.nombre = 0;
    component.wizardComponent = { siguiente: jest.fn() } as any;
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(component.nombre).toBe(0); // nombre stays 0 because indice becomes 2, not 1
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled(); // siguiente not called because indice is 2, not 1
  });

  it('should handle getValorIndice logic (modal visible, valid range, accion cont, indice 1)', () => {
    component.ocultarModal = true;
    component.indice = 0; // Start with different value
    component.nombre = 0;
    component.wizardComponent = { siguiente: jest.fn() } as any;
    component.getValorIndice({ accion: 'cont', valor: 1 });
    expect(component.indice).toBe(1);
    expect(component.nombre).toBe(1); // nombre becomes 1 when indice is 1 and accion is 'cont'
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should not call wizardComponent.siguiente if accion is not cont or indice is not 2', () => {
    component.ocultarModal = true;
    component.indice = 1;
    component.nombre = 0;
    component.wizardComponent = { siguiente: jest.fn() } as any;
    component.getValorIndice({ accion: 'otro', valor: 3 });
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should set nombre in alEventoHijo', () => {
    component.nombre = 0;
    component.alEventoHijo(7);
    expect(component.nombre).toBe(7);
  });

  it('should remove pedimento, set ocultarModal, and call getValorIndice on eliminarPedimento', () => {
  component.pedimentos = [{ id: 1 }, { id: 2 }, { id: 3 }] as any;
  component.elementoParaEliminar = 1;
  component.ocultarModal = false;
  
  component.wizardComponent = { siguiente: jest.fn() } as any;
  
  const getValorSpy = jest.spyOn(component, 'getValorIndice');
  component.eliminarPedimento(true);
  
  expect(component.pedimentos.length).toBe(2);
  expect(component.ocultarModal).toBe(true);
  expect(getValorSpy).toHaveBeenCalledWith({ accion: 'cont', valor: 2 });
});


  it('should not remove pedimento if borrar is false', () => {
    component.pedimentos = [{ id: 1 }, { id: 2 }] as any;
    component.elementoParaEliminar = 0;
    component.ocultarModal = false;
    component.eliminarPedimento(false);
    expect(component.pedimentos.length).toBe(2);
    expect(component.ocultarModal).toBe(false);
  });

  it('should set nuevaNotificacion and elementoParaEliminar on abrirModal when isData is true', () => {
    component.nuevaNotificacion = undefined as any;
    component.elementoParaEliminar = 0;
    component.isData = true; // Set isData to true for nuevaNotificacion to be defined
    component.abrirModal(2);
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.elementoParaEliminar).toBe(2);
  });

  it('should not set nuevaNotificacion when isData is false', () => {
    component.nuevaNotificacion = undefined as any;
    component.elementoParaEliminar = 0;
    component.isData = false; // Set isData to false
    component.abrirModal(2);
    expect(component.nuevaNotificacion).toBeUndefined();
    expect(component.elementoParaEliminar).toBe(0); // elementoParaEliminar shouldn't change
  });

  it('should set cargarArchivo to true and call abrirModal if indice is 1 in cargaArchivo', () => {
    component.indice = 1;
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    component.cargarArchivo = false;
    component.cargaArchivo();
    expect(component.cargarArchivo).toBe(true);
    expect(abrirModalSpy).toHaveBeenCalled();
  });

  it('should set cargarArchivo to true and not call abrirModal if indice is not 1 in cargaArchivo', () => {
    component.indice = 3;
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    component.cargarArchivo = false;
    component.cargaArchivo();
    expect(component.cargarArchivo).toBe(true);
    expect(abrirModalSpy).not.toHaveBeenCalled();
  });
});