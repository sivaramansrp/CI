import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoKimberleyComponent } from './certificado-kimberley.component';

describe('CertificadoKimberleyComponent', () => {
  let component: CertificadoKimberleyComponent;
  let fixture: ComponentFixture<CertificadoKimberleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificadoKimberleyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoKimberleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
