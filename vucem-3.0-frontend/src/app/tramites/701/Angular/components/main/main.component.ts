import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  titulo: string = '';
  advertenciasNegocio: string = '';
  erroresCampos: string = '';
  tieneMensajesOErrores: boolean = false;
  valorDiscriminadorGlobal: string | null = null;
  lenguaje: string = 'es'; // Suponiendo que el idioma se obtiene de alguna fuente

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.obtenerDatosIniciales();
    this.configurarValorDiscriminador();
    this.udm_('https://b.scorecardresearch.com/b?c1=2&c2=17183199&ns_site=gobmx&name=VUCEM');
    this.uid_call('eventoEjemplo', 'tipoEjemplo');
  }

  ngAfterViewInit(): void {
    this.ajustarBreadcrumb();
    this.resetear(this.lenguaje);
  }

  /**
   * Obtiene los datos iniciales necesarios desde el servicio.
   */
  private obtenerDatosIniciales(): void {
    this.mainService.getTitulo().subscribe((titulo: string) => {
      this.titulo = titulo;
    });

    this.mainService.getAdvertenciasNegocio().subscribe((advertencia: string) => {
      this.advertenciasNegocio = advertencia;
    });

    this.mainService.getErroresCampos().subscribe((error: string) => {
      this.erroresCampos = error;
    });

    this.mainService.getMensajesOErrores().subscribe((tieneMensajes: boolean) => {
      this.tieneMensajesOErrores = tieneMensajes;
    });

    this.mainService.getLenguaje().subscribe((lang: string) => {
      this.lenguaje = lang;
    });
  }

  /**
   * Configura el valor del discriminador global basado en las condiciones.
   */
  private configurarValorDiscriminador(): void {
    this.mainService.getSolicitud().subscribe(solicitud => {
      if (solicitud && solicitud.discriminatorValue) {
        this.valorDiscriminadorGlobal = solicitud.discriminatorValue;
      } else if (solicitud && solicitud.claveModalidad) {
        this.valorDiscriminadorGlobal = solicitud.claveModalidad;
      } else {
        this.valorDiscriminadorGlobal = null;
      }
    });
  }

  /**
   * Función para manejar la analítica digital.
   * @param url La URL de seguimiento.
   */
  udm_(url: string): void {
    const comScore = 'comScore=';
    const cookie = document.cookie;
    let i = '';
    const charLimit = 2048;
    let image: HTMLImageElement | null = null;
    const ns_ = '&ns_';
    const c = '&';
    const encode = encodeURIComponent || escape;

    if (cookie.indexOf(comScore) + 1) {
      const cookies = cookie.split(';');
      for (let d = 0, len = cookies.length; d < len; d++) {
        const position = cookies[d].indexOf(comScore);
        if (position + 1) {
          i = c + unescape(cookies[d].substring(position + comScore.length));
        }
      }
    }

    const e = `${ns_}_t=${+new Date()}${ns_}c=${document.characterSet || document.defaultCharset || ''}&c8=${encode(document.title)}${i}&c7=${encode(document.URL)}&c9=${encode(document.referrer}`;
    let finalUrl = url + e;

    if (finalUrl.length > charLimit && finalUrl.indexOf(c) > 0) {
      const f = finalUrl.substring(0, charLimit - 8).lastIndexOf(c);
      finalUrl = `${finalUrl.substring(0, f)}${ns_}cut=${encode(finalUrl.substring(f + 1))}`.substring(0, charLimit);
    }

    if (document.images) {
      image = new Image();
      (window as any).ns_p = image;
      image.src = finalUrl;
    } else {
      document.write('<p><img src="' + finalUrl + '" height="1" width="1" alt="*"></p>');
    }
  }

  /**
   * Función para manejar llamadas UID.
   * @param evento Nombre del evento.
   * @param tipo Tipo de evento.
   */
  uid_call(evento: string, tipo: string): void {
    const ui_c2 = 17183199; // valor de cliente c2 corporativo
    const ui_ns_site = 'gobmx'; // identificador del sitio
    window['b_ui_event'] = window['c_ui_event'] != null ? window['c_ui_event'] : '';
    window['c_ui_event'] = evento;

    let ui_pixel_url = `https://b.scorecardresearch.com/p?c1=2&c2=${ui_c2}&ns_site=${ui_ns_site}&name=${evento}&ns_type=hidden&type=hidden&ns_ui_type=${tipo}`;
    const comScore = 'comScore=';
    const cookie = document.cookie;
    let e = '';
    const charLimit = 2048;
    const ns_ = '&ns_';
    const c = '&';
    const encode = encodeURIComponent || escape;

    if (cookie.indexOf(comScore) + 1) {
      const cookies = cookie.split(';');
      for (let o = 0, len = cookies.length; o < len; o++) {
        const position = cookies[o].indexOf(comScore);
        if (position + 1) {
          e = `${c}${unescape(cookies[o].substring(position + comScore.length))}`;
        }
      }
    }

    ui_pixel_url += `${ns_}_t=${+new Date()}${ns_}c=${document.characterSet || document.defaultCharset || ''}&c8=${encode(document.title)}${e}&c7=${encode(document.URL)}&c9=${encode(document.referrer)}&b_ui_event=${window['b_ui_event']}&c_ui_event=${window['c_ui_event']}`;

    if (ui_pixel_url.length > charLimit && ui_pixel_url.indexOf(c) > 0) {
      const j = ui_pixel_url.substring(0, charLimit - 8).lastIndexOf(c);
      ui_pixel_url = `${ui_pixel_url.substring(0, j)}${ns_}cut=${encode(ui_pixel_url.substring(j + 1))}`.substring(0, charLimit);
    }

    let image: HTMLImageElement | null = null;

    if (document.images) {
      image = new Image();
      (window as any).ns_p = image;
      image.src = ui_pixel_url;
    } else {
      document.write(`<p><img src='${ui_pixel_url}' height="1" width="1" alt="*"></p>`);
    }
  }

  /**
   * Ajusta la visibilidad de los elementos del breadcrumb.
   */
  private ajustarBreadcrumb(): void {
    const breadcrumbTramiteSteps = document.getElementById('breadcrumbTramiteSteps');
    const breadcrumbTramite = document.getElementById('breadcrumbTramite');
    const boxSolicitanteLargo = document.getElementById('boxSolicitanteLargo');
    const boxSolicitante = document.getElementById('boxSolicitante');

    if ((breadcrumbTramiteSteps && breadcrumbTramiteSteps.style.display !== 'none') || 
        (breadcrumbTramite && breadcrumbTramite.style.display !== 'none')) {
      if (breadcrumbTramite) {
        breadcrumbTramite.style.display = 'none';
      }
      if (boxSolicitanteLargo) {
        boxSolicitanteLargo.style.display = 'block';
      }
    } else {
      if (boxSolicitante) {
        boxSolicitante.style.marginTop = '-116px';
      }
    }
  }

  /**
   * Resetea la configuración basada en el lenguaje.
   * @param lang El idioma seleccionado.
   */
  private resetear(lang: string): void {
    // Implementar la lógica del reset según sea necesario
    console.log(`Reseteando con el lenguaje: ${lang}`);
    // Por ejemplo, llamar a un servicio o ajustar variables internas
  }
}