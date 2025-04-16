import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DuplicadoDeCertificadoComponent } from './duplicado-de-certificado.component';

describe('DuplicadoDeCertificadoComponent', () => {
  let component: DuplicadoDeCertificadoComponent;
  let fixture: ComponentFixture<DuplicadoDeCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuplicadoDeCertificadoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicadoDeCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct selector', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-duplicado-de-certificado')).toBeDefined();
  });

  it('should render the template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});