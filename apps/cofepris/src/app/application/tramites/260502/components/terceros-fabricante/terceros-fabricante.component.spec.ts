import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosFabricanteComponent } from './terceros-fabricante.component';

describe('TercerosFabricanteComponent', () => {
  let component: TercerosFabricanteComponent;
  let fixture: ComponentFixture<TercerosFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosFabricanteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
