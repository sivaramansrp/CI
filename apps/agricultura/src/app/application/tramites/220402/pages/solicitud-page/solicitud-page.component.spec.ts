import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { SeccionQuery } from '../../../../estados/queries/seccion.query';
import { SeccionStore } from '../../../../estados/seccion.store';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { provideHttpClient } from '@angular/common/http';


describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;
  let mockSeccionQuery: any;
  let mockSeccionStore: any;

  beforeEach(async () => {
    mockSeccionQuery = {
      selectSeccionState$: of({
        seccion: [true, false],
        formaValida: [true, false],
      }),
    };

    mockSeccionStore = {
      establecerSeccion: jest.fn(),
      establecerFormaValida: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent, PasoDosComponent, PasoTresComponent, PasoUnoComponent],
      imports: [WizardComponent, BtnContinuarComponent, SolicitanteComponent],
      providers: [
        provideHttpClient(),
        { provide: SeccionQuery, useValue: mockSeccionQuery },
        { provide: SeccionStore, useValue: mockSeccionStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize seccion state on ngOnInit', () => {
    expect(component.seccion).toEqual({
      seccion: [true, false],
      formaValida: [true, false],
    });
  });

  it('should call asignarSecciones on ngOnInit', () => {
    const asignarSeccionesSpy = jest.spyOn(component, 'asignarSecciones');
    component.ngOnInit();
    expect(asignarSeccionesSpy).toHaveBeenCalled();
  });

  it('should update the tab index when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should navigate wizard steps when getValorIndice is called', () => {
    const wizardSpyNext = jest.spyOn(component.wizardComponent, 'siguiente');
    const wizardSpyBack = jest.spyOn(component.wizardComponent, 'atras');

    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(wizardSpyNext).toHaveBeenCalled();

    component.getValorIndice({ accion: 'back', valor: 1 });
    expect(component.indice).toBe(1);
    expect(wizardSpyBack).toHaveBeenCalled();
  });

  it('should emit destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
  it('should call getValorIndice with the correct arguments when guardar is called', () => {
    component.guardar();
    expect(component.indice).toBe(2);
  });
});