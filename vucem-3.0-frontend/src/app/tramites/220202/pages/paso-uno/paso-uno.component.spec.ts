import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoUnoComponent } from './paso-uno.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct values', () => {
    expect(component.indice).toBe(1);
    expect(component.pestanaListaDatos.length).toBe(5);
  });

  it('should select the correct tab', () => {
    component.seleccionaPestana(3);
    expect(component.indice).toBe(3);
  });

  it('should have correct tab data', () => {
    const expectedTabs = [
      { index: 1, title: 'Solicitante', component: 'solicitante' },
      { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' },
      { index: 3, title: 'Datos para movilización nacional', component: 'datos-para-movilizacion-nacional' },
      { index: 4, title: 'Terceros relacionados', component: 'terceror-relacionados' },
      { index: 5, title: 'Pago de derechos', component: 'pago-de-derechos' }
    ];

    expect(component.pestanaListaDatos).toEqual(expectedTabs);
  });
});
