import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudDatosComponent } from './solicitud-datos.component';

describe('SolicitudDatosComponent', () => {
  let component: SolicitudDatosComponent;
  let fixture: ComponentFixture<SolicitudDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
