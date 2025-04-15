import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudModificacionComponent } from './datos-de-la-solicitud-modificacion.component';

describe('DatosDeLaSolicitudModificacionComponent', () => {
  let component: DatosDeLaSolicitudModificacionComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudModificacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
