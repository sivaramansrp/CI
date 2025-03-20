import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoOrigenComponent } from './certificado-origen.component';

describe('CertificadoOrigenComponent', () => {
  let component: CertificadoOrigenComponent;
  let fixture: ComponentFixture<CertificadoOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificadoOrigenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
