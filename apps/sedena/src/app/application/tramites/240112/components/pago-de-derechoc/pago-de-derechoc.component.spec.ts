import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechocComponent } from './pago-de-derechoc.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';

describe('PagoDeDerechocComponent', () => {
  let component: PagoDeDerechocComponent;
  let fixture: ComponentFixture<PagoDeDerechocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechocComponent],
      imports: [PagoDeDerechosComponent, HttpClientTestingModule],
      providers: [DatosSolicitudService],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
