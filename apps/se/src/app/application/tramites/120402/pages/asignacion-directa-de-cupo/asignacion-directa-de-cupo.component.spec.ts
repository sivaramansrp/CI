import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignacionDirectaDeCupoComponent } from './asignacion-directa-de-cupo.component';

describe('AsignacionDirectaDeCupoComponent', () => {
  let component: AsignacionDirectaDeCupoComponent;
  let fixture: ComponentFixture<AsignacionDirectaDeCupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignacionDirectaDeCupoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignacionDirectaDeCupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
