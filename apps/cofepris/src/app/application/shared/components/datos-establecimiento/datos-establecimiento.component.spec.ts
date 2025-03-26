import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosEstablecimientoComponent } from './datos-establecimiento.component';

describe('DatosEstablecimientoComponent', () => {
  let component: DatosEstablecimientoComponent;
  let fixture: ComponentFixture<DatosEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosEstablecimientoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
