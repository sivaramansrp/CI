import { DatosComponent } from './datos.component';

describe('DatosComponent', () => {
  let component: DatosComponent;

  beforeEach(() => {
    component = new DatosComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with indice 1 and totalPestanas 5', () => {
    expect(component.indice).toBe(1);
    expect(component.totalPestanas).toBe(5);
  });

  describe('esPrimeraPestana', () => {
    it('should return true when indice is 1', () => {
      component.indice = 1;
      expect(component.esPrimeraPestana).toBe(true);
    });

    it('should return false when indice is not 1', () => {
      component.indice = 2;
      expect(component.esPrimeraPestana).toBe(false);
    });
  });

  describe('esUltimaPestana', () => {
    it('should return true when indice is equal to totalPestanas', () => {
      component.indice = 5;
      expect(component.esUltimaPestana).toBe(true);
    });

    it('should return false when indice is less than totalPestanas', () => {
      component.indice = 4;
      expect(component.esUltimaPestana).toBe(false);
    });
  });

  describe('seleccionaTab', () => {
    it('should update indice when within valid range', () => {
      component.seleccionaTab(3);
      expect(component.indice).toBe(3);
    });

    it('should not update indice when out of range (low)', () => {
      component.indice = 2;
      component.seleccionaTab(0);
      expect(component.indice).toBe(2);
    });

    it('should not update indice when out of range (high)', () => {
      component.indice = 2;
      component.seleccionaTab(6);
      expect(component.indice).toBe(2);
    });
  });

  describe('avanzarTab', () => {
    it('should increment indice if not last tab', () => {
      component.indice = 3;
      component.avanzarTab();
      expect(component.indice).toBe(4);
    });

    it('should not increment indice if already on last tab', () => {
      component.indice = 5;
      component.avanzarTab();
      expect(component.indice).toBe(5);
    });
  });

  describe('retrocederTab', () => {
    it('should decrement indice if not first tab', () => {
      component.indice = 3;
      component.retrocederTab();
      expect(component.indice).toBe(2);
    });

    it('should not decrement indice if already on first tab', () => {
      component.indice = 1;
      component.retrocederTab();
      expect(component.indice).toBe(1);
    });
  });

  describe('resetTabs', () => {
    it('should reset indice to 1', () => {
      component.indice = 4;
      component.resetTabs();
      expect(component.indice).toBe(1);
    });
  });
});
