import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'; 
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL, } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum'; 
import { FormularioDinamico, TIPO_PERSONA } from '@ng-mf/data-access-user';
 import { SharedModule, SolicitanteComponent, } from '@libs/shared/data-access-user/src'; 
 import { CommonModule } from '@angular/common'; 
 import { SolicitudComponent } from "../../components/Solicitud.component";
import { Router } from '@angular/router';

/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: true,
  imports: [SharedModule, CommonModule, SolicitanteComponent, SolicitudComponent],
})
export class PasoUnoComponent implements AfterViewInit{
  constructor(private router: Router) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  
    /**
   * Referencia al componente de solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Método que se ejecuta después de que las vistas del componente han sido inicializadas.
   * Configura los formularios dinámicos y obtiene el tipo de persona.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
