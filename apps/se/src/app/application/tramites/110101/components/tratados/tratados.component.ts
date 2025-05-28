
import { AlertComponent, ConsultaioQuery } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitante110101State, Tramite110101Store } from '../../estados/tramites/solicitante110101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { MENSAJE_ALERTA_TRATADOS } from '@ng-mf/data-access-user';
import { PantallasSvcService } from '../../services/pantallas-svc.service';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import tratadosTable from '@libs/shared/theme/assets/json/110101/tratados-table.json';

/**
 * Componente Tratados que se utiliza para mostrar y gestionar los tratados.
 * 
 * Este componente utiliza varios subcomponentes como TituloComponent, CommonModule,
 * TableComponent y AlertComponent para mostrar información y permitir al usuario seleccionar y agregar tratados.
 * 
 * @component
 */
@Component({
  selector: 'app-tratados',
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    TableComponent,
    AlertComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ]
})
export class TratadosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar los tratados.
   * 
   * @property {FormGroup} formularioTratados - El formulario reactivo que contiene los campos para los tratados.
   */
  formularioTratados!: FormGroup;

  /**
  * **Subject utilizado para manejar la destrucción de suscripciones**
  * 
  * Este `Subject` se emite en `ngOnDestroy` para notificar y completar todas las
  * suscripciones activas, evitando posibles fugas de memoria en el componente.
  */
  private destroy$ = new Subject<void>();
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;

    /**
     * Representa el estado actual del solicitante (Solicitante) para el trámite 110101.
     * Esta propiedad contiene toda la información relevante sobre los datos y el estado
     * del solicitante dentro del contexto del trámite.
     */
  public solicitudeState!: Solicitante110101State;
  public paisCatalogo: Catalogo[] = [];
  public tratadoCatalogo: Catalogo[] = [];
  public origenCatalogo: Catalogo[] = [];


    /**
     * Inicializa el TratadosComponent.
     * @param fb - Servicio FormBuilder utilizado para crear y gestionar formularios reactivos.
     * @param tramite110101Store - Servicio store para gestionar el estado del Trámite 110101.
     * @param solicitanteQuery - Servicio query para acceder al estado del solicitante.
     * @param consultaioQuery - Servicio query para acceder al estado de consultaio.
     * 
     * Se suscribe al observable `selectConsultaioState$` para actualizar la propiedad `esFormularioSoloLectura`
     * e inicializar el formulario de tratados cada vez que cambia el estado de consultaio. La suscripción se
     * cancela automáticamente cuando el componente es destruido.
     */
  constructor(private fb: FormBuilder,
    private tramite110101Store: Tramite110101Store,
    private solicitanteQuery: Solicitante110101Query,
    private consultaioQuery: ConsultaioQuery,
    private pantallaService: PantallasSvcService
  ) { 
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarFormularioTratados();
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Llama al método `inicializarFormularioTratados` para configurar el formulario reactivo.
   * 
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.solicitanteQuery.selectSolicitante$.pipe(takeUntil(this.destroy$),map((seccionState) => {
        this.solicitudeState = seccionState;
    })).subscribe();
    this.inicializarFormularioTratados();
    this.getCatalogoList();
  }

  /**
   * Inicializa el formulario reactivo para los tratados.
   * 
   * Este método configura el formulario reactivo con los campos `pais`, `tratado` y `origen`,
   * todos ellos con validadores requeridos.
   * 
   * @method inicializarFormularioTratados
   */

  public inicializarFormularioTratados(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

    /**
     * Inicializa el formulario `formularioTratados` con valores predeterminados de `solicitudeState`.
     * El formulario incluye los siguientes controles requeridos: `pais`, `tratado` y `origen`.
     * Cada control se prellena con el valor correspondiente de `solicitudeState`.
     * @remarks
     * Este método debe llamarse para configurar el formulario antes de la interacción del usuario.
     */
  public inicializarFormulario(): void {
    this.formularioTratados = this.fb.group({
      pais: [this.solicitudeState.pais, Validators.required],
      tratado: [this.solicitudeState.tratado, Validators.required],
      origen: [this.solicitudeState.origen, Validators.required]
    });
  }

  /**
   * Mensaje de alerta para tratados.
   * 
   * @property {string} alert - El mensaje de alerta que se mostrará en el componente.
   */

  alerta = MENSAJE_ALERTA_TRATADOS;

    /**
     * Obtiene los datos de los catálogos desde el servicio backend y actualiza las propiedades de catálogos del componente.
     * Este método se suscribe al observable `getCatalogoDatos` de `pantallaService`, procesa la respuesta de la API,
     * y asigna los datos resultantes a `paisCatalogo`, `tratadoCatalogo` y `origenCatalogo` respectivamente.
     * La suscripción se cancela automáticamente cuando el componente es destruido para evitar fugas de memoria.
     */
  public getCatalogoList(): void {
    this.pantallaService.getCatalogoDatos().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      const API_RESPONSE = JSON.parse(JSON.stringify(response));
      this.paisCatalogo = API_RESPONSE.pais;
      this.tratadoCatalogo = API_RESPONSE.tratado;
      this.origenCatalogo = API_RESPONSE.origen;
    });
  }


  /**
   * Método para seleccionar un tratado.
   * 
   * Este método actualmente no tiene implementación. Puede ser implementado según los requisitos
   * o eliminado si no es necesario.
   * 
   * @method seleccionar
   */
  // eslint-disable-next-line class-methods-use-this
  seleccionar(): void {
    // Implementar el método o eliminarlo si no es necesario
  }

  /**
   * Encabezados comunes de la tabla de tratados.
   * 
   * @property {string[]} encabezadosComunesTabla - Array de cadenas de encabezados de tabla.
   */
  encabezadosComunesTabla = tratadosTable.tableHeader;

  /**
   * Cuerpo de la tabla de tratados.
   * 
   * @property {any[]} cuerpoTabla - Array de datos del cuerpo de la tabla.
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cuerpoTabla: any[] = tratadosTable.tableBody;

    /**
   * Agrega un nuevo tratado a la tabla.
   * 
   * Este método verifica si el formulario es válido, y si lo es, agrega el nuevo tratado
   * al cuerpo de la tabla y reinicia el formulario.
   * 
   * @method agregarTratado
   */
  agregarTratado(): void {
    if (this.formularioTratados.valid) {
      this.formularioTratados.reset();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  public guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formularioTratados.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formularioTratados.enable();
    }
  }
  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110101Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110101Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }


  /**
   * **Ciclo de vida: OnDestroy**
   * 
   * Este método se ejecuta cuando el componente se destruye. 
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   * 
   * - Envía un valor a `destroy$` para notificar a los observables que deben completarse.
   * - Completa `destroy$` para liberar los recursos asociados.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
