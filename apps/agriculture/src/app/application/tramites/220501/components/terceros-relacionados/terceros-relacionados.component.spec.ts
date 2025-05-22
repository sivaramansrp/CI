import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { ITEMS, PERSONA, TERCEROS_TEXTO_DE_ALERTA } from '../../constantes/constantes';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TercerosRelacionadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default values', () => {
    expect(component.TEXTO_DE_ALERTA).toBe(TERCEROS_TEXTO_DE_ALERTA);
    expect(component.enableScrollbar).toBe(false);
    expect(component.items).toEqual(ITEMS);
    expect(component.persona).toEqual(PERSONA);
  });

  it('should set enableScrollbar to true', () => {
    component.enableScrollbar = true;
    expect(component.enableScrollbar).toBe(true);
  });

  it('should set enableScrollbar to false', () => {
    component.enableScrollbar = false;
    expect(component.enableScrollbar).toBe(false);
  });

  it('should verify items list contains correct data', () => {
    expect(component.items.length).toBe(ITEMS.length);
    expect(component.items[0]).toEqual(ITEMS[0]);
  });

  it('should verify persona list contains correct data', () => {
    expect(component.persona.length).toBe(PERSONA.length);
    expect(component.persona[0]).toEqual(PERSONA[0]);
  });

  it('should update items list', () => {
    const newItem = {
      nombre: 'John Doe',
      telefono: '1234567890',
      correo: 'john.doe@example.com',
      domicilio: '123 Main St',
      pais: 'USA',
    };
    component.items.push(newItem);
    expect(component.items.length).toBe(ITEMS.length + 1);
    expect(component.items[component.items.length - 1]).toEqual(newItem);
  });

  it('should update persona list', () => {
    const newPersona = {
      nombre: 'Jane Doe',
      telefono: '0987654321',
      correo: 'jane.doe@example.com',
      calle: '456 Elm St',
      exterior: 10,
      interior: 5,
      pais: 'Canada',
    };
    component.persona.push(newPersona);
    expect(component.persona.length).toBe(PERSONA.length + 1);
    expect(component.persona[component.persona.length - 1]).toEqual(newPersona);
  });
});