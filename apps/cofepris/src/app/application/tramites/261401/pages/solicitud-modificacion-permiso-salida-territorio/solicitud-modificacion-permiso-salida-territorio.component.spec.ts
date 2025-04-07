import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudModificacionPermisoSalidaTerritorioComponent } from './solicitud-modificacion-permiso-salida-territorio.component';

describe('SolicitudModificacionPermisoSalidaTerritorioComponent', () => {
  let component: SolicitudModificacionPermisoSalidaTerritorioComponent;
  let fixture: ComponentFixture<SolicitudModificacionPermisoSalidaTerritorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudModificacionPermisoSalidaTerritorioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SolicitudModificacionPermisoSalidaTerritorioComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
