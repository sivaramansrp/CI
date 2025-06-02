import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent, CatalogoSelectComponent, InputFechaComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule, TituloComponent, AlertComponent, InputRadioComponent, CatalogoSelectComponent, InputFechaComponent, ReactiveFormsModule,PagoDeDerechosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});