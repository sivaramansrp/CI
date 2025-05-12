import { AfterViewInit, EventEmitter, Output } from '@angular/core';
import { FormularioDinamico, SolicitanteComponent } from '@ng-mf/data-access-user';
import { AltaPlantaComponent } from "../../components/alta-planta/alta-planta.component";
import { BitacoraComponent } from "../../components/bitacora/bitacora.component";
import { CommonModule } from '@angular/common';
import { ComplementariaImmexComponent } from "../../components/complementaria-immex/complementaria-immex.component";
import { Component } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { Input } from '@angular/core';
import { ModificacionComponent } from '../../components/modificacion/modificacion.component';
import { PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { ViewChild } from '@angular/core';

@Component({

  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [SolicitanteComponent, CommonModule, ModificacionComponent, AltaPlantaComponent, BitacoraComponent, ComplementariaImmexComponent]
})
export class PasoUnoComponent implements AfterViewInit {
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
}
