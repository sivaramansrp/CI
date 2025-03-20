import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesistimientoSolicitudPermisoComponent } from './desistimiento-solicitud-permiso.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesistimientoSolicitudPermisoComponent', () => {
  let component: DesistimientoSolicitudPermisoComponent;
  let fixture: ComponentFixture<DesistimientoSolicitudPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesistimientoSolicitudPermisoComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesistimientoSolicitudPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});