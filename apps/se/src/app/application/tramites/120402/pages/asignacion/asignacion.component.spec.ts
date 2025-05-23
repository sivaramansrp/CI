import { AsignacionComponent } from './asignacion.component';

describe('AsignacionComponent', () => {
  let component: AsignacionComponent;

  beforeEach(() => {
    component = new AsignacionComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(0);
    expect(component.asignacionActiva).toBe(false);
    expect(component.mensajeEstado).toBe('No hay asignación activa');
  });

  describe('seleccionarAsignacion', () => {
    it('should set indice, activate asignacion, and update message', () => {
      component.seleccionarAsignacion(3);
      expect(component.indice).toBe(3);
      expect(component.asignacionActiva).toBe(true);
      expect(component.mensajeEstado).toBe('Asignación activa');
    });
  });

  describe('resetAsignacion', () => {
    it('should reset indice and deactivate asignacion', () => {
      component.seleccionarAsignacion(2);
      component.resetAsignacion();

      expect(component.indice).toBe(0);
      expect(component.asignacionActiva).toBe(false);
      expect(component.mensajeEstado).toBe('No hay asignación activa');
    });
  });

  describe('actualizarMensajeEstado', () => {
    it('should set mensajeEstado based on asignacionActiva', () => {
      component.asignacionActiva = false;
      component.actualizarMensajeEstado();
      expect(component.mensajeEstado).toBe('No hay asignación activa');

      component.asignacionActiva = true;
      component.actualizarMensajeEstado();
      expect(component.mensajeEstado).toBe('Asignación activa');
    });
  });
});
