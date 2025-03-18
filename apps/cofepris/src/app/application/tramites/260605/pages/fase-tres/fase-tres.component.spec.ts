import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaseTresComponent } from './fase-tres.component';

describe('FaseTresComponent', () => {
  let component: FaseTresComponent;
  let fixture: ComponentFixture<FaseTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaseTresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaseTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
