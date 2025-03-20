import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartificadoValidacionPageComponent } from './cartificado-validacion-page.component';

describe('CartificadoValidacionPageComponent', () => {
  let component: CartificadoValidacionPageComponent;
  let fixture: ComponentFixture<CartificadoValidacionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartificadoValidacionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartificadoValidacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
