import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionDeCertificadosComponent } from './cancelacion-de-certificados.component';

describe('CancelacionDeCertificadosComponent', () => {
  let component: CancelacionDeCertificadosComponent;
  let fixture: ComponentFixture<CancelacionDeCertificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelacionDeCertificadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
