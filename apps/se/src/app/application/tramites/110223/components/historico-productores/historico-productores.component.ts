import { Catalogo, ConsultaioQuery } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs';
import { CertificadosOrigenService } from '../../../110223/services/certificado-origen.service';
import { FormBuilder } from '@angular/forms';
import { HistoricoColumnas} from '../../../110223/models/certificado-origen.model';
import { HistoricoProductoresComponent } from '../../../../shared/components/historico-productores/historico-productores.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MercanciaTabla } from '../../../110221/models/peru-certificado.model';
import { Subject } from 'rxjs';
import { Tramite110223Query } from '../../query/tramite110223.query';
import { Tramite110223Store } from '../../estados/Tramite110223.store';

/**
 * Componente para gestionar el histórico de productores.
 * Este componente permite al usuario visualizar, seleccionar y gestionar productores relacionados
 * con el trámite. También incluye la funcionalidad para agregar nuevos productores y gestionar
 * datos confidenciales.
 */
@Component({
  selector: 'app-historico-productores',
  standalone: true,
  imports: [HistoricoProductoresComponent],
  templateUrl: './historico-productores.component.html',
  styleUrls: ['./historico-productores.component.scss'],
})
export class HistoricoProductoressComponent implements OnInit, OnDestroy {
  /**
   * @property {boolean} ocultarFax
   * Indica si el campo de fax debe estar oculto o visible en la interfaz de usuario.
    * @default true
   */
  ocultarFax: boolean = true;

  /**
   * @property esTipoDeSeleccionado
   * @type {boolean}
   * @description Indica si el tipo seleccionado es válido o está activo.
   */
  esTipoDeSeleccionado: boolean = true;

  /**
   * @property {Catalogo[]} optionsTipoFactura
   * @description Arreglo que contiene las opciones disponibles para el tipo de factura.
   * @command Este arreglo se utiliza para poblar un componente de selección en la interfaz de usuario.
   */
  optionsTipoFactura: Catalogo[] = [];
  /**
   * Lista de productores disponibles para el exportador.
   */
  productoresExportador: HistoricoColumnas[] = [];
  /**
   * @property {MercanciaTabla[]} mercancia - Arreglo que contiene información de las mercancías.
   * @command Este arreglo se utiliza para almacenar y gestionar los datos relacionados con las mercancías en el componente.
   */
  mercancia: MercanciaTabla[] = [];

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   */
  public tramiteState!: { [key: string]: unknown };
  /**
   * @public
   * @property
   * @type { [key: string]: unknown}
   * @comando
   * Este objeto debe ser inicializado antes de su uso para evitar errores.
   */
  public agregarDatosProductor!: { [key: string]: unknown };
  /**
* Indica si el formulario está en modo solo lectura.
* Cuando es `true`, los campos del formulario no se pueden editar.
*/
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {ValidarInicialmenteCertificadoService} ValidarInicialmenteCertificadoService - Servicio para obtener datos relacionados con los productores.
   * @param {Tramite110221Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110221Query} tramiteQuery - Query para obtener el estado del trámite.
  */
  constructor(
    public fb: FormBuilder,
    private certificadoDeService: CertificadosOrigenService,
    public store: Tramite110223Store,
    public tramiteQuery: Tramite110223Query,
    private consultaQuery: ConsultaioQuery
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Carga los datos iniciales, configura los formularios y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.cargarProductorPorExportador();
    this.cargarMercancia();
    this.facturaOpcion();
    this.tramiteQuery.formulario$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.tramiteQuery.agregarDatosProductorFormulario$.pipe(
      takeUntil(this.destroyNotifier$), map((seccionState) => {
        this.agregarDatosProductor = seccionState;
      })
    ).subscribe();
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarProductorPorExportador(): void {
    this.certificadoDeService.obtenerProductorPorExportador()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.productoresExportador = respuesta.datos;
      });
  }
  /**
   * @descripcion
   * Obtiene la lista de países disponibles.
   */
  facturaOpcion(): void {
    this.certificadoDeService.obtenerMenuDesplegable('factura.json')
      .pipe(
        takeUntil(this.destroyNotifier$),
      )
      .subscribe({
        next: (data) => {

          this.optionsTipoFactura = data as Catalogo[];
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al obtener los datos:', error);

        },
      });
  }

  /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarMercancia(): void {
    // this.certificadoDeService.obtenerMercancia().pipe(takeUntil(this.destroyNotifier$)).subscribe(respuesta => {
    //   this.mercancia = respuesta.datos;
    // });
  }

  /**
   * Establece valores en el estado del store para un formulario histórico.
   * 
   * @param event - Objeto que contiene los datos necesarios para actualizar el store.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en este método).
   * @param event.campo - Nombre del campo que se actualizará en el store.
   * @param event.valor - Valor que se asignará al campo en el store.
   * @param event.storeStateName - Nombre del estado del store (no utilizado en este método).
   * 
   * @returns void
   */
  setValoresStore(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormHistorico({ [CAMPO]: VALOR });
  }

  /**
   * Establece valores en el store para agregar datos del formulario del productor.
   * 
   * @param event - Objeto que contiene los datos necesarios para actualizar el store.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en este método).
   * @param event.campo - Nombre del campo que se actualizará en el store.
   * @param event.valor - Valor que se asignará al campo en el store.
   * @param event.storeStateName - Nombre del estado del store (no utilizado en este método).
   * 
   * @returns void
   * 
   * @command Actualiza el estado del store con los valores proporcionados.
   */
  setValoresStoreAgregarForm(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setAgregarFormDatosProductor({ [CAMPO]: VALOR });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}