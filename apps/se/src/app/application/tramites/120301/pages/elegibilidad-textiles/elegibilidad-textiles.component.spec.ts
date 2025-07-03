import { BtnContinuarComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElegibilidadTextilesComponent } from './elegibilidad-textiles.component';
import { HttpClient } from '@angular/common/http';
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [

        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
          }
        }
]
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

  it('should set indice and call wizardComponent.siguiente() when getValorIndice is called with accion "cont"', () => {
    component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
    const event = { valor: 2, accion: 'cont' };
    component.getValorIndice(event);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should set indice and call wizardComponent.atras() when getValorIndice is called with accion not "cont"', () => {
    component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
    const event = { valor: 3, accion: 'back' };
    component.getValorIndice(event);
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not change indice or call wizardComponent methods if valor is out of range', () => {
    component.wizardComponent = { siguiente: jest.fn(), atras: jest.fn() } as any;
    component.indice = 1;
    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
    component.getValorIndice({ valor: 5, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should return error string for static obtenerNombreDelTítulo', () => {
    const result = ElegibilidadTextilesComponent.obtenerNombreDelTítulo(1);
    expect(result).toContain('Error: Método no implementado.');
  });
});