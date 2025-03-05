import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarCertificadoTecnicoJaponComponent } from './validar-certificado-tecnico-japon.component';

describe('ValidarCertificadoTecnicoJaponComponent', () => {
  let component: ValidarCertificadoTecnicoJaponComponent;
  let fixture: ComponentFixture<ValidarCertificadoTecnicoJaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarCertificadoTecnicoJaponComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarCertificadoTecnicoJaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
