import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProsecModificacionSolicitudComponent } from './prosec-modificacion-solicitud.component';

describe('ProsecModificacionSolicitudComponent', () => {
  let component: ProsecModificacionSolicitudComponent;
  let fixture: ComponentFixture<ProsecModificacionSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProsecModificacionSolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProsecModificacionSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
