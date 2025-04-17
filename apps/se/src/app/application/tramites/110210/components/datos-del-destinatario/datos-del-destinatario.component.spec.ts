import { ComponentFixture, TestBed } from '@angular/core/testing';
import mockData from 'libs/shared/theme/assets/json/110210/datos-del-destinatario.json';

import { DatosDelDestinatarioComponent } from './datos-del-destinatario.component';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import exp from 'constants';

fdescribe('DatosDelDestinatarioComponent', () => {
  let component: DatosDelDestinatarioComponent;
  let fixture: ComponentFixture<DatosDelDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelDestinatarioComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosDelDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with mockData values', () => {
    expect(component.solicitudForm.value).toEqual({
    nombres: mockData.nombres,
    primerApellido: mockData.primerApellido,
    segundoApellido: mockData.segundoApellido,
    numeroRegistroFiscal: mockData.numeroRegistroFiscal,
    razonSocial: mockData.razonSocial
    });
  });

  it('should set form values from mockData', () => {
    component.setFormValues();
    expect(component.solicitudForm.get('nombres')?.value).toBe(mockData.nombres);
    expect(component.solicitudForm.get('primerApellido')?.value).toBe(mockData.primerApellido);
    expect(component.solicitudForm.get('segundoApellido')?.value).toBe(mockData.segundoApellido);
    expect(component.solicitudForm.get('numeroRegistroFiscal')?.value).toBe(mockData.numeroRegistroFiscal);
    expect(component.solicitudForm.get('razonSocial')?.value).toBe(mockData.razonSocial);
  });

  it('should render form fields as readonly', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#nombres').getAttribute('readonly')).toBe('true');  
    expect(compiled.querySelector('#primer-apellido').getAttribute('readonly')).toBe('true');
    expect(compiled.querySelector('#segundo-apellido').getAttribute('readonly')).toBe('true');
    expect(compiled.querySelector('#numero-registro-fiscal').getAttribute('readonly')).toBe('true');
    expect(compiled.querySelector('#razon-social').getAttribute('readonly')).toBe('true');
  });
});
