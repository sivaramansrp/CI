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
import { Tramite260301Query } from '../../estados/tramite260301Query.query';
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
  tipoDatos!: string;

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
  agregarDatosForm: FormGroup;

  tipoTablaDatos = TIPO_TABLA_DATOS;

  constructor(
    private route: ActivatedRoute,
    private datosSolicitudService: DatosSolicitudService,
    private fb: FormBuilder,
    private tramiteStore: Tramite260301Store,
    private tramiteQuery: Tramite260301Query,
    private router: Router,
    private activatedROute: ActivatedRoute
  ) {
    this.tipoDatos = this.route.snapshot.paramMap.get('tipo') || '';
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
    this.cargarDatos();
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

  cancelar(): void {
    this.router.navigate([
      'pago',
      'importacion-materias-primas-estupefacientes',
    ]);
  }

  limpiarFormulario(): void {
    this.agregarDatosForm.reset();
  }

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
