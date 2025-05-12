import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject,distinctUntilChanged, take, takeUntil } from 'rxjs';
import { AlertComponent } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosAdicionalesQuery } from '../../estados/queries/datos-adicionales110101.query';
import { DatosAdicionalesStore } from '../../estados/tramites/datos-adicionales110101.store';
import { PROTESTA } from '@ng-mf/data-access-user';
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
    * Una constante que contiene el valor del objeto 'PROTESTA'.
    * Se utiliza para almacenar datos adicionales relacionados con el componente.
    */

  TEXTOS = PROTESTA;
  /**
   * constructor de la clase
   * Fetch the fetchtiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(private fb: FormBuilder,
    private datosAdicionalesStore: DatosAdicionalesStore,
    private datosAdicionalesQuery: DatosAdicionalesQuery
    
  ) {
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * @returns {void}
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.getEntidadFederativa();
    this.getRepresentacionFederal();
    this.obtenerDatosFormularioDesdeStore();
    this.formulario.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.actualizarStore());
  }
  /**
   * Crea el formulario con los campos necesarios y sus validaciones.
   * @returns {void}
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      entidad: ['', Validators.required],
      representacion: ['', Validators.required],
    });
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
   * **Obtiene los valores del formulario desde el estado de la tienda**
   *
   * - Se suscribe a `formValues$` del `datosAdicionalesQuery` para recibir los valores actuales del formulario.
   * - Cuando hay valores disponibles, actualiza el formulario sin disparar eventos (`emitEvent: false`).
   * - La suscripción se gestiona con `takeUntil(this.destroy$)` para evitar fugas de memoria.
   *
   * @private
   */
  private obtenerDatosFormularioDesdeStore(): void {
    this.datosAdicionalesQuery.formValues$
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValues) => {
        if (formValues) {
          this.formulario.patchValue(formValues, { emitEvent: false });
        }
      });
  }


  /**
   * **Actualiza el estado del store con los valores actuales del formulario**
   * 
   * - Obtiene los valores actuales del formulario `formulario`.
   * - Se suscribe a `formValues$` de `datosAdicionalesQuery` para obtener los valores almacenados en el estado.
   * - Utiliza `take(1)` para tomar solo un valor y evitar suscripciones innecesarias.
   * - Se asegura de finalizar la suscripción cuando el componente es destruido con `takeUntil(this.destroy$)`, evitando fugas de memoria.
   * - Compara los valores actuales del formulario con los almacenados en el estado para evitar actualizaciones innecesarias.
   * - Si los valores son diferentes, actualiza el store con los nuevos valores mediante `actualizarValoresFormulario()`.
   */
  private actualizarStore(): void {
    const NEWVALUES = this.formulario.value; // Obtiene los valores actuales del formulario

    this.datosAdicionalesQuery.formValues$
      .pipe(takeUntil(this.destroy$), take(1)) // Se asegura de limpiar la suscripción si el componente es destruido
      .subscribe((currentValues) => {
        if (JSON.stringify(currentValues) !== JSON.stringify(NEWVALUES)) { // Compara los valores actuales con los almacenados
          this.datosAdicionalesStore.actualizarValoresFormulario(NEWVALUES); // Actualiza el store si los valores son diferentes
        }
      });
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
