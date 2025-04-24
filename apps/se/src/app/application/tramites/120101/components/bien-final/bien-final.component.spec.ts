import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BienFinalComponent } from './bien-final.component';

describe('BienFinalComponent', () => {
  let component: BienFinalComponent;
  let fixture: ComponentFixture<BienFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienFinalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BienFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
