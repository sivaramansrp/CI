import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaPagoDeDerechosComponent } from './interna-pago-de-derechos.component';

describe('InternaPagoDeDerechosComponent', () => {
  let component: InternaPagoDeDerechosComponent;
  let fixture: ComponentFixture<InternaPagoDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternaPagoDeDerechosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternaPagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
