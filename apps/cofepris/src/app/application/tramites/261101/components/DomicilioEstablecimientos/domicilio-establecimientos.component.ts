import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosProcedureQuery } from '../../estados/datos-solicitude.query';
import { DatosProcedureState } from '../../estados/datos-solicitude.store';
import { DatosProcedureStore } from '../../estados/datos-solicitude.store';
import { DatosSolicitudService } from '../../../261101/services/dato-solicitude.service'
import { Domicilio } from '../../modelos/domicilio-establecimientos.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src'
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-domicilio-establecimientos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './domicilio-establecimientos.component.html',
  styleUrl: './domicilio-establecimientos.component.css',
})
export class DomicilioEstablecimientosComponent implements OnInit,OnDestroy {
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
  /** Configuración para las columnas de la tabla */
  configuracionTabla: ConfiguracionColumna<Domicilio>[] = [
    { encabezado: 'Clave S.C.I.A.Ν.', clave: (item: Domicilio) => item.id, orden: 1 },
    { encabezado: 'Descripcion del S.C.I.A.N. ', clave: (item: Domicilio) => item.Descripcion, orden: 2 },

  ];

  private seccionState!: DatosProcedureState;

  /**
   * Constructor para SolicitanteComponent.
   * 
   * @param fb - Una instancia de FormBuilder utilizada para crear y gestionar formularios.
   */
  constructor(private fb: FormBuilder,
    private DatosSolicitudService: DatosSolicitudService,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery,) {
  }

  /**
   * Gancho de ciclo de vida que se llama después de que se inicializan las propiedades enlazadas a datos de una directiva.
   * Inicializa el componente configurando los valores del formulario.
   * 
   */
  ngOnInit(): void {
    this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
      .subscribe((data:DatosProcedureState) => {
        this.seccionState = data;
      });
      this.establecerdomicilioEstablecimiento();
      this.AvisodeFuncionamientomiento()
  }

  /**
   * Cargar datos de domicilioEstablecimiento
   */
  domicilioEstablecimientos(): void {
    this.DatosSolicitudService.getDomicilioData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.Domicilios = response;
      });
  }
  /**
 * Inicializa el domicilioEstablecimiento con un conjunto de controles de formulario.
 * Cada control se inicializa con un valor de cadena vacío y está deshabilitado.
 * Los controles del formulario incluyen:
 */
  public establecerdomicilioEstablecimiento(): void {
    this.domicilioEstablecimiento = this.fb.group({
      codigo: [this.seccionState?.codigo,],
      estado: [{ value: this.seccionState.estado,disabled:false},[Validators.required]],
      municipio: [{ value: this.seccionState?.municipio,disabled:false},[Validators.required]],
      localidad: [{ value: this.seccionState?.localidad,disabled:false},[Validators.required]],
      colonia: [{ value: this.seccionState?.colonia,disabled:false},[Validators.required]],
      calle: [{ value: this.seccionState?.calle,disabled:false},[Validators.required]],
      correo: [{ value: this.seccionState?.correo,disabled:false},[Validators.required]],
      sanitario: [{ value: this.seccionState?.sanitario,disabled:false}],
      lada: [{ value: this.seccionState?.lada,disabled:false}],
      telefono: [{ value: this.seccionState?.telefono,disabled:false}]
    });
  }
  public AvisodeFuncionamientomiento(): void {
    this.AvisodeFuncionamiento = this.fb.group({
      funcionamiento: [{ value: this.seccionState?.funcionamiento,disabled:false}],
      licencia: [{ value: this.seccionState?.licencia,disabled:false}],
      regimen: [{ value: this.seccionState?.regimen,disabled:false}],
    });
  }

  /**
   * Establece valores predeterminados para los campos del formulario en el domicilioEstablecimiento.
   * 
   * Este metodo asigna valores predefinidos a los siguientes controles del formulario:
   * - 'rfc': Establece el valor a 'AALM87326'.
   * - 'denominacion': Establece el valor a 'SVHGSA ASCV 332'.
   * - 'actividadEconomica': Establece el valor a 'SIMa gsys'.
   * - 'correoElectronico': Establece el valor a 'SV US'.
   * 
   * @returns {void}
   */
  public establecerValoresDeFormulario(): void {
    this.domicilioEstablecimiento.get('Codigo')?.setValue('');
    this.domicilioEstablecimiento.get('codigoPostal')?.setValue('');
    this.domicilioEstablecimiento.get('estado')?.setValue('');
    this.domicilioEstablecimiento.get('Municipio')?.setValue('');
    this.domicilioEstablecimiento.get('localidad')?.setValue('');
    this.domicilioEstablecimiento.get('colonia')?.setValue('');
    this.domicilioEstablecimiento.get('calle')?.setValue('');
    this.domicilioEstablecimiento.get('numeroExterior')?.setValue('')
  }

 
   /**
     * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
     * @param form - El formulario reactivo.
     * @param campo - El nombre del campo en el formulario.
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
   * @param field Nombre del campo
   * @returns Booleano que indica si el campo es válido
   */
  isValid(field: string): boolean {
    return Boolean(DatosSolicitudService.isValid(this.domicilioEstablecimiento, field));
  }
}

