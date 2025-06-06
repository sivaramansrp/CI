import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, TIPO_PERSONA } from '@ng-mf/data-access-user';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_MORAL_NACIONAL,
} from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import {
  SharedModule,
  SolicitanteComponent,
} from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { CertificadoDeOrigenComponent } from '../../components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { RegistroService } from '../../services/registro.service';

/**
 * Componente que representa el primer paso del trámite.
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
  ],
})
export class PasoUnoComponent implements AfterViewInit, OnInit,OnDestroy {
  /**
   * Catálogo de entidades federativas.
   */
  entidadFederativa!: any;
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
     * Estado de la consulta obtenido desde el store.
     * 
     */
  public consultaState!: ConsultaioState;
  /**
   * Indica si existen datos de respuesta del servidor para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;
  /**
   * Notificador para destruir observables al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
   * Constructor del componente.
   * @param registro Servicio para obtener datos de catálogos.
   */
  constructor(private registro: RegistroService, private consultaQuery: ConsultaioQuery,) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el catálogo de entidades federativas y lo procesa.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormularios();
    } else {
      this.esDatosRespuesta = true;
    }

    this.registro.getCatalogoById(21).subscribe((resp) => {
      this.entidadFederativa = resp;
      const DATA = JSON.parse(this.entidadFederativa.data);
      this.entidadFederativa = DATA?.domicilioFiscal?.entidadFederativa;

    });
  }
  guardarDatosFormularios(): void {
    this.registro
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.registro.actualizarEstadoFormulario(resp);
        }
      });
  }

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

    /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
