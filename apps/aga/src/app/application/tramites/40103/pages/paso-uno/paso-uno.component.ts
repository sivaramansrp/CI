
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,PERSONA_MORAL_NACIONAL} from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import {FormularioDinamico,SolicitanteComponent} from '@ng-mf/data-access-user';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements AfterViewInit {
  /**
 * Referencia al componente hijo `SolicitanteComponent` dentro de la plantilla.
 * Permite acceder a las propiedades y métodos públicos del componente hijo.
 *
 * @type {SolicitanteComponent}
 */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  /**
   * Representa el tipo de persona asociado.
   * 
   * @type {number}
   * @remarks
   * Este valor puede ser utilizado para determinar el tipo de persona
   * (por ejemplo, física o moral) en el contexto de la aplicación.
   */
  tipoPersona!: number;


  /**
   * Arreglo que contiene objetos de tipo FormularioDinamico.
   * Representa la información relacionada con una persona en el formulario dinámico.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Arreglo que contiene los formularios dinámicos relacionados con el domicilio fiscal.
   * Este arreglo se utiliza para almacenar y gestionar los datos del formulario
   * en el paso uno del trámite.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice que representa un número inicial o posición en un flujo o proceso.
   * Se utiliza para controlar el estado o paso actual en la lógica de la aplicación.
   */
  indice: number = 1;

  /**
   * Indica si la validación es exitosa o no.
   * 
   * @type {boolean}
   * @default false
   */
  validacion: boolean = false;

  /**
   * Propiedad de entrada que representa el número de pedimento.
   * Este valor es proporcionado desde el componente padre y se utiliza
   * para mostrar o procesar información relacionada con el pedimento.
   */
  @Input() datosNroPedimento!: string;
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
}
