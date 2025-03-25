import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AvisoSanitarioState, Tramite260601Store } from '../../estados/tramites/tramite260601.store';
import { CATALOGOS_ID, TERCEROS_NACIONALIDAD_OPCIONES, TIPO_PERSONA_OPCIONES } from '../../constantes/aviso-enum';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Observable, Subject, map, merge, takeUntil } from 'rxjs';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Query } from '../../estados/queries/tramite260601.query';

/**
 * Componente para gestionar el agregar proveedor.
 */
@Component({
  selector: 'app-agregar-proveedor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './agregar-proveedor.component.html',
  styleUrl: './agregar-proveedor.component.css',
})
export class AgregarProveedorComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal que contiene tres subformularios:
   * datosGeneralesForm, datosPersonalesForm y domicilioForm.
   */
  agregarProveedorForm!: FormGroup;

  /**
   * Opciones de selección para la nacionalidad de terceros.
   */
  tercerosNacionalidadOpciones = TERCEROS_NACIONALIDAD_OPCIONES;

  /**
   * Opciones iniciales para el campo "Tipo de persona".
   */
  inicialTipoPersonaOpciones = TIPO_PERSONA_OPCIONES;

  /**
   * Opciones dinámicas filtradas según la nacionalidad seleccionada.
   */
  tipoPersonaOpciones = [...this.inicialTipoPersonaOpciones];

  /**
    * Subject para destruir las suscripciones.
    */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Estado actual del aviso sanitario.
   */
  public avisoSanitarioState!: AvisoSanitarioState;

  /**
   * Catálogo de países.
   */
  pais!: Catalogo[];

  /**
   * Indica si el campo "País" debe estar deshabilitado.
   */
  inhabilitarPais: boolean = true;

  /**
   * Indica si se debe mostrar el botón de búsqueda del RFC.
   */
  mostrarRfcBuscarBoton: boolean = false;

  /**
   * Indica si se debe mostrar el botón de búsqueda del CURP.
   */
  mostrarCurpBuscarBoton: boolean = false;

  /**
   * Indica si los campos de datos personales deben mostrarse.
   */
  mostrarDatosPersonales: boolean = false;

  /**
   * Valor seleccionado para el campo "Nacionalidad".
   */
  nacionalidad: string | number = '';

  /**
   * Valor seleccionado para el campo "Tipo de persona".
   */
  tipoPersona: string | number = '';

  /**
   * Constructor del componente.
   * Utilizado para la inyección de dependencias.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260601Store: Tramite260601Store,
    private tramite260601Query: Tramite260601Query,
    private avisoSanitarioService: AvisoSanitarioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método de inicialización del componente.
   * Configura el formulario, inicializa los catálogos y realiza suscripciones necesarias.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.tramite260601Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.avisoSanitarioState = seccionState;
        })
      )
      .subscribe();

    this.crearFormulario();

    this.paisSeleccion();
  }

  /**
   * Obtiene el subformulario "datosGeneralesForm".
   */
  get datosGeneralesForm(): FormGroup {
    return this.agregarProveedorForm.get('datosGeneralesForm') as FormGroup;
  }

  /**
   * Obtiene el subformulario "datosPersonalesForm".
   */
  get datosPersonalesForm(): FormGroup {
    return this.agregarProveedorForm.get('datosPersonalesForm') as FormGroup;
  }

  /**
   * Obtiene el subformulario "domicilioForm".
   */
  get domicilioForm(): FormGroup {
    return this.agregarProveedorForm.get('domicilioForm') as FormGroup;
  }

  /**
   * Obtiene el campo "rfcProveedor" del subformulario "datosGeneralesForm".
   */
  get rfcProveedor(): FormControl {
    return this.agregarProveedorForm.get('datosGeneralesForm.rfcProveedor') as FormControl;
  }

  /**
   * Crea el formulario principal y define sus subformularios y validaciones.
   */
  crearFormulario(): void {
    this.agregarProveedorForm = this.fb.group({
      datosGeneralesForm: this.fb.group({
        tercerosNacionalidad: [
          this.avisoSanitarioState?.tercerosNacionalidad,
          [Validators.required]
        ],
        tipoPersona: [
          this.avisoSanitarioState?.tipoPersona,
          [Validators.required]
        ],
        rfcProveedor: [
          { value: this.avisoSanitarioState?.rfcProveedor, disabled: true },
          [Validators.required]
        ],
        curp: [
          { value: this.avisoSanitarioState?.curp, disabled: true },
          [Validators.required]
        ],
      }),
      datosPersonalesForm: this.fb.group({
        proveedorNombre: [
          { value: this.avisoSanitarioState?.proveedorNombre, disabled: true },
          [Validators.required]
        ],
        proveedorPrimerApellido: [
          { value: this.avisoSanitarioState?.proveedorPrimerApellido, disabled: true },
          [Validators.required]
        ],
        proveedorSegundoApellido: [
          { value: this.avisoSanitarioState?.proveedorSegundoApellido, disabled: true }
        ],
        proveedorRazonSocial: [
          { value: this.avisoSanitarioState?.proveedorRazonSocial, disabled: true },
          [Validators.required]
        ]
      }),
      domicilioForm: this.fb.group({
        cvePais: [
          { value: this.avisoSanitarioState?.cvePais, disabled: true },
          [Validators.required]
        ],
        domicilioEstado: [
          { value: this.avisoSanitarioState?.domicilioEstado, disabled: true },
          [Validators.required]
        ],
        alcaldia: [
          { value: this.avisoSanitarioState?.alcaldia, disabled: true },
          [Validators.required]
        ],
        localidad: [
          { value: this.avisoSanitarioState?.localidad, disabled: true },
          [Validators.required]
        ],
        domicilioCodigoPostal: [
          { value: this.avisoSanitarioState?.domicilioCodigoPostal, disabled: true },
          [Validators.required]
        ],
        colonia: [
          { value: this.avisoSanitarioState?.colonia, disabled: true },
          [Validators.required]
        ],
        domicilioCalle: [
          { value: this.avisoSanitarioState?.domicilioCalle, disabled: true },
          [Validators.required]
        ],
        numeroExterior: [
          { value: this.avisoSanitarioState?.numeroExterior, disabled: true },
          [Validators.required]
        ],
        numeroInterior: [
          { value: this.avisoSanitarioState?.numeroInterior, disabled: true },
          [Validators.required]
        ],
        domicilioLada: [
          { value: this.avisoSanitarioState?.domicilioLada, disabled: true },
          [Validators.required]
        ],
        domicilioTelefono: [
          { value: this.avisoSanitarioState?.domicilioTelefono, disabled: true },
          [Validators.required]
        ],
        domicilioCorreoElectronico: [
          { value: this.avisoSanitarioState?.domicilioCorreoElectronico, disabled: true },
          [Validators.required]
        ]
      })
    });
  }

  /**
    * Inicializa los catálogos necesarios para el formulario.
    */
  private inicializaCatalogos(): void {
    const PAIS$: Observable<void> = this.avisoSanitarioService
      .getProductoClasificacion(CATALOGOS_ID.CAT_PAIS)
      .pipe(
        map((resp) => {
          this.pais = resp.data;
        })
      );

    merge(
      PAIS$
    )
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Selección del país para actualizar el store.
   */
  paisSeleccion(): void {
    const PAIS = this.domicilioForm.get('cvePais')?.value;
    this.tramite260601Store.setTipoProducto(PAIS);
  }

  /**
   * Manejar cambio para Nacionalidad
   * @param valor Valor seleccionado en "Nacionalidad".
   */
  onNacionalidadCambio(valor: string | number): void {
    this.resetDatosPersonalesForm();
    this.resetDomicilioForm();
    this.nacionalidad = valor;
    this.tipoPersona = '';
    this.datosGeneralesForm.get('tipoPersona')?.setValue('');
    this.mostrarRfcBuscarBoton = false;
    this.mostrarCurpBuscarBoton = false;
    this.inhabilitarPais = true;

    if (valor === 'extranjero') {
      // Eliminar la opción "No Contribuyente" si se selecciona Extranjero
      this.tipoPersonaOpciones = this.inicialTipoPersonaOpciones.filter(
        (option) => option.value !== 'noContribuyente'
      );
    } else {
      // Restaurar todas las opciones cuando se selecciona Nacional
      this.tipoPersonaOpciones = [...this.inicialTipoPersonaOpciones];
    }
  }

  /**
   * Maneja los cambios en el campo "Tipo de persona".
   * Habilita o deshabilita campos adicionales según los valores seleccionados.
   *
   * @param valor Valor seleccionado en "Tipo de persona".
   */
  onTipoPersonaCambio(valor: string | number): void {
    this.tipoPersona = valor;
    this.resetDatosPersonalesForm();
    this.resetDomicilioForm();

    if (this.nacionalidad === 'nacional') {
      if (this.tipoPersona === 'fisica' || this.tipoPersona === 'moral') {
        this.datosGeneralesForm.get('rfcProveedor')?.enable();
        this.mostrarCurpBuscarBoton = false;
        this.mostrarRfcBuscarBoton = true;
      } else if (this.tipoPersona === 'noContribuyente') {
        this.datosGeneralesForm.get('curp')?.enable();
        this.mostrarCurpBuscarBoton = true;
        this.mostrarRfcBuscarBoton = false;
      }
    } else if (this.nacionalidad === 'extranjero') {
      if (this.tipoPersona === 'fisica' || this.tipoPersona === 'moral') {
        this.datosPersonalesForm.enable();
        this.domicilioForm.enable();
        this.inhabilitarPais = false;
      }
    }
  }

  /**
   * Método para restablecer el Formulario de Datos Personales
   */
  resetDatosPersonalesForm(): void {
    this.datosGeneralesForm.get('rfcProveedor')?.disable();
    this.datosGeneralesForm.get('curp')?.disable();
    this.datosPersonalesForm.reset();
    Object.keys(this.datosPersonalesForm.controls).forEach((key) => {
      this.datosPersonalesForm.get(key)?.disable();
    });
  }

  /**
   * Método para restablecer el formulario de dirección
   */
  resetDomicilioForm(): void {
    this.domicilioForm.reset();
    Object.keys(this.domicilioForm.controls).forEach((key) => {
      this.domicilioForm.get(key)?.disable();
    });
  }

  /**
    * Establece los valores en el store de tramite260601.
    *
    * @param {FormGroup} form - El formulario del cual se obtiene el valor.
    * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
    * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
    * @returns {void}
    */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
    * Se ejecuta al destruir el componente.
    * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
    */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}
