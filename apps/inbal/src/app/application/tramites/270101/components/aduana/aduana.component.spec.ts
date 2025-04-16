import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AduanaComponent } from './aduana.component';

describe('AduanaComponent', () => {
  let component: AduanaComponent;
  let fixture: ComponentFixture<AduanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AduanaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AduanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
