import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductorIndirecto90305Component } from './productorIndirecto-90305.component';

describe('ProductorIndirecto90305Component', () => {
  let component: ProductorIndirecto90305Component;
  let fixture: ComponentFixture<ProductorIndirecto90305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductorIndirecto90305Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductorIndirecto90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
