import { AlertComponent, ConsultaioQuery } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitante110101State, Tramite110101Store } from '../../estados/tramites/solicitante110101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { PROTESTA } from '@ng-mf/data-access-user';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { TituloComponent } from '@ng-mf/data-access-user';
/**
* Este componente se utiliza para mostrar la forma del datos adicionales. - 110101
*/
@Component({
  selector: 'app-datos-adicionales',
  templateUrl: './datos-adicionales.component.html',
  styleUrl: './datos-adicionales.component.scss',
  standalone: true,
  imports: [TituloComponent,
    CommonModule,
    AlertComponent,    
    CatalogoSelectComponent,
    ReactiveFormsModule]
})
export class DatosAdicionalesComponent implements OnInit, OnDestroy {

  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea del tipo 'FormGroup'.
   *
   * @property {FormGroup} formulario - El formulario del componente.
   */
  public formulario!: FormGroup;

  /**
 * **Subject para manejar la destrucción de suscripciones**
 *
 * - Se utiliza para cancelar las suscripciones activas cuando el componente o servicio es destruido.
 * - Evita fugas de memoria al asegurarse de que las suscripciones se cancelen correctamente.
 * - Se emite un valor en `ngOnDestroy` y luego se completa.
 *
 * @private
 */
  private destroy$ = new Subject<void>();

  /**
   * Representa la entidad seleccionada del catálogo.
   * Se espera que esta propiedad sea del tipo 'CatalogosSelect'.
   *
   * @property {CatalogosSelect} entidad - La entidad seleccionada.
   */
  public entidad!: Catalogo[];

  /**
   * Representa la representación seleccionada del catálogo.
   * Se espera que esta propiedad sea del tipo 'CatalogosSelect'.
   *
   * @property {CatalogosSelect} representacion - La representación seleccionada.
   */

  public representacion!: Catalogo[];
  /**
    * Una cadena que representa la clase CSS para una alerta de información.
    * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
    */
  public infoAlert = 'alert-info';
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;
  /**
    * Una constante que contiene el valor del objeto 'PROTESTA'.
    * Se utiliza para almacenar datos adicionales relacionados con el componente.
    */

  TEXTOS = PROTESTA;
  public solicitudeState!: Solicitante110101State;
  /**
   * constructor de la clase
   * Fetch the fetchtiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(private fb: FormBuilder,
    private tramite110101Store: Tramite110101Store,
    private solicitanteQuery: Solicitante110101Query,
    private consultaioQuery: ConsultaioQuery,
    
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.crearFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * @returns {void}
   */
  ngOnInit(): void {
    this.solicitanteQuery.selectSolicitante$.pipe(takeUntil(this.destroy$),map((seccionState) => {
        this.solicitudeState = seccionState;
    })).subscribe();
    this.crearFormulario();
    this.getEntidadFederativa();
    this.getRepresentacionFederal();
  }
  /**
   * Crea el formulario con los campos necesarios y sus validaciones.
   * @returns {void}
   */
  crearFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  public inicializarFormulario(): void {
    this.formulario = this.fb.group({
      entidad: [this.solicitudeState.entidad, Validators.required],
      representacion: [this.solicitudeState.representacion, Validators.required],
    });
  }

    /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  public guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formulario.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formulario.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
}

  /**
   * Recupera y establece la información de la entidad federativa.
   * El objeto de entidad incluye el nombre de la etiqueta, el estado requerido, la opción predeterminada,
   * y un catálogo de opciones disponibles.
   *
   * @returns {void}
   */
  public getEntidadFederativa(): void {
    this.entidad = [
      {
        id: 1,
        descripcion: 'SINALOA',
      },
      {
        id: 2,
        descripcion: 'Opción 1',
      }
    ]
  }

  /**
   * Recupera y establece la información de la entidad federativa.
   * El objeto de entidad incluye el nombre de la etiqueta, el estado requerido, la opción predeterminada,
   * y un catálogo de opciones disponibles.
   *
   * @returns {void}
   */
  public getRepresentacionFederal(): void {
    this.representacion = [
      {
        id: 1,
        descripcion: 'CULIACAN',
      },
      {
        id: 2,
        descripcion: 'Opción 1',
      }
    ]
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110101Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110101Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }



  /**
   * **Ciclo de vida: Destruye las suscripciones y limpia recursos**
   * 
   * - `this.destroy$.next();` emite un valor para notificar a las suscripciones activas que deben finalizar.
   * - `this.destroy$.complete();` marca el `Subject` como completado, asegurando que no se emitan más valores en el futuro.
   * - Esto previene fugas de memoria al garantizar que las suscripciones dependientes de `takeUntil(this.destroy$)` se cancelen correctamente.
   */
  ngOnDestroy(): void {
    this.destroy$.next(); // Notifica a las suscripciones activas que deben finalizar
    this.destroy$.complete(); // Completa el Subject para evitar futuras emisiones
  }

}
