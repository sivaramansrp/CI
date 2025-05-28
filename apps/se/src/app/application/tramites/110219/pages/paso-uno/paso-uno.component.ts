import { AfterViewInit, ChangeDetectorRef, Component,EventEmitter,Output, ViewChild} from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { CancelacionDeCertificadoComponent } from '../../components/cancelacion-de-certificado/cancelacion-de-certificado.component';
import { CertificadoDeOrigenComponent } from '../../components/certificado-de origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';

/**
 * Componente para gestionar el paso uno del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, CancelacionDeCertificadoComponent, CertificadoDeOrigenComponent],
})
export class PasoUnoComponent implements AfterViewInit {

  isNumeroDe! : boolean;

  isNumeroDePattern!:boolean;
  /**
   * Evento para emitir el índice de la pestaña seleccionada al componente padre.
   */
  @Output() miEvento: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Referencia al componente `SolicitanteComponent`.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario para la persona moral.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña seleccionada en la UI.
   */
  indice: number = 1;

  isDatos!:boolean;

  /**
   * Evento para emitir datos al componente padre.
   */
  @Output() eventoDatosHijo: EventEmitter<number> = new EventEmitter<number>();
  @Output() eventoNumeroDe: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() eventoNumeroDePattern : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() eventoDatosHijoCertificado: EventEmitter<number> = new EventEmitter<number>();
  @Output() isDatosNumero: EventEmitter<boolean> = new EventEmitter<boolean>(false);



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
   * Cambia la pestaña seleccionada en la UI.
   * 
   * @param i Índice de la pestaña a activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.miEvento.emit(this.indice);
  }

  /**
   * Emite un evento al componente padre con los datos proporcionados.
   * 
   * @param data Datos a emitir al componente padre.
   */
  emitirCancelacion(data: number): void {
    this.eventoDatosHijo.emit(data);
    this.indice = 3;
    this.seleccionaTab(this.indice);
  }

  isNumero(event:boolean){
     this.isNumeroDe = event;
     this.eventoNumeroDe.emit(this.isNumeroDe)
  }

  isNumeroPattern(event: boolean) {
    this.isNumeroDePattern = event;
    this.eventoNumeroDePattern.emit(this.isNumeroDePattern);
  }

   numeroData(data: number): void {
    this.eventoDatosHijoCertificado.emit(data);
    this.indice = 3;
    this.seleccionaTab(this.indice);
  }

  isNumeroData(data: boolean): void {
    this.isDatosNumero.emit(data);
  }
}