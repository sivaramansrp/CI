import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequisitosNecessariosComponent } from './requisitos-necessarios.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RequisitosNecessariosComponent', () => {
  let component: RequisitosNecessariosComponent;
  /**
   * Fijación para la prueba unitaria del componente RequisitosNecessariosComponent.
   * Proporciona acceso al componente renderizado y permite interactuar con su estado y DOM.
   */
  let fixture: ComponentFixture<RequisitosNecessariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RequisitosNecessariosComponent, // Add the component here
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // To handle custom elements like <ng-titulo> and <app-tabla-dinamica>
    }).compileComponents();

    fixture = TestBed.createComponent(RequisitosNecessariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title with correct text', () => {
    const compiled = fixture.nativeElement;
    const tituloElement = compiled.querySelector('ng-titulo');
    expect(tituloElement).toBeTruthy();
    expect(tituloElement.getAttribute('titulo')).toBe('Requisitos necesarios');
  });

  it('should render the dynamic table', () => {
    const compiled = fixture.nativeElement;
    const tableElement = compiled.querySelector('app-tabla-dinamica');
    expect(tableElement).toBeTruthy();
  });

  it('should render pagination with one page item', () => {
    const compiled = fixture.nativeElement;
    const paginationElement = compiled.querySelector('ul.pagination');
    expect(paginationElement).toBeTruthy();
    const pageItems = paginationElement.querySelectorAll('li.page-item');
    expect(pageItems.length).toBe (1);
    expect(pageItems[0].textContent.trim()).toBe('1');
  });
});
