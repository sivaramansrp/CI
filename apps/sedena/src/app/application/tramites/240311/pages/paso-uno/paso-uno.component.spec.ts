import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ComponentePasoUno', () => {
  let componente: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(componente).toBeTruthy();
  });
});
