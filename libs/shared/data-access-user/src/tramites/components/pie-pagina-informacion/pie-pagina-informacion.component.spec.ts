import { PiePaginaInformacionComponent } from './pie-pagina-informacion.component';
import { DomSanitizer } from '@angular/platform-browser';
import {
  JAVA_LINK,
  POLITICAS_PRIVACIDAD,
  INAI_LINK,
} from '../../../core/enums/politicas-privacidad.enum';
import {
  SIN_TITULO_MODAL,
  TEXTO_CERRAR,
} from '../../../core/enums/mensajes-modal-comunes.enum';

describe('PiePaginaInformacionComponent', () => {
  let component: PiePaginaInformacionComponent;
  let sanitizerMock: jest.Mocked<DomSanitizer>;

  beforeEach(() => {
    sanitizerMock = {
      bypassSecurityTrustUrl: jest.fn((url) => url),
    } as any;
    component = new PiePaginaInformacionComponent(sanitizerMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set urlJavaSeguro using sanitizer and JAVA_LINK', () => {
    expect(sanitizerMock.bypassSecurityTrustUrl).toHaveBeenCalledWith(
      JAVA_LINK
    );
    expect(component.urlJavaSeguro).toBe(JAVA_LINK);
  });

  it('should set notificacion with correct values when abreModalNotificacion is called', () => {
    component.abreModalNotificacion();
    expect(component.notificacion).toEqual({
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'html',
      titulo: SIN_TITULO_MODAL,
      mensaje: POLITICAS_PRIVACIDAD(INAI_LINK),
      cerrar: false,
      txtBtnAceptar: TEXTO_CERRAR,
      txtBtnCancelar: '',
      tamanioModal: 'modal-lg',
      alineacionBtonoCerrar: 'boton-final',
    });
  });
});
