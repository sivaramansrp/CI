import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilloComponent } from './domicillo.component';

describe('DomicilloComponent', () => {
  let component: DomicilloComponent;
  let fixture: ComponentFixture<DomicilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilloComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
