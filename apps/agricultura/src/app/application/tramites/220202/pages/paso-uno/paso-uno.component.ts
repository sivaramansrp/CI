import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, PersonaTerceros, } from '@ng-mf/data-access-user';
import { map, switchMap, take, takeUntil, tap } from 'rxjs';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { FilaSolicitud, ListaDeDatosFinal } from '../../models/220202/fitosanitario.model';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { Subject } from 'rxjs';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionNacionalComponent } from '../../components/datos-para-movilizacion-nacional/datos-para-movilizacion-nacional.component';
import { TercerospageComponent } from '../../components/tercerospage/tercerospage.component';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { RegistroSolicitudService } from '../../services/220202/registro-solicitud/registro-solicitud.service';
import { GuardarSolicitud } from '../../models/220202/guardar-solicitud.model';

/**
 * Componente para mostrar el subtítulo del asistente.
 * Este componente representa el primer paso de un formulario multipaso,
 * gestionando la navegación entre las diferentes secciones del formulario.
 * @component PasoUnoComponent
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrls ./paso-uno.component.scss --220202
 */

/**
 * @title PasoUnoComponent
 * @description 
 * Componente que representa el primer paso de un formulario multipaso.
 * Gestiona la navegación entre diferentes pestañas/pasos del formulario,
 * cada uno representado por un componente específico.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss']

})

export class PasoUnoComponent implements OnInit,OnDestroy {

  /**
 * @description Referencia al componente DatosDeLaSolicitudComponent.
 * Esta referencia permite acceder a los métodos y propiedades del componente DatosDeLaSolicitudComponent,
 * @type {DatosDeLaSolicitudComponent}
 * @viewChild DatosDeLaSolicitudComponent
 */
  @ViewChild(DatosDeLaSolicitudComponent) datosSolicitudRef!: DatosDeLaSolicitudComponent;

  /**
 * @description Referencia al componente DatosParaMovilizacionNacionalComponent.
 * Esta referencia permite acceder a los métodos y propiedades del componente DatosParaMovilizacionNacionalComponent,
 * @type {DatosParaMovilizacionNacionalComponent}
 * @viewChild DatosParaMovilizacionNacionalComponent
 */
  @ViewChild(DatosParaMovilizacionNacionalComponent) datosParaMovilizacionRef!: DatosParaMovilizacionNacionalComponent;

  /**
* @description Referencia al componente TercerospageComponent.
* Esta referencia permite acceder a los métodos y propiedades del componente TercerospageComponent,
* @type {TercerospageComponent}
* @viewChild TercerospageComponent
*/
  @ViewChild(TercerospageComponent) tercerosPageComponentRef!: TercerospageComponent;

  /**
* @description Referencia al componente PagoDeDerechosComponent.
* Esta referencia permite acceder a los métodos y propiedades del componente PagoDeDerechosComponent,
* @type {PagoDeDerechosComponent}
* @viewChild PagoDeDerechosComponent
*/
  @ViewChild(PagoDeDerechosComponent) pagoDeDerechosComponentRef!: PagoDeDerechosComponent;


  /**
   * @description Índice de la pestaña/paso actual.
   * Este valor indica el paso actual en el proceso de formulario.
   * @type {number}
   * @default 1
   */
  indice: number = 1;

    /**
   * @method seleccionaTab
   * @description Selecciona una pestaña específica estableciendo el índice correspondiente.
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Indica si existen datos de respuesta para mostrar en el formulario.
   * @type {boolean}
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Estado de la consulta actual, contiene la información relevante del solicitante.
   * @type {ConsultaioState}
   */
  public consultaState!: ConsultaioState;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Lista de personas relacionadas con el trámite.
   * @type {PersonaTerceros[]}
   */
  public personas: PersonaTerceros[] = [];

  /**
   * @description 
   * Array de objetos que representan las diferentes secciones del formulario.
   * Cada objeto contiene el índice, título y el nombre del componente correspondiente.
   * Este arreglo es utilizado para navegar entre los diferentes pasos del formulario.
   * 
   * @type {Array<{ index: number, title: string, component: string }>}
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' },
    { index: 3, title: 'Datos para movilización nacional', component: 'datos-para-movilizacion-nacional' },
    { index: 4, title: 'Terceros relacionados', component: 'terceros-relacionados' },
    { index: 5, title: 'Pago de derechos', component: 'pago-de-derechos' }
  ];

  /**
   * Constructor del componente.
   * Este constructor inicializa el componente y establece el estado inicial de la validación
   * y de las secciones del formulario utilizando el servicio `SeccionLibStore`.
   * @constructor
   * @param {SeccionLibStore} seccionStore - Servicio para gestionar el estado de las secciones del formulario.
   */
  constructor(private readonly seccionStore: SeccionLibStore, 
    private agriculturaApiService: AgriculturaApiService,
    private consultaQuery: ConsultaioQuery,
    private registroSolicitudService: RegistroSolicitudService) {
    // Establece el estado de la forma como no válida al inicio.
    this.seccionStore.establecerFormaValida([false]);
    // Establece la primera sección como activa.
    this.seccionStore.establecerSeccion([true]);
    
  }

  
  ngOnInit(): void {
  this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
        this.esFormularioSoloLectura = seccionState.readonly;
        if (this.consultaState.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
      })
    )
    .subscribe();
  }
  
    guardarDatosFormulario(): void {
      this.agriculturaApiService
        .getDatosDeLaSolicitudData().pipe(
          takeUntil(this.destroyNotifier$)
        )
        .subscribe((resp) => {
          if(resp){
          this.agriculturaApiService.actualizarEstadoFormulario(resp as ListaDeDatosFinal);
          this.esDatosRespuesta = true;
          }
        });
    }

  /**
   * @description 
   * Método que se ejecuta al seleccionar una pestaña/paso del formulario.
   * Actualiza el índice de la pestaña/paso actual, permitiendo la navegación
   * entre las diferentes secciones del formulario multipaso.
   * 
   * @method seleccionaPestana
   * @param {number} i - Índice de la pestaña/paso seleccionada.
   * @returns {void}
   */
  seleccionaPestana(i: number): void {
    this.indice = i;
  }

  /**
   * @description Valida todos los formularios del paso uno
   * @method validarFormularios
   * @returns { valido: boolean; mensaje?: string } true si todos los formularios son válidos, false en caso contrario
   */
  public validarFormularios(): { valido: boolean; mensaje?: string } {
    console.log('entra a alida formulario de los datos de la solicitud');
    this.guardarSolicitud();

    const tabsValidadas = [
      { index: 2, ref: this.datosSolicitudRef },
      { index: 3, ref: this.datosParaMovilizacionRef },
      { index: 4, ref: this.tercerosPageComponentRef },
      { index: 5, ref: this.pagoDeDerechosComponentRef }
    ];

    let esValido = true;   

    for (const tab of tabsValidadas) {

      var validaPestañas = tab.ref.validarFormulario();
      if (tab.ref && !validaPestañas.valido) {
        this.indice = tab.index; // mover a la pestaña con error
        esValido = false;
        return { valido: esValido, mensaje: validaPestañas.mensaje! };
      }
    }
    return { valido: esValido };
  }


  /**
   * Guarda la solicitud.
   * @method guardarSolicitud
   */
  guardarSolicitud(): void {
    console.log('guardarSolicitud: inicio');

    this.agriculturaApiService.getAllDatosForma()
      .pipe(
        take(1), // solo la primera emisión
        map(datos => this.crearPayload(datos)), // crear payload
        tap(payload => console.log('payloadGuardar', JSON.stringify(payload))), // debug
        switchMap(payload =>
          this.registroSolicitudService.guardarSolicitud(220202, payload).pipe(take(1))
        )
      )
      .subscribe({
        next: (data) => {
          console.log("respuesta de guardar", data);
        },
        error: (err) => {
          console.error("Error guardando solicitud:", err);
        }
      });
  }

  private crearPayload(datos: any): GuardarSolicitud {
    console.log('datosFormulario', JSON.stringify(datos));
    return {
      id_solicitud: null,
      datos_solicitud: {
        cve_aduana: datos.datos.aduanaDeIngreso!,
        oficina_inspeccion_sanidad_agropecuaria: datos.datos.oficinaDeInspeccion,
        punto_inspeccion: datos.datos.puntoDeInspeccion,
        numero_autorizacion: datos.datos.numeroDeGuia!,
        clave_regimen: datos.datos.regimen,
        numero_carro_ferrocarril: datos.datos.numeroDeCarro!,
        mercancia: (datos.tablaDatos ?? []).map((t: FilaSolicitud) => ({
          tipo_requisito: Number(t.tipoRequisito) ?? 0,
          requisito: t.requisito ?? '',
          numero_certificado: Number(t.numeroCertificadoInternacional) ?? 0,
          cve_fraccion: t.fraccionArancelaria ?? '',
          id_fraccion_gubernamental: 0,
          clave_nico: t.nico ?? '',
          descripcion_mercancia: t.descripcion ?? '',
          cantidad_umt: Number(t.cantidadUMT) ?? 0,
          clave_unidad_medida: t.umt ?? '',
          cantidad_umc: Number(t.cantidadUMC) ?? 0,
          clave_unidad_comercial: t.umc ?? '',
          id_uso_mercancia_tipo_tramite: Number(t.uso) ?? 0,
          id_tipo_producto_tipo_tramite: Number(t.tipoDeProducto) ?? 0,
          numero_lote: t.numeroDeLote ?? 0,
          clave_paises_origen: t.paisDeOrigen ?? '',
          clave_paises_procedencia: t.paisDeProcedencia ?? '',
          idNombreCientifico: '',
          lista_detalle_mercancia: (t.detalleVidaSilvestre ?? []).map(x => ({
            id_vida_silvestre: x.idVidaSilvestre
          }))
        }))
      },

      transporte: {
        ide_medio_transporte: datos.movilizacion.transporte,
        identificacion_transporte: datos.movilizacion.identificacion,
        ide_punto_verificacion: datos.movilizacion.puntoVerificacion,
        razon_social: datos.movilizacion.empresaTransportista
      },

      terceros: {
        terceros_exportador: [
          {
            tipo_persona_sol: "TIPERS.EXP",
            persona_moral: false,
            nombre: "tadeo",
            apellido_paterno: "guerrero",
            apellido_materno: "lopez",
            razon_social: null,
            pais: "ATA",
            descripcion_ubicacion: "domicilio",
            lada: null,
            telefonos: null,
            correo: "miriam@gmail.com"
          }
        ],
        terceros_destinatario: [
          {
            tipo_persona_sol: "TIPERS.DES",
            persona_moral: false,
            num_establ_tif: null,
            nom_establ_tif: null,
            nombre: "david",
            apellido_paterno: "roman",
            apellido_materno: "casanova",
            razon_social: null,
            pais: "MEX",
            codigo_postal: "24300",
            cve_entidad: "CAMP",
            cve_deleg_mun: "04011",
            cve_colonia: "01124300023",
            calle: "14",
            num_exterior: "895",
            num_interior: "8",
            lada: null,
            telefonos: null,
            correo: "enrique@gmail.com"
          }
        ]
      },

      pago: {
        exento_pago: false,
        ide_motivo_exento_pago: null,
        cve_referencia_bancaria: "454000554",
        cadena_pago_dependencia: "0003007060CEFI",
        cve_banco: "9",
        llave_pago: "9998853",
        fec_pago: "2024-08-19 00:00:00",
        imp_pago: 2562
      },

      solicitante: {
        rfc: "AAL0409235E6",
        rol_capturista: "Solicitante",
        nombre: "Juan Pérez",
        es_persona_moral: true,
        certificado_serial_number: 20001000000100001815
      },

      representacion_federal: {
        cve_entidad_federativa: "DGO",
        cve_unidad_administrativa: "1016"
      }
    };
  }


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
