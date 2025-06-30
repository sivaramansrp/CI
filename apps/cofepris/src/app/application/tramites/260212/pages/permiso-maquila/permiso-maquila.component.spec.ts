import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoMaquilaComponent } from './permiso-maquila.component';
import { PERMISO_MAQUILA } from '../../constantes/permiso-maquila.enum';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PermisoMaquilaComponent', () => {
  let component: PermisoMaquilaComponent;
  let fixture: ComponentFixture<PermisoMaquilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoMaquilaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoMaquilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar pantallasPasos con PERMISO_MAQUILA', () => {
    expect(component.pantallasPasos).toEqual(PERMISO_MAQUILA);
  });

  it('debería tener el valor inicial de indice en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debería cambiar el índice correctamente', () => {
    component.indice = 2;
    expect(component.indice).toBe(2);
  });

  it('pantallasPasos no debe ser undefined', () => {
    expect(component.pantallasPasos).toBeDefined();
  });

  it('debería permitir cambiar el paso si existe un método para ello', () => {
    const cambiarPaso = (component as any)['cambiarPaso'];
    if (typeof cambiarPaso === 'function') {
      cambiarPaso.call(component, 3);
      expect(component.indice).toBe(3);
    }
  });

  it('debería tener datosPasos definido y ser un objeto', () => {
    expect(component.datosPasos).toBeDefined();
    expect(typeof component.datosPasos).toBe('object');
  });

  // Mock dinámico para wizardComponent antes de cada test de getValorIndice
  function setWizardMock() {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;
  }

  it('debería tener wizardComponent definido si está presente', () => {
    setWizardMock();
    expect(component.wizardComponent).toBeDefined();
  });

  it('debería llamar wizardComponent.siguiente() si accion es "cont" y valor válido', () => {
    setWizardMock();
    const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(spySiguiente).toHaveBeenCalled();
  });

  it('debería llamar wizardComponent.atras() si accion no es "cont" y valor válido', () => {
    setWizardMock();
    const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ valor: 3, accion: 'atras' });
    expect(component.indice).toBe(3);
    expect(spyAtras).toHaveBeenCalled();
  });

  it('no debería cambiar el índice ni llamar wizardComponent si valor fuera de rango', () => {
    setWizardMock();
    const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
    const prevIndice = component.indice;
    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(prevIndice);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();
    component.getValorIndice({ valor: 5, accion: 'atras' });
    expect(component.indice).toBe(prevIndice);
    expect(spySiguiente).not.toHaveBeenCalled();
    expect(spyAtras).not.toHaveBeenCalled();
  });

  // Cobertura adicional: getValorIndice con valores límite
  it('debería cambiar el índice a 1 y llamar siguiente si valor=1 y accion="cont"', () => {
    setWizardMock();
    const spySiguiente = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ valor: 1, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(spySiguiente).toHaveBeenCalled();
  });

  it('debería cambiar el índice a 4 y llamar atras si valor=4 y accion="atras"', () => {
    setWizardMock();
    const spyAtras = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ valor: 4, accion: 'atras' });
    expect(component.indice).toBe(4);
    expect(spyAtras).toHaveBeenCalled();
  });
});
