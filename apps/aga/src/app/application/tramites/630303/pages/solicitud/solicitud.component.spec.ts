import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';

describe('SolicitudComponent', () => {
  let COMPONENTE: SolicitudComponent;
  let FIXTURE: ComponentFixture<SolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudComponent],
    }).compileComponents();

    FIXTURE = TestBed.createComponent(SolicitudComponent);
    COMPONENTE = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('DEBERÍA CREAR EL COMPONENTE', () => {
    expect(COMPONENTE).toBeTruthy();
  });
});