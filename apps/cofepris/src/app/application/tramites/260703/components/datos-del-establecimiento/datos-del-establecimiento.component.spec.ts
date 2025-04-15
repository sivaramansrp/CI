import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelEstablecimientoComponent } from './datos-del-establecimiento.component';

describe('DatosDelEstablecimientoComponent', () => {
  let component: DatosDelEstablecimientoComponent;
  let fixture: ComponentFixture<DatosDelEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelEstablecimientoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
