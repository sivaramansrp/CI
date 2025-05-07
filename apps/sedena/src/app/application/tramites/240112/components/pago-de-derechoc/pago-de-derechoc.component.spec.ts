import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechocComponent } from './pago-de-derechoc.component';

describe('PagoDeDerechocComponent', () => {
  let component: PagoDeDerechocComponent;
  let fixture: ComponentFixture<PagoDeDerechocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
