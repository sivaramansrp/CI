import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudModificacionPermisoInternacionComponent } from './solicitud-modificacion-permiso-internacion.component';

describe('SolicitudModificacionPermisoInternacionComponent', () => {
  let component: SolicitudModificacionPermisoInternacionComponent;
  let fixture: ComponentFixture<SolicitudModificacionPermisoInternacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudModificacionPermisoInternacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SolicitudModificacionPermisoInternacionComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
