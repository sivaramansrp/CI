import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrosslistNewComponent } from './crosslist-new.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CrosslistNewComponent', () => {
  let component: CrosslistNewComponent;
  let fixture: ComponentFixture<CrosslistNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrosslistNewComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CrosslistNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
