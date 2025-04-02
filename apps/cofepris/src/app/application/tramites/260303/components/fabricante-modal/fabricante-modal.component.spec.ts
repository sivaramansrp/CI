import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FabricanteModalComponent } from './fabricante-modal.component';

describe('FabricanteModalComponent', () => {
  let component: FabricanteModalComponent;
  let fixture: ComponentFixture<FabricanteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabricanteModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FabricanteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
