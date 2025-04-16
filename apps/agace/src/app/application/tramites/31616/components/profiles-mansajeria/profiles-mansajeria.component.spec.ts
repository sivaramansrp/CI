import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilesMansajeriaComponent } from './profiles-mansajeria.component';

describe('ProfilesMansajeriaComponent', () => {
  let component: ProfilesMansajeriaComponent;
  let fixture: ComponentFixture<ProfilesMansajeriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilesMansajeriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilesMansajeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
