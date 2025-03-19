import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesistimientoSolicitudPermisoComponent } from './desistimiento-solicitud-permiso.component';

describe('DesistimientoSolicitudPermisoComponent', () => {
  let component: DesistimientoSolicitudPermisoComponent;
  let fixture: ComponentFixture<DesistimientoSolicitudPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesistimientoSolicitudPermisoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesistimientoSolicitudPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
