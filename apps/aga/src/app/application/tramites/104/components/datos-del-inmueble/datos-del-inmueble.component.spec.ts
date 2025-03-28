import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelInmuebleComponent } from './datos-del-inmueble.component';

describe('DatosDelInmuebleComponent', () => {
  let component: DatosDelInmuebleComponent;
  let fixture: ComponentFixture<DatosDelInmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelInmuebleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
