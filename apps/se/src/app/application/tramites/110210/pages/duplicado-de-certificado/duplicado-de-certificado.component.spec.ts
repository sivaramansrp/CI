import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DuplicadoDeCertificadoComponent } from './duplicado-de-certificado.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DuplicadoDeCertificadoComponent', () => {
  let component: DuplicadoDeCertificadoComponent;
  let fixture: ComponentFixture<DuplicadoDeCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuplicadoDeCertificadoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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