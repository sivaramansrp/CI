import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicillioDelEstablecimientoSeccionComponent } from './domicillio-del-establecimiento-seccion.component';

describe('DomicillioDelEstablecimientoSeccionComponent', () => {
  let component: DomicillioDelEstablecimientoSeccionComponent;
  let fixture: ComponentFixture<DomicillioDelEstablecimientoSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicillioDelEstablecimientoSeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      DomicillioDelEstablecimientoSeccionComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
