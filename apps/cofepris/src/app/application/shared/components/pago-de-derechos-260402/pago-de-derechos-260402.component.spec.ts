import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDeDerechos260402Component } from './pago-de-derechos-260402.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PagoDeDerechos260402Service } from '../../services/pago-de-derechos-260402.service';
import { of } from 'rxjs';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechos260402Component;
  let fixture: ComponentFixture<PagoDeDerechos260402Component>;
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
      imports: [CommonModule, ReactiveFormsModule, PagoDeDerechos260402Component],
      declarations: [],
      providers: [
        { provide: PagoDeDerechos260402Service, useValue: pagoDeDerechosMockService }
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechos260402Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDeDerechos260402Component);
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