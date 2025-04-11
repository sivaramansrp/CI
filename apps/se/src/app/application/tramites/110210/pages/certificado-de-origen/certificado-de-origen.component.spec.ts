import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificadoDeOrigenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct selector', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-certificado-de-origen')).toBeDefined();
  });

  it('should render the template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});