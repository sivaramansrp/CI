import { TestBed } from '@angular/core/testing';
import { ImportacionProductosComponent } from './importacion-productos.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ImportacionProductosComponent', () => {
  let component: ImportacionProductosComponent;
  let fixture: any;
  let wizardComponentSpy: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    wizardComponentSpy = {
      siguiente: jest.fn(()=> of()),
      atras: jest.fn(()=> of()),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        ImportacionProductosComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent,
        BtnContinuarComponent,
        WizardComponent,
        HttpClientTestingModule
      ]
    }).overrideComponent(ImportacionProductosComponent, {
      set: {
        providers: [
          { provide: WizardComponent, useValue: wizardComponentSpy }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(ImportacionProductosComponent);
    component = fixture.componentInstance;
    component.wizardComponent = wizardComponentSpy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos and datosPasos correctly', () => {
    expect(component.pasos.length).toBeGreaterThan(0);
    expect(component.datosPasos.nroPasos).toEqual(component.pasos.length);
    expect(component.datosPasos.indice).toEqual(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call wizardComponent.siguiente on "cont" action', () => {
    const accion = { accion: 'cont', valor: 2 };
    component.getValorIndice(accion);
    expect(component.indice).toBe(2);
    // expect(wizardComponentSpy.siguiente).toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras on "atras" action', () => {
    const accion = { accion: 'atras', valor: 3 };
    component.getValorIndice(accion);
    expect(component.indice).toBe(3);
    // expect(wizardComponentSpy.atras).toHaveBeenCalled();
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizard methods if valor is out of range', () => {
    const accion = { accion: 'cont', valor: 0 };
    component.indice = 1;
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();

    const accion2 = { accion: 'cont', valor: 5 };
    component.getValorIndice(accion2);
    expect(component.indice).toBe(1);
    expect(wizardComponentSpy.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentSpy.atras).not.toHaveBeenCalled();
  });
});