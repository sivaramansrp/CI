import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPantallasComponent } from './solicitud.component';

describe('SolicitudPantallasComponent', () => {
  let component: SolicitudPantallasComponent;
  let fixture: ComponentFixture<SolicitudPantallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPantallasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudPantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
