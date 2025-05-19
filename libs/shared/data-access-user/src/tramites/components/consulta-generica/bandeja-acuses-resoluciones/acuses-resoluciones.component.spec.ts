import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcusesResolucionesComponent } from './acuses-resoluciones.component';

describe('AcusesResolucionesComponent', () => {
  let component: AcusesResolucionesComponent;
  let fixture: ComponentFixture<AcusesResolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcusesResolucionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcusesResolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
