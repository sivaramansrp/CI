import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { Subject } from 'rxjs';
import { ViewChild } from '@angular/core';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { AvisoComponent } from '../../components/aviso.component';

/**
 * Componente que representa el primer paso de un trámite.
 * Maneja la visualización y activación de diferentes secciones (tabs) según el tipo de endoso.
 */
@Component({
  selector: 'paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    AvisoComponent,
  ],
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
})
export class PasoUnoComponent implements OnDestroy {
  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  @ViewChild(AvisoComponent) avisoComponent!: AvisoComponent;

  /**
   * Constructor del componente.
   */
  constructor() {
    //Constructor del componente.
  }

  /**
   * Índice utilizado para identificar la pestaña activa dentro del paso.
   * @type {number}
   */
  indice: number = 1;

  solicitanteForm!: FormGroup;
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Determina si la pestaña de modificación de denominación o razón social debe estar habilitada.
   * @type {boolean}
   */
  isEnableModificacionTab: boolean = false;

  ngOnInit(): void {
    // this.solicitanteForm = this.fb.group({
    //   adace: [{ value: this.solicitudState?.adace || 'ADACE-01', disabled: this.esFormularioSoloLectura }]
    // });
    // this.consultaioQuery.selectConsultaioState$
    //   .pipe(
    //     takeUntil(this.destroyNotifier$),
    //     map((seccionState) => {
    //       this.consultaDatos = seccionState;
    //       this.esFormularioSoloLectura = this.consultaDatos.readonly;
    //       this.inicializarEstadoFormulario();
    //     })
    //   )
    //   .subscribe();
    // if (this.consultaDatos.update) {
    //   this.fetchGetDatosConsulta();
    // }
  }


  ngAfterViewInit(): void {

    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Cambia la pestaña activa según el índice proporcionado.
   * @param i - El índice de la pestaña que se desea activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Maneja el cambio de tipo de endoso y habilita o deshabilita la pestaña de modificación
   * dependiendo del valor seleccionado.
   *
   * @param evento - El tipo de endoso seleccionado (puede ser string o número).
   */
  tipoDeEndosoChanges(evento: string | number): void {
    if (evento === 3) {
      this.isEnableModificacionTab = true;
    } else {
      this.isEnableModificacionTab = false;
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
