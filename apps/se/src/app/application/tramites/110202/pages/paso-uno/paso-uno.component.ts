import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AlertComponent, FormularioDinamico, PAGO_DE_DERECHOS, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { DestinatarioDeComponent } from '../../components/destinatario-de/destinatario-de.component';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    CertificadoOrigenComponent,
    DestinatarioDeComponent,
    AlertComponent,
    DatosCertificadoComponent
],
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

  /**
   * Clase CSS utilizada para mostrar alertas informativas.
   * Esta clase se aplica a los mensajes de información que se muestran en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Una constante que contiene el valor del objeto 'PAGO_DE_DERECHOS'.
   * Esta constante se usa para almacenar textos y valores relacionados con el pago de derechos.
   */
  TEXTOS = PAGO_DE_DERECHOS;

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
