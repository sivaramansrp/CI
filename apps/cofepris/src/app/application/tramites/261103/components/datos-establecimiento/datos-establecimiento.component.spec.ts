import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosestablecimientoComponent } from './datos-establecimiento.component';

describe('DatosestablecimientoComponent', () => {
  let COMPONENT: DatosestablecimientoComponent;
  let FIXTURE: ComponentFixture<DatosestablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosestablecimientoComponent],
    }).compileComponents();

    FIXTURE = TestBed.createComponent(DatosestablecimientoComponent);
    COMPONENT = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('should create', () => {
    expect(COMPONENT).toBeTruthy();
  });
});
