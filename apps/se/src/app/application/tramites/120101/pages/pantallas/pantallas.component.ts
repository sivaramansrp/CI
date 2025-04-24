import {
  AVISO,
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { CUPOS_PASOS } from '../../constantes/solicitud-de-registro-tpl.enum';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent {
  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = AVISO.Aviso;
  /**
   * Lista de pasos del wizard.
   * @type {ListaPasosWizard[]}
   */
  public pantallasPasos: ListaPasosWizard[] = CUPOS_PASOS;

  /**
   * Índice del paso actual.
   * @type {number}
   * @default 1
   */
  public indice: number = 1;

  /**
   * Datos utilizados para el control del wizard.
   * @type {DatosPasos}
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;

  public esFormaValido: boolean = false;

  private cdr = inject(ChangeDetectorRef);

  constructor(
    private servicioDeFormularioService: ServicioDeFormularioService
  ) {
    //
  }

  verificarLaValidezDelFormulario(): boolean {
    return (
      (this.servicioDeFormularioService.isFormValid('bienFinalForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('consultarCupoForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('representacionFederal') ??
        false)
    );
  }

  /**
   * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
   * @returns {void}
   */
  public getValorIndice(e: AccionBoton): void {
    setTimeout(() => {

    this.esFormaValido = this.verificarLaValidezDelFormulario();
    console.log('esFormaValido', this.esFormaValido)
    if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
        if (e.accion === 'cont') {
          if (this.esFormaValido) {
            this.indice = e.valor;
            this.datosPasos.indice = e.valor;
            this.wizardComponent.siguiente();
          }
        } else if (e.accion === 'ant'){
          this.indice = e.valor;
          this.datosPasos.indice = e.valor;
          this.wizardComponent.atras();
        }
    }
    this.cdr.detectChanges();
  }, 500);
  }
}
