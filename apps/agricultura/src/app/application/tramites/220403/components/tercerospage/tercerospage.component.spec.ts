import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerospageComponent } from './tercerospage.component';

describe('TercerospageComponent', () => {
  let component: TercerospageComponent;
  let fixture: ComponentFixture<TercerospageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerospageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerospageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
