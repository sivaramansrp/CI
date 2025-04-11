import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexarRequisitosComponent } from './anexar-requisitos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AnexarRequisitosComponent', () => {
  let component: AnexarRequisitosComponent;
  let fixture: ComponentFixture<AnexarRequisitosComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnexarRequisitosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AnexarRequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize `TEXTOS` with the imported `TEXTOS`', () => {
    expect(component.TEXTOS).toBeDefined();
  });

  it('should set `claseAlertaInformativa` to "alert-info"', () => {
    expect(component.claseAlertaInformativa).toBe('alert-info');
  });

  it('should render the alert with correct content', () => {
    const compiled = fixture.nativeElement;
    const alertElement = compiled.querySelector('ng-alert');
    expect(alertElement).toBeTruthy();
    expect(alertElement.getAttribute('CONTENIDO')).toBe(component.TEXTOS.ADJUNTAR);
    expect(alertElement.getAttribute('CUSTOMECLASS')).toBe(component.claseAlertaInformativa);
  });

  it('should render the table with a header', () => {
    const compiled = fixture.nativeElement;
    const tableHeader = compiled.querySelector('thead th.expedir-header');
    expect(tableHeader).toBeTruthy();
    expect(tableHeader.textContent.trim()).toBe('Sin tipo de documentos');
  });

  it('should render a button with correct text and style', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button.btn-default');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Guardar');
    expect(button.style.marginRight).toBe('15px');
  });
});