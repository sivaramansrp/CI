import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionPermisoLabComponent } from './modificacion-permiso-lab.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccionBoton } from '@libs/shared/data-access-user/src';

describe('ModificacionPermisoLabComponent', (): void => {
  let componente: ModificacionPermisoLabComponent;
  let fixture: ComponentFixture<ModificacionPermisoLabComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ModificacionPermisoLabComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionPermisoLabComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();

    componente.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as any;
  });

  it('debería crear el componente', (): void => {
    expect(componente).toBeTruthy();
  });

  it('debería actualizar el índice y llamar "siguiente" si la acción es "cont"', (): void => {
    const EVENTO: AccionBoton = { accion: 'cont', valor: 2 };
    componente.getValorIndice(EVENTO);
    expect(componente.indice).toBe(2);
    expect(componente.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debería actualizar el índice y llamar "atras" si la acción no es "cont"', (): void => {
    const EVENTO: AccionBoton = { accion: 'back', valor: 3 };
    componente.getValorIndice(EVENTO);
    expect(componente.indice).toBe(3);
    expect(componente.wizardComponent.atras).toHaveBeenCalled();
  });

  it('no debería cambiar el índice ni llamar métodos si el valor está fuera de rango', (): void => {
    const EVENTO: AccionBoton = { accion: 'cont', valor: 6 };
    const VALOR_ANTERIOR = componente.indice;
    componente.getValorIndice(EVENTO);
    expect(componente.indice).toBe(VALOR_ANTERIOR);
    expect(componente.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(componente.wizardComponent.atras).not.toHaveBeenCalled();
  });
});
