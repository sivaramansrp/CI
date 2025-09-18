import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, FormularioDinamico, PERSONA_MORAL_NACIONAL, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CertificadoDeOrigenComponent } from '../certificado-de-origen/certificado-de-origen.component';
import { DomicilioTablaService } from '../../services/domicilio-tabla/domicilioTabla.service';
import { DuplicadoDeCertificadoComponent } from '../duplicado-de-certificado/duplicado-de-certificado.component';

/**
 * @descripcion
 * El componente `PasoUnoComponent` es responsable de gestionar la lógica y la interfaz
 * de usuario para el primer paso del trámite 110210.
 *
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrl ./paso-uno.component.scss
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
 * Indica si se ha recibido una respuesta con datos.
 * Se utiliza para mostrar u ocultar información en la interfaz según el estado de la respuesta.
 */
  public esDatosRespuesta: boolean = false;
  /**
 * Estado actual de la consulta, obtenido desde el store.
 * Almacena la información relevante para el paso del solicitante.
 */
public consultaState!: ConsultaioState;
  /**
   * Referencia al componente `SolicitanteComponent` dentro de la vista.
   * @type {SolicitanteComponent}
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   * @type {number}
   */
  tipoPersona!: number;

  /**
   * Configuración dinámica para los datos de la persona.
   * @type {FormularioDinamico[]}
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración dinámica para el domicilio fiscal.
   * @type {FormularioDinamico[]}
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña seleccionada.
   * @type {number}
   */
  indice: number = 1;

  certificadoTabEnabled = false;
   /**
 * Subject utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria
 * cuando el componente se destruye.
 */
private destroyed$ = new Subject<void>();
  /**
   * @property {SolicitanteComponent} Solicitante
   * @description
   * Referencia al componente hijo `SolicitanteComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del solicitante.
   */
  @ViewChild('Solicitante') Solicitante!: SolicitanteComponent;

  /**
   * @property {DuplicadoDeCertificadoComponent} Duplicado
   * @description
   * Referencia al componente hijo `DuplicadoDeCertificadoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario de duplicado de certificado.
   */
  @ViewChild('Duplicado') Duplicado!: DuplicadoDeCertificadoComponent;

  /**
   * @property {CertificadoDeOrigenComponent} certificado
   * @description
   * Referencia al componente hijo `CertificadoDeOrigenComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario de certificado de origen.
   */
  @ViewChild('certificado') certificado!: CertificadoDeOrigenComponent;

  /**
 * Constructor del componente.
 * Inyecta los servicios necesarios para la gestión de licitaciones y la consulta del estado.
 */
constructor(
  private service: DomicilioTablaService,
  private consultaQuery: ConsultaioQuery
) {
  // constructor
}

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de que la vista del componente ha sido inicializada.
   * Configura los datos iniciales para la persona y el domicilio fiscal.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
     if (this.solicitante?.obtenerTipoPersona) {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }
  }
 /**
 * Método del ciclo de vida que se ejecuta al inicializar el componente.
 *
 * Se suscribe al observable `selectConsultaioState$` para obtener el estado actual de la consulta
 * y lo asigna a la propiedad `consultaState`. Dependiendo del valor de `update` en el estado,
 * decide si debe llamar a `guardarDatosFormulario()` para obtener y actualizar los datos,
 * o simplemente mostrar la información existente.
 */
  ngOnInit(): void {
  this.consultaQuery.selectConsultaioState$.pipe(
    takeUntil(this.destroyed$),
    map((seccionState) => {
      this.consultaState = seccionState;
      
      if(this.consultaState.update) {
        this.guardarDatosFormulario();
      } else {
        this.esDatosRespuesta = true;
      }
    })
  ).subscribe();
}
  
  /**
 * Método del ciclo de vida que se ejecuta al destruir el componente.
 *
 * Emite y completa el subject `destroyed$` para cancelar todas las suscripciones activas,
 * evitando fugas de memoria.
 */
  ngOnDestroy(): void {
  this.destroyed$.next();
  this.destroyed$.complete();
}
  /**
   * @descripcion
   * Cambia el índice de la pestaña seleccionada.
   * @param {number} i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
   * Habilita la pestaña de certificado estableciendo la variable `certificadoTabEnabled` en `true`.
   *
   */
  enableCertificadoTab() :void{
  this.certificadoTabEnabled = true;
}
/**
 * Obtiene los datos vigentes de licitaciones mediante el servicio y actualiza el estado del formulario.
 *
 * Se suscribe al observable que retorna el servicio `getLicitationesVigentesData()`. Si la respuesta es válida,
 * actualiza la bandera `esDatosRespuesta` y llama al método del servicio para actualizar el estado del formulario.
 */
   guardarDatosFormulario(): void {
    this.service.getDatosStore().pipe(
        takeUntil(this.destroyed$)).subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.service.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * @method validarFormularios
   * @description
   * Valida todos los formularios de los componentes hijos en el orden siguiente:
   * - Solicitante
   * - Duplicado de certificado
   * 
   * Para cada componente, verifica si está disponible y si su formulario es válido.
   * Si algún formulario es inválido, marca sus controles como "tocados" para mostrar los errores de validación.
   * Si algún componente no está disponible o su formulario es inválido, establece `isValid` a `false`.
   * 
   * @returns {boolean} `true` si todos los formularios son válidos, `false` si alguno no lo es o si falta algún componente.
   */
  public validarFormularios(): boolean {
    let isValid = true;

    if (this.solicitante?.form) {
      if (this.solicitante.form.invalid) {
        this.solicitante.form.markAllAsTouched();
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.Duplicado) {
      if (!this.Duplicado.validarFormulario()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    return isValid;
  }
}