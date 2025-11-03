import { SolitudeComponent } from './solitude.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SolitudeComponent', () => {
  let component: SolitudeComponent;
  let fixture: ComponentFixture<SolitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolitudeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
