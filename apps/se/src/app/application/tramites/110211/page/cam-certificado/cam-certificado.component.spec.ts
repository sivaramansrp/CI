import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamCertificadoComponent } from './cam-certificado.component';

describe('CamCertificadoComponent', () => {
  let component: CamCertificadoComponent;
  let fixture: ComponentFixture<CamCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamCertificadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CamCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
