import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicillioComponent } from './domicillio.component';

describe('DomicillioComponent', () => {
  let component: DomicillioComponent;
  let fixture: ComponentFixture<DomicillioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicillioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicillioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
