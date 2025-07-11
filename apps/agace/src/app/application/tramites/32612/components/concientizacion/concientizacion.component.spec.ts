import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcientizacionComponent } from './concientizacion.component';

describe('ConcientizacionComponent', () => {
  let component: ConcientizacionComponent;
  let fixture: ComponentFixture<ConcientizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcientizacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcientizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
