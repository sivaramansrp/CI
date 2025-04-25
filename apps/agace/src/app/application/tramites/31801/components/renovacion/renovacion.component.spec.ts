import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenovacionComponent } from './renovacion.component';

describe('RenovacionComponent', () => {
  let component: RenovacionComponent;
  let fixture: ComponentFixture<RenovacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RenovacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
