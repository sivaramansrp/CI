import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesistimientoSolicitudComponent } from './desistimiento-solicitud.component';

describe('DesistimientoSolicitudComponent', () => {
  let component: DesistimientoSolicitudComponent;
  let fixture: ComponentFixture<DesistimientoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesistimientoSolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesistimientoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
