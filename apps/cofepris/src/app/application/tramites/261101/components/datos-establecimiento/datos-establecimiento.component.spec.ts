import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosestablecimientoComponent } from './datos-establecimiento.component';

describe('DatosestablecimientoComponent', () => {
  let component: DatosestablecimientoComponent;
  let fixture: ComponentFixture<DatosestablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosestablecimientoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosestablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
