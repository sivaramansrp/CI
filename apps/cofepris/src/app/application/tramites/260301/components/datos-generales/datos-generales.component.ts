import { ActivatedRoute, Router } from '@angular/router';
import {
  CatalogoSelectComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { TIPO_TABLA_DATOS } from '../../constants/estupefacientes.enum';
import { Tramite260301Store } from '../../estados/tramite260301Store.store';

/**
 * @class DatosGeneralesComponent
 * @description Componente Angular que maneja la captura y gestión de datos generales 
 * para diferentes tipos de entidades en el trámite 260301. Permite agregar información
 * de fabricantes, facturadores, proveedores, certificados y otros datos relacionados.
 * 
 * Este componente es standalone y utiliza formularios reactivos para la validación
 * y captura de datos. Incluye funcionalidades para navegar entre rutas y gestionar
 * el estado del trámite.
 * 
 */
@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss',
})
export class DatosGeneralesComponent {
  /**
   * @property {string} tipoDatos
   * @description Variable que almacena el tipo de dato específico que se está gestionando.
   * Este valor determina qué tipo de entidad se está agregando (fabricante, facturador, 
   * proveedor, certificado u otros). Se inicializa desde los parámetros de la ruta.
   * Se usa el operador `!` para indicar que la variable será inicializada antes de su uso.
   * @public
   */
  tipoDatos!: string;

  /**
   * @property {Catalogo[]} paisesDatos
   * @description Lista de objetos `Catalogo` que contiene los datos de los países disponibles.
   * Esta variable se utiliza para poblar el selector de países en el formulario.
   * Se inicializa como un array vacío y se llena mediante el servicio de datos.
   * @public
   */
  paisesDatos: Catalogo[] = [];

  /**
   * @property {Subject<void>} unsubscribe$
   * @description Subject utilizado para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa cuando el componente se destruye para limpiar automáticamente todas las
   * suscripciones que utilizan el operador `takeUntil`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {FormGroup} agregarDatosForm
   * @description Formulario reactivo utilizado para capturar los datos generales de la entidad.
   * Incluye campos para información personal, de contacto y ubicación geográfica.
   * Se crea con validaciones específicas para cada campo según los requerimientos del negocio.
   * @public
   */
  agregarDatosForm!: FormGroup;

  /**
   * @property {object} tipoTablaDatos
   * @description Referencia al objeto de constantes `TIPO_TABLA_DATOS` que define los tipos
   * de datos disponibles para las tablas del trámite. Incluye constantes para fabricante,
   * facturador, proveedor, certificado y otros tipos de entidades.
   * @public
   * @readonly
   */
  tipoTablaDatos = TIPO_TABLA_DATOS;

  /**
   * @constructor
   * @description Constructor del componente DatosGeneralesComponent. Inicializa las dependencias
   * necesarias y ejecuta la configuración inicial del componente.
   * 
   * @param {ActivatedRoute} route - Servicio para acceder a la información de la ruta activa
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener datos de solicitud
   * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular
   * @param {Tramite260301Store} tramiteStore - Store para gestionar el estado del trámite
   * @param {Router} router - Servicio de navegación de Angular
   */
  constructor(
    private route: ActivatedRoute,
    private datosSolicitudService: DatosSolicitudService,
    private fb: FormBuilder,
    private tramiteStore: Tramite260301Store,
    private router: Router
  ) {
    this.tipoDatos = this.route.snapshot.paramMap.get('tipo') || '';
    this.crearFormulario();
    this.cargarDatos();
  }

  /**
   * @method crearFormulario
   * @description Crea y inicializa el formulario reactivo con los campos y validaciones necesarios.
   * Este formulario incluye información personal, de contacto y ubicación geográfica.
   * Aplica validaciones específicas para cada campo según los requerimientos del negocio.
   * 
   * Los campos incluyen:
   * - nombreRazonSocial: Nombre o razón social (requerido, 2-150 caracteres)
   * - pais: País de origen (requerido)
   * - estado: Estado o provincia (opcional)
   * - codigoPostal: Código postal (opcional)
   * - colonia: Colonia o distrito (opcional)
   * - calle: Dirección de la calle (requerido)
   * - numeroExterior: Número exterior (opcional)
   * - numeroInterior: Número interior (opcional)
   * - lada: Código de área telefónico (opcional)
   * - telefono: Número de teléfono (opcional)
   * - correoElectronico: Dirección de correo electrónico (requerido, formato email)
   * 
   * @returns {void}
   * @public
   */
  crearFormulario(): void {
    this.agregarDatosForm = this.fb.group({
      nombreRazonSocial: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      pais: ['', Validators.required],
      estado: [''],
      codigoPostal: [''],
      colonia: [''],
      calle: ['', Validators.required],
      numeroExterior: [''],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de países del servicio de datos y la almacena en `paisesDatos`.
   * Utiliza el patrón de suscripción con `takeUntil` para evitar fugas de memoria.
   * Los datos obtenidos se utilizan para poblar el selector de países en el formulario.
   * 
   * @returns {void}
   * @public
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });
  }

  /**
   * @method cancelar
   * @description Navega a la ruta principal del trámite de importación de materias primas estupefacientes.
   * Este método se ejecuta cuando el usuario decide cancelar la operación actual y regresar
   * a la vista principal del trámite sin guardar los cambios realizados.
   * 
   * @returns {void}
   * @public
   */
  cancelar(): void {
    this.router.navigate([
      'pago',
      'importacion-materias-primas-estupefacientes',
    ]);
  }

  /**
   * @method limpiarFormulario
   * @description Resetea todos los valores del formulario `agregarDatosForm` a su estado inicial.
   * Restaura el formulario completamente, eliminando cualquier dato ingresado por el usuario
   * y restableciendo las validaciones a su estado original.
   * 
   * @returns {void}
   * @public
   */
  limpiarFormulario(): void {
    this.agregarDatosForm.reset();
  }

  /**
   * @method guardarDatos
   * @description Guarda los datos del formulario en el store correspondiente según el tipo de datos especificado.
   * Utiliza un switch statement para determinar qué método específico llamar basándose en el valor
   * de `tipoDatos`. Después de guardar los datos, navega automáticamente a la ruta principal del trámite.
   * 
   * Los tipos de datos soportados son:
   * - FABRICANTE: Agrega datos de fabricante
   * - FACTURADOR: Agrega datos de facturador
   * - CERTIFICADO: Agrega datos de certificado
   * - PROVEEDOR: Agrega datos de proveedor
   * - OTROS: Agrega otros tipos de datos
   * 
   * @returns {void}
   * @public
   */
  guardarDatos(): void {
    switch (this.tipoDatos) {
      case this.tipoTablaDatos.FABRICANTE:
        this.addFabricantes([this.agregarDatosForm.value]);
        break;
      case this.tipoTablaDatos.FACTURADOR:
        this.addFacturadores([this.agregarDatosForm.value]);
        break;
      case this.tipoTablaDatos.CERTIFICADO:
        this.addCertificadoTablaDatos([this.agregarDatosForm.value]);
        break;
      case this.tipoTablaDatos.PROVEEDOR:
        this.addProveedores([this.agregarDatosForm.value]);
        break;
      case this.tipoTablaDatos.OTROS:
        this.addOtros([this.agregarDatosForm.value]);

        break;
      default:
        break;
    }
    this.router.navigate([
      'pago',
      'importacion-materias-primas-estupefacientes',
    ]);
  }

  /**
   * @method addFabricantes
   * @description Agrega nuevos fabricantes a la tabla de datos del trámite mediante el store.
   * Actualiza el estado global del trámite con la información de los fabricantes proporcionada.
   * Los datos se almacenan utilizando el patrón de gestión de estado del store.
   *
   * @param {Facturador[]} newFabricantes - Array de objetos `Facturador` que representan los fabricantes a agregar
   * @returns {void}
   * @private
   */
  addFabricantes(newFabricantes: Facturador[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(newFabricantes);
  }

  /**
   * @method addCertificadoTablaDatos
   * @description Agrega nuevos datos de certificado a la tabla de datos del trámite mediante el store.
   * Actualiza el estado global del trámite con la información de certificados proporcionada.
   * Este método gestiona específicamente los datos relacionados con certificaciones y documentos oficiales.
   *
   * @param {Facturador[]} newCertificados - Array de objetos `Facturador` que representan los certificados a agregar
   * @returns {void}
   * @private
   */
  addCertificadoTablaDatos(newCertificados: Facturador[]): void {
    this.tramiteStore.updateCertificadoTablaDatos(newCertificados);
  }

  /**
   * @method addOtros
   * @description Actualiza los datos de tipo 'Otros' en el store del trámite.
   * Gestiona información adicional que no se clasifica en las categorías principales
   * (fabricante, facturador, proveedor, certificado). Permite flexibilidad para
   * agregar tipos de datos no contemplados en las categorías estándar.
   *
   * @param {Facturador[]} datos - Array de objetos `Facturador` con los datos adicionales a actualizar
   * @returns {void}
   * @private
   */
  addOtros(datos: Facturador[]): void {
    this.tramiteStore.updateOtrosTablaDatos(datos);
  }

  /**
   * @method addProveedores
   * @description Agrega nuevos proveedores a la tabla de datos del trámite mediante el store.
   * Actualiza el estado global del trámite con la información de los proveedores proporcionada.
   * Los proveedores representan entidades que suministran materias primas o servicios relacionados.
   *
   * @param {Facturador[]} newProveedores - Array de objetos `Facturador` que representan los proveedores a agregar
   * @returns {void}
   * @private
   */
  addProveedores(newProveedores: Facturador[]): void {
    this.tramiteStore.updateProveedorTablaDatos(newProveedores);
  }

  /**
   * @method addFacturadores
   * @description Agrega nuevos facturadores a la tabla de datos del trámite mediante el store.
   * Actualiza el estado global del trámite con la información de los facturadores proporcionada.
   * Los facturadores son entidades responsables de emitir facturas y documentos de facturación
   * relacionados con el trámite de importación.
   *
   * @param {Facturador[]} newFacturadores - Array de objetos `Facturador` que representan los facturadores a agregar
   * @returns {void}
   * @private
   */
  addFacturadores(newFacturadores: Facturador[]): void {
    this.tramiteStore.updateFacturadorTablaDatos(newFacturadores);
  }
}
