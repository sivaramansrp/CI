import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaseDosComponent } from './fase-dos.component';

describe('FaseDosComponent', () => {
  let component: FaseDosComponent;
  let fixture: ComponentFixture<FaseDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaseDosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaseDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
