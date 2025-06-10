import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/31601/servicios-pantallas.model';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;
  let consultaQueryMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: true }),
    };

    await TestBed.configureTestingModule({
      declarations: [PantallasComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debe suscribirse y actualizar consultaState', () => {
    component.consultaState = undefined as any;
    component.ngOnInit();
    expect(component.consultaState).toEqual({ update: true });
  });

  it('ngOnDestroy debe limpiar el subject destroyNotifier$', () => {
    const spyNext = jest.spyOn((component as any).destroyNotifier$, 'next');
    const spyComplete = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('getValorIndice debe actualizar el índice y llamar a wizardComponent.siguiente o atras', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    // Acción "cont" (continuar)
    const accionCont: AccionBoton = { valor: 2, accion: 'cont' } as any;
    component.getValorIndice(accionCont);
    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();

    // Acción "atras"
    const accionAtras: AccionBoton = { valor: 1, accion: 'atras' } as any;
    component.getValorIndice(accionAtras);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('getValorIndice debe resetear indiceDePestanaSeleccionada si valor !== 1', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    const accion: AccionBoton = { valor: 3, accion: 'cont' } as any;
    component.getValorIndice(accion);
    expect(component.indiceDePestanaSeleccionada).toBe(1);
  });

  it('getValorIndice no debe cambiar nada si valor fuera de rango', () => {
    component.indice = 1;
    component.datosPasos.indice = 1;
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
    const accion: AccionBoton = { valor: 0, accion: 'cont' } as any;
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
  });

  it('pestanaCambiado debe actualizar indiceDePestanaSeleccionada correctamente', () => {
    component.pestanaCambiado(5);
    expect(component.indiceDePestanaSeleccionada).toBe(5);

    component.pestanaCambiado(undefined as any);
    expect(component.indiceDePestanaSeleccionada).toBe(1);

    component.pestanaCambiado(null as any);
    expect(component.indiceDePestanaSeleccionada).toBe(1);

    component.pestanaCambiado(NaN);
    expect(component.indiceDePestanaSeleccionada).toBe(1);
  });
});