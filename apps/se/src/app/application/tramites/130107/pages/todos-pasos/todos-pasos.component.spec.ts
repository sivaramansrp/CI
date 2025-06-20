import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosPasosComponent } from './todos-pasos.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';

describe('TodosPasosComponent', () => {
  let component: TodosPasosComponent;
  let fixture: ComponentFixture<TodosPasosComponent>;
  let consultaQueryMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };

    await TestBed.configureTestingModule({
      declarations: [TodosPasosComponent],
      providers: [{ provide: ConsultaioQuery, useValue: consultaQueryMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosPasosComponent);
    component = fixture.componentInstance;
    // Mock wizardComponent
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getValorIndice', () => {
    it('should update indice and titulo, and call wizardComponent.siguiente for accion "cont"', () => {
      const accion = { valor: 2, accion: 'cont' };
      component.getValorIndice(accion);
      expect(component.indice).toBe(2);
      expect(component.titulo).toBeDefined();
      expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    });

    it('should update indice and titulo, and call wizardComponent.atras for accion not "cont"', () => {
      const accion = { valor: 3, accion: 'ant' };
      component.getValorIndice(accion);
      expect(component.indice).toBe(3);
      expect(component.titulo).toBeDefined();
      expect(component.wizardComponent.atras).toHaveBeenCalled();
    });

    it('should set titulo to TITULO_PASO_UNO for other indices', () => {
      const accion = { valor: 1, accion: 'cont' };
      component.getValorIndice(accion);
      expect(component.titulo).toBeDefined();
    });

    it('should not update indice if valor is out of range', () => {
      component.indice = 1;
      component.getValorIndice({ valor: 0, accion: 'cont' });
      expect(component.indice).toBe(1);
      component.getValorIndice({ valor: 5, accion: 'cont' });
      expect(component.indice).toBe(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should call next and complete on destroyed$', () => {
      const nextSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
