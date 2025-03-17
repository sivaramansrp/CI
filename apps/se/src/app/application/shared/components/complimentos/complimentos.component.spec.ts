import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplimentosComponent } from './complimentos.component';

describe('ComplimentosComponent', () => {
  let component: ComplimentosComponent;
  let fixture: ComponentFixture<ComplimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplimentosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
