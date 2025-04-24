import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', (): void => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el índice en 1', (): void => {
    expect(component.indice).toBe(1);
  });

  it('debería cambiar el índice al seleccionar una pestaña', (): void => {
    const INDICE_ESPERADO: number = 3;
    component.seleccionaTab(INDICE_ESPERADO);
    expect(component.indice).toBe(INDICE_ESPERADO);
  });
});
