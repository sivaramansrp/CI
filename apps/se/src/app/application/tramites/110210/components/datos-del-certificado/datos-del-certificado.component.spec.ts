import { ComponentFixture, TestBed } from '@angular/core/testing';
import mockData from 'libs/shared/theme/assets/json/110210/datos-del-certificado.json';

import { DatosDelCertificadoComponent } from './datos-del-certificado.component';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

fdescribe('DatosDelCertificadoComponent', () => {
  let component: DatosDelCertificadoComponent;
  let fixture: ComponentFixture<DatosDelCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelCertificadoComponent, ReactiveFormsModule], 
      providers: [FormBuilder],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosDelCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with mockData values', () => {
    expect(component.solicitudForm.value).toEqual({
    cveRegistroProductor: mockData.cveRegistroProductor,
    fichaExpedicion: mockData.fichaExpedicion,
    fechaVecimiento: mockData.fechaVecimiento,
    tratadoAcuerdoClave: mockData.tratadoAcuerdoClave,
    paisBloqueClave: mockData.paisBloqueClave
    });
  });

  it('should set form values from mockData', () => {
    component.setFormValues();
    expect(component.solicitudForm.get('cveRegistroProductor')?.value).toBe(mockData.cveRegistroProductor);
    expect(component.solicitudForm.get('fichaExpedicion')?.value).toBe(mockData.fichaExpedicion);
    expect(component.solicitudForm.get('fechaVecimiento')?.value).toBe(mockData.fechaVecimiento);
    expect(component.solicitudForm.get('tratadoAcuerdoClave')?.value).toBe(mockData.tratadoAcuerdoClave);
    expect(component.solicitudForm.get('paisBloqueClave')?.value).toBe(mockData.paisBloqueClave);
  });

  it('should render form fields as readonly', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#cve-registro-productor').getAttribute('readonly')).toBe('true');
    expect(compiled.querySelector('#ficha-expedicion').getAttribute('readonly')).toBe('true');
    expect(compiled.querySelector('#fecha-vecimiento').getAttribute('readonly')).toBe('true');
    expect(compiled.querySelector('#tratado-acuerdo-clave').getAttribute('readonly')).toBe('true');
    expect(compiled.querySelector('#pais-bloque-clave').getAttribute('readonly')).toBe('true');
  });
});
