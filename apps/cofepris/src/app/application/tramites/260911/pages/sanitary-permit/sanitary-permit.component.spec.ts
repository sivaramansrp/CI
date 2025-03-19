import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SanitaryPermitComponent } from './sanitary-permit.component';

describe('SanitaryPermitComponent', () => {
  let component: SanitaryPermitComponent;
  let fixture: ComponentFixture<SanitaryPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanitaryPermitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SanitaryPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
