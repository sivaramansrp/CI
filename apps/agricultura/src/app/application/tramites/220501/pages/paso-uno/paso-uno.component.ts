import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';

/**
 * Componente para gestionar el paso uno del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: false,
})
export class PasoUnoComponent implements AfterViewInit {
  /** 
   * Referencia al componente SolicitanteComponent 
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /** 
   * Configuración del formulario para la persona moral 
   */
  persona: FormularioDinamico[] = [];

  /** 
   * Configuración del formulario para el domicilio fiscal 
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
  * Índice de la pestaña seleccionada.
  */
  indice: number = 1;

  /**
   * Constructor del componente.
   * Se utiliza para la inyección de dependencias.
   * 
   * @param cdr Servicio para detectar cambios manualmente.
   */
  constructor(private cdr: ChangeDetectorRef) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
   * Configura los datos de persona y domicilio fiscal y asigna el tipo de persona en el componente `SolicitanteComponent`.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;

    setTimeout(() => {
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
      this.cdr.detectChanges();
    }, 0);
  }

  /**
   * Método para seleccionar una pestaña.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

}