import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarRequerimientoComponent } from './solicitar-requerimiento.component';

describe('SolicitarRequerimientoComponent', () => {
  let component: SolicitarRequerimientoComponent;
  let fixture: ComponentFixture<SolicitarRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitarRequerimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitarRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
