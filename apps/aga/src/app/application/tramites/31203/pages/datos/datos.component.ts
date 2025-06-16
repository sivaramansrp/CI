import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, FormularioDinamico, PERSONA_MORAL_NACIONAL, SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { AvisoUnicoService } from '../../services/aviso-unico.service';

/**
 * @component DatosComponent
 * @description
 * Componente que representa la página de datos. Permite seleccionar y almacenar el índice del subtítulo.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy, AfterViewInit {  


  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false; // Indica si hay datos de respuesta del servidor

  private destroyNotifier$: Subject<void> = new Subject(); // Subject para manejar la destrucción de suscripciones
  public consultaState!: ConsultaioState; // Estado de la consulta

  constructor(
    private service:AvisoUnicoService, // Servicio para manejar la solicitud
    private consultaQuery: ConsultaioQuery // Servicio para consultar el estado
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

   /**
   * Referencia al componente de solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent; // Referencia al componente hijo Solicitante

    /**
    * Observable para manejar la destrucción del componente.
    * Se utiliza para cancelar suscripciones activas.
    */
  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Tipo de persona.
   */
  tipoPersona!: number; // Variable para almacenar el tipo de persona

  /**
   * Datos del formulario dinámico de la persona.
   */
  persona: FormularioDinamico[] = []; // Datos del formulario de persona

  /**
   * Datos del formulario dinámico del domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = []; // Datos del formulario de domicilio fiscal

  /**
   * Almacena el índice del subtítulo seleccionado.
   * @type {number}
   */
  indice: number = 1;

    ngOnInit(): void {
    // Se ejecuta al inicializar el componente
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyed$), // Se desuscribe al destruir el componente
      map((seccionState) => {
        this.consultaState = seccionState; // Asigna el estado de la consulta
      })
    ).subscribe();
    if (this.consultaState?.update) {
      this.guardarDatosFormulario(); // Si está en modo actualización, guarda los datos del formulario
    } else {
      this.esDatosRespuesta = true; // Si no, activa el modo de datos de respuesta
    }
  }
  
    guardarDatosFormulario(): void {
    // Método para guardar los datos del formulario
    this.service
      .getDatosDeTrtamitelDoc().pipe(
        takeUntil(this.destroyNotifier$) // Se desuscribe al destruir el componente
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true; // Marca que hay datos de respuesta
          this.service.actualizarEstadoFormulario(resp); // Actualiza el estado del formulario con la respuesta
        }
      });
  }

    /**
   * Método que se ejecuta después de que la vista ha sido inicializada.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL; // Asigna los datos de persona moral nacional
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL; // Asigna los datos de domicilio fiscal
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL); // Llama al método para obtener el tipo de persona en el componente hijo
  }
  /**
   * Establece el índice del subtítulo.
   * @param {number} i - Nuevo índice a establecer.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }


  
  ngOnDestroy(): void {
    // Se ejecuta al destruir el componente
    this.destroyNotifier$.next(); // Emite el evento de destrucción
    this.destroyNotifier$.complete(); // Completa el subject para limpiar suscripciones
  }
}