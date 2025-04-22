import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query';
import { DatosProcedureState } from '../../../../estados/tramites/tramites261101.store';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261101.store';
import { DatosSolicitudService } from '../../services/datoSolicitude.service'
import { Domicilio } from '../../modelos/domicilio-establecimientos.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SCIAN_DATA } from '../../../../shared/constantes/datos-scian.enum';
import { ScianData } from '../../../../shared/models/datos-modificacion.model';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src'
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-domicilio-establecimientos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TablaDinamicaComponent,InputCheckComponent],
  templateUrl: './domicilio-establecimientos.component.html',
  styleUrl: './domicilio-establecimientos.component.scss',
})
export class DomicilioEstablecimientosComponent implements OnInit, OnDestroy {
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
   * Configuración de columnas para la tabla de datos SCIAN.
   */
  configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;
  /**
 * Datos cargados dinámicamente para la tabla SCIAN.
 */
  datosData: ScianData[] = [];
  /**
* Enum para la selección de tablas.
*/
  tipoSeleccionTabla = TablaSeleccion;
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
   * Constructor del componente DomicilioEstablecimientosComponent.
   * 
   * Este constructor inicializa las dependencias necesarias para el funcionamiento del componente.
   * 
   * @param fb - Instancia de FormBuilder utilizada para crear y gestionar formularios reactivos.
   * @param datosSolicitudService - Servicio encargado de manejar las solicitudes relacionadas con los datos del formulario.
   * @param store - Almacén de estado (store) utilizado para gestionar y actualizar el estado de los datos del procedimiento.
   * @param query - Consulta (query) utilizada para obtener datos del estado del procedimiento.
   */
  constructor(private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery,
  ) {
    // Constructor del componente
  }

/**
 * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
 * 
 * Este método realiza las siguientes acciones:
 * 1. Carga los datos almacenados en el estado mediante `loadStorData`.
 * 2. Inicializa el formulario reactivo para el domicilio del establecimiento con `establecerdomicilioEstablecimiento`.
 * 3. Configura el formulario reactivo para el aviso de funcionamiento con `avisodeFuncionamientomiento`.
 * 4. Carga los datos del catálogo SCIAN con `loadScian`.
 * 
 * @returns {void}
 */
ngOnInit(): void {
  this.loadStorData(); // Carga los datos almacenados en el estado.
  this.establecerdomicilioEstablecimiento(); // Inicializa el formulario de domicilio.
  this.avisodeFuncionamientomiento(); // Configura el formulario de aviso de funcionamiento.
  this.loadScian(); // Carga los datos del catálogo SCIAN.
}

  /**
 * Inicializa el domicilioEstablecimiento con un conjunto de controles de formulario.
 * Cada control se inicializa con un valor de cadena vacío y está deshabilitado.
 * Los controles del formulario incluyen:
 */
  public establecerdomicilioEstablecimiento(): void {
    this.domicilioEstablecimiento = this.fb.group({
      codigo: [this.seccionState?.codigo,],
      estado: [{ value: this.seccionState.estado, disabled: false }, [Validators.required]],
      municipio: [{ value: this.seccionState?.municipio, disabled: false }, [Validators.required]],
      localidad: [{ value: this.seccionState?.localidad, disabled: false }, [Validators.required]],
      colonia: [{ value: this.seccionState?.colonia, disabled: false }, [Validators.required]],
      calle: [{ value: this.seccionState?.calle, disabled: false }, [Validators.required]],
      correo: [{ value: this.seccionState?.correo, disabled: false }, [Validators.required]],
      sanitario: [{ value: this.seccionState?.sanitario, disabled: false }],
      lada: [{ value: this.seccionState?.lada, disabled: false }],
      telefono: [{ value: this.seccionState?.telefono, disabled: false }]
    });
  }

    /**
   * Inicializa el formulario reactivo para el Aviso de Funcionamiento.
   * 
   * Este método crea un grupo de controles de formulario con los siguientes campos:
   * - 'funcionamiento': Campo que representa el estado de funcionamiento, inicializado con el valor de `seccionState?.funcionamiento` y habilitado.
   * - 'licencia': Campo que representa la licencia, inicializado con el valor de `seccionState?.licencia` y habilitado.
   * - 'regimen': Campo que representa el régimen, inicializado con el valor de `seccionState?.regimen` y habilitado.
   * 
   * @returns {void}
   */
  public avisodeFuncionamientomiento(): void {
    this.AvisodeFuncionamiento = this.fb.group({
      funcionamiento: [{ value: this.seccionState?.funcionamiento, disabled: false }],
      licencia: [{ value: this.seccionState?.licencia, disabled: false }],
      regimen: [{ value: this.seccionState?.regimen, disabled: false }],
    });
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

  /**
   * Carga los datos del catálogo loadScian.
   */
  loadScian(): void {
    this.datosSolicitudService
      .obternerDatosData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.datosData = resp;
      });
  }
  /**
    * Carga los datos del catálogo loadStorData.
    */
  loadStorData(): void {
    this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: DatosProcedureState) => {
        this.seccionState = data;
      });
  }
}

