import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', (): void => {
  let componente: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      schemas: [NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', (): void => {
    expect(componente).toBeTruthy();
  });

  it('debería actualizar el índice cuando se llama seleccionaTab()', (): void => {
    componente.seleccionaTab(2);
    expect(componente.indice).toBe(2);
  });
});
