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

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el selector correcto', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-duplicado-de-certificado')).toBeDefined();
  });

  it('debería renderizar la plantilla', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});