import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, ConfiguracionColumna, TableComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { MENSAJEDEALERTA, TituloComponent } from '@ng-mf/data-access-user';
// import terceros from 'libs/shared/theme/assets/json/260211/terceros.json';
import { SanitarioService } from '../../services/sanitario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
// import { PermisoModel } from '../detos.model';
import { PermisoModel } from '../../../../../../../../../libs/shared/data-access-user/src/core/models/260211/detos.model'

import { AgregarFacturatorComponent } from '../agregarFacturator/agregarFacturator.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AgregarDestinatarioComponent } from '../agregar-destinatario/agregar-destinatario.component';
import { Solicitud260211State, } from '../../../../estados/tramites/sanitario260211.store';

import { Sanitario260211Store } from '../../../../estados/tramites/sanitario260211.store';

import { Permiso260211Query } from '../../../../estados/queries/permiso260211.query';

/**
 * component
 * name TercerosRelacionadosComponent
 * description
 * Este componente es responsable de gestionar la funcionalidad relacionada con terceros relacionados en el sistema.
 * Proporciona formularios para capturar datos de proveedores y requeridos, así como tablas para mostrar información relacionada.
 * 
 * selector app-terceros-relacionados
 * standalone true
 * imports
 * - CommonModule
 * - TituloComponent
 * - TableComponent
 * - AlertComponent
 * - TablaDinamicaComponent
 * - AgregarProveedorComponent
 * - AgregarFacturatorComponent
 * - AgregarRequeridaComponent
 * - CatalogoSelectComponent
 * - ReactiveFormsModule
 * - AgregarDestinatarioComponent
 * 
 * templateUrl ./tercerosRelacionados.component.html
 * styleUrl ./tercerosRelacionados.component.css
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TableComponent,
    AlertComponent,
    TablaDinamicaComponent,
    AgregarFacturatorComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    AgregarDestinatarioComponent,
  ],
  templateUrl: './tercerosRelacionados.component.html',
  styleUrls: ['./tercerosRelacionados.component.css'],
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /**
   * property {FormGroup} proveedorForm
   * description Formulario reactivo para capturar los datos del proveedor.
   */
  proveedorForm!: FormGroup;

  /**
   * property {FormGroup} requeridaForm
   * description Formulario reactivo para capturar los datos requeridos.
   */
  requeridaForm!: FormGroup;

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
   * property {boolean} hideCurp
   * description Indica si el campo CURP debe estar oculto.
   */
  public hideCurp = true;

  /**
   * property {Solicitud260211State} solicitudState
   * description Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260211State;

  /**
   * property {string[]} tableHeaderData
   * description Encabezados de la tabla.
   */
  tableHeaderData: string[] = ['Nombre/denominacion o razon social', 'RFC', 'CURP', 'Telefono', 'Correo electronico', 'Calle'];

  /**
   * property {typeof TablaSeleccion} TablaSeleccion
   * description Enumeración para la selección de tablas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * property {PermisoModel[]} tercerosProd
   * description Lista de productos relacionados con terceros.
   */
  tercerosProd: PermisoModel[] = [];

  /**
   * property {Object[]} tableBodyData
   * description Datos del cuerpo de la tabla.
   */
  tableBodyData: { tbodyData: string[] }[] = [];

  /**
   * property {string} TEXTOS
   * description Mensajes de alerta.
   */
  public TEXTOS = MENSAJEDEALERTA;

  /**
   * property {string} infoAlert
   * description Tipo de alerta informativa.
   */
  public infoAlert = 'alert-info';

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
    this.loadMercancias();
    this.getRegistroForm();
    this.initializeProveedorForm();
    this.initializeRequeridaForm();
  }

   /**
   * method getRegistroForm
   * description Inicializa el formulario de proveedores.
   */
   getRegistroForm(): void {
    this.proveedorForm = this.fb.group({
      nacionalidad: ['nacional', Validators.required], // Matches the formControlName in the HTML
      tipoPersona: ['moral', Validators.required], // Matches the formControlName in the HTML
      rfc: [{ value: '', disabled: true }, Validators.required],
      curp:[''],
      denominacion: [this.solicitudState?.denominacion, Validators.required],
      pail: ['', Validators.required],
      localidad: ['', Validators.required],
      municipio: ['', Validators.required],
      nombrelocalidad: ['', Validators.required],
      primerApellido: [''],
      segundoApellido: [''],
      equivalente: [{ value: '', disabled: true }],
      numeroCalle: [this.solicitudState?.numeroCalle, Validators.required],
      experior: [this.solicitudState?.experior, Validators.required],
      interior: [this.solicitudState?.interior],
      lada: [this.solicitudState?.lada],
      numerotelefono: [this.solicitudState?.numerotelefono],
      correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required, Validators.email]],
    });
    this.proveedorForm.get('pail')?.disable();
    this.loadComboUnidad();
    this.loadLocalidad();
  }

  /**
   * method getFormrequerida
   * description Inicializa el formulario de datos requeridos.
   */
  getFormrequerida(): void {
    this.requeridaForm = this.fb.group({
      profisica: ['', Validators.required],
      moral: ['', Validators.required],
      tiporfc: [this.solicitudState?.tiporfc, Validators.required],
      tipocurp: [this.solicitudState?.tipocurp, Validators.required],
      tipodenominacion: [this.solicitudState?.tipodenominacion, Validators.required],
      tipopail: [{ value: '', disabled: true }, Validators.required],
      numeroEstado: [this.solicitudState?.numeroEstado, Validators.required],
      tipopostal:[''],
      nombreequivalente:[''],
      numerosCalle: [{ value: '', disabled: true }, Validators.required],
      numbroexperior: [{ value: '', disabled: true }, Validators.required],
      numbrointerior: [this.solicitudState?.numbrointerior],
      numbrolada: [this.solicitudState?.numbrolada],
      numerostelefono: [{ value: '', disabled: true }],
      tipocorreoElectronico: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    });
    this.loadComboUnidad();
    this.loadLocalidad();
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
   * method abrirModalrequerida
   * description Abre el modal para agregar datos requeridos.
   */
 abrirModalrequerida(): void {
  this.modal = 'show';
  this.getFormrequerida();
}
  /**
   * method loadMercancias
   * description Carga los datos de mercancías relacionadas.
   */
  loadMercancias(): void {
    this.service.getTable()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.tercerosProd = resp;
      });
  }

  /**
   * method abrirModal
   * description Abre el modal para agregar un proveedor.
   */
  public abrirModal(): void {
    this.modal = 'show';
    this.getRegistroForm();
  }

 /**
   * method loadComboUnidad
   * description Carga la lista de proveedores disponibles.
   */
  loadComboUnidad(): void {
    this.service.getProveedordata()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.proveedorList = data as Catalogo[];
      });
  }

  /**
   * method loadLocalidad
   * description Carga la lista de localidades disponibles.
   */
  loadLocalidad(): void {
    this.service.getLocalidaddata()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.localidadList = data as Catalogo[];
      });
  }

  /**
   * method guardarProveedor
   * description Guarda los datos del proveedor si el formulario es válido.
   */
  
/**
   * method ngOnDestroy
   * description Método de limpieza al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  initializeProveedorForm(): void {
    this.proveedorForm = this.fb.group({
      nacionalidad: ['nacional', Validators.required],
      tipoPersona: ['moral', Validators.required],
      rfc: ['', Validators.required],
      curp:[''],
      denominacion: ['', Validators.required],
      pail: ['', Validators.required],
      localidad: ['', Validators.required],
      municipio: ['', Validators.required],
      nombrelocalidad: ['', Validators.required],
      primerApellido: [''],
      segundoApellido: [''],
      equivalente: [''],
      numeroCalle: ['', Validators.required],
      experior: ['', Validators.required],
      interior: [''],
      lada: [''],
      numerotelefono: [''],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
    this. handleFieldVisibility();
  }

  handleFieldVisibility(): void {
    this.proveedorForm.get('nacionalidad')?.valueChanges.subscribe((nacionalidad) => {
      this.updateFieldVisibility(nacionalidad, this.proveedorForm.get('tipoPersona')?.value);
    });

    this.proveedorForm.get('tipoPersona')?.valueChanges.subscribe((tipoPersona) => {
      this.updateFieldVisibility(this.proveedorForm.get('nacionalidad')?.value, tipoPersona);
    });
  }

  updateFieldVisibility(nacionalidad: string, tipoPersona: string): void {
    if (nacionalidad === 'nacional' && tipoPersona === 'moral') {
      this.proveedorForm.get('curp')?.clearValidators();
      this.proveedorForm.get('primerApellido')?.clearValidators();
      this.proveedorForm.get('segundoApellido')?.clearValidators();
    } else if (nacionalidad === 'extranjero' && tipoPersona === 'fisica') {
      this.proveedorForm.get('curp')?.setValidators(Validators.required);
      this.proveedorForm.get('primerApellido')?.setValidators(Validators.required);
      this.proveedorForm.get('segundoApellido')?.setValidators(Validators.required);
    }

    this.proveedorForm.get('curp')?.updateValueAndValidity();
    this.proveedorForm.get('primerApellido')?.updateValueAndValidity();
    this.proveedorForm.get('segundoApellido')?.updateValueAndValidity();
  }


  initializeRequeridaForm(): void {
    this.requeridaForm = this.fb.group({
      tipoPersona: ['fisica', Validators.required],
      tiporfc: ['', Validators.required],
      tipocurp: ['', Validators.required],
      tipodenominacion: ['', Validators.required],
      tipopail: ['', Validators.required],
      numeroEstado: ['', Validators.required],
      numeropostal: ['', Validators.required], // Added this control
      nombreequivalente: ['', Validators.required], // Added this control
      numerosCalle: ['', Validators.required],
      numbroexperior: ['', Validators.required],
      numbrointerior: [''],
      numbrolada: [''],
      numerostelefono: [''],
      tipocorreoElectronico: ['', [Validators.required, Validators.email]],
    });
  }
}