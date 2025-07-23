/**
 * @fileoverview
 * Componente para agregar destinatarios en el trámite 220201 de agricultura.
 * Permite capturar, limpiar y cancelar la información de un destinatario, así como gestionar catálogos y validaciones dinámicas.
 * Cobertura compodoc 100%: cada clase, método, propiedad y evento está documentada.
 * @module AgregardestinatarioComponent
 */

import { ActivatedRoute, Router } from "@angular/router";
import { Acuicultura, DestinatarioForm } from "../../models/220203/importacion-de-acuicultura.module";
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TituloComponent } from "@libs/shared/data-access-user/src";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { AcuiculturaStore } from "../../estados/220203/sanidad-certificado.store";
import { CommonModule } from "@angular/common";
import { ImportacionDeAcuiculturaService } from "../../services/220203/importacion-de-acuicultura.service";
import { OPCION_DE_BOTON_DE_RADIO } from "../../../../shared/constantes/tercerosrelacionados.enum";
import { RadioOpcion } from "../../../220201/models/220201/certificado-zoosanitario.model";
import { TercerosrelacionadosService } from "../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service";
import { TercerosrelacionadosdestinoTable } from "../../../../shared/models/tercerosrelacionados.model";
import { d } from "@datorama/akita-ngdevtools";


@Component({
  selector: 'app-agregardestinatariofinal',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule],
  templateUrl: './agregardestinatariofinal.component.html',
  styleUrl: './agregardestinatariofinal.component.css',
})
export class AgregardestinatariofinalComponent implements OnInit, AfterViewInit {
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
   * @type {EventEmitter[]}
   */
  @Output() cerrar = new EventEmitter<void>();

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
   * @param certificadoZoosanitarioServices Servicio para actualizar destinatarios.
   * @param certificadoZoosanitarioQuery Query para obtener destinatarios seleccionados.
   * @param route ActivatedRoute para obtener parámetros de la ruta.
   */
  constructor(
    public fb: FormBuilder,
    public tercerosrelacionadosService: TercerosrelacionadosService,
    private router: Router,
    private readonly certificadoZoosanitarioServices: ImportacionDeAcuiculturaService,
    private readonly zoosanitarioStore: AcuiculturaStore,
    private route: ActivatedRoute
  ) { }

  /**
   * Inicializa el formulario y carga datos si existe un destinatario seleccionado.
   * @method ngOnInit
   */
  ngOnInit(): void {
     this.destinatarioForm = this.fb.group({
      tipoMercancia: ['yes', Validators.required], 
      nombre: ['', []],
      primerApellido: ['', []], 
      segundoApellido: [''],
      razonSocial: ['', []], 
      pais: ['', Validators.required],
      domicilio: ['', Validators.required],
      lada: ['', [Validators.maxLength(5)]],
      telefono: ['', [Validators.maxLength(30)]],
      correo: ['', [Validators.maxLength(320), Validators.email]],
    });

    this.certificadoZoosanitarioServices.getAllDatosForma()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: Acuicultura) => {
        const DESTINATARIO = data.seletedExdora;
        if (DESTINATARIO) {
          this.destinatarioForm.patchValue({
            tipoMercancia: DESTINATARIO.tipoMercancia || 'yes',
            nombre: DESTINATARIO.nombre || '',
            primerApellido: DESTINATARIO.primerApellido || '',
            segundoApellido: DESTINATARIO.segundoApellido || '',
            razonSocial: DESTINATARIO.razonSocial || '',
            pais: DESTINATARIO.pais || '',
            lada: DESTINATARIO.lada || '',
            telefono: DESTINATARIO.telefono || '',
            correo: DESTINATARIO.correo || '',
            domicilio: DESTINATARIO.domicilio || '',
          });
        }
      });

  }

  /**
   * Inicializa los catálogos al cargar la vista.
   * @method ngAfterViewInit
   */
  ngAfterViewInit(): void {
    this.pairsCatalogChange();
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
   * Guarda el destinatario si el formulario es válido, actualiza el store y navega a la pantalla principal.
   * Si el formulario no es válido, marca todos los campos como tocados.
   * @method onGuardarDestinatarioFinal
   */
  onGuardarDestinatarioFinal(): void {
    if (this.destinatarioForm.valid) {
      const LISTA_DINAMICA: DestinatarioForm[] = [];
      LISTA_DINAMICA.push(this.destinatarioForm.value as DestinatarioForm);
      this.zoosanitarioStore.updatedatosForma(LISTA_DINAMICA as DestinatarioForm[]);
      this.zoosanitarioStore.actualizarSelectedExdora({} as DestinatarioForm);
      this.destinatarioForm.reset();
      this.cerrar.emit();
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
    });
  }

  /**
   * Cancela la operación y navega a la pantalla principal.
   * @method onCancelarDestinatario
   */
  onCancelarDestinatario(): void {
    this.cerrar.emit();
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
      this.destinatarioForm.get('nombre')?.setValidators([Validators.required]);
      this.destinatarioForm.get('nombre')?.updateValueAndValidity();
      this.destinatarioForm.get('primerApellido')?.setValidators([Validators.required]);
      this.destinatarioForm.get('primerApellido')?.updateValueAndValidity();
    } else {
      RAZON_SOCIAL_CTRL?.setValidators([Validators.required]);
      RAZON_SOCIAL_CTRL?.updateValueAndValidity();
      this.destinatarioForm.get('nombre')?.clearValidators();
      this.destinatarioForm.get('nombre')?.updateValueAndValidity();
      this.destinatarioForm.get('primerApellido')?.clearValidators();
      this.destinatarioForm.get('primerApellido')?.updateValueAndValidity();
    }
  }
}
