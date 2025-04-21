import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query';
import { DatosProcedureState } from '../../../../estados/tramites/tramites261103.store';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261103.store';
import { Domicilio } from '../../modelos/domicilio-establecimientos.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ModificacionPermisoImportacionMedicamentosService } from '../../services/modificacion-permiso-importacion-medicamentos.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TituloComponent],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit, OnDestroy {
  /**
 * Formulario reactivo para datos preoperativos.
 */
  domicilioEstablecimiento!: FormGroup;
  /**
* Formulario reactivo para datos preoperativos.
*/
  AvisodeFuncionamiento!: FormGroup;
  /** Enum para el tipo de selección de tabla */
  public TablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /** Array para almacenar la respuesta de permisos cancelar */
  Domicilios: Domicilio[] = [];

  /** Subject para notificar la destrucción del componente */
  private destroy$ = new Subject<void>();
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
   * Constructor para SolicitanteComponent.
   * 
   * @param fb - Una instancia de FormBuilder utilizada para crear y gestionar formularios.
   */
  constructor(private fb: FormBuilder,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery,
  ) {
    // Constructor del componente
  }

  /**
   * Gancho de ciclo de vida que se llama después de que se inicializan las propiedades enlazadas a datos de una directiva.
   * Inicializa el componente configurando los valores del formulario.
   * 
   */
  ngOnInit(): void {
    this.obtenerDatosFormulario();
    this.establecerdomicilioEstablecimiento();

  }

  /**
 * Inicializa el domicilioEstablecimiento con un conjunto de controles de formulario.
 * Cada control se inicializa con un valor de cadena vacío y está deshabilitado.
 * Los controles del formulario incluyen:
 */
  public establecerdomicilioEstablecimiento(): void {
    this.domicilioEstablecimiento = this.fb.group({
      representanteLegalRFC: [{ value: this.seccionState?.representanteLegalRFC,disabled:false},[Validators.required]],
      buscar: [{ value: this.seccionState?.buscar,disabled:false },[Validators.required]],
      representanteLegalNombre: [{ value: this.seccionState?.representanteLegalNombre,disabled:false },[Validators.required]],
      representanteLegalApPaterno: [{ value: this.seccionState?.representanteLegalApPaterno ,disabled:false},[Validators.required]],
      representanteLegalApMaterno: [{ value: this.seccionState?.representanteLegalApMaterno,disabled:false },[Validators.required]],
    });
  }

   /**
     * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
     * @param form - El formulario reactivo.
     * @param campo - El representanteLegalNombre del campo en el formulario.
     */
   setValoresStore(form: FormGroup, campo: string) :void{
    const VALOR = form.get(campo)?.value;
    this.store.establecerDatos({ [campo]: VALOR });
  }

    /**
* Gancho de ciclo de vida OnDestroy
*/
ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
  /**
   * Validar campo del formulario
   * @param field representanteLegalNombre del campo
   * @returns Booleano que indica si el campo es válido
   */
  isValid(field: string): boolean {
    return Boolean(ModificacionPermisoImportacionMedicamentosService.isValid(this.domicilioEstablecimiento, field));
  }
    /**
* Gancho de ciclo de vida obtenerDatosFormulario
*/
obtenerDatosFormulario():void{
  this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
  .subscribe((data:DatosProcedureState) => {
    this.seccionState = data;
  });
}
}

