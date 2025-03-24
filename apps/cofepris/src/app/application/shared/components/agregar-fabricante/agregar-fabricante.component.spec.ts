import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarFabricanteComponent } from './agregar-fabricante.component';

describe('AgregarFabricanteComponent', () => {
  let component: AgregarFabricanteComponent;
  let fixture: ComponentFixture<AgregarFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarFabricanteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
