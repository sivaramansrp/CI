import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { AccionBoton } from '@ng-mf/data-access-user';
import { PASOS } from '../../constants/exencion-impuestos.module.enum';
import { CommonModule } from '@angular/common';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;
  let wizardComponentMock: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    wizardComponentMock = { siguiente: jest.fn(), atras: jest.fn() } as any;

    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SolicitudPageComponent,
        CommonModule,
        WizardComponent,
        BtnContinuarComponent,
        PasoTresComponent,
        PasoDosComponent,
        PasoUnoComponent,
      ],
    })
      .overrideComponent(SolicitudPageComponent, {
        set: {
          providers: [
            { provide: WizardComponent, useValue: wizardComponentMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    component.wizardComponent = wizardComponentMock;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos and datosPasos correctly', () => {
    expect(component.pasos).toEqual(PASOS);
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call siguiente() when getValorIndice is called with accion "cont"', () => {
    const accionBoton: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(2);
    expect(wizardComponentMock.siguiente).toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call atras() when getValorIndice is called with accion other than "cont"', () => {
    const accionBoton: AccionBoton = { valor: 3, accion: 'prev' };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(3);
    expect(wizardComponentMock.atras).toHaveBeenCalled();
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range', () => {
    const accionBoton: AccionBoton = { valor: 5, accion: 'cont' };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(1);
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });
});
