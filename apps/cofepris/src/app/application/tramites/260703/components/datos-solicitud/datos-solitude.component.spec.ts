import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolitudeComponent } from './datos-solitude.component';

describe('DatosSolitudeComponent', () => {
  let component: DatosSolitudeComponent;
  let fixture: ComponentFixture<DatosSolitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosSolitudeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
