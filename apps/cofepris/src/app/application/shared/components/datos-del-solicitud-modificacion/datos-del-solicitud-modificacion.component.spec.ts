import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelSolicitudModificacionComponent } from './datos-del-solicitud-modificacion.component';

describe('DatosDelSolicitudModificacionComponent', () => {
  let component: DatosDelSolicitudModificacionComponent;
  let fixture: ComponentFixture<DatosDelSolicitudModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelSolicitudModificacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelSolicitudModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
