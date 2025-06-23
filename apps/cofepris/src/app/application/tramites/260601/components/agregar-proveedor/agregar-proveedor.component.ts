import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  AvisoSanitarioState,
  Tramite260601Store,
} from '../../../../estados/tramites/tramite260601.store';
import {
  CATALOGOS_ID,
  DATOS_CATEGORIAS_TERCEROS,
  TERCEROS_NACIONALIDAD_OPCIONES,
  TIPO_PERSONA_OPCIONES,
} from '../../constantes/aviso-enum';
import {
  Catalogo,
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Observable, Subject, map, merge, takeUntil } from 'rxjs';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';

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
    CatalogoSelectComponent,
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
  public destruirNotificador$: Subject<void> = new Subject();

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
   * Propiedad que define categorías de terceros para la clasificación por nacionalidad y tipo de persona.
   */
  DATOS_CATEGORIAS_TERCEROS = DATOS_CATEGORIAS_TERCEROS;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Utilizado para la inyección de dependencias.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260601Store: Tramite260601Store,
    private tramite260601Query: Tramite260601Query,
    private avisoSanitarioService: AvisoSanitarioService,
    private consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destruirNotificador$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.esFormularioSoloLectura = !seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente.
   * Configura el formulario, inicializa los catálogos y realiza suscripciones necesarias.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.inicializaCatalogos();

    this.tramite260601Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.avisoSanitarioState = seccionState;

          if (
            this.avisoSanitarioState.tercerosNacionalidad ===
            DATOS_CATEGORIAS_TERCEROS.EXTRANJERO
          ) {
            // Eliminar la opción "No Contribuyente" si se selecciona Extranjero
            this.tipoPersonaOpciones = this.inicialTipoPersonaOpciones.filter(
              (option) =>
                option.value !== DATOS_CATEGORIAS_TERCEROS.NO_CONTRIBUYENTE
            );
          } else {
            // Restaurar todas las opciones cuando se selecciona Nacional
            this.tipoPersonaOpciones = [...this.inicialTipoPersonaOpciones];
          }
        })
      )
      .subscribe();

    this.crearFormulario();

    this.paisSeleccion();
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.agregarProveedorForm.disable();
      this.datosGeneralesForm.disable();
      this.datosPersonalesForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.agregarProveedorForm.enable();
      this.datosGeneralesForm.enable();
      this.datosPersonalesForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
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
    return this.agregarProveedorForm.get(
      'datosGeneralesForm.rfcProveedor'
    ) as FormControl;
  }

  /**
   * Crea el formulario principal y define sus subformularios y validaciones.
   */
  crearFormulario(): void {
    this.agregarProveedorForm = this.fb.group({
      datosGeneralesForm: this.fb.group({
        tercerosNacionalidad: [
          this.avisoSanitarioState?.tercerosNacionalidad,
          [Validators.required],
        ],
        tipoPersona: [
          this.avisoSanitarioState?.tipoPersona,
          [Validators.required],
        ],
        rfcProveedor: [
          {
            value: this.avisoSanitarioState?.rfcProveedor,
            disabled: this.avisoSanitarioState?.rfcProveedorInhabilitar,
          },
          [Validators.required],
        ],
        curp: [
          {
            value: this.avisoSanitarioState?.curp,
            disabled: this.avisoSanitarioState?.curpInhabilitar,
          },
          [Validators.required],
        ],
      }),
      datosPersonalesForm: this.fb.group({
        proveedorNombre: [
          {
            value: this.avisoSanitarioState?.proveedorNombre,
            disabled: this.avisoSanitarioState?.proveedorNombreInhabilitar,
          },
          [Validators.required],
        ],
        proveedorPrimerApellido: [
          {
            value: this.avisoSanitarioState?.proveedorPrimerApellido,
            disabled:
              this.avisoSanitarioState?.proveedorPrimerApellidoInhabilitar,
          },
          [Validators.required],
        ],
        proveedorSegundoApellido: [
          {
            value: this.avisoSanitarioState?.proveedorSegundoApellido,
            disabled:
              this.avisoSanitarioState?.proveedorSegundoApellidoInhabilitar,
          },
        ],
        proveedorRazonSocial: [
          {
            value: this.avisoSanitarioState?.proveedorRazonSocial,
            disabled: this.avisoSanitarioState?.proveedorRazonSocialInhabilitar,
          },
          [Validators.required],
        ],
      }),
      domicilioForm: this.fb.group({
        cvePais: [
          {
            value: this.avisoSanitarioState?.cvePais,
            disabled: this.avisoSanitarioState?.cvePaisInhabilitar,
          },
          [Validators.required],
        ],
        domicilioEstado: [
          {
            value: this.avisoSanitarioState?.domicilioEstado,
            disabled: this.avisoSanitarioState?.domicilioEstadoInhabilitar,
          },
          [Validators.required],
        ],
        alcaldia: [
          {
            value: this.avisoSanitarioState?.alcaldia,
            disabled: this.avisoSanitarioState?.alcaldiaInhabilitar,
          },
          [Validators.required],
        ],
        localidad: [
          {
            value: this.avisoSanitarioState?.localidad,
            disabled: this.avisoSanitarioState?.localidadInhabilitar,
          },
          [Validators.required],
        ],
        domicilioCodigoPostal: [
          {
            value: this.avisoSanitarioState?.domicilioCodigoPostal,
            disabled:
              this.avisoSanitarioState?.domicilioCodigoPostalInhabilitar,
          },
          [Validators.required],
        ],
        colonia: [
          {
            value: this.avisoSanitarioState?.colonia,
            disabled: this.avisoSanitarioState?.coloniaInhabilitar,
          },
          [Validators.required],
        ],
        domicilioCalle: [
          {
            value: this.avisoSanitarioState?.domicilioCalle,
            disabled: this.avisoSanitarioState?.domicilioCalleInhabilitar,
          },
          [Validators.required],
        ],
        numeroExterior: [
          {
            value: this.avisoSanitarioState?.numeroExterior,
            disabled: this.avisoSanitarioState?.numeroExteriorInhabilitar,
          },
          [Validators.required],
        ],
        numeroInterior: [
          {
            value: this.avisoSanitarioState?.numeroInterior,
            disabled: this.avisoSanitarioState?.numeroInteriorInhabilitar,
          },
          [Validators.required],
        ],
        domicilioLada: [
          {
            value: this.avisoSanitarioState?.domicilioLada,
            disabled: this.avisoSanitarioState?.domicilioLadaInhabilitar,
          },
          [Validators.required],
        ],
        domicilioTelefono: [
          {
            value: this.avisoSanitarioState?.domicilioTelefono,
            disabled: this.avisoSanitarioState?.domicilioTelefonoInhabilitar,
          },
          [Validators.required],
        ],
        domicilioCorreoElectronico: [
          {
            value: this.avisoSanitarioState?.domicilioCorreoElectronico,
            disabled:
              this.avisoSanitarioState?.domicilioCorreoElectronicoInhabilitar,
          },
          [Validators.required],
        ],
      }),
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

    merge(PAIS$).pipe(takeUntil(this.destruirNotificador$)).subscribe();
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
    this.tramite260601Store.setTercerosNacionalidad(valor);
    this.tramite260601Store.setTipoPersona('');
    this.datosGeneralesForm.get('tipoPersona')?.setValue('');
    this.tramite260601Store.setMostrarRfcBuscarBoton(false);
    this.tramite260601Store.setMostrarCurpBuscarBoton(false);
    this.tramite260601Store.setInhabilitarPais(true);

    if (valor === DATOS_CATEGORIAS_TERCEROS.EXTRANJERO) {
      // Eliminar la opción "No Contribuyente" si se selecciona Extranjero
      this.tipoPersonaOpciones = this.inicialTipoPersonaOpciones.filter(
        (option) => option.value !== DATOS_CATEGORIAS_TERCEROS.NO_CONTRIBUYENTE
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
    this.tramite260601Store.setTipoPersona(valor);
    this.resetDatosPersonalesForm();
    this.resetDomicilioForm();

    if (
      this.avisoSanitarioState.tercerosNacionalidad ===
      DATOS_CATEGORIAS_TERCEROS.NACIONAL
    ) {
      if (
        this.avisoSanitarioState.tipoPersona ===
          DATOS_CATEGORIAS_TERCEROS.FISICA ||
        this.avisoSanitarioState.tipoPersona === DATOS_CATEGORIAS_TERCEROS.MORAL
      ) {
        this.datosGeneralesForm.get('rfcProveedor')?.enable();
        this.tramite260601Store.setRfcProveedorInhabilitar(false);
        this.tramite260601Store.setMostrarRfcBuscarBoton(true);
        this.tramite260601Store.setMostrarCurpBuscarBoton(false);
      } else if (
        this.avisoSanitarioState.tipoPersona ===
        DATOS_CATEGORIAS_TERCEROS.NO_CONTRIBUYENTE
      ) {
        this.datosGeneralesForm.get('curp')?.enable();
        this.tramite260601Store.setCurpInhabilitar(false);
        this.tramite260601Store.setMostrarRfcBuscarBoton(false);
        this.tramite260601Store.setMostrarCurpBuscarBoton(true);
      }
    } else if (
      this.avisoSanitarioState.tercerosNacionalidad ===
      DATOS_CATEGORIAS_TERCEROS.EXTRANJERO
    ) {
      if (
        this.avisoSanitarioState.tipoPersona ===
          DATOS_CATEGORIAS_TERCEROS.FISICA ||
        this.avisoSanitarioState.tipoPersona === DATOS_CATEGORIAS_TERCEROS.MORAL
      ) {
        this.datosPersonalesForm.enable();
        this.inhabilitarDatosPersonalesForm(false);
        this.domicilioForm.enable();
        this.inhabilitarDomicilioForm(false);
        this.tramite260601Store.setInhabilitarPais(false);
      }
    }
  }

  /**
   * Método para restablecer el Formulario de Datos Personales
   */
  resetDatosPersonalesForm(): void {
    this.datosGeneralesForm.get('rfcProveedor')?.disable();
    this.datosGeneralesForm.get('curp')?.disable();
    this.tramite260601Store.setRfcProveedorInhabilitar(true);
    this.tramite260601Store.setCurpInhabilitar(true);
    this.datosPersonalesForm.reset();
    this.resetDatosPersonalesFormState();
    Object.keys(this.datosPersonalesForm.controls).forEach((key) => {
      this.datosPersonalesForm.get(key)?.disable();
    });
    this.inhabilitarDatosPersonalesForm(true);
  }

  /**
   * Método para restablecer el estado del Formulario de Datos Personales
   */
  resetDatosPersonalesFormState(): void {
    this.tramite260601Store.setProveedorNombre('');
    this.tramite260601Store.setProveedorPrimerApellido('');
    this.tramite260601Store.setProveedorSegundoApellido('');
    this.tramite260601Store.setProveedorRazonSocial('');
  }

  /**
   * Método para deshabilitar el Formulario de Datos Personales
   * @param valor El valor indica habilitar/deshabilitar
   */
  inhabilitarDatosPersonalesForm(valor: boolean): void {
    this.tramite260601Store.setProveedorNombreInhabilitar(valor);
    this.tramite260601Store.setProveedorPrimerApellidoInhabilitar(valor);
    this.tramite260601Store.setProveedorSegundoApellidoInhabilitar(valor);
    this.tramite260601Store.setProveedorRazonSocialInhabilitar(valor);
  }

  /**
   * Método para restablecer el formulario de dirección
   */
  resetDomicilioForm(): void {
    this.domicilioForm.reset();
    this.resetDomicilioFormState();
    Object.keys(this.domicilioForm.controls).forEach((key) => {
      this.domicilioForm.get(key)?.disable();
    });
    this.inhabilitarDomicilioForm(true);
  }

  /**
   * Método para restablecer el estado del formulario de dirección.
   */
  resetDomicilioFormState(): void {
    this.tramite260601Store.setPais('');
    this.tramite260601Store.setDomicilioEstado('');
    this.tramite260601Store.setAlcaldia('');
    this.tramite260601Store.setLocalidad('');
    this.tramite260601Store.setDomicilioCodigoPostal('');
    this.tramite260601Store.setColonia('');
    this.tramite260601Store.setDomicilioCalle('');
    this.tramite260601Store.setNumeroExterior('');
    this.tramite260601Store.setNumeroInterior('');
    this.tramite260601Store.setDomicilioLada('');
    this.tramite260601Store.setDomicilioTelefono('');
    this.tramite260601Store.setDomicilioCorreoElectronico('');
  }

  /**
   * Método para deshabilitar el Formulario de Domicilio.
   * @param valor El valor indica habilitar/deshabilitar
   */
  inhabilitarDomicilioForm(valor: boolean): void {
    this.tramite260601Store.setPaisInhabilitar(valor);
    this.tramite260601Store.setDomicilioEstadoInhabilitar(valor);
    this.tramite260601Store.setAlcaldiaInhabilitar(valor);
    this.tramite260601Store.setLocalidadInhabilitar(valor);
    this.tramite260601Store.setDomicilioCodigoPostalInhabilitar(valor);
    this.tramite260601Store.setColoniaInhabilitar(valor);
    this.tramite260601Store.setDomicilioCalleInhabilitar(valor);
    this.tramite260601Store.setNumeroExteriorInhabilitar(valor);
    this.tramite260601Store.setNumeroInteriorInhabilitar(valor);
    this.tramite260601Store.setDomicilioLadaInhabilitar(valor);
    this.tramite260601Store.setDomicilioTelefonoInhabilitar(valor);
    this.tramite260601Store.setDomicilioCorreoElectronicoInhabilitar(valor);
  }

  /**
   * Establece los valores en el store de tramite260601.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260601Store
  ): void {
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
