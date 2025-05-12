import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PagoDeDerechosService } from '../../services/pago-de-derechos.service';
import { of } from 'rxjs';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let pagoDeDerechosMockService: any;

  beforeEach(async () => {
    pagoDeDerechosMockService = {
      getData: jest.fn().mockReturnValue(of([
        { id: "Banco1", descripcion: "Banco1" },
        { id: "Banco2", descripcion: "Banco2" },
        { id: "Banco3", descripcion: "Banco3" },
      ])),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, PagoDeDerechosComponent],
      declarations: [],
      providers: [
        { provide: PagoDeDerechosService, useValue: pagoDeDerechosMockService }
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.pagoDerechos).toBeDefined();
    expect(component.pagoDerechos.controls['claveDeReferncia']).toBeDefined();
  });

  it('should call getData on init', () => {
    expect(pagoDeDerechosMockService.getData).toHaveBeenCalled();
  });
});