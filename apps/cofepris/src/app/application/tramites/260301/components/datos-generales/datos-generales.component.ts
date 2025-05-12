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
   * Variable que almacena el tipo de dato, que se inicializa más tarde.
   * Se usa el operador `!` para indicar que la variable no es nula ni indefinida en el momento de su uso.
   */
  tipoDatos!: string;

  /**
   * Lista de objetos `Catalogo` que contiene los datos de los países.
   * Esta variable se utiliza para almacenar los países en un catálogo.
   */
  paisesDatos: Catalogo[] = [];

  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {FormGroup} agregarProveedorForm
   * Formulario reactivo utilizado para capturar los datos del proveedor.
   */
  agregarDatosForm!: FormGroup;

  /**
   * Asigna el valor de `TIPO_TABLA_DATOS` a la variable `tipoTablaDatos`.
   * `TIPO_TABLA_DATOS` es un objeto o constante que define los tipos de datos para las tablas.
   */
  tipoTablaDatos = TIPO_TABLA_DATOS;

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
   * Crea y inicializa el formulario con los campos y validaciones necesarios.
   * Este formulario incluye información personal y de contacto.
   * 
   * @returns {void}
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
   * Navega a la ruta 'pago/importacion-materias-primas-estupefacientes'.
   */
  cancelar(): void {
    this.router.navigate([
      'pago',
      'importacion-materias-primas-estupefacientes',
    ]);
  }

  /**
   * Resetea los valores del formulario 'agregarDatosForm'.
   * Restaura el formulario a su estado inicial.
   */
  limpiarFormulario(): void {
    this.agregarDatosForm.reset();
  }

  /**
   * Guarda los datos del formulario dependiendo del tipo de datos (`tipoDatos`).
   * Dependiendo del valor de `tipoDatos`, se llama a un método específico para guardar los datos.
   * Luego navega a la ruta 'pago/importacion-materias-primas-estupefacientes'.
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
   * @description Agrega nuevos fabricantes a la tabla de datos del trámite.
   *
   * @param newFabricantes - Lista de objetos `Fabricante` a agregar.
   */
  addFabricantes(newFabricantes: Facturador[]): void {
    this.tramiteStore.updateFabricanteTablaDatos(newFabricantes);
  }

  /**
   * @method addDestinatarios
   * @description Agrega nuevos destinatarios a la tabla de datos del destinatario final.
   *
   * @param newDestinatarios - Lista de objetos `Destinatario` a agregar.
   */
  addCertificadoTablaDatos(newDestinatarios: Facturador[]): void {
    this.tramiteStore.updateCertificadoTablaDatos(newDestinatarios);
  }

  /**
   * Actualiza los datos de tipo 'Otros' en el store 'tramiteStore'.
   * Recibe un array de objetos de tipo 'Facturador' y actualiza la información correspondiente.
   *
   * @param datos - Array de objetos `Facturador` con los datos a actualizar.
   */
  addOtros(datos: Facturador[]): void {
    this.tramiteStore.updateOtrosTablaDatos(datos);
  }

  /**
   * @method addProveedores
   * @description Agrega nuevos proveedores a la tabla de datos del trámite.
   *
   * @param newProveedores - Lista de objetos `Proveedor` a agregar.
   */
  addProveedores(newProveedores: Facturador[]): void {
    this.tramiteStore.updateProveedorTablaDatos(newProveedores);
  }

  /**
   * @method addFacturadores
   * @description Agrega nuevos facturadores a la tabla de datos del trámite.
   *
   * @param newFacturadores - Lista de objetos `Facturador` a agregar.
   */
  addFacturadores(newFacturadores: Facturador[]): void {
    this.tramiteStore.updateFacturadorTablaDatos(newFacturadores);
  }
}
