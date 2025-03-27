import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamDatosCertificadoComponent } from './cam-datos-certificado.component';

describe('CamDatosCertificadoComponent', () => {
  let component: CamDatosCertificadoComponent;
  let fixture: ComponentFixture<CamDatosCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamDatosCertificadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CamDatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
