import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CortinaALaItalianaComponent } from './cortina-a-la-italiana.component';

describe('CortinaALaItalianaComponent', () => {
  let component: CortinaALaItalianaComponent;
  let fixture: ComponentFixture<CortinaALaItalianaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CortinaALaItalianaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CortinaALaItalianaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
