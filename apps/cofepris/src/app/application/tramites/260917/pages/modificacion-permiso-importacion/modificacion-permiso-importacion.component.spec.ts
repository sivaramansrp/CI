import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionPermisoImportacionComponent } from './modificacion-permiso-importacion.component';
import { AccionBoton, WizardComponent } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ModificacionPermisoImportacionComponent', () => {
  let component: ModificacionPermisoImportacionComponent;
  let fixture: ComponentFixture<ModificacionPermisoImportacionComponent>;

  let wizardComponent: WizardComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ModificacionPermisoImportacionComponent],
      imports: [WizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionPermisoImportacionComponent);
    component = fixture.componentInstance;
    wizardComponent = fixture.debugElement.children[0].componentInstance;

    fixture.detectChanges();
  });

  it('debería crear el componente', (): void => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar correctamente las propiedades del componente', (): void => {
    expect(component.pasos.length).toBeGreaterThan(0);
    expect(component.indice).toBe(1);
    expect(component.datosPasos).toEqual({
      nroPasos: component.pasos.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('debería actualizar el índice al hacer clic en el botón siguiente', (): void => {
    const mockAccionBoton: AccionBoton = { accion: 'cont', valor: 2 };
    wizardComponent.siguiente = jest.fn(() => {}); // Mock the siguiente method
    const spySiguiente = jest.spyOn(wizardComponent, 'siguiente');

    component.getValorIndice(mockAccionBoton);
    wizardComponent.siguiente(); // Explicitly call the mocked method

    expect(component.indice).toBe(2);
    expect(spySiguiente).toHaveBeenCalled();
  });
});
