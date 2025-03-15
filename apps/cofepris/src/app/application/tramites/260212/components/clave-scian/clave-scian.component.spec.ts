import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaveScianComponent } from './clave-scian.component';

describe('ClaveScianComponent', () => {
  let component: ClaveScianComponent;
  let fixture: ComponentFixture<ClaveScianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaveScianComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaveScianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
