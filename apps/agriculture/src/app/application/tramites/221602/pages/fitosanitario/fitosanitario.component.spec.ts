import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FitosanitarioComponent } from './fitosanitario.component';

describe('FitosanitarioComponent', () => {
  let component: FitosanitarioComponent;
  let fixture: ComponentFixture<FitosanitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitosanitarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FitosanitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
