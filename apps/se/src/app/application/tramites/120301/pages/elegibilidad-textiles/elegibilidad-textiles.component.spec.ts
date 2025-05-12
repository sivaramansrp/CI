import { BtnContinuarComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElegibilidadTextilesComponent } from './elegibilidad-textiles.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';





describe('ElegibilidadTextilesComponent', () => {
  let component: ElegibilidadTextilesComponent;
  let fixture: ComponentFixture<ElegibilidadTextilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TituloComponent, WizardComponent, BtnContinuarComponent],
      declarations: [ElegibilidadTextilesComponent, PasoUnoComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ElegibilidadTextilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Expedición de certificados de elegibilidad de bienes textiles y prendas de vestir con Canadá y Estados Unidos de América');
  });

  it('should initialize form group', () => {
    expect(component.formGroup).toBeDefined();
  });

  it('should have default form values', () => {
    const formValues = component.formGroup.value;
    expect(formValues).toEqual({
      campo1: '',
      campo2: ''
    });
  });

  // Add more test cases as needed
});