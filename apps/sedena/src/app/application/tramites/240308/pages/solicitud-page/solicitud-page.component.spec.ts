import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render <app-paso-uno> when indice is 1', () => {
    component.indice = 1;
    fixture.detectChanges(); 

    const pasoUnoElement = fixture.debugElement.query(By.css('app-paso-uno'));
    expect(pasoUnoElement).toBeTruthy();
  });

  it('should render <app-paso-dos> when indice is 2', () => {
    component.indice = 2;
    fixture.detectChanges(); 

    const pasoDosElement = fixture.debugElement.query(By.css('app-paso-dos'));
    expect(pasoDosElement).toBeTruthy();  
  });

  it('should render <app-paso-tres> when indice is 3', () => {
    component.indice = 3;
    fixture.detectChanges();  

    const pasoTresElement = fixture.debugElement.query(By.css('app-paso-tres'));
    expect(pasoTresElement).toBeTruthy(); 
  });

  it('should render the correct step based on the current indice', () => {
    component.indice = 1;
    fixture.detectChanges();
    let pasoUnoElement = fixture.debugElement.query(By.css('app-paso-uno'));
    expect(pasoUnoElement).toBeTruthy();
    let pasoDosElement = fixture.debugElement.query(By.css('app-paso-dos'));
    let pasoTresElement = fixture.debugElement.query(By.css('app-paso-tres'));
    expect(pasoDosElement).toBeFalsy();
    expect(pasoTresElement).toBeFalsy();

    component.indice = 2;
    fixture.detectChanges();
    pasoUnoElement = fixture.debugElement.query(By.css('app-paso-uno'));
    pasoDosElement = fixture.debugElement.query(By.css('app-paso-dos'));
    pasoTresElement = fixture.debugElement.query(By.css('app-paso-tres'));
    expect(pasoUnoElement).toBeFalsy();
    expect(pasoDosElement).toBeTruthy();
    expect(pasoTresElement).toBeFalsy();

    component.indice = 3;
    fixture.detectChanges();
    pasoUnoElement = fixture.debugElement.query(By.css('app-paso-uno'));
    pasoDosElement = fixture.debugElement.query(By.css('app-paso-dos'));
    pasoTresElement = fixture.debugElement.query(By.css('app-paso-tres'));
    expect(pasoUnoElement).toBeFalsy();
    expect(pasoDosElement).toBeFalsy();
    expect(pasoTresElement).toBeTruthy();
  });

  it('should trigger getValorIndice when btn-continuar is clicked', () => {
    const actionEvent = { valor: 2, accion: 'cont' };
    const getValorIndiceSpy = jest.spyOn(component, 'getValorIndice');
    component.indice = 1;
    fixture.detectChanges();

    const continuarButton = fixture.debugElement.query(By.css('btn-continuar'));
    continuarButton.triggerEventHandler('continuarEvento', actionEvent);
    expect(getValorIndiceSpy).toHaveBeenCalledWith(actionEvent);
  });

  it('should not navigate when an invalid action is triggered', () => {
    const actionEvent = { valor: 5, accion: 'cont' }; 

    const getValorIndiceSpy = jest.spyOn(component, 'getValorIndice');
    component.getValorIndice(actionEvent);

    expect(component.indice).toBe(1);  
    expect(getValorIndiceSpy).toHaveBeenCalledWith(actionEvent);
  });
});
