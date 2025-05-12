import { NotificacionesComponent, TipoNotificacionEnum, CategoriaMensaje, Notificacion } from './notificaciones.component';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

describe('NotificacionesComponent', () => {
  let component: NotificacionesComponent;
  let toastrServiceMock: jest.Mocked<ToastrService>;
  let sanitizerMock: jest.Mocked<DomSanitizer>;

  beforeEach(() => {
    toastrServiceMock = {
      warning: jest.fn(),
      error: jest.fn(),
      success: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    sanitizerMock = {
      bypassSecurityTrustHtml: jest.fn((html) => html),
    } as unknown as jest.Mocked<DomSanitizer>;

    component = new NotificacionesComponent(toastrServiceMock, sanitizerMock);
    component.confirmacionModal = new EventEmitter<boolean>();
  });

  it('should initialize with default values', () => {
    expect(component.mostrarModal).toBe(false);
    expect(component.verBanner).toBe(false);
  });

  describe('ngOnChanges', () => {
    it('should call abrirModal when tipoNotificacion is ALERTA', () => {
      const abrirModalSpy = jest.spyOn(component, 'abrirModal');
      component.notificacionInput = { tipoNotificacion: TipoNotificacionEnum.ALERTA } as Notificacion;

      component.ngOnChanges({
        notificacionInput: {
          currentValue: component.notificacionInput,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(abrirModalSpy).toHaveBeenCalled();
    });

    it('should call creaToastr when tipoNotificacion is TOASTR', () => {
      const creaToastrSpy = jest.spyOn(component, 'creaToastr');
      component.notificacionInput = { tipoNotificacion: TipoNotificacionEnum.TOASTR } as Notificacion;

      component.ngOnChanges({
        notificacionInput: {
          currentValue: component.notificacionInput,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(creaToastrSpy).toHaveBeenCalled();
    });

    it('should call muestraBanner when tipoNotificacion is BANNER', () => {
      const muestraBannerSpy = jest.spyOn(component, 'muestraBanner');
      component.notificacionInput = { tipoNotificacion: TipoNotificacionEnum.BANNER } as Notificacion;

      component.ngOnChanges({
        notificacionInput: {
          currentValue: component.notificacionInput,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(muestraBannerSpy).toHaveBeenCalled();
    });
  });

  describe('creaToastr', () => {
    it('should call toastr.warning for ALERTA category', () => {
      component.notificacionInput = { categoria: CategoriaMensaje.ALERTA, mensaje: 'Warning message' } as Notificacion;

      component.creaToastr();

      expect(toastrServiceMock.warning).toHaveBeenCalledWith('Warning message');
    });

    it('should call toastr.error for ERROR category', () => {
      component.notificacionInput = { categoria: CategoriaMensaje.ERROR, mensaje: 'Error message' } as Notificacion;

      component.creaToastr();

      expect(toastrServiceMock.error).toHaveBeenCalledWith('Error message');
    });

    it('should call toastr.success for EXITO category', () => {
      component.notificacionInput = { categoria: CategoriaMensaje.EXITO, mensaje: 'Success message' } as Notificacion;

      component.creaToastr();

      expect(toastrServiceMock.success).toHaveBeenCalledWith('Success message');
    });

    it('should call toastr.info for INFORMACION category', () => {
      component.notificacionInput = { categoria: CategoriaMensaje.INFORMACION, mensaje: 'Info message' } as Notificacion;

      component.creaToastr();

      expect(toastrServiceMock.info).toHaveBeenCalledWith('Info message');
    });
  });

  describe('muestraBanner', () => {
    it('should sanitize the message and assign it to notificacionInput.mensaje', () => {
      component.notificacionInput = { mensaje: '<b>Unsafe HTML</b>' } as Notificacion;

      component.muestraBanner();

      expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalledWith('<b>Unsafe HTML</b>');
      expect(component.notificacionInput.mensaje).toBe('<b>Unsafe HTML</b>');
    });
  });

  describe('abrirModal', () => {
    it('should set mostrarModal to true', () => {
      component.abrirModal();

      expect(component.mostrarModal).toBe(true);
    });
  });

  describe('confirmarAccion', () => {
    it('should hide the modal and emit true', () => {
      const emitSpy = jest.spyOn(component.confirmacionModal, 'emit');
      component.autoShownModal = { hide: jest.fn() } as unknown as ModalDirective;

      component.confirmarAccion();

      expect(component.autoShownModal.hide).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('declinarAccion', () => {
    it('should hide the modal', () => {
      component.autoShownModal = { hide: jest.fn() } as unknown as ModalDirective;

      component.declinarAccion();

      expect(component.autoShownModal.hide).toHaveBeenCalled();
    });
  });

  describe('onHidden', () => {
    it('should set mostrarModal to false', () => {
      component.onHidden();

      expect(component.mostrarModal).toBe(false);
    });
  });
});