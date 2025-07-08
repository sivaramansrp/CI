import { TestBed } from '@angular/core/testing';
import { ImportacionProductosComponent } from './importacion-productos.component';
import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImportacionProductosComponent', () => {
  let component: ImportacionProductosComponent;
  let fixture: any;
  let wizardComponentMock: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ImportacionProductosComponent,PasoUnoComponent,
          PasoDosComponent,
          PasoTresComponent,
          BtnContinuarComponent,
          WizardComponent,
          HttpClientTestingModule
        ],
    })
      .overrideComponent(ImportacionProductosComponent, {
        set: {
          providers: [
            { provide: WizardComponent, useValue: wizardComponentMock }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ImportacionProductosComponent);
    component = fixture.componentInstance;
    // Manually assign the mock to the ViewChild
    component.wizardComponent = wizardComponentMock;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos with PASOS', () => {
    expect(component.pasos).toBe(PASOS);
  });

  it('should have default indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call siguiente on getValorIndice with accion "cont"', () => {
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(wizardComponentMock.siguiente).toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call atras on getValorIndice with accion not "cont"', () => {
    component.getValorIndice({ accion: 'atras', valor: 3 });
    expect(component.indice).toBe(3);
    expect(wizardComponentMock.atras).toHaveBeenCalled();
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range (0)', () => {
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(1);
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range (5)', () => {
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });
});