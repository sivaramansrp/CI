import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        WizardComponent,
        BtnContinuarComponent,
        PasoUnoComponent,
        PasoTresComponent,
        CommonModule,
        SolicitudPageComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should filter and map the steps correctly', () => {
      component.ngOnInit();
      expect(component.pasos).toEqual(
        PASOS.filter((step) => step.indice !== 2).map((step) =>
          step.indice === 3 ? { ...step, indice: 2 } : step
        )
      );
    });
  });

  describe('seleccionaTab', () => {
    it('should update the current tab index', () => {
      component.seleccionaTab(2);
      expect(component.indice).toBe(2);
    });
  });

  describe('getValorIndice', () => {
    let wizardComponentSpy: jest.SpyInstance;

    beforeEach(() => {
      wizardComponentSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    });

    it('should call alEventoHijo and update the index when action is "cont"', () => {
      const alEventoHijoSpy = jest.spyOn(component, 'alEventoHijo');
      const mockEvent = { accion: 'cont', valor: 3 };

      component.getValorIndice(mockEvent);

      expect(alEventoHijoSpy).toHaveBeenCalledWith(component.nombre);
      expect(component.indice).toBe(3);
      expect(component.nombre).toBe(1);
      expect(wizardComponentSpy).toHaveBeenCalled();
    });

    it('should call wizardComponent.atras when action is not "cont"', () => {
      const wizardAtrasSpy = jest.spyOn(component.wizardComponent, 'atras');
      const mockEvent = { accion: 'back', valor: 2 };

      component.getValorIndice(mockEvent);

      expect(component.indice).toBe(2);
      expect(wizardAtrasSpy).toHaveBeenCalled();
    });

    it('should not update the index if the value is out of range', () => {
      const mockEvent = { accion: 'cont', valor: 6 };

      component.getValorIndice(mockEvent);

      expect(component.indice).toBe(1); 
    });
  });

  describe('alEventoHijo', () => {
    it('should update the nombre property', () => {
      component.alEventoHijo(5);
      expect(component.nombre).toBe(5);
    });
  });
});