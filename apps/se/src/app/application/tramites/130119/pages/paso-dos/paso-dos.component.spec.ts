import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { TEXTOS } from '@ng-mf/data-access-user';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let toastrServiceMock: any;

  beforeEach(async () => {
    toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PasoDosComponent],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora errores de elementos desconocidos
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar la variable TEXTOS con el valor proporcionado', () => {
    expect(component.TEXTOS).toEqual(TEXTOS);
  });

  it('debería renderizar el título correctamente', () => {
    const COMPILED = fixture.nativeElement;
    const TITULO_ELEMENT = COMPILED.querySelector('ng-titulo');
    expect(TITULO_ELEMENT).toBeTruthy();
    expect(TITULO_ELEMENT.getAttribute('titulo')).toBe('Requisitos opcionales');
  });

  it('debería renderizar la alerta correctamente', () => {
    const COMPILED = fixture.nativeElement;
    const ALERT_ELEMENT = COMPILED.querySelector('ng-alert');
    expect(ALERT_ELEMENT).toBeTruthy();
    expect(ALERT_ELEMENT.getAttribute('CONTENIDO')).toBe(component.TEXTOS.INSTRUCCIONES);
  });

  it('debería renderizar el componente anexar-documentos', () => {
    const COMPILED = fixture.nativeElement;
    const ANEXAR_DOCUMENTOS_ELEMENT = COMPILED.querySelector('anexar-documentos');
    expect(ANEXAR_DOCUMENTOS_ELEMENT).toBeTruthy();
  });
});