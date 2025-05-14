
import { AVISO } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query';
import { DatosProcedureState } from '../../../../estados/tramites/tramites261103.store';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261103.store';
import { DatosestablecimientoComponent } from '../datos-establecimiento/datos-establecimiento.component';
import { DomicilioEstablecimientosComponent } from '../domicilio-establecimientos/domicilio-establecimientos.component';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { ManifiestosComponent } from '../manifiestos/manifiestos.component';
import { MercanciasComponent } from '../mercancias/mercancias.component';
import { ModificacionPermisoImportacionMedicamentosService } from '../../services/modificacion-permiso-importacion-medicamentos.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteLegalComponent } from '../representantelegal/representante-legal.component';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';




@Component({
  selector: 'app-modificacion-permiso-importacion-medicamentos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatosestablecimientoComponent,
    DomicilioEstablecimientosComponent, MercanciasComponent, ManifiestosComponent,
    RepresentanteLegalComponent, InputRadioComponent, TituloComponent, AlertComponent],
  templateUrl: './modificacion-permiso-importacion-medicamentos.html',
  styleUrl: './modificacion-permiso-importacion-medicamentos.scss',
})
export class ModificacionPermisoImportacionMedicamentosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para datos preoperativos.
   */
  preOperativeForm!: FormGroup;
  /** Subject para notificar la destrucción del componente */
  private destroy$ = new Subject<void>();

    /**
   * Opciones del componente de radio input.
   * @public
   */
    public radioOptions: { label: string; value: string }[] = [
      { label: 'Prorroga', value: 'Prorroga' },
      { label: 'Modificacion', value: 'Modificacion' },
    ];
  /**
   * Clase de alerta informativa.
   */
  infoAlert = 'alert-info';

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = AVISO.Aviso;
/**
 * Estado de la sección que contiene los datos del procedimiento.
 * 
 * Esta propiedad almacena el estado actual de los datos relacionados con el procedimiento.
 * Se inicializa a través de un observable en el método `obtenerDatosFormulario`, 
 * que suscribe a los cambios en el estado y actualiza esta propiedad con los datos más recientes.
 * 
 * Tipo: `DatosProcedureState`
 * 
 * @private
 */
  private seccionState!: DatosProcedureState;
  /**
 * Constructor de la clase `DatosSolicitudComponent`.
 * 
 * Este constructor inicializa las dependencias necesarias para el funcionamiento del componente.
 * 
 * @param fb - Servicio `FormBuilder` utilizado para crear formularios reactivos.
 * @param store - Almacén de estado `DatosProcedureStore` para gestionar el estado de los datos del procedimiento.
 * @param query - Consulta `DatosProcedureQuery` para obtener datos del estado de los procedimientos.
 */
  constructor(private fb: FormBuilder,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery) {
    // Constructor del componente
  }
  /**
 * Gancho de ciclo de vida `ngOnInit`.
 * 
 * Este método se ejecuta automáticamente cuando el componente es inicializado por Angular.
 * Su propósito es realizar configuraciones iniciales necesarias para el correcto funcionamiento del componente.
 * 
 * En este caso, se realizan las siguientes acciones:
 * 
 * 1. `obtenerDatosFormulario()`: 
 *    - Método que suscribe a un observable para obtener los datos del estado del procedimiento.
 *    - Actualiza la propiedad `seccionState` con los datos más recientes.
 * 
 * 2. `crearFormulario()`: 
 *    - Método que inicializa el formulario reactivo `preOperativeForm` con los valores obtenidos del estado.
 *    - Define las validaciones necesarias para los campos del formulario.
 * 
 * @returns void
 */
  ngOnInit(): void {
    this.obtenerDatosFormulario();
    this.crearFormulario();
  }

  /**
* Gancho de ciclo de vida OnDestroy
*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
    * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
    * @param form - El formulario reactivo.
    * @param campo - El nombre del campo en el formulario.
    */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.store.establecerDatos({ [campo]: VALOR });
  }
  /**
 * Método para inicializar el formulario reactivo `preOperativeForm`.
 * Este formulario contiene los campos necesarios para capturar los datos preoperativos.
 * 
 * Campos del formulario:
 * - `ideGenerica1`: Campo opcional que se inicializa con el valor de `ideGenerica1` 
 *   del estado `seccionState`.
 * - `observaciones`: Campo obligatorio que se inicializa con el valor de `observaciones` 
 *   del estado `seccionState` y tiene una validación de requerido.
 * 
 * @returns void
 */
  crearFormulario(): void {
    this.preOperativeForm = this.fb.group({
      ideGenerica1: [this.seccionState?.ideGenerica1],
      observaciones: [this.seccionState?.observaciones, [Validators.required]],
    });
  }
  /**
   * Validar campo del formulario
   * @param field Nombre del campo
   * @returns Booleano que indica si el campo es válido
   */
  isValid(field: string): boolean {
    return Boolean(ModificacionPermisoImportacionMedicamentosService.isValid(this.preOperativeForm, field));
  }
  /**
* Gancho de ciclo de vida obtenerDatosFormulario
*/
  obtenerDatosFormulario(): void {
    this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: DatosProcedureState) => {
        this.seccionState = data;
      });
  }
}
