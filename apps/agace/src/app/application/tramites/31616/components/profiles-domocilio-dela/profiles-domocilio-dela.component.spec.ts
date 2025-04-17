import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilesDomocilioDelaComponent } from './profiles-domocilio-dela.component';

describe('ProfilesDomocilioDelaComponent', () => {
  let component: ProfilesDomocilioDelaComponent;
  let fixture: ComponentFixture<ProfilesDomocilioDelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilesDomocilioDelaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilesDomocilioDelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
