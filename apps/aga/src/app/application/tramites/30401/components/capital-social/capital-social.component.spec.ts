import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapitalSocialComponent } from './capital-social.component';

describe('CapitalSocialComponent', () => {
  let component: CapitalSocialComponent;
  let fixture: ComponentFixture<CapitalSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapitalSocialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CapitalSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
