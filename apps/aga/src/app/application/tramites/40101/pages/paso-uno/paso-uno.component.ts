import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
  FormularioDinamico,
  SolicitanteComponent
} from '@ng-mf/data-access-user';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_MORAL_NACIONAL,
} from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { Subject, map, takeUntil } from 'rxjs';
import { Solocitud301Service } from '../../../301/services/service301.service';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  /**
   * Representa el tipo de persona.
   * 
   * Valores posibles:
   * - 1: Persona Física
   * - 2: Persona Moral
   */
  tipoPersona!: number;
  /**
   * Almacena un arreglo de entradas de formulario dinámico que representan una o varias personas.
   * Cada elemento del arreglo es de tipo `FormularioDinamico`, el cual encapsula
   * la estructura y los datos para una sección dinámica del formulario relacionada con una persona.
   */
  persona: FormularioDinamico[] = [];
  /**
   * Arreglo que contiene los datos del formulario dinámico relacionados con el domicilio fiscal.
   * Cada elemento del arreglo es una instancia de `FormularioDinamico`, representando un campo o sección del formulario.
   */
  domicilioFiscal: FormularioDinamico[] = [];
  /**
   * Representa el índice o paso actual en una secuencia o proceso.
   * Inicializado en 1 por defecto.
   */
  indice: number = 1;
  /**
   * Indica si el formulario o paso actual ha pasado la validación.
   * Se establece en `true` si la validación es exitosa, de lo contrario en `false`.
   */
  validacion: boolean = false;

  /**
   * Número de pedimento proporcionado como entrada al componente.
   * 
   * Este valor representa el identificador único del pedimento que será utilizado
   * en el flujo del trámite. Debe ser una cadena de texto válida.
   * 
   * @example
   * <app-paso-uno [datosNroPedimento]="'1234567'"></app-paso-uno>
   */
  @Input() datosNroPedimento!: string;
    
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  public consultaState!:ConsultaioState;
  
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
   * Constructor del componente.
   */
  constructor(
        private solocitud301Service: Solocitud301Service,
        private consultaQuery: ConsultaioQuery) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.

  }

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$), 
      map((seccionState) => {
      this.consultaState = seccionState;
      console.log('Estado de consulta:', this.consultaState);
    })).subscribe();

    if (this.consultaState.update) {
      // this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    // this.solocitud301Service
    //   .getRegistroTomaMuestrasMercanciasData().pipe(
    //     takeUntil(this.destroyNotifier$)
    //   )
    //   .subscribe((resp) => {
    //     // if (resp) {
    //     //   this.esDatosRespuesta = true;
    //     //   this.solocitud301Service.actualizarEstadoFormulario(resp);
    //     // }
    //   });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
