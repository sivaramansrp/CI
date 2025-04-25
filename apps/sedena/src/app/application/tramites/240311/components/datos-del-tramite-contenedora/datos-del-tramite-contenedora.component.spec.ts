import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteContenedoraComponent } from './datos-del-tramite-contenedora.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ComponenteDatosDelTramiteContenedora', () => {
  let componente: DatosDelTramiteContenedoraComponent;
  let fixture: ComponentFixture<DatosDelTramiteContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteContenedoraComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteContenedoraComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(componente).toBeTruthy();
  });
});
