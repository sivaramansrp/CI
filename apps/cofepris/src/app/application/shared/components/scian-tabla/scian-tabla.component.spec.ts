import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScianTablaComponent } from './scian-tabla.component';

describe('ScianTablaComponent', () => {
  let component: ScianTablaComponent;
  let fixture: ComponentFixture<ScianTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScianTablaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScianTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
