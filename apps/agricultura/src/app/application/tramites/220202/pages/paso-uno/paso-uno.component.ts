import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, ConsultaioStore, PersonaTerceros, SolicitanteComponent, } from '@ng-mf/data-access-user';
import { catchError, map, Observable, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { FilaSolicitud, ListaDeDatosFinal, TercerosrelacionadosdestinoTable, TercerosrelacionadosExportadorTable } from '../../models/220202/fitosanitario.model';
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
   * Referencia al componente hijo SolicitanteComponent para manejar los datos del solicitante.
   * @public
   * @type {SolicitanteComponent}
   * @memberof PasoUnoComponent
   */
  @ViewChild(SolicitanteComponent) solicitanteComponentRef!: SolicitanteComponent;


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
    private consultaioStore: ConsultaioStore,
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
    if (esValido) {
      this.guardarSolicitud().subscribe({
        next: codigo => {
          if (codigo === "00") {
            return { valido: esValido, mensaje: this.consultaState.id_solicitud };
          }
          else {
            esValido = false;
            return { valido: esValido };
          }
        }
      })
    }
    return { valido: esValido };
  }


  /**
   * Guarda la solicitud.
   * @method guardarSolicitud
   */
  guardarSolicitud(): Observable<string> {

    return this.agriculturaApiService.getAllDatosForma()
      .pipe(
        take(1), // solo la primera emisión
        map(datos => this.crearPayload(datos)), // crear payload
        tap(payload => console.log('payloadGuardar', JSON.stringify(payload))), // debug
        switchMap(payload =>
          this.registroSolicitudService.guardarSolicitud(220202, payload).pipe(take(1))
        ),
        tap(data => {
          console.log("respuesta de guardar", data);
          // id_solicitud: 202875826, fecha_actualización: '2025-11-10 19:02:00'
          this.consultaioStore.update(state => ({
            ...state,
            id_solicitud: data.datos?.id_solicitud?.toString() ?? ''
          }));
        }),
        map(data => data.codigo),
        catchError(err => {
          console.error('Error guardando solicitud:', err);
          // return throwError(() => err);
          return 'error';

        })
      );
  }

  private crearPayload(datos: ListaDeDatosFinal): GuardarSolicitud {

    return {
      id_solicitud: this.consultaState?.id_solicitud !== null && this.consultaState?.id_solicitud !== ''
        && !isNaN(Number(this.consultaState?.id_solicitud)) ? Number(this.consultaState?.id_solicitud) : null,
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
          numero_certificado: t.numeroCertificadoInternacional ?? '',
          cve_fraccion: t.fraccionArancelaria ?? '',
          id_fraccion_gubernamental: t.idDescripcionFraccion,
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
            id_vida_silvestre: String(x.idVidaSilvestre)
          }))
        }))
      },

      transporte: {
        ide_medio_transporte: datos.movilizacion.transporte,
        identificacion_transporte: datos.movilizacion.identificacion,
        ide_punto_verificacion: Number(datos.movilizacion.puntoVerificacion),
        razon_social: datos.movilizacion.empresaTransportista
      },

      terceros: {
        terceros_exportador: (datos.datosForma ?? []).map((t: TercerosrelacionadosExportadorTable) => ({
          tipo_persona_sol: "TIPERS.EXP",
          persona_moral: t.tipoMercancia?.toLowerCase() === 'no',
          nombre: t.nombre,
          apellido_paterno: t.primerApellido,
          apellido_materno: t.segundoApellido ?? '',
          razon_social: t.razonSocial,
          pais: t.pais,
          descripcion_ubicacion: t.domicilio ?? '',
          lada: t.lada ?? '',
          telefonos: t.telefono ?? '',
          correo: t.correo ?? ''

        })),

        terceros_destinatario: (datos.tercerosRelacionados ?? []).map((t: TercerosrelacionadosdestinoTable) => ({
            tipo_persona_sol: "TIPERS.DES",
          persona_moral: t.tipoMercancia?.toLowerCase() === 'no',
          num_establ_tif: "",
          nom_establ_tif: "",
          nombre: t.nombre,
          apellido_paterno: t.primerApellido,
          apellido_materno: t.segundoApellido ?? '',
          razon_social: t.razonSocial,
          pais: t.pais,
          codigo_postal: t.codigoPostal,
          cve_entidad: t.estado,
          cve_deleg_mun: t.municipio ?? '',
          cve_colonia: t.colonia ?? '',
          calle: t.calle,
          num_exterior: t.numeroExterior,
          num_interior: t.numeroInterior ?? '',
          lada: t.lada ?? '',
          telefonos: t.telefono ?? '',
          correo: t.correo ?? ''
        })),
      },

      pago: {
        exento_pago: datos.pago.exentoPago?.toLowerCase() === 'si',
        ide_motivo_exento_pago: datos.pago.justificacion,
        cve_referencia_bancaria: datos.pago.claveReferencia,
        cadena_pago_dependencia: datos.pago.cadenaDependencia,
        cve_banco: datos.pago.banco,
        llave_pago: datos.pago.llavePago,
        fec_pago: this.convertirFechaFormato(datos.pago.fechaPago) ?? '',
        imp_pago: Number(datos.pago.importePago)
      },
      // una vez que funcipone el login hay que revisar que toda la parte siguiente funcione
      solicitante: {
        rfc: this.solicitanteComponentRef.datosGenerales?.datos.rfc_original ?? '',
        rol_capturista: "Solicitante", // suponemos se saca de la sesion pero aun no funciona login 
        nombre: this.solicitanteComponentRef.datosGenerales?.datos.identificacion.tipo_persona?.toLowerCase() === 'm' ? (this.solicitanteComponentRef.datosGenerales?.datos.identificacion.razon_social ?? '') : (this.solicitanteComponentRef.datosGenerales?.datos.identificacion.nombre ?? ''),
        es_persona_moral: this.solicitanteComponentRef.datosGenerales?.datos.identificacion.tipo_persona?.toLowerCase() === 'm',
        certificado_serial_number: 0 // no sabemos de donde se obtiene 
      },

      representacion_federal: {
        cve_entidad_federativa: "DGO", // aun no estan los datos login
        cve_unidad_administrativa: "1016" // aun no hay datos login
      }
    };
  }

  /**
 * Convierte una fecha en formato dd/MM/yyyy o dd-MM-yyyy
 * a una cadena ISO válida (UTC).
 * 
 * @param fechaStr - Ejemplo: "07/11/2025" o "07-11-2025"
 * @returns string - Ejemplo: "2025-11-07 00:00:00"
 */
  convertirFechaFormato(fecha: string | Date): string {
    if (!fecha) return '';

    const d = new Date(fecha);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day} 00:00:00`;
  }


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
