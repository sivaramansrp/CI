import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { FormularioDinamico } from '@ng-mf/data-access-user';
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements AfterViewInit {

  /**
   * Referencia al componente `SolicitanteComponent` dentro de la vista.
   * 
   * Esta propiedad utiliza el decorador `@ViewChild` para obtener una instancia
   * del componente `SolicitanteComponent` que se encuentra en la plantilla del
   * componente actual. Permite interactuar directamente con los métodos y 
   * propiedades del componente hijo.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Representa el tipo de persona asociado.
   * 
   * @type {number}
   * @remarks
   * Este valor se utiliza para identificar si la persona es física o moral.
   * Los valores específicos deben ser definidos según los requisitos del sistema.
   */
  tipoPersona!: number;
  /**
   * Representa un arreglo de objetos de tipo FormularioDinamico.
   * 
   * @remarks
   * Este arreglo se utiliza para almacenar información dinámica relacionada con el formulario.
   */
  persona: FormularioDinamico[] = [];
  /**
   * Arreglo que almacena los datos del formulario dinámico relacionados con el domicilio fiscal.
   * 
   * Cada elemento del arreglo es una instancia de `FormularioDinamico`, que representa
   * un conjunto de campos dinámicos configurados para capturar información específica.
   */
  domicilioFiscal: FormularioDinamico[] = [];
  /**
   * Índice que representa el número actual o posición en un proceso o lista.
   * Se inicializa con el valor 1.
   */
  indice: number = 1;

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
   * 
   * En este método:
   * - Se inicializa la propiedad `persona` con los datos de una persona moral nacional.
   * - Se establece el domicilio fiscal correspondiente a una persona moral o física nacional.
   * - Se invoca el método `obtenerTipoPersona` del servicio `solicitante` para definir el tipo de persona como moral nacional.
   */
  ngAfterViewInit(): void {

    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Selecciona una pestaña específica estableciendo el índice correspondiente.
   *
   * @param i - El índice de la pestaña que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
