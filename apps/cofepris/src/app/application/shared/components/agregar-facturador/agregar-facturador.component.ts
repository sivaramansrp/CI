import { Component, EventEmitter, Output } from '@angular/core';
import { Catalogo, TipoPersona } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Facturador } from '../../models/terceros-relacionados.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
/**
 * Componente para agregar un facturador (persona física o moral) al trámite actual.
 * Permite capturar datos generales y de contacto, y actualiza el store con el nuevo registro.
 */
@Component({
  selector: 'app-agregar-facturador',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './agregar-facturador.component.html',
  styleUrl: './agregar-facturador.component.css',
})
export class AgregarFacturadorComponent implements OnInit, OnDestroy {
  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;
  /**
   * Formulario reactivo para capturar los datos del facturador.
   * @property {FormGroup} agregarFacturadorForm
   */
  agregarFacturadorForm: FormGroup;

  /**
   * Subject utilizado para desuscribirse automáticamente de observables al destruir el componente.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Lista de países obtenidos del servicio.
   * @property {Catalogo[]} paisesDatos
   */
  paisesDatos: Catalogo[] = [];

  /**
   * Lista de facturadores almacenados localmente.
   * @property {Facturador[]} facturadores
   */
  facturadores: Facturador[] = [];

  /**
   * Evento de salida que emite la lista de facturadores actualizada.
   * @property {EventEmitter<Facturador[]>} updateFacturadorTablaDatos
   */
  @Output() updateFacturadorTablaDatos = new EventEmitter<Facturador[]>();

  /**
   * Constructor que inicializa el formulario y servicios necesarios.
   *
   * @param {FormBuilder} fb - FormBuilder para construir el formulario reactivo.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener listas de catálogos.
   * @param {Tramite260204Store} tramiteStore - Store que administra el estado del trámite.
   * @param {Tramite260204Query} tramiteQuery - Servicio para consultar el estado actual del trámite.
   * @param {Location} ubicaccion - Servicio para manejar la navegación (volver atrás).
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location
  ) {
    this.agregarFacturadorForm = this.fb.group({
      tipoPersona: ['Fisica', Validators.required],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: [''],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Hook de inicialización del componente. Carga los catálogos necesarios.
   */
  ngOnInit(): void {
    this.cargarDatos();
  }

  /**
   * Carga los países desde el servicio y los almacena en `paisesDatos`.
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
   * Construye un objeto `Facturador` a partir del formulario,
   * lo agrega al arreglo `facturadores` y actualiza el store.
   * Después, limpia el formulario y regresa a la vista anterior.
   */
  guardarFacturador(): void {
    const NUEVO_FACTURADOR: Facturador = {
      nombreRazonSocial: `${this.agregarFacturadorForm.value.nombres} ${
        this.agregarFacturadorForm.value.primerApellido
      } ${this.agregarFacturadorForm.value.segundoApellido || ''}`.trim(),
      rfc: '',
      curp: '',
      telefono: this.agregarFacturadorForm.value.telefono || '',
      correoElectronico:
        this.agregarFacturadorForm.value.correoElectronico || '',
      calle: this.agregarFacturadorForm.value.calle || '',
      numeroExterior: this.agregarFacturadorForm.value.numeroExterior || '',
      numeroInterior: this.agregarFacturadorForm.value.numeroInterior || '',
      pais: this.agregarFacturadorForm.value.pais || '',
      colonia: this.agregarFacturadorForm.value.colonia || '',
      municipioAlcaldia: '',
      localidad: '',
      entidadFederativa: this.agregarFacturadorForm.value.estado || '',
      estadoLocalidad: '',
      codigoPostal: this.agregarFacturadorForm.value.codigoPostal || '',
      coloniaEquivalente: '',
    };

    this.facturadores.push(NUEVO_FACTURADOR);
    this.updateFacturadorTablaDatos.emit(this.facturadores);
    this.agregarFacturadorForm.reset();
    this.ubicaccion.back();
  }
  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarFacturadorForm.reset();
  }
  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * Hook de destrucción del componente. Libera recursos y detiene suscripciones.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
