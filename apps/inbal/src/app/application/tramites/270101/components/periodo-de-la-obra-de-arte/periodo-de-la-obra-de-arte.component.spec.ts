import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeriodoDeLaObraDeArteComponent } from './periodo-de-la-obra-de-arte.component';

describe('PeriodoDeLaObraDeArteComponent', () => {
  let component: PeriodoDeLaObraDeArteComponent;
  let fixture: ComponentFixture<PeriodoDeLaObraDeArteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodoDeLaObraDeArteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeriodoDeLaObraDeArteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
