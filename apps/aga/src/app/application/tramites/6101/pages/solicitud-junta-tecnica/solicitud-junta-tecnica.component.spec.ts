import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudJuntaTecnicaComponent } from './solicitud-junta-tecnica.component';

describe('SolicitudJuntaTecnicaComponent', () => {
  let component: SolicitudJuntaTecnicaComponent;
  let fixture: ComponentFixture<SolicitudJuntaTecnicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudJuntaTecnicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudJuntaTecnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
