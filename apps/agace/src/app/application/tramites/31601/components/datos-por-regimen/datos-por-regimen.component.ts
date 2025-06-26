import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, InputRadioComponent, TableComponent, TablePaginationComponent, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Solicitud31601State, Tramite31601Store } from '../../../../estados/tramites/tramite31601.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { RadioBotons } from '../../modelos/radioBotons.model';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query';
import { TramiteAgaceStore } from '../../../../estados/tramites/tramitesagace.store';

/**
 * Componente DatosPorRegimen que se utiliza para mostrar y gestionar los DatosPorRegimen.
 *
 * Este componente utiliza varios subcomponentes como TituloComponent, CatalogoSelectComponent, CommonModule,
 * ReactiveFormsModule,TableComponent  para mostrar información y permitir al usuario seleccionar y agregar tratados.
 * @component
 */

@Component({
  selector: 'app-datos-por-regimen',
  templateUrl: './datos-por-regimen.component.html',
  styleUrl: './datos-por-regimen.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
    TableComponent,
    TablePaginationComponent,
  ],
})
export class DatosPorRegimenComponent implements OnInit,OnDestroy {

  /**
   * Una instancia de FormGroup que representa el formulario para el régimen.
   * Este formulario se utiliza para capturar y validar los comentarios de los usuarios relacionados con el régimen.
   */
  public regimenForm!: FormGroup;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud31601State;

  /**
   * Array de objetos RadioBotons que representan las opciones de radio disponibles.
   * Cada objeto contiene una etiqueta y un valor.
   */
  radioBotons: RadioBotons[] = [
    {
      label:"Si",
      value:"Yes"
    },
    {
      label:"No",
      value:"No"
    }
  ]

   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
 * Constructor de la clase DatosPorRegimenComponent.
 * 
 * @param fb - Constructor de formularios.
 * @param tramite31601Store - Store de Tramite 31601.
 * @param tramite31601Query - Query de Tramite 31601.
 * @param consultaioQuery - Query de Consultatio.
 */
  constructor(
    private fb: FormBuilder,
    private tramite31601Store: Tramite31601Store,
    private tramite31601Query: Tramite31601Query,
    private consultaioQuery: ConsultaioQuery,
  ){
     this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.crearRegimenForm();
      })
    )
    .subscribe()
  }
  /**
   * Gancho de ciclo de vida que se llama después de inicializar las propiedades enlazadas a datos de una directiva.
   * Este método inicializa catálogos, establece valores de control de formularios, prepara los datos de la pestaña del régimen,
   * y recupera el formulario que se va a agregar.
   *
   * @memberof DatosPorRegimenComponent
   */
  ngOnInit():void {
    this.crearRegimenForm();
  }

  /**
 * Crea e inicializa el FormGroup `regimenForm` con varios controles de formulario y sus validadores.
 * Los controles del formulario incluyen:
 * - `importaciones`: Un campo requerido para importaciones.
 * - `infraestructuraIndique`: Un campo requerido para infraestructura.
 * - `ultimosMeses`: Un campo requerido para los últimos meses.
 * - `operacionesmeses`: Un campo requerido para operaciones en meses.
 * - `valor`: Un campo requerido para valor.
 * - `transferencias`: Un campo opcional para transferencias con una longitud máxima de 20.
 * - `transferenciasVir`: Un campo opcional para transferencias virtuales con una longitud máxima de 7.
 * - `retornos`: Un campo opcional para retornos con una longitud máxima de 20.
 * - `retornosSe`: Un campo opcional para retornos secundarios con una longitud máxima de 7.
 * - `constancias`: Un campo opcional para constancias con una longitud máxima de 20.
 * - `constanciasDe`: Un campo opcional para detalles de constancias con una longitud máxima de 7.
 * - `total`: Un campo deshabilitado para total.
 * - `totals`: Un campo deshabilitado para totales.
 * - `empleadosPropios`: Un campo requerido para empleados propios.
 * - `numeroEmpleados`: Un campo requerido para el número de empleados.
 * - `numeroEmpleadosDos`: Un campo requerido para el número de empleados dos.
 * - `numeroEmpleadosTres`: Un campo requerido para el número de empleados tres.
 * - `comboBimestresUno`: Un campo opcional para el primer combo bimestral.
 * - `comboBimestresDos`: Un campo opcional para el segundo combo bimestral.
 * - `comboBimestresTres`: Un campo opcional para el tercer combo bimestral.
 * - `proveedorCumplimiento`: Un campo requerido para proveedor de cumplimiento.
 * - `declaracionISR`: Un campo requerido para declaración de ISR.
 * - `cancelacion`: Un campo requerido para cancelación.
 * - `cumplimientoReglas`: Un campo requerido para cumplimiento de reglas.
 * - `recintoFiscalizado`: Un campo requerido para recinto fiscalizado.
 * - `recintoEstrategico`: Un campo requerido para recinto estratégico.
 * - `cumplimientoLineamientos`: Un campo requerido para cumplimiento de lineamientos.
 */
  public crearRegimenForm():void {
    this.tramite31601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.regimenForm = this.fb.group({
      cancelacionProcedimiento: [this.solicitudState.cancelacionProcedimiento, Validators.required],
      cumpleLineamientos: [this.solicitudState.cumpleLineamientos, Validators.required]
    });

    if (this.esFormularioSoloLectura) {
      Object.keys(this.regimenForm.controls).forEach((key) => {
        this.regimenForm.get(key)?.disable();
      })
    } else {
      Object.keys(this.regimenForm.controls).forEach((key) => {
        this.regimenForm.get(key)?.enable();
      })
    }  

  }

/**
 * Establece el valor de un campo en el store de Tramite31601.
 *
 * @param campo - El nombre del campo cuyo valor se va a establecer.
 * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
 */
setValoresStore(campo: string, metodoNombre: keyof Tramite31601Store): void {
  const VALOR = this.regimenForm.get(campo)?.value;
  (this.tramite31601Store[metodoNombre] as (value: string) => void)(VALOR);
}

/**
 * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
 * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
 */
ngOnDestroy(): void {
  this.destroyNotifier$.next();
  this.destroyNotifier$.complete();
}
}
