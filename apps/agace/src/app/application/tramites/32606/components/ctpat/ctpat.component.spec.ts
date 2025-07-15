import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtpatComponent } from './ctpat.component';

describe('CtpatComponent', () => {
  let component: CtpatComponent;
  let fixture: ComponentFixture<CtpatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtpatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CtpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
