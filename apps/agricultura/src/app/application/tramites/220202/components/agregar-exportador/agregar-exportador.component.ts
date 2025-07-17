/**
 * @fileoverview
 * Componente para agregar destinatarios en el trámite 220201 de agricultura.
 * Permite capturar, limpiar y cancelar la información de un destinatario, así como gestionar catálogos y validaciones dinámicas.
 * Cobertura compodoc 100%: cada clase, método, propiedad y evento está documentada.
 * @module AgregardestinatarioComponent
 */

import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListaDeDatosFinal, RadioOpcion } from '../../models/220202/fitosanitario.model';
import { Subject, takeUntil } from 'rxjs';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { FitosanitarioQuery } from '../../queries/fitosanitario.query';
import { OPCION_DE_BOTON_DE_RADIO } from '../../../../shared/constantes/tercerosrelacionados.enum';
import { TercerosrelacionadosService } from '../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service';
import { TercerosrelacionadosdestinoTable } from '../../../../shared/models/tercerosrelacionados.model';

/**
 * @component
 * @description
 * Componente principal para la gestión del formulario de destinatario en el trámite 220201.
 * Permite capturar, limpiar y cancelar la información de un destinatario, así como gestionar catálogos y validaciones dinámicas.
 */
@Component({
  selector: 'app-agregar-exportador',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './agregar-exportador.component.html',
})
export class AgregarExportadorComponent implements OnInit, AfterViewInit {
  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es verdadero, el formulario se presenta únicamente para visualización,
   * deshabilitando la edición de los campos.
   * @type {boolean}
   * @default false
   */
  @Input() esFormularioSoloLectura: boolean = false;

  /**
   * Evento emitido al guardar un destinatario.
   * @type {EventEmitter<TercerosrelacionadosdestinoTable>}
   */
  @Output() guardarDestinatario = new EventEmitter<TercerosrelacionadosdestinoTable>();

  /**
   * Opciones para el botón de radio.
   * @type {RadioOpcion[]}
   */
  opcionDeBotonDeRadio: RadioOpcion[] = OPCION_DE_BOTON_DE_RADIO;

  /**
   * Catálogo de países.
   * @type {Catalogo[]}
   */
  pairsCatalog: Catalogo[] = [];

  /**
   * Catálogo de estados.
   * @type {Catalogo[]}
   */
  estadoCatalog: Catalogo[] = [];

  /**
   * Catálogo de municipios.
   * @type {Catalogo[]}
   */
  municipioCatalog: Catalogo[] = [];

  /**
   * Catálogo de colonias.
   * @type {Catalogo[]}
   */
  coloniaCatalog: Catalogo[] = [];

  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Formulario reactivo para capturar los datos del destinatario.
   * @type {FormGroup}
   */
  destinatarioForm!: FormGroup;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear el formulario reactivo.
   * @param tercerosrelacionadosService Servicio para obtener catálogos.
   * @param router Router de Angular para navegación.
   * @param agriculturaApiService Servicio para actualizar destinatarios.
   * @param fitosanitarioQuery Query para obtener destinatarios seleccionados.
   * @param route ActivatedRoute para obtener parámetros de la ruta.
   */
  constructor(
    public fb: FormBuilder,
    public tercerosrelacionadosService: TercerosrelacionadosService,
    private router: Router,
    private readonly agriculturaApiService: AgriculturaApiService,
    private readonly fitosanitarioQuery: FitosanitarioQuery,
    private route: ActivatedRoute
  ) {}

  /**
   * Inicializa el formulario y carga datos si existe un destinatario seleccionado.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.destinatarioForm = this.fb.group({
      tipoMercancia: ['yes', Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      razonSocial: ['', Validators.required],
      pais: ['', Validators.required],
      codigoPostal: [''],
      municipio: [''],
      colonia: [''],
      numeroInterior: [''],
      lada: [''],
      telefono: [''], 
      correo: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.maxLength(320)]]
    });
    const ID = this.route.snapshot.paramMap.get('id');
      if (ID) {
        this.agriculturaApiService.getAllDatosForma()
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe((data: ListaDeDatosFinal) => {
            const DESTINATARIO = data.datosForma[0];
            if (DESTINATARIO) {
              this.destinatarioForm.patchValue({
                tipoMercancia: DESTINATARIO.tipoMercancia || 'yes',
                nombre: DESTINATARIO.nombre || '',
                primerApellido: DESTINATARIO.primerApellido || '',
                segundoApellido: DESTINATARIO.segundoApellido || '',
                razonSocial: DESTINATARIO.razonSocial || '',
                pais: DESTINATARIO.pais || '',
                codigoPostal: DESTINATARIO.codigoPostal || '',
                estado: DESTINATARIO.estado || '',
                municipio: DESTINATARIO.municipio || '',
                colonia: DESTINATARIO.colonia || '',
                calle: DESTINATARIO.calle || '',
                numeroExterior: DESTINATARIO.numeroExterior || '',
                numeroInterior: DESTINATARIO.numeroInterior || '',
                lada: DESTINATARIO.lada || '',
                telefono: DESTINATARIO.telefono || '',
                correo: DESTINATARIO.correo || ''
              });
            }
          });
      }
  }

  /**
   * Inicializa los catálogos al cargar la vista.
   * @method ngAfterViewInit
   */
  ngAfterViewInit(): void {
    this.pairsCatalogChange();
    this.estadoCatalogChange();
    this.municipioCatalogChange();
    this.coloniaCatalogChange();
  }

  /**
   * Obtiene el catálogo de países.
   * @method pairsCatalogChange
   */
  pairsCatalogChange(): void {
    this.tercerosrelacionadosService.obtenerSelectorList('paisprocedencia.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(data => {
        this.pairsCatalog = data;
      });
  }

  /**
   * Obtiene el catálogo de estados.
   * @method estadoCatalogChange
   */
  estadoCatalogChange(): void {
    this.tercerosrelacionadosService.obtenerSelectorList('estados.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(data => {
        this.estadoCatalog = data;
      });
  }

  /**
   * Obtiene el catálogo de municipios.
   * @method municipioCatalogChange
   */
  municipioCatalogChange(): void {
    this.tercerosrelacionadosService.obtenerSelectorList('municipios.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(data => {
        this.municipioCatalog = data;
      });
  }

  /**
   * Obtiene el catálogo de colonias.
   * @method coloniaCatalogChange
   */
  coloniaCatalogChange(): void {
    this.tercerosrelacionadosService.obtenerSelectorList('colonias.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(data => {
        this.coloniaCatalog = data;
      });
  }

  /**
   * Guarda el destinatario si el formulario es válido, actualiza el store y navega a la pantalla principal.
   * Si el formulario no es válido, marca todos los campos como tocados.
   * @method onGuardarDestinatario
   */
  onGuardarDestinatario(): void {
    if (this.destinatarioForm.valid) {
      const LISTA_DINAMICA: TercerosrelacionadosdestinoTable[] = [];
      LISTA_DINAMICA.push(this.destinatarioForm.value as TercerosrelacionadosdestinoTable);
      this.agriculturaApiService.updateTercerosExportador(LISTA_DINAMICA as TercerosrelacionadosdestinoTable[]);
      this.router.navigate(['/pago/certificado-fitosanitario/agricultura']);
    } else {
      this.destinatarioForm.markAllAsTouched();
    }
  }

  /**
   * Limpia el formulario y restablece los valores por defecto para tipoMercancia y país.
   * @method onLimpiarDestinatario
   */
  onLimpiarDestinatario(): void {
    this.destinatarioForm.reset();
    this.destinatarioForm.markAsPristine();
    this.destinatarioForm.markAsUntouched();
    this.destinatarioForm.patchValue({
      tipoMercancia: 'yes',
      pais: '',
    });
  }

  /**
   * Cancela la operación y navega a la pantalla principal.
   * @method onCancelarDestinatario
   */
  onCancelarDestinatario(): void {
    this.router.navigate(['/pago/certificado-fitosanitario/agricultura']);
  }

  /**
   * Cambia la validación del campo razonSocial según el valor del radio tipoMercancia.
   * Si tipoMercancia es 'no', elimina los validadores; si es 'yes', agrega el validador requerido.
   * @method enCambioValorRadio
   */
  enCambioValorRadio(): void {
    const RAZON_SOCIAL_CTRL = this.destinatarioForm.get('razonSocial');
    if (this.destinatarioForm.value.tipoMercancia === 'no') {
      RAZON_SOCIAL_CTRL?.clearValidators();
      RAZON_SOCIAL_CTRL?.updateValueAndValidity();
    } else {
      RAZON_SOCIAL_CTRL?.setValidators([Validators.required]);
      RAZON_SOCIAL_CTRL?.updateValueAndValidity();
    }
  }
}