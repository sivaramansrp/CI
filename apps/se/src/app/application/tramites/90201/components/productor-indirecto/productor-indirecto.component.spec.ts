import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductorIndirectoComponent } from './productor-indirecto.component';

describe('ProductorIndirectoComponent', () => {
  let component: ProductorIndirectoComponent;
  let fixture: ComponentFixture<ProductorIndirectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductorIndirectoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductorIndirectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
