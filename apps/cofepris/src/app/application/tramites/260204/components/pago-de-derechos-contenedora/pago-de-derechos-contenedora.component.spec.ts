import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosContenedoraComponent } from './pago-de-derechos-contenedora.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideToastr } from 'ngx-toastr';

describe('PagoDeDerechosContenedoraComponent', () => {
  let component: PagoDeDerechosContenedoraComponent;
  let fixture: ComponentFixture<PagoDeDerechosContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoDeDerechosContenedoraComponent, HttpClientTestingModule],
      providers: [
provideToastr({
          positionClass: 'toast-top-right',
        })]

    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosContenedoraComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
