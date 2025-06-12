import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';  
import { ConsultaioQuery, FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { Subject, takeUntil } from 'rxjs';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [
    SolicitanteComponent,
    CertificadoOrigenComponent,
    DatosCertificadoComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class PasoUnoComponent implements OnInit, AfterViewInit, OnDestroy {

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
   * @descripcion
   * Subject utilizado para notificar y completar las suscripciones activas al destruir el componente,
   * evitando fugas de memoria.
   * Se utiliza junto con el operador `takeUntil`.
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * @descripcion
   * Indica si el formulario debe estar deshabilitado (solo lectura).
   * Cuando es verdadero, los controles del formulario estarán deshabilitados y no se podrán editar.
   */
  formularioDeshabilitado: boolean = false;

  constructor(private cdr: ChangeDetectorRef,private certificadosOrigenGridService: CertificadosOrigenGridService, private consultaQuery: ConsultaioQuery) {
    // Constructor no realiza ninguna acción en este caso
  }

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Realiza la suscripción al estado de consulta para habilitar o deshabilitar el formulario según corresponda.
   */
  ngOnInit(): void {

    this.consultaQuery.selectConsultaioState$
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((seccionState) => {
      if(seccionState.update){
        this.formularioDeshabilitado = false;
              this.guardarDatosFormulario();
      }
      if (seccionState.readonly) {
        this.formularioDeshabilitado = true;
      }
    });
  }

  /**
   * @descripcion
   * Obtiene los datos de acuicultura y actualiza el estado del formulario.
   * 
   * @remarks
   * Realiza una suscripción al observable que retorna los datos de acuicultura.
   * Utiliza `takeUntil` para evitar fugas de memoria al destruir el componente.
   * Si la respuesta es válida, actualiza el estado del formulario con los datos recibidos.
   */
  guardarDatosFormulario(): void {
    this.certificadosOrigenGridService
      .getAcuiculturaData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.certificadosOrigenGridService.actualizarEstadoFormulario(resp);
        }
      });
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

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela suscripciones activas mediante `destroyNotifier$`.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
