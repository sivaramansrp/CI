import { Component, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { PermisoModel } from '../detos.model';
import { map, Subject, takeUntil } from 'rxjs';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { SanitarioService } from '../../services/sanitario.service';

import { PermisoModel } from '../../../../../../../../../libs/shared/data-access-user/src/core/models/260211/detos.model'


import { Solicitud260211State, } from '../../../../estados/tramites/sanitario260211.store';

import { Sanitario260211Store } from '../../../../estados/tramites/sanitario260211.store';

import { Permiso260211Query } from '../../../../estados/queries/permiso260211.query';

/**
 * component
 * name AgregarFacturatorComponent
 * description
 * Este componente es responsable de gestionar la funcionalidad de agregar facturadores en el sistema.
 * Proporciona un formulario para capturar los datos del facturador y una tabla para mostrar información relacionada.
 * 
 * selector app-agregar-facturator
 * standalone true
 * imports
 * - CommonModule
 * - TituloComponent
 * - TableComponent
 * - AlertComponent
 * - TablaDinamicaComponent
 * - CatalogoSelectComponent
 * - ReactiveFormsModule
 * 
 * templateUrl ./agregarFacturator.component.html
 * styleUrl ./agregarFacturator.component.css
 */
@Component({
  selector: 'app-agregar-facturator',
  standalone: true,
  imports: [CommonModule, TituloComponent, TableComponent, AlertComponent, TablaDinamicaComponent, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './agregarFacturator.component.html',
  styleUrls: ['./agregarFacturator.component.css'],
})
export class AgregarFacturatorComponent implements OnDestroy, OnInit {
  /**
   * property {PermisoModel[]} tercerosProd
   * description Lista de productos relacionados con terceros.
   */
  tercerosProd: PermisoModel[] = [];

  /**
   * property {Subject<void>} destroyed$
   * description Sujeto utilizado para manejar la destrucción de observables.
   * private
   */
  private destroyed$ = new Subject<void>();

  /**
   * property {Subject<void>} destroyNotifier$
   * description Sujeto utilizado para notificar la destrucción del componente.
   * private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * property {Solicitud260211State} solicitudState
   * description Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260211State;

  /**
   * property {FormGroup} facturatorForm
   * description Formulario reactivo para capturar los datos del facturador.
   */
  facturatorForm!: FormGroup;

  /**
   * property {Catalogo[]} proveedorList
   * description Lista de proveedores disponibles.
   */
  public proveedorList!: Catalogo[];

  /**
   * property {Catalogo[]} localidadList
   * description Lista de localidades disponibles.
   */
  public localidadList!: Catalogo[];

  /**
   * property {string} modal
   * description Estado del modal (por ejemplo, 'modal' o 'show').
   */
  public modal = 'modal';

  /**
   * property {typeof TablaSeleccion} TablaSeleccion
   * description Enumeración para la selección de tablas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * constructor
   * param {FormBuilder} fb - Constructor para formularios reactivos.
   * param {SanitarioService} service - Servicio para manejar datos sanitarios.
   * param {Sanitario260211Store} sanitario260211Store - Almacén de estado para la solicitud.
   * param {Permiso260211Query} permiso260211Query - Consulta para obtener datos relacionados con permisos.
   */
  constructor(
    private fb: FormBuilder,
    private service: SanitarioService,
    private sanitario260211Store: Sanitario260211Store,
    private permiso260211Query: Permiso260211Query
  ) {}

  /**
   * property {ElementRef} closeModal
   * description Referencia al botón de cierre del modal.
   * viewChild
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * property {ConfiguracionColumna<PermisoModel>[]} configuracionTabla
   * description Configuración de las columnas de la tabla.
   */
  configuracionTabla: ConfiguracionColumna<PermisoModel>[] = [
    { encabezado: 'Nombre/denominacion o razon social', clave: (item: PermisoModel) => item.Nombre, orden: 1 },
    { encabezado: 'RFC', clave: (item: PermisoModel) => item.RFC, orden: 2 },
    { encabezado: 'CURP', clave: (item: PermisoModel) => item.CURP, orden: 3 },
    { encabezado: 'Telefono', clave: (item: PermisoModel) => item.Teléfono, orden: 4 },
    { encabezado: 'Correo electronico', clave: (item: PermisoModel) => item.CorreoElectrónico, orden: 5 },
    { encabezado: 'Calle', clave: (item: PermisoModel) => item.calle, orden: 6 },
    { encabezado: 'numeroExterior', clave: (item: PermisoModel) => item.numeroExterior, orden: 7 },
    { encabezado: 'numeroInterior', clave: (item: PermisoModel) => item.numeroInterior, orden: 8 },
    { encabezado: 'pais', clave: (item: PermisoModel) => item.calle, orden: 9 },
    { encabezado: 'colonia', clave: (item: PermisoModel) => item.colonia, orden: 10 },
    { encabezado: 'municipio', clave: (item: PermisoModel) => item.municipio, orden: 11 },
    { encabezado: 'localidad', clave: (item: PermisoModel) => item.localidad, orden: 12 },
    { encabezado: 'entidadFederativa', clave: (item: PermisoModel) => item.entidadFederativa, orden: 13 },
    { encabezado: 'estadoLocalidad', clave: (item: PermisoModel) => item.estadoLocalidad, orden: 14 },
    { encabezado: 'codigoPostal', clave: (item: PermisoModel) => item.codigoPostal, orden: 15 },
  ];

  /**
   * method ngOnInit
   * description Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.permiso260211Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.getFacturator();
    this.loadLocalidad();
    this.loadMercancias();
  }
/**
   * method getFacturator
   * description Inicializa el formulario de facturadores.
   */
  getFacturator(): void {
    this.facturatorForm = this.fb.group({
      tipoPersona: ['moral', Validators.required], // Default to "fisica"
      nombres: [this.solicitudState?.nombres, Validators.required],
      facturatorapellido: [this.solicitudState?.facturatorapellido, Validators.required],
      facturatorsapellido: [this.solicitudState?.facturatorsapellido],
      facturatorcpail: ['', Validators.required],
      facturatorestado: [this.solicitudState?.facturatorestado, Validators.required],
      facturatorcp: [this.solicitudState?.facturatorcp],
      facturatorequivalente: [this.solicitudState?.facturatorequivalente],
      facturatorcalle: [this.solicitudState?.facturatorcalle, Validators.required],
      facturatorexperior: [this.solicitudState?.facturatorexperior, Validators.required],
      facturatorinterior: [this.solicitudState?.facturatorinterior],
      facturatorlada: [this.solicitudState?.facturatorlada, Validators.required],
      facturatortelefono: [this.solicitudState?.facturatortelefono],
      facturatorElectronico: [this.solicitudState?.facturatorElectronico, [Validators.required, Validators.email]],
    });
  }
/**
   * method isValid
   * description Verifica si un campo del formulario es válido.
   * param {FormGroup} form - El formulario reactivo.
   * param {string} field - El nombre del campo a verificar.
   * returns {boolean} - `true` si el campo es inválido y ha sido tocado o modificado.
   */
  isValid(form: FormGroup, field: string): boolean {
    return form.controls[field].invalid && (form.controls[field].dirty || form.controls[field].touched);
  }

  /**
   * method setValoresStore
   * description Actualiza el valor de un campo en el almacén de estado.
   * param {FormGroup} form - El formulario reactivo.
   * param {string} campo - El nombre del campo.
   * param {keyof Sanitario260211Store} metodoNombre - El método del almacén a invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Sanitario260211Store): void {
    const valor = form.get(campo)?.value;
    (this.sanitario260211Store[metodoNombre] as (value: any) => void)(valor);
  }


  /**
   * method loadMercancias
   * description Carga los datos de mercancías relacionadas.
   */

  /**
   * method abrirModalfacurator
   * description Abre el modal para agregar facturadores.
   */
  abrirModalfacurator(): void {
    this.modal = 'show';
    this.getFacturator();
  }
  loadMercancias(): void {
    this.service.getTable()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.tercerosProd = resp;
      });
  }

  /**
   * method loadLocalidad
   * description Carga las localidades disponibles.
   */
  loadLocalidad(): void {
    this.service.getLocalidaddata()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.localidadList = data as Catalogo[];
      });
  }

  /**
   * method ngOnDestroy
   * description Método de limpieza al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.complete();
  }
}