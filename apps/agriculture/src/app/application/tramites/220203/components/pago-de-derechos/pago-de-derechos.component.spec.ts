import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PagoDeDerechosComponent } from './pago-de-derechos.component';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create formularioPago FormGroup on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formularioPago).toBeDefined();
  });
});