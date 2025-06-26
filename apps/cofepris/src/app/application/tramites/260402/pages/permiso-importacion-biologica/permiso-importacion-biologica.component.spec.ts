import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoImportacionBiologicaComponent } from './permiso-importacion-biologica.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PermisoImportacionBiologicaComponent', () => {
  let component: PermisoImportacionBiologicaComponent;
  let fixture: ComponentFixture<PermisoImportacionBiologicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoImportacionBiologicaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisoImportacionBiologicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize indice to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize pantallasPasos and datosPasos correctly', () => {
    expect(Array.isArray(component.pantallasPasos)).toBe(true);
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  describe('getValorIndice', () => {
    let wizardMock: any;

    beforeEach(() => {
      wizardMock = {
        siguiente: jest.fn(),
        atras: jest.fn()
      };
      component.wizardComponent = wizardMock;
    });

    it('should update indice and call wizardComponent.siguiente for accion "cont"', () => {
      component.indice = 1;
      component.getValorIndice({ accion: 'cont', valor: 2 });
      expect(component.indice).toBe(2);
      expect(wizardMock.siguiente).toHaveBeenCalled();
      expect(wizardMock.atras).not.toHaveBeenCalled();
    });

    it('should update indice and call wizardComponent.atras for accion not "cont"', () => {
      component.indice = 3;
      component.getValorIndice({ accion: 'back', valor: 2 });
      expect(component.indice).toBe(2);
      expect(wizardMock.atras).toHaveBeenCalled();
      expect(wizardMock.siguiente).not.toHaveBeenCalled();
    });

    it('should not update indice or call wizard methods if valor is out of range', () => {
      component.indice = 1;
      component.getValorIndice({ accion: 'cont', valor: 0 });
      expect(component.indice).toBe(1);
      expect(wizardMock.siguiente).not.toHaveBeenCalled();
      expect(wizardMock.atras).not.toHaveBeenCalled();

      component.getValorIndice({ accion: 'cont', valor: 5 });
      expect(component.indice).toBe(1);
      expect(wizardMock.siguiente).not.toHaveBeenCalled();
      expect(wizardMock.atras).not.toHaveBeenCalled();
    });
  });
});