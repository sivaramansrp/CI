import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { HttpClientModule } from '@angular/common/http';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PeriodoEnElExtranjeroComponent } from '../../components/periodo-en-el-extranjero/periodo-en-el-extranjero.component';
import { MotivoDeLaExportacionComponent } from '../../components/motivo-de-la-exportacion/motivo-de-la-exportacion.component';
import { LugarDeDestinoComponent } from '../../components/lugar-de-destino/lugar-de-destino.component';
import { AduanaComponent } from '../../components/aduana/aduana.component';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [
        HttpClientModule,
        SolicitanteComponent,
        DatosDeLaSolicitudComponent,
        PeriodoEnElExtranjeroComponent,
        MotivoDeLaExportacionComponent,
        LugarDeDestinoComponent,
        AduanaComponent,
        PagoDeDerechosComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
