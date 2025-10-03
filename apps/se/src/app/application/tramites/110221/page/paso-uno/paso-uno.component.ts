import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { HistoricoDeProductoresComponent } from '../../components/historico-de-productores/historico-de-productores.component';
import { Tramite110221Store } from '../../estados/tramite110221.store';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @property {number} indice - El índice de la pestaña seleccionada.
   */
  indice: number = 1;
  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * @property solicitante - Referencia al componente `SolicitanteComponent` que se utiliza para manejar
   *                          la lógica y los datos relacionados con el solicitante en este paso del trámite.
   * @command Este decorador `@ViewChild` permite acceder al componente hijo para interactuar con sus métodos y propiedades.
   */
  @ViewChild('solicitanteRef') solicitante!: SolicitanteComponent;

  /**
   * @property certificadoDeOrigen - Referencia al componente `CertificadoDeOrigenComponent` para manejar la lógica y datos del certificado de origen.
   */
  @ViewChild('certificadoDeOrigenRef') certificadoDeOrigen!: CertificadoOrigenComponent;

  /**
   * @property historicoDeProductores - Referencia al componente `HistoricoDeProductoresComponent` para manejar la lógica y datos históricos de productores.
   */
  @ViewChild('historicoDeProductoresRef') historicoDeProductores!: HistoricoDeProductoresComponent;

  /**
   * @property destinatario - Referencia al componente `DestinatarioComponent` para manejar la lógica y datos del destinatario.
   */
  @ViewChild('destinatarioRef') destinatario!: DestinatarioComponent;

  /**
   * @property datosCertificado - Referencia al componente `DatosCertificadoComponent` para manejar la lógica y datos del certificado.
   */
  @ViewChild('datosCertificadoRef') datosCertificado!: DatosCertificadoComponent;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private consultaQuery: ConsultaioQuery,
    private validarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService,
    private store: Tramite110221Store

  ) { }

  /**
   * @inheritdoc
   * 
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable del estado de consulta, actualiza el estado local y 
   * realiza acciones según si hay una actualización pendiente.
   * 
   * @remarks
   * - Si existe un estado de consulta y requiere actualización, guarda los datos del formulario.
   * - Si no, establece la bandera de datos de respuesta como verdadera.
   * 
   * @override
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
    if (this.consultaState && this.consultaState.procedureId === '110221' &&
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }

  }
  /**
* Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
* Luego reinicializa el formulario con los valores actualizados desde el store.
*/
  guardarDatosFormulario(): void {
    this.validarInicialmenteCertificadoService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.store.actualizarEstado(resp);
        }
      });
  }
  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Utiliza el Subject `destroyNotifier$` para notificar la destrucción y completar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña y actualiza el índice.
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  validarFormularios(): boolean {
    let isValid = true;

    if (this.solicitante?.form) {
      if (this.solicitante.form.invalid) {
        this.solicitante.form.markAllAsTouched();
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.certificadoDeOrigen) {
      if (!this.certificadoDeOrigen.validarFormulario()) {
        isValid = false;
      } 
    } else {
      isValid = false;

    }

    if (this.destinatario) {
      if (!this.destinatario.validatorCheck()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.datosCertificado) {
      if (!this.datosCertificado.validarFormulario()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }
    return isValid;
  }
}