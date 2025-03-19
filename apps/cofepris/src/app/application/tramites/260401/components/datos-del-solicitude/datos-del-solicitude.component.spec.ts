import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelSolicitudeComponent } from './datos-del-solicitude.component';

describe('DatosDelSolicitudeComponent', () => {
  let component: DatosDelSolicitudeComponent;
  let fixture: ComponentFixture<DatosDelSolicitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelSolicitudeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelSolicitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
