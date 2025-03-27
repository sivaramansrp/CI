import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Fabricante } from '../../models/terceros-relacionados.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260204Query } from '../../../tramites/260204/estados/queries/tramite260204Query.query';
import { Tramite260204Store } from '../../../tramites/260204/estados/stores/tramite260204Store.store';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

/**
 * Componente para agregar datos de un fabricante.
 * Provee un formulario reactivo y métodos para guardar la información del fabricante.
 *
 * @example
 * <app-agregar-fabricante></app-agregar-fabricante>
 */
@Component({
  selector: 'app-agregar-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  templateUrl: './agregar-fabricante.component.html',
  styleUrl: './agregar-fabricante.component.css',
})
export class AgregarFabricanteComponent implements OnDestroy, OnInit {
  /**
   * Función de callback (Input) para propagar la lista de fabricantes.
   * @property {(value: Fabricante[]) => void} guardarFabricanteForm
   */
  @Input()
  guardarFabricanteForm!: (value: Fabricante[]) => void;

  /**
   * FormGroup para el formulario de agregar fabricante.
   * @property {FormGroup} agregarFabricanteForm
   */
  agregarFabricanteForm: FormGroup;

  /**
   * Datos de catálogo de códigos postales.
   * @property {Catalogo[]} codigosPostalesDatos
   */
  public codigosPostalesDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de países.
   * @property {Catalogo[]} paisesDatos
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de estados.
   * @property {Catalogo[]} estadosDatos
   */
  public estadosDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de municipios.
   * @property {Catalogo[]} municipiosDatos
   */
  public municipiosDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de localidades.
   * @property {Catalogo[]} localidadesDatos
   */
  public localidadesDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de colonias.
   * @property {Catalogo[]} coloniasDatos
   */
  public coloniasDatos: Catalogo[] = [];

  /**
   * Arreglo de fabricantes a agregar.
   * @property {Fabricante[]} fabricantes
   */
  fabricantes: Fabricante[] = [];

  /**
   * Subject que se utiliza para desuscribir observables y evitar fugas de memoria.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Constructor que inyecta los servicios y crea el formulario de fabricante.
   *
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {Tramite260204Store} tramiteStore - Store para manejar la información del trámite 260204.
   * @param {Tramite260204Query} tramiteQuery - Query para consultar el estado del trámite 260204.
   * @param {Location} ubicaccion - Servicio para manejar la navegación en el historial del navegador.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener información de catálogos.
   */
  constructor(
    private fb: FormBuilder,
    private tramiteStore: Tramite260204Store,
    private tramiteQuery: Tramite260204Query,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
  ) {
    this.agregarFabricanteForm = this.fb.group({
      nacionalidad: ['', Validators.required],
      tipoPersona: ['', Validators.required],
      rfc: ['', Validators.required],
      curp: ['', Validators.required],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      razonSocial: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['', [Validators.required, Validators.email]],
      adunasDeEntradas: ['', Validators.required],
    });
  }

  /**
   * Hook que se ejecuta al inicializar el componente.
   * Llama a la función para cargar los datos de los catálogos.
   */
  ngOnInit(): void {
    this.cargarDatos();
  }

  /**
   * Guarda un fabricante nuevo en el arreglo `fabricantes`, lo actualiza en el store y
   * regresa a la página anterior en el historial del navegador.
   */
  guardarFabricante(): void {
    const NUEVO_FABRICANTE: Fabricante = {
      nombreRazonSocial:
        this.agregarFabricanteForm.value.razonSocial ||
        `${this.agregarFabricanteForm.value.nombres} ${
          this.agregarFabricanteForm.value.primerApellido
        } ${this.agregarFabricanteForm.value.segundoApellido || ''}`.trim(),
      rfc: this.agregarFabricanteForm.value.rfc,
      curp: this.agregarFabricanteForm.value.curp,
      telefono: this.agregarFabricanteForm.value.telefono,
      correoElectronico: this.agregarFabricanteForm.value.correoElectronico,
      calle: this.agregarFabricanteForm.value.calle,
      numeroExterior: this.agregarFabricanteForm.value.numeroExterior,
      numeroInterior: this.agregarFabricanteForm.value.numeroInterior || '',
      pais: this.agregarFabricanteForm.value.pais,
      colonia: this.agregarFabricanteForm.value.colonia,
      municipioAlcaldia: this.agregarFabricanteForm.value.municipio,
      localidad: this.agregarFabricanteForm.value.localidad,
      entidadFederativa: this.agregarFabricanteForm.value.estado,
      estadoLocalidad: this.agregarFabricanteForm.value.estado,
      codigoPostal: this.agregarFabricanteForm.value.codigoPostal,
      coloniaEquivalente: this.agregarFabricanteForm.value.correoElectronico,
    };

    // Agregar el nuevo fabricante al arreglo
    this.fabricantes.push(NUEVO_FABRICANTE);

    // Actualizar datos en el store
    this.tramiteStore.updateFabricanteTablaDatos(this.fabricantes);

    // Regresar a la vista anterior
    this.ubicaccion.back();
  }

  /**
   * Carga datos de catálogos (códigos postales, países, estados, municipios, etc.)
   * utilizando el servicio `DatosSolicitudService`.
   * Se desuscribe automáticamente al destruir el componente.
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaCodigosPostales()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.codigosPostalesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaEstados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.estadosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaMunicipios()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.municipiosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaLocalidades()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.localidadesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaColonias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.coloniasDatos = data;
      });
  }

  /**
   * Hook que se ejecuta al destruir el componente.
   * Envía un valor al Subject `unsubscribe$` y lo completa para liberar suscripciones.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
   /**
 * @method limpiarFormulario
 * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
 * 
 * @returns {void} Este método no retorna ningún valor.
 */
   limpiarFormulario(): void {
    this.agregarFabricanteForm.reset();
  }
/**
 * @method cancelar
 * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
 * 
 * @returns {void} Este método no retorna ningún valor.
 */
  cancelar():void{
    this.ubicaccion.back();
  }
}
