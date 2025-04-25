import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosContenedoraComponent } from './pago-de-derechos-contenedora.component';

describe('PagoDeDerechosContenedoraComponent', () => {
  let componente: PagoDeDerechosContenedoraComponent;
  let fixture: ComponentFixture<PagoDeDerechosContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoDeDerechosContenedoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosContenedoraComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(componente).toBeTruthy();
  });
});
