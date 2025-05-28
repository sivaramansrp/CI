import { AfterViewInit, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContenedorComponent } from '../../components/contenedor/contenedor.component';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { Input } from '@angular/core';
import { PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { SolicitanteComponent } from '../../components/solicitante/solicitante.component';
import { Subject } from 'rxjs';
import { Tramite11201Store } from '../../../../core/estados/tramites/tramite11201.store';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [SolicitanteComponent, CommonModule, ContenedorComponent]
})
export class PasoUnoComponent implements AfterViewInit, OnDestroy, OnInit {
  /**
    * Referencia al componente `SolicitanteComponent`.
    * 
    * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente `SolicitanteComponent`.
    */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona.
   * 
   * Esta propiedad almacena el tipo de persona como un número.
   */
  tipoPersona!: number;

  /**
   * Lista de formularios dinámicos para la persona.
   * 
   * Esta propiedad contiene un array de objetos `FormularioDinamico` que representan los formularios dinámicos de la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Lista de formularios dinámicos para el domicilio fiscal.
   * 
   * Esta propiedad contiene un array de objetos `FormularioDinamico` que representan los formularios dinámicos del domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual en el wizard.
   * 
   * Esta propiedad indica el índice del paso actual en el wizard, comenzando desde 1.
   */
  indice: number = 1;

  /**
   * Evento de continuar.
   * 
   * Esta propiedad utiliza `@Output` para emitir un evento `continuarEvento` con una cadena como valor.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * Indicador de validación.
   * 
   * Esta propiedad indica si la validación es verdadera o falsa.
   */
  validacion: boolean = false;

  /**
   * Datos del número de pedimento.
   * 
   * Esta propiedad utiliza `@Input` para recibir datos del número de pedimento de tipo desconocido.
   */
  @Input() datosNroPedimento!: unknown;
  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para notificar y completar las suscripciones activas al destruir el componente, evitando fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;
  constructor(private datosTramiteService: DatosTramiteService,
    private consultaioQuery: ConsultaioQuery,
    public tramite11201Store: Tramite11201Store,
  ) {

  }
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
        })
      )
      .subscribe();
    if (this.consultaDatos.update) {
      this.fetchGetDatosConsulta();
    }
  }
  /**
  * Gancho de ciclo de vida angular que se llama después de que la vista del componente se haya inicializado por completo.
  */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
  }
  /**
   * Selecciona una pestaña.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
 * Método para emitir un evento de continuar.
 * 
 * Este método emite un evento `continuarEvento` con una cadena vacía como valor.
 * Se utiliza para indicar que se debe continuar al siguiente paso en el proceso.
 * 
 * @example
 * // Llamar al método para emitir el evento de continuar
 * this.continuar();
 */
  continuar(): void {
    this.continuarEvento.emit('');
  }
  /**
 * @method fetchGetDatosConsulta
 * @description Método para obtener los datos de consulta desde el servicio `DatosTramiteService` y actualizar el estado del store `Tramite11201Store`.
 * 
 * Este método realiza una solicitud HTTP para obtener los datos de consulta y, si la respuesta es exitosa, actualiza múltiples propiedades del store con los datos recibidos.
 * Utiliza el operador `takeUntil` para cancelar la suscripción cuando el componente se destruye, evitando fugas de memoria.
 * 
 * @returns {void}
 */
  public fetchGetDatosConsulta(): void {
    this.datosTramiteService
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((respuesta) => {
        if (respuesta.success) {
          this.tramite11201Store.setTipoBusqueda(respuesta.datos.tipoBusqueda);
          this.tramite11201Store.setAduana(respuesta.datos.aduana);
          this.tramite11201Store.setFechaIngreso(respuesta.datos.fechaIngreso);
          this.tramite11201Store.setInicialesContenedor(respuesta.datos.inicialesContenedor);
          this.tramite11201Store.setNumeroContenedor(respuesta.datos.numeroContenedor);
          this.tramite11201Store.setDigitoDeControl(respuesta.datos.digitoDeControl);
          this.tramite11201Store.setContenedores(respuesta.datos.contenedores);
          this.tramite11201Store.setFechaDeIngreso(respuesta.datos.fechaDeIngreso);
          this.tramite11201Store.setAduanaMenuDesplegable(respuesta.datos.aduanaMenuDesplegable);
          this.tramite11201Store.setMenuDesplegable(respuesta.datos.menuDesplegable);
          this.tramite11201Store.setNumeroManifiesta(respuesta.datos.numeroManifiesta);
          this.tramite11201Store.setDelContenedor(respuesta.datos.datosDelContenedor);
        }
      });
  }
  /**
  * @method ngOnDestroy
  * @description Método del ciclo de vida que se ejecuta al destruir el componente.
  * 
  * Este método emite un valor en el `destroyNotifier$` para notificar la destrucción del componente y completa el `Subject` para liberar recursos y evitar fugas de memoria.
  * 
  * @returns {void}
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
