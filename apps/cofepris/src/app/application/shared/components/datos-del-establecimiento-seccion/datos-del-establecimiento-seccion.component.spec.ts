import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelEstablecimientoSeccionComponent } from './datos-del-establecimiento-seccion.component';

describe('DatosDelEstablecimientoSeccionComponent', () => {
  let component: DatosDelEstablecimientoSeccionComponent;
  let fixture: ComponentFixture<DatosDelEstablecimientoSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelEstablecimientoSeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelEstablecimientoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
