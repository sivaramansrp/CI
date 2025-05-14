import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SolicitudPageComponent', () => {
  let componente: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería renderizar <app-paso-uno> cuando el índice es 1', () => {
    componente.indice = 1;
    fixture.detectChanges(); 

    const ELEMENTO_PASO_UNO = fixture.debugElement.query(By.css('app-paso-uno'));
    expect(ELEMENTO_PASO_UNO).toBeTruthy();
  });

  it('debería renderizar <app-paso-dos> cuando el índice es 2', () => {
    componente.indice = 2;
    fixture.detectChanges(); 

    const ELEMENTO_PASO_DOS = fixture.debugElement.query(By.css('app-paso-dos'));
    expect(ELEMENTO_PASO_DOS).toBeTruthy();  
  });

  it('debería renderizar <app-paso-tres> cuando el índice es 3', () => {
    componente.indice = 3;
    fixture.detectChanges();  

    const ELEMENTO_PASO_TRES = fixture.debugElement.query(By.css('app-paso-tres'));
    expect(ELEMENTO_PASO_TRES).toBeTruthy(); 
  });

  it('debería renderizar el paso correcto basado en el índice actual', () => {
    componente.indice = 1;
    fixture.detectChanges();
    let ELEMENTO_PASO_UNO = fixture.debugElement.query(By.css('app-paso-uno'));
    expect(ELEMENTO_PASO_UNO).toBeTruthy();
    let ELEMENTO_PASO_DOS = fixture.debugElement.query(By.css('app-paso-dos'));
    let ELEMENTO_PASO_TRES = fixture.debugElement.query(By.css('app-paso-tres'));
    expect(ELEMENTO_PASO_DOS).toBeFalsy();
    expect(ELEMENTO_PASO_TRES).toBeFalsy();

    componente.indice = 2;
    fixture.detectChanges();
    ELEMENTO_PASO_UNO = fixture.debugElement.query(By.css('app-paso-uno'));
    ELEMENTO_PASO_DOS = fixture.debugElement.query(By.css('app-paso-dos'));
    ELEMENTO_PASO_TRES = fixture.debugElement.query(By.css('app-paso-tres'));
    expect(ELEMENTO_PASO_UNO).toBeFalsy();
    expect(ELEMENTO_PASO_DOS).toBeTruthy();
    expect(ELEMENTO_PASO_TRES).toBeFalsy();

    componente.indice = 3;
    fixture.detectChanges();
    ELEMENTO_PASO_UNO = fixture.debugElement.query(By.css('app-paso-uno'));
    ELEMENTO_PASO_DOS = fixture.debugElement.query(By.css('app-paso-dos'));
    ELEMENTO_PASO_TRES = fixture.debugElement.query(By.css('app-paso-tres'));
    expect(ELEMENTO_PASO_UNO).toBeFalsy();
    expect(ELEMENTO_PASO_DOS).toBeFalsy();
    expect(ELEMENTO_PASO_TRES).toBeTruthy();
  });

  it('debería disparar getValorIndice cuando se hace clic en btn-continuar', () => {
    const EVENTO_ACCION = { valor: 2, accion: 'cont' };
    const ESPÍA_GET_VALOR_INDICE = jest.spyOn(componente, 'getValorIndice');
    componente.indice = 1;
    fixture.detectChanges();

    const BOTÓN_CONTINUAR = fixture.debugElement.query(By.css('btn-continuar'));
    BOTÓN_CONTINUAR.triggerEventHandler('continuarEvento', EVENTO_ACCION);
    expect(ESPÍA_GET_VALOR_INDICE).toHaveBeenCalledWith(EVENTO_ACCION);
  });

  it('no debería navegar cuando se dispara una acción inválida', () => {
    const EVENTO_ACCION = { valor: 5, accion: 'cont' }; 

    const ESPÍA_GET_VALOR_INDICE = jest.spyOn(componente, 'getValorIndice');
    componente.getValorIndice(EVENTO_ACCION);

    expect(componente.indice).toBe(1);  
    expect(ESPÍA_GET_VALOR_INDICE).toHaveBeenCalledWith(EVENTO_ACCION);
  });
});
