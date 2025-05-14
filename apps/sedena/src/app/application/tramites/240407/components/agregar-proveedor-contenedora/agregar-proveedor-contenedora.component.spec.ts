import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProveedorContenedoraComponent } from './agregar-proveedor-contenedora.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AgregarProveedorContenedoraComponent', () => {
  let component: AgregarProveedorContenedoraComponent;
  let fixture: ComponentFixture<AgregarProveedorContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AgregarProveedorContenedoraComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProveedorContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
