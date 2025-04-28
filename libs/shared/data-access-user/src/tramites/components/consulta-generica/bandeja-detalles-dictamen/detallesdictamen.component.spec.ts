import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesdictamenComponent } from './detallesdictamen.component';

describe('DetallesdictamenComponent', () => {
  let component: DetallesdictamenComponent;
  let fixture: ComponentFixture<DetallesdictamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesdictamenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesdictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
