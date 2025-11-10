import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, JSONResponse, doDeepCopy, esValidObject, getValidDatos } from '@libs/shared/data-access-user/src';
import { Solicitud150103State, Solicitud150103Store } from '../../estados/solicitud150103.store';
import { take, takeUntil } from 'rxjs/operators';
import { InformeAnualProgramaService } from '../../services/informe-anual-programa.service';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { PASOS } from '@libs/shared/data-access-user/src';
import { REPORTE_ANUAL_PASOS } from '../../constants/reporte-anual.enum';
import { Solicitud150103Query } from '../../estados/solicitud150103.query';
import { Subject } from 'rxjs';
import { WizardComponent } from '@libs/shared/data-access-user/src';

/**
 * Interfaz para definir las acciones de los botones en el flujo del wizard.
 * @property accion - Define la acción a realizar, como avanzar ('cont') o retroceder.
 * @property valor - El índice o paso relacionado con la acción.
 */
interface AccionBoton {
  /**
   * Define la acción a realizar, como avanzar ('cont') o retroceder.
   */
  accion: string;
  /**
   * El índice o paso relacionado con la acción.
   */
  valor: number;

  
}

@Component({
  selector: 'app-solicitud-de-reporte',
  templateUrl: './solicitud-de-reporte.component.html',
  styleUrls: ['./solicitud-de-reporte.component.scss'],
 
})

export class SolicitudDeReporteComponent implements OnInit, OnDestroy {

  pantallasPasos: ListaPasosWizard[] = REPORTE_ANUAL_PASOS;
  /**
   * Lista de pasos del wizard.
   * Utiliza la configuración predefinida en el objeto `PASOS`.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice actual del paso activo en el wizard.
   * Valor predeterminado: 1.
   */
  public indice = 1;

  /**
   * Configuración de los datos necesarios para los pasos del wizard.
   * Incluye el número de pasos, el índice actual y los textos de los botones "Anterior" y "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Referencia al componente hijo `WizardComponent`.
   * Se utiliza para controlar la navegación entre los pasos del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * 
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';  
  
  /**
   * Estado actual de la solicitud 150103.
   *
   * Esta propiedad mantiene la información de la solicitud en curso y
   * se sincroniza de manera reactiva con el store correspondiente.
   * Contiene los datos necesarios para representar y manipular
   * la solicitud dentro del componente.
   *
   * @type {Solicitud150103State}
   * @public
   */
  public solicitudState!: Solicitud150103State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   *
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Inicializa los servicios necesarios para la funcionalidad del componente.
   */
  constructor(
    private informeAnualService: InformeAnualProgramaService,
    private store: Solicitud150103Store,
    private query: Solicitud150103Query
  ) {
    
  }

  /**
   * @description Método que se ejecuta al inicializar el componente.
   * Configura el formulario y sincroniza los datos iniciales con el estado.
   */
  ngOnInit(): void {
    this.query.seleccionarSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });

      //  this.tramiteQuery.selectSolicitud$
      // .pipe(takeUntil(this.destroyNotifier$))
      // .subscribe((solicitud) => {
      //   this.solicitudState = solicitud;
      // });
  }
  
  /**
   * Obtiene el valor del índice de la acción del botón.
   * Este método controla el cambio de paso en el wizard dependiendo de la acción del botón presionado.
   *
   * Si la acción es 'cont', pasa al siguiente paso. Si la acción es 'atras', regresa al paso anterior.
   *
   * @param e Acción del botón (cont o atras) y el valor asociado a la acción.
   */
  getValorIndice(e: AccionBoton): void {
    if (this.indice === 1 && e.accion === 'cont') {
      this.datosPasos.indice = 1;
      this.obtenerDatosDelStore();
    } else if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      this.pasoNavegarPor(e);
    }
  }
  
  /**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(): void {
    this.informeAnualService.getAllState()
      .pipe(take(1))
      .subscribe(data => {
        this.guardar(data);
      });
  }  
  
  /**
   * Guarda los datos proporcionados construyendo un objeto payload y enviándolo al servicio backend.
   * El payload incluye información del solicitante y datos del reporte anual.
   *
   * @param data - Objeto que contiene todos los datos necesarios para el payload.
   * @returns Promise con la respuesta del servidor.
   */  
  guardar(data: Solicitud150103State): Promise<JSONResponse> {
    const REPORTE_ANUAL = this.informeAnualService.buildDatosReporte(data);
    const PAYLOAD = {
        "id_solcitud": data.idSolicitud,
        "tipoDeSolicitud": "guardar",
        "solicitante": {
          "rfc": "AAL0409235E6",
          "nombre": "Juan Pérez",
          "es_persona_moral": true,
          "certificado_serial_number": "1234"
        },
        "representacion_federal": {},
        "fracciones": [
          {
            "cveFraccion": "",
            "bienesProducidos": {
              "descripcionBienProducido": "",
              "totalBienesProducidos": 0,
              "volumenMercadoNacional": 0,
              "olumenExportaciones": 0
            }
          }
        ],
        "sectores": [
          {
            "idConfProgramaSE": data.folioPrograma ? parseInt(data.folioPrograma.split(',')[0].split('-')[1], 10) : 0
          }
        ],
        "reporte_anual": REPORTE_ANUAL,
        "observaciones": data.folioPrograma,
        "descripcion": data.folioPrograma,
        "ide_generica_1": data.inicio,
        "ide_generica_2": data.fin,
        "descripcion_clob_generica_1": data.modalidad,
        "descripcion_clob_generica_2": data.folioPrograma
      }

    return new Promise((resolve, reject) => {
      this.informeAnualService.guardarDatosPost(PAYLOAD).subscribe(response => {
        const API_RESPONSE = doDeepCopy(response);
        if(esValidObject(API_RESPONSE) && esValidObject(API_RESPONSE.datos)) {
          if(getValidDatos(API_RESPONSE.datos.id_solicitud)) {
            this.store.setIdSolicitud((API_RESPONSE.datos.id_solicitud));
            this.pasoNavegarPor({ accion: 'cont', valor: 2 });
          } else {
            this.store.setIdSolicitud(0);
          }
        }
        const JSON_RESPONSE: JSONResponse = {
          id: API_RESPONSE.id ?? API_RESPONSE.datos?.id_solicitud ?? API_RESPONSE.datos?.idSolicitud ?? 0,
          descripcion: API_RESPONSE.descripcion ?? '',
          codigo: API_RESPONSE.codigo ?? '',
          data: API_RESPONSE.datos ?? {}
        };
        resolve(JSON_RESPONSE);
      }, error => {
        reject(error);
      });
    });
  }
  
  /**
   * Navega a través de los pasos del asistente según la acción del botón.
   * @param e Objeto que contiene la acción y el valor del índice al que se desea navegar.
   */
  pasoNavegarPor(e: AccionBoton): void {
    this.indice = e.valor;
    this.datosPasos.indice = e.valor;
    if (e.valor > 0 && e.valor < 5) {
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   *
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}