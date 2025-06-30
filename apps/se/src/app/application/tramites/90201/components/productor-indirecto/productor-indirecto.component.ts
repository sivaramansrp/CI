import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Subject, map, takeUntil } from 'rxjs';

import {
  Solicitud90201State,
  Tramite90201Store,
} from '../../../../estados/tramites/tramite90201.store';

import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PRODUCTOR_INDIRECTO } from '@libs/shared/data-access-user/src/core/enums/90201/productor-indirecto-tabla.enum';

import { ProductorIndirectoTabla } from '@libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import ProductorTabla from '@libs/shared/theme/assets/json/90201/productor-indirecto-tabla.json';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite90201Query } from '../../../../estados/queries/tramite90201.query';

/**
 * Componente ProductorIndirecto que se utiliza para mostrar y gestionar los ProductorIndirecto.
 *
 * Este componente utiliza varios subcomponentes como TituloComponent, TablaDinamicaComponent, CommonModule,
 * FormsModule y AlertComponent para mostrar información y permitir al usuario seleccionar y agregar tratados.
 *
 * @component
 */
@Component({
  selector: 'app-productor-indirecto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './productor-indirecto.component.html',
  styleUrl: './productor-indirecto.component.scss',
})
export class ProductorIndirectoComponent implements OnInit, OnDestroy {

  /**
   * Configuración de la tabla utilizada en el componente Productor Indirecto.
   * 
   * Esta propiedad almacena la configuración específica de la tabla, 
   * definida por la constante `PRODUCTOR_INDIRECTO`, que determina 
   * la estructura, columnas y comportamiento de la tabla mostrada 
   * en el componente.
   */
  public configuracionTabla = PRODUCTOR_INDIRECTO;
  /**
   * Un arreglo de objetos `ProductorIndirectoTabla` que representa los datos para la tabla de productor indirecto.
   * Se inicializa con los valores de `ProductorTabla`.
   */
  public tablaDatos: ProductorIndirectoTabla[] = ProductorTabla;
  /**
   * Representa el tipo de selección de checkbox utilizado en el componente.
   * Esto se establece al valor de `TablaSeleccion.CHECKBOX`.
   */
  public checkbox = TablaSeleccion.CHECKBOX;


  /**
   * Estado actual de la solicitud para el trámite 90201.
   * 
   * Esta propiedad almacena toda la información relevante del estado de la solicitud,
   * permitiendo su consulta y manipulación dentro del componente.
   * 
   * @type {Solicitud90201State} - Tipo que define la estructura del estado de la solicitud.
   */
  public solicitudState!: Solicitud90201State;

  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * 
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar 
   * suscripciones a observables y evitar fugas de memoria.
   * 
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Representa el formulario reactivo para el productor indirecto.
   * Utilizado para gestionar y validar los datos ingresados por el usuario
   * en el componente de productor indirecto.
   */
  public formProductorIndirecto!: FormGroup;

  /**
   * Representa el RFC (Registro Federal de Contribuyentes) de un usuario.
   * Este es un identificador único utilizado para fines fiscales en México.
   */
  public rfc: string = '';

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false;


  /**
   * Constructor de la clase ProductorIndirectoComponent.
   * 
   * @param tramite90201Store - Servicio para manejar el estado de los trámites 90201.
   * @param tramite90201Query - Servicio para consultar el estado de los trámites 90201.
   * @param consultaioQuery - Servicio para consultar el estado de la sección de consulta IO.
   * @param fb - FormBuilder para la creación y manejo de formularios reactivos.
   * 
   * Al inicializar el componente, se suscribe al estado de consultaioQuery para actualizar
   * la propiedad de solo lectura del formulario y reinicializar el formulario del productor
   * cada vez que cambia el estado.
   */
  constructor(
    private tramite90201Store: Tramite90201Store,
    private tramite90201Query: Tramite90201Query,
    private consultaioQuery: ConsultaioQuery,
    private fb: FormBuilder
  ) {

  }
  
  /**
   * Inicializa el componente ProductorIndirecto.
   * Se suscribe al estado de la solicitud y actualiza el RFC con el valor del estado.
   */
  ngOnInit(): void {

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe()
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario del componente.
   * 
   * Este método suscribe al observable `selectSolicitud$` del query `tramite90201Query`
   * para obtener el estado actual de la solicitud y asignarlo a la propiedad `solicitudState`.
   * La suscripción se mantiene activa hasta que se emite un valor en `destroyNotifier$`,
   * lo que permite limpiar la suscripción adecuadamente al destruir el componente.
   * 
   * Posteriormente, llama al método `inicializarProductorFormulario` para inicializar
   * el formulario específico del productor indirecto.
   */
  inicializarFormulario(): void {
    this.tramite90201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;

        })

      ).subscribe()

    this.inicializarProductorFormulario();
  }

  /**
   * Inicializa el formulario reactivo para el productor indirecto.
   * 
   * Este método crea una nueva instancia del formulario `formProductorIndirecto`
   * utilizando el `FormBuilder` (`fb`). El formulario contiene un solo campo:
   * - `rfc`: Inicializado con el valor de `rfc` proveniente del estado de la solicitud (`solicitudState`).
   * 
   * @returns {void} No retorna ningún valor.
   */
  inicializarProductorFormulario(): void {
    this.formProductorIndirecto = this.fb.group({
      rfc: [this.solicitudState?.rfc],
    })

    if (this.esFormularioSoloLectura) {
      this.formProductorIndirecto.disable();
    }
  }

  /**
   * Establece un valor en el store llamando al método especificado.
   *
   * @param campo - Nombre del campo a actualizar (actualmente no se utiliza en la función).
   * @param metodoNombre - Nombre del método del store `Tramite90201Store` que será invocado.
   *
   * Esta función toma el valor del RFC actual y lo pasa como argumento al método correspondiente del store.
   */
  setValoresStore(campo: string, metodoNombre: keyof Tramite90201Store): void {
    const VALOR = this.rfc;
    (this.tramite90201Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Notifica a los suscriptores para limpiar recursos y evitar fugas de memoria.
   * Completa el observable `destroyNotifier$` para finalizar todas las suscripciones dependientes.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
