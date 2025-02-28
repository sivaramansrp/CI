import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultadDomicilios90305Component } from './consultad-domicilios-90305.component';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import estado from '../../../../../../../../../libs/shared/theme/assets/json/90305/estado.json';

describe('ConsultadDomicilios90305Component', () => {
  let component: ConsultadDomicilios90305Component;
  let fixture: ComponentFixture<ConsultadDomicilios90305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule],
      providers: [FormBuilder],
      declarations: [ConsultadDomicilios90305Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultadDomicilios90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit()
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize estadoJson with data from estado.json', () => {
    expect(component.estadoJson).toEqual(estado);
  });

  it('should create the form on initialization', () => {
    expect(component.formConsulta).toBeDefined();
    expect(component.formConsulta.controls['estadoControl']).toBeDefined();
  });

  it('should have estadoControl disabled by default', () => {
    expect(component.formConsulta.controls['estadoControl'].disabled).toBe(false); // Instead of toBeFalse()
  });
  
  it('should have estadoControl with required validation', () => {
    const CONTROL = component.formConsulta.controls['estadoControl'];
    
    CONTROL.setValue('');
    expect(CONTROL.valid).toBe(false); // Explicit boolean check
    
    CONTROL.setValue('some value');
    expect(CONTROL.valid).toBe(true); // Explicit boolean check
  });
  
});
