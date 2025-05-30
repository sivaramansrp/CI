import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';

import { Solicitud90201State,Tramite90201Store } from '../../../../estados/tramites/tramite90201.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DOMICILIOS_PLANTAS } from '@libs/shared/data-access-user/src/core/enums/90201/productor-indirecto-tabla.enum';
import { DomiciliosDePlantasTabla } from '@libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import DomiciliosTabla from '@libs/shared/theme/assets/json/90201/domicilios-de-plantas-tabla.json';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { Tramite90201Query } from '../../../../estados/queries/tramite90201.query';


/**
 * Componente DomiciliosDePlantas que se utiliza para mostrar y gestionar los DomiciliosDePlantas.
 * 
 * Este componente utiliza varios subcomponentes como TituloComponent, CommonModule,
 * ReactiveFormsModule para mostrar información y permitir al usuario seleccionar y agregar tratados.
 * 
 * @component
 */

@Component({
  selector: 'app-domicilios-de-plantas',
  standalone: true,
  imports: [CommonModule,TablaDinamicaComponent,ReactiveFormsModule],
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrl: './domicilios-de-plantas.component.scss',
})
export class DomiciliosDePlantasComponent implements OnInit, OnDestroy {


  /**
   * Un grupo de formularios que representa los domicilios de las plantas.
   * Este formulario se utiliza para capturar y validar la información de los domicilios.
   */
  public formDomiciliosDePlantas!: FormGroup;

   /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  
  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false; 

  /**
   * Estado actual de la solicitud del trámite 90201.
   * 
   * Contiene toda la información relevante relacionada con la solicitud,
   * incluyendo datos de la planta, domicilio y otros detalles necesarios
   * para el proceso del trámite.
   */
  public solicitudState!: Solicitud90201State;

  /**
   * Configuración de la tabla utilizada para mostrar los domicilios de las plantas.
   * Esta propiedad obtiene su estructura y parámetros desde la constante `DOMICILIOS_PLANTAS`.
   * 
   * @see DOMICILIOS_PLANTAS para la definición de columnas, filtros y otras opciones de la tabla.
   */
  public configuracionTabla = DOMICILIOS_PLANTAS;

  /**
   * Un arreglo de objetos `DomiciliosDePlantasTabla` que representa la tabla de domicilios.
   * Inicializado con los valores de `DomiciliosTabla`.
   */
  public domiciliosTabla: DomiciliosDePlantasTabla[] = DomiciliosTabla;

  /**
   * Constructor de la clase DomiciliosDePlantasComponent.
   * 
   * @param fb - Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param consultaioQuery - Servicio para consultar el estado de la sección de IO.
   * @param tramite90201Store - Store para la gestión del estado del trámite 90201.
   * @param tramite90201Query - Servicio para consultar el estado del trámite 90201.
   * 
   * Al inicializar el componente, se suscribe al estado de consultaioQuery para actualizar
   * la propiedad de solo lectura del formulario y establecer los domicilios de plantas.
   */
   constructor(private fb: FormBuilder,private consultaioQuery: ConsultaioQuery,private tramite90201Store: Tramite90201Store,
      private tramite90201Query: Tramite90201Query) {
    
    }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a la función `inicializarEstadoFormulario` para preparar el estado inicial del formulario.
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
      })
    )
    .subscribe()
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario de domicilios de plantas.
   * 
   * Este método suscribe al observable `selectSolicitud$` del query `tramite90201Query`
   * para obtener el estado de la solicitud y asignarlo a la propiedad `solicitudState`.
   * Utiliza el operador `takeUntil` para cancelar la suscripción cuando se emite `destroyNotifier$`.
   * Después de la suscripción, llama al método `establecerFormDomiciliosDePlantas` para configurar el formulario.
   */
  inicializarFormulario(): void {
     this.tramite90201Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;

           })
           
          ).subscribe()
         this.establecerFormDomiciliosDePlantas();
    }

  /**
   * Inicializa el grupo de formularios para "Domicilios de Plantas" con valores predeterminados y campos deshabilitados.
   * 
   * El grupo de formularios contiene los siguientes controles:
   * - `representacionFederal`: Un control de formulario deshabilitado con una cadena vacía como valor predeterminado.
   * - `actividadProductiva`: Un control de formulario deshabilitado con una cadena vacía como valor predeterminado.
   */
  public establecerFormDomiciliosDePlantas(): void {
    this.formDomiciliosDePlantas = this.fb.group({
      representacionFederal: [{value: this.solicitudState?.representacionFederal,disabled: true}],
      actividadProductiva: [{value: this.solicitudState?.actividadProductiva,disabled: true}]
    });

    if (this.esFormularioSoloLectura) {
      this.formDomiciliosDePlantas.disable();
    }
  }

/**
 * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
 * Emite una notificación a través del observable `destroyNotifier$` para limpiar suscripciones y recursos.
 * Completa el observable para evitar fugas de memoria.
 */
 ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Actualiza un valor en el store de Tramite90201 utilizando el nombre del método proporcionado.
   *
   * @param campo - El nombre del campo del formulario cuyo valor se desea obtener.
   * @param metodoNombre - El nombre del método del store de Tramite90201 que se debe invocar para actualizar el valor.
   */
   setValoresStore(campo: string, metodoNombre: keyof Tramite90201Store): void {
    const VALOR = this.formDomiciliosDePlantas.get(campo)?.value;
    (this.tramite90201Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
}
