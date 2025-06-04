import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

/**
 * Componente mock para 'solicitante' para evitar errores de dependencias
 */
@Component({
  selector: 'solicitante',
  template: '<div></div>',
})
class MockSolicitanteComponent {}

describe('PasoUnoComponent', () => {
  let COMPONENTE: PasoUnoComponent;
  let FIXTURE: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, MockSolicitanteComponent], // Declarar el mock
      schemas: [NO_ERRORS_SCHEMA], // Ignorar elementos desconocidos
    }).compileComponents();

    FIXTURE = TestBed.createComponent(PasoUnoComponent);
    COMPONENTE = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(COMPONENTE).toBeTruthy();
  });
});