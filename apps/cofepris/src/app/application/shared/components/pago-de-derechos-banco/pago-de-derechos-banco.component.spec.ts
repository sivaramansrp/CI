import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosBancoComponent } from './pago-de-derechos-banco.component';

describe('PagoDeDerechosBancoComponent', () => {
  let component: PagoDeDerechosBancoComponent;
  let fixture: ComponentFixture<PagoDeDerechosBancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoDeDerechosBancoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
