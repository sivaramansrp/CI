import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { BtnContinuarComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/pasos.enum';


describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent, WizardComponent, BtnContinuarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize correctly', () => {
    expect(component.pasos).toEqual(PASOS);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent).toBeDefined();
  });

  it('should select the correct tab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should handle next button action', () => {
    spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should handle previous button action', () => {
    spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'atras', valor: 1 });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should render the correct step based on indice', () => {
    component.indice = 1;
    fixture.detectChanges();
    const pasoUnoElement = fixture.nativeElement.querySelector('paso-uno');
    expect(pasoUnoElement).toBeTruthy();
    
    component.indice = 4;
    fixture.detectChanges();
    const pasoTresElement = fixture.nativeElement.querySelector('paso-tres');
    expect(pasoTresElement).toBeTruthy();
  });
});
