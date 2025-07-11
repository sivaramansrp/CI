/* eslint-disable @typescript-eslint/no-explicit-any */
import { ALERTA } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import { Location } from '@angular/common';

import { Component, OnInit, ViewChild } from '@angular/core';

import { AVISO, DatosPasos, ListaPasosWizard, Notificacion, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { GuadarSolicitudRequest } from '../../../../core/models/request/guardar-solicitud-request.model';
import { GuardarService } from '../../../../core/services/130118/guardar.service';
import { IniciarService } from '../../../../core/services/130118/iniciar.service';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

import { Observable, Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { IniciarRequest } from '../../../../core/models/request/iniciar-requst.model';

import { Tramite130118Query } from '../../estados/queries/tramite130118.query';

import { Solicitud130118State, Tramite130118Store } from '../../estados/tramites/tramite130118.store';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que representa la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
export class SolicitudPageComponent implements OnInit {
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente (wizard).
   * Permite controlar la navegación entre los pasos.
   */
  @ViewChild('wizard', { static: false }) wizardComponent!: WizardComponent;


  /**
   * Referencia al componente del primer paso.
   * Permite acceder a los métodos y propiedades del paso uno.
   */
  @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Clase CSS para mostrar una alerta de información.
   */
  public infoAlert = 'alert-info';

  /**
   * Clase CSS para mostrar una alerta de error.
   */
  infoError = 'alert-danger';

  /**
   * Texto del aviso de privacidad simplificado.
   */
  TEXTOS = AVISO.Aviso;

   public nuevaNotificacion!: Notificacion;

  /**
   * Mensaje de alerta a mostrar en caso de error.
   */
  ALERTA = ALERTA;

  /**
   * Indica si el formulario es válido.
   */
  esValido = true;

  public solicitudState!: Solicitud130118State;

  /**
   * Subject para notificar la destrucción del componente y cancelar suscripciones.
   * Se utiliza para evitar fugas de memoria al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private iniciarService: IniciarService,
    private location: Location,
    private guardarService: GuardarService,
    private tramite130118Store: Tramite130118Store,
    private tramite130118Query: Tramite130118Query,
  ) { }

  /**
   * Datos de los pasos del asistente, incluyendo textos de botones y el índice actual.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  

  ngOnInit(): void {

    this.tramite130118Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();


    const PAYLOAD: IniciarRequest = {
      rfc_solicitante: 'LEQI810131GA8',
      rol_actual: 'SOLICITANTE'
    };

    this.iniciarService.postIniciar(PAYLOAD).subscribe({
      next: (response) => {
        if (response.codigo !== '00') {
          this.location.back();
        }
      },
      error: (error) => {
        console.error('Error al iniciar trámite:', error);
        this.location.back();
      }
    });
  }


  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  actualizarDatosPasos(): void {
  this.datosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
}

  /**
   * Obtiene el valor del índice de la acción del botón y controla la navegación del asistente.
   * Valida el formulario del primer paso antes de avanzar.
   * @param e Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (this.indice === 1) {
      this.enviaSolicitudRequest()
        .pipe(
          takeUntil(this.destroyNotifier$),
          tap((respuesta) => {
            if (!respuesta) {

              this.indice = 1;
              this.wizardComponent.indiceActual = 1;
              this.actualizarDatosPasos();
              return;
            }

            if (e.valor > 0 && e.valor < 5) {
              this.indice = e.valor;
              this.actualizarDatosPasos();
              if (e.accion === 'cont') {
                this.wizardComponent.siguiente();
              } else {
                this.wizardComponent.atras();
              }
            }
          }),
          catchError(() => {

            return of(false);
          })
        )
        .subscribe();
    } else {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.actualizarDatosPasos();
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }



  private enviaSolicitudRequest(): Observable<boolean> {
    const FORM = this.pasoUnoComponent?.solicitudComponent?.form;
    const FORMVALUE = FORM.getRawValue();

    const DATOS_REGIMEN = FORMVALUE.datosRegimen;
    const DATOS_MERCANCIA = FORMVALUE.datosMercancia;
    const DATOS_PRODUCTO = FORMVALUE.datosProducto;
    const REGISTRO_FEDERAL = FORMVALUE.registroFederal;

    const PAYLOAD: GuadarSolicitudRequest = {
      id_solcitud:
        this.solicitudState.idSolicitud === 0
          ? null
          : this.solicitudState.idSolicitud,
      cve_regimen: DATOS_REGIMEN.regimenMercancia,
      cve_clasificacion_regimen: DATOS_REGIMEN.clasifiRegimen,

      mercancia: {
        cve_fraccion_arancelaria: DATOS_MERCANCIA.fraccionArancelaria,
        cve_subdivision: DATOS_MERCANCIA.nico,
        descripcion: DATOS_MERCANCIA.valueTA,
        cve_unidad_medida_tarifaria: DATOS_MERCANCIA.unidadMedidaTarifaria === '-1' ? '1' : DATOS_MERCANCIA.unidadMedidaTarifaria,
        cve_pais_origen: DATOS_MERCANCIA.paisOrigen,
        cve_pais_destino: DATOS_MERCANCIA.paisDestino,
        cantidad_tarifaria: DATOS_MERCANCIA.cantidadTarifaria,
        valor_factura_usd: DATOS_MERCANCIA.valorFacturaUSD.toString(),
        precio_unitario: DATOS_MERCANCIA.precioUnitarioUSD,
        lote: DATOS_MERCANCIA.lote,
        fecha_salida: this.convertirFechaISO(DATOS_MERCANCIA.fechaSalida),
        observaciones: DATOS_MERCANCIA.observaciones
      },

      productor: {
        tipo_persona: DATOS_PRODUCTO.tipoPersona === 'pmoral',
        nombre: DATOS_PRODUCTO.nombre,
        apellido_paterno: DATOS_PRODUCTO.apellidoPaterno,
        apellido_materno: DATOS_PRODUCTO.apellidoMaterno,
        razon_social: DATOS_PRODUCTO.razonSocial ?? '',
        descripcion_ubicacion: DATOS_PRODUCTO.domicilio,
        rfc: 'AAL0409235E6',
        pais: DATOS_MERCANCIA.paisOrigen
      },

      solicitante: {
        rfc: 'AAL0409235E6',
        nombre: DATOS_PRODUCTO.nombre,
        es_persona_moral: DATOS_PRODUCTO.tipoPersona === 'pmoral',
        certificado_serial_number: '3082054030820428a00302010'
      },

      representacion_federal: {
        cve_entidad_federativa: REGISTRO_FEDERAL.estado,
        cve_unidad_administrativa: REGISTRO_FEDERAL.representacionFederal
      }
    };

    return this.guardarService.postSolicitud(PAYLOAD).pipe(
      map((response) => {
        if (response?.datos?.id_solicitud) {
          this.tramite130118Store.setIdSolicitud(response.datos.id_solicitud);
          return true;
        }
        return false;
      }),
      catchError(() => of(false)),
      takeUntil(this.destroyNotifier$)
    );
  }



  // eslint-disable-next-line class-methods-use-this
  convertirFechaISO(fecha: string): string {
    const [DIA, MES, ANIO] = fecha.split('/');
    return `${ANIO}-${MES}-${DIA}`;
  }

  mostrarErrorPersonalizado(error: any): void {
  const MENSAJE = error?.mensaje || 'Error inesperado al guardar la solicitud.';
  const DETALLE = error?.causa || error?.error || '';
  this.nuevaNotificacion = {
    tipoNotificacion: 'toastr',
    categoria: 'error',
    modo: 'action',
    titulo: '',
    mensaje: `${MENSAJE}${DETALLE ? ' - ' + DETALLE : ''}`,
    cerrar: false,
    txtBtnAceptar: '',
    txtBtnCancelar: '',
  };
}

}