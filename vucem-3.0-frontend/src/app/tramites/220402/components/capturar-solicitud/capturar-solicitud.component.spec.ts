import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturarSolicitudComponent } from './capturar-solicitud.component';

describe('CapturarSolicitudComponent', () => {
  let component: CapturarSolicitudComponent;
  let fixture: ComponentFixture<CapturarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapturarSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapturarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
