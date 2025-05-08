import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { SharedModule, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CertificadoDeOrigenComponent } from '../../components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { HistoricoProductoresComponent } from '../../components/historico-productores/historico-productores.component';
import { RegistroService } from '../../services/registro.service';

/**
 * Componente que representa el primer paso del trámite.
 * Se encarga de gestionar la información del solicitante,
 * el domicilio fiscal y otros datos asociados al certificado.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    SolicitanteComponent,
    CertificadoDeOrigenComponent,
    DatosCertificadoComponent,
    DestinatarioComponent,
    HistoricoProductoresComponent,
  ],
})
export class PasoUnoComponent implements OnInit, AfterViewInit {
  /**
   * Catálogo de entidades federativas obtenido desde el servicio de registros.
   */
  entidadFederativa!: {
    data: string;
    domicilioFiscal?: { entidadFederativa?: string };
  };

  /**
   * Tipo de persona (física o moral) seleccionada en el formulario.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico correspondiente a la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico correspondiente al domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual en el flujo del asistente.
   */
  indice: number = 1;

  /**
   * Referencia al componente hijo `SolicitanteComponent`,
   * usado para obtener y manipular información del solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Constructor del componente.
   * @param registro Servicio para obtener datos de catálogos, como entidades federativas.
   */
  constructor(private registro: RegistroService) {}

  /**
   * Ciclo de vida de Angular que se ejecuta una vez que el componente ha sido inicializado.
   * Carga el catálogo de entidades federativas desde el servicio.
   */
  ngOnInit(): void {
    this.registro.getCatalogoById(21).subscribe((resp) => {
      this.entidadFederativa = resp;

      const DATA = JSON.parse(this.entidadFederativa.data);
      this.entidadFederativa = DATA?.domicilioFiscal?.entidadFederativa;
    });
  }

  /**
   * Ciclo de vida de Angular que se ejecuta después de que las vistas hijas han sido inicializadas.
   * Configura los formularios dinámicos de persona y domicilio fiscal,
   * y obtiene el tipo de persona a través del componente solicitante.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Método que permite seleccionar una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
