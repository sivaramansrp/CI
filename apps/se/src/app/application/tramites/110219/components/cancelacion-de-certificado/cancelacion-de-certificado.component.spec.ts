import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionDeCertificadoComponent } from './cancelacion-de-certificado.component';

describe('CancelacionDeCertificadoComponent', () => {
  let component: CancelacionDeCertificadoComponent;
  let fixture: ComponentFixture<CancelacionDeCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelacionDeCertificadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
