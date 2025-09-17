import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { Solicitud260910State } from '../../estados/tramites260910.store';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { TercerosRelacionados } from '../../models/solicitud-datos.model';
import { TercerosRelacionadosFabSeccionComponent } from '../../../../shared/components/terceros-relacionados-fab-seccion/terceros-relacionados-fab-seccion.component';

/**
 * Componente para gestionar el primer paso de un proceso.
 * Controla la selección de pestañas y la carga de datos iniciales.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice de la pestaña activa actualmente.
   * @default 1 (segunda pestaña)
   */
  public indice = 1;

  /**
   * Datos de consulta obtenidos del estado global.
   * @type {ConsultaioState}
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si los datos de respuesta ya están disponibles para mostrar.
   * @type {boolean}
   * @default false
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject para gestionar la destrucción de suscripciones.
   * @type {Subject<void>}
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario reactivo utilizado para gestionar datos de la solicitud.
   * Se inicializará más adelante en el componente.
   */
  solicitudForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   */
  solicitud260910State: Solicitud260910State = {} as Solicitud260910State;

  /**
   * Referencia a una lista de componentes `TercerosRelacionadosFabSeccionComponent`.
   */ 
  @ViewChildren(TercerosRelacionadosFabSeccionComponent)
  tercerosRelacionadosComponents!: QueryList<TercerosRelacionadosFabSeccionComponent>;

  /**
   * Constructor del componente.
   * @param {SolicitudDatosService} service - Servicio para obtener datos de solicitud
   * @param {ConsultaioQuery} consultaioQuery - Query para acceder al estado de consulta
   */
  constructor(
    private service: SolicitudDatosService,
    private consultaioQuery: ConsultaioQuery,
    private fb: FormBuilder,
    public solicitud260910Query: Solicitud260910Query
  ) {
    this.solicitud260910Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260910State) => {
          this.solicitud260910State = respuesta;
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el componente configurando las suscripciones necesarias.
   * @returns {void}
   */
  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      folioDeDesistimiento: [{ value: this.solicitud260910State?.folioDeDesistimiento, disabled: true }, [Validators.required]],
      folioOriginal: [{ value: this.solicitud260910State?.folioOriginal, disabled: true }, [Validators.required]]
    });

    this.configurarSuscripcionEstadoConsulta();
  }

  /**
   * Cambia la pestaña activa al índice especificado.
   * @param {number} i - Índice de la pestaña a activar
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  
  /**
   * Obtiene los datos de consulta desde el servicio.
   * Actualiza el estado del formulario si la respuesta es exitosa.
   * @returns {void}
   */
  public fetchGetDatosConsulta(): void {
    this.service
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta.success) {
          this.esDatosRespuesta = true;
          this.service.actualizarEstadoFormulario(respuesta?.datos);
          this.solicitudForm.get('folioDeDesistimiento')?.setValue(respuesta.datos?.folioDeDesistimiento || '');
          this.solicitudForm.get('folioOriginal')?.setValue(respuesta.datos?.folioOriginal || '');
        }
      });
  }

  /**
   * Configura la suscripción al estado de consulta.
   * - Actualiza los datos locales con el estado actual
   * - Decide si cargar nuevos datos o usar existentes
   * @public
   * @returns {void}
   */
  public configurarSuscripcionEstadoConsulta(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
        })
      )
      .subscribe();

    if (this.consultaDatos?.update) {
      this.fetchGetDatosConsulta();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Recopila los valores actuales de los formularios hijos.
   * @returns {tercerosRelacionados?: TercerosRelacionados[]} Objeto con los valores del formulario
   */
  collectFormValues(): {
      tercerosRelacionados?: TercerosRelacionados[];
    } {
      const FORM_VALUES = {
        tercerosRelacionados: this.tercerosRelacionadosComponents?.map(
          (component) => ({
            facturador: component.agregarFacturadorFormGroup?.value,
            fabricante: component.agregarFabricanteFormGroup?.value,
            destinatario: component.agregarDestinatarioFormGroup?.value,
            proveedor: component.agregarProveedorFormGroup?.value,
          })
        ) as TercerosRelacionados[], // Fetch data from TercerosRelacionadosFabSeccionComponent        
      };
      
    this.service.updateFormData(
      'tercerosRelacionados',
      FORM_VALUES.tercerosRelacionados
    );

    return FORM_VALUES;
  }

  /**
   * Limpia recursos antes de destruir el componente.
   * Cancela todas las suscripciones activas.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
