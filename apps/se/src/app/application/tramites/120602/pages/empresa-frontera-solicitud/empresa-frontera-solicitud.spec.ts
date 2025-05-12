import { EmpresaFronteraSolicitudComponent } from './empresa-frontera-solicitud';

import { EMPRESA_FRONTERA  } from 'libs/shared/data-access-user/src/core/services/120602/empresa-frontera-solicitud.enum';

describe('EmpresaFronteraSolicitudComponent', () => {
  let component: EmpresaFronteraSolicitudComponent;

  beforeEach(() => {
    component = new EmpresaFronteraSolicitudComponent();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should have default indice as 2', () => {
    expect(component.indice).toBe(2);
  });

  test('should have pantallasPasos set to EMPRESA_FRONTERA ', () => {
    expect(component.pantallasPasos).toBe(EMPRESA_FRONTERA );
  });
});
