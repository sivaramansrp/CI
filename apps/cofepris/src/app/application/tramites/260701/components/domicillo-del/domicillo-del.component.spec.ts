import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilloDelComponent } from './domicillo-del.component';

describe('DomicilloDelComponent', () => {
  let component: DomicilloDelComponent;
  let fixture: ComponentFixture<DomicilloDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilloDelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilloDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
