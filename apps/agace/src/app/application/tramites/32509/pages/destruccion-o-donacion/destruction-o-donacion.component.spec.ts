import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestructionODonacionComponent } from './destruction-o-donacion.component';

describe('DestructionODonacionComponent', () => {
  let component: DestructionODonacionComponent;
  let fixture: ComponentFixture<DestructionODonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestructionODonacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestructionODonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
