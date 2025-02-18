import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioDeModalidadComponent } from './cambio-de-modalidad.component';

describe('CambioDeModalidadComponent', () => {
  let component: CambioDeModalidadComponent;
  let fixture: ComponentFixture<CambioDeModalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambioDeModalidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambioDeModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
