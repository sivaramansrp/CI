import { DePruebasComponent } from './de-pruebas.component';

import { DE_PRUEBAS } from 'libs/shared/data-access-user/src/core/services/120602/de-pruebas.enum';

describe('DePruebasComponent', () => {
  let component: DePruebasComponent;

  beforeEach(() => {
    component = new DePruebasComponent();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should have default indice as 2', () => {
    expect(component.indice).toBe(2);
  });

  test('should have pantallasPasos set to DE_PRUEBAS', () => {
    expect(component.pantallasPasos).toBe(DE_PRUEBAS);
  });
});
