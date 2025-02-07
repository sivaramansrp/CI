import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturarFacturasComponent } from './capturar-facturas.component';

describe('CapturarFacturasComponent', () => {
  let component: CapturarFacturasComponent;
  let fixture: ComponentFixture<CapturarFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapturarFacturasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapturarFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
