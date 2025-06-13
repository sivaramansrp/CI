import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent, TercerosComponent } from '@libs/shared/data-access-user/src';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TransporteComponent } from '../../components/transporte/transporte.component';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoUnoComponent, SolicitanteComponent, DatosDeLaSolicitudComponent, PagoDeDerechosComponent, TransporteComponent, TercerosComponent, ReactiveFormsModule, CommonModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
