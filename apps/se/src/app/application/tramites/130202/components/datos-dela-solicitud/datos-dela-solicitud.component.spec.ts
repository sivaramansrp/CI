import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelaSolicitudComponent } from './datos-dela-solicitud.component';

describe('DatosDelaSolicitudComponent', () => {
  let component: DatosDelaSolicitudComponent;
  let fixture: ComponentFixture<DatosDelaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelaSolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
