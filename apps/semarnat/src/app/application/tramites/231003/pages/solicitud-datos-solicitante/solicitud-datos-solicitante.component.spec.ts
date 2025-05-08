import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDatosSolicitanteComponent } from './solicitud-datos-solicitante.component';

describe('SolicitudDatosSolicitanteComponent', () => {
  let component: SolicitudDatosSolicitanteComponent;
  let fixture: ComponentFixture<SolicitudDatosSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudDatosSolicitanteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDatosSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
