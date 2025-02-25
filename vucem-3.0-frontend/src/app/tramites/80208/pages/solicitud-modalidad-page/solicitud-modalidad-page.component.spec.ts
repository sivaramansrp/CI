import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudModalidadPageComponent } from './solicitud-modalidad-page.component';

describe('SolicitudModalidadPageComponent', () => {
  let component: SolicitudModalidadPageComponent;
  let fixture: ComponentFixture<SolicitudModalidadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudModalidadPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudModalidadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
