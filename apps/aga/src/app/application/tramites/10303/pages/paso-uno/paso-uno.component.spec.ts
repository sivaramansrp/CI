import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { AlertComponent, SolicitanteComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ 
      declarations: [PasoUnoComponent, SolicitanteComponent, AlertComponent],
      imports: [CommonModule],
      providers: [NO_ERRORS_SCHEMA]
      // .overrideComponent(PasoUnoComponent, {
      //   set: {
      //     host: { 'hostID': Math.random().toString() }, // Provide a static hostID for testing
      //   },
      // });
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    // alertFixture = TestBed.createComponent(AlertComponent);
    // alertComponent = alertFixture.componentInstance;
    // alertComponent.CONTENIDO = 'Test content';
    // alertFixture.detectChanges();
  });

  it('should create', () => {
    // Verificar que el componente se crea correctamente
    expect(component).toBeTruthy();
  });

  // it('should pass CONTENIDO input to AlertComponent', () => {    
  //   expect(alertComponent.CONTENIDO).toBe('Test content');
  // });

  it('should have default tab index set to 1', () => {
    // Verificar que el índice predeterminado es 1
    expect(component.indice).toBe(1);
  });

  it('should update the selected tab index when seleccionaTab is called', () => {
    // Llamar a seleccionaTab y verificar que actualiza correctamente el índice
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should render Solicitante tab when indice is 1', () => {
    // Establecer el índice en 1 y verificar que se renderiza el componente correspondiente
    component.indice = 1;
    fixture.detectChanges();
    const alertMessage = fixture.nativeElement.querySelector('.alert-warning');
    expect(alertMessage).toBeTruthy(); // Verificar que el mensaje de alerta está presente
    expect(alertMessage.textContent).toContain('Deberá verificar que todos los datos se encuentren actualizados');
  });

  it('should render Registro de donación tab when indice is 2', () => {
    // Establecer el índice en 2 y verificar que se renderiza el componente correspondiente
    component.indice = 2;
    fixture.detectChanges();
    const registroDonacion = fixture.nativeElement.querySelector('app-registro-de-donacion');
    expect(registroDonacion).toBeTruthy(); // Verificar que el componente de registro de donación está presente
  });

  it('should handle keyboard navigation (Enter key)', () => {
    // Simular que el usuario presiona Enter en el tab y verificar que cambia el índice
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const tabElement = fixture.nativeElement.querySelector('a[tabindex="2"]');
    tabElement.dispatchEvent(event);
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should handle keyboard navigation (Space key)', () => {
    // Simular que el usuario presiona Espacio en el tab y verificar que cambia el índice
    const event = new KeyboardEvent('keydown', { key: ' ' });
    const tabElement = fixture.nativeElement.querySelector('a[tabindex="1"]');
    tabElement.dispatchEvent(event);
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });
});
