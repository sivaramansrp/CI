import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasAsociadasComponent } from './facturas-asociadas.component';

describe('FacturasAsociadasComponent', () => {
  let component: FacturasAsociadasComponent;
  let fixture: ComponentFixture<FacturasAsociadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacturasAsociadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacturasAsociadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
