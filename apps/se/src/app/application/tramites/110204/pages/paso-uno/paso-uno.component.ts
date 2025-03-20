import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';  
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements AfterViewInit {

  // Decorador ViewChild para acceder a la instancia del componente SolicitanteComponent
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  // Variable que almacena el tipo de persona: física o moral
  tipoPersona!: number;

  // Arreglo que contiene los formularios dinámicos relacionados con la persona
  persona: FormularioDinamico[] = [];

  // Arreglo que contiene los formularios dinámicos relacionados con el domicilio fiscal
  domicilioFiscal: FormularioDinamico[] = [];

  // Índice para manejar la pestaña seleccionada
  indice: number = 1;

  constructor(private cdr: ChangeDetectorRef) {
    // Constructor no realiza ninguna acción en este caso
  }

  /**
   * Este método se ejecuta después de que la vista del componente ha sido inicializada.
   * Inicializa los arreglos `persona` y `domicilioFiscal` con constantes predefinidas.
   * Además, llama a `obtenerTipoPersona` para establecer el tipo de persona y activa la detección de cambios.
   */
  ngAfterViewInit(): void {
    // Inicializa los arreglos `persona` y `domicilioFiscal` con datos predefinidos
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;

    // Llama al método para obtener el tipo de persona (en este caso, una persona moral nacional)
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);

    // Detecta los cambios realizados en la vista después de la inicialización
    this.cdr.detectChanges();
  }

  /**
   * Este método permite que el usuario seleccione una pestaña cambiando el valor de `indice`.
   * 
   * @param indice El índice de la pestaña seleccionada.
   */
  seleccionaTab(indice: number): void {
    // Establece el índice de la pestaña seleccionada
    this.indice = indice;
  }

}
