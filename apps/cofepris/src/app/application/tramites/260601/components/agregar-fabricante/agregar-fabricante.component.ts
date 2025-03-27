import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AvisoSanitarioState, Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { CATALOGOS_ID, DATOS_CATEGORIAS_TERCEROS, TERCEROS_NACIONALIDAD_OPCIONES, TIPO_PERSONA_OPCIONES } from '../../constantes/aviso-enum';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Observable, Subject, map, merge, takeUntil } from 'rxjs';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';

/**
 * Componente para gestionar el agregar fabricante.
 */
@Component({
  selector: 'app-agregar-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './agregar-fabricante.component.html',
  styleUrl: './agregar-fabricante.component.css',
})
export class AgregarFabricanteComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal que contiene tres subformularios:
   * datosGeneralesForm, datosPersonalesForm y domicilioForm.
   */
  agregarFabricanteForm!: FormGroup;

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
  paisFabricante!: Catalogo[];

  /**
   * Indica si el campo "País" debe estar deshabilitado.
   */
  inhabilitarPaisFabricante: boolean = true;

  /**
   * Indica si se debe mostrar el botón de búsqueda del RFC.
   */
  mostrarRfcFabricanteBuscarBoton: boolean = false;

  /**
   * Indica si se debe mostrar el botón de búsqueda del CURP.
   */
  mostrarCurpFabricanteBuscarBoton: boolean = false;

  /**
   * Indica si los campos de datos personales deben mostrarse.
   */
  mostrarDatosPersonales: boolean = false;

  /**
   * Propiedad que define categorías de terceros para la clasificación por nacionalidad y tipo de persona.
   */
  DATOS_CATEGORIAS_TERCEROS = DATOS_CATEGORIAS_TERCEROS;

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

          if (this.avisoSanitarioState.tercerosNacionalidadFabricante === DATOS_CATEGORIAS_TERCEROS.EXTRANJERO) {
            // Eliminar la opción "No Contribuyente" si se selecciona Extranjero
            this.tipoPersonaOpciones = this.inicialTipoPersonaOpciones.filter(
              (option) => option.value !== DATOS_CATEGORIAS_TERCEROS.NO_CONTRIBUYENTE
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
   * Obtiene el subformulario "datosGeneralesForm".
   */
  get datosGeneralesForm(): FormGroup {
    return this.agregarFabricanteForm.get('datosGeneralesForm') as FormGroup;
  }

  /**
   * Obtiene el subformulario "datosPersonalesForm".
   */
  get datosPersonalesForm(): FormGroup {
    return this.agregarFabricanteForm.get('datosPersonalesForm') as FormGroup;
  }

  /**
   * Obtiene el subformulario "domicilioForm".
   */
  get domicilioForm(): FormGroup {
    return this.agregarFabricanteForm.get('domicilioForm') as FormGroup;
  }

  /**
   * Obtiene el campo "rfcFabricante" del subformulario "datosGeneralesForm".
   */
  get rfcFabricante(): FormControl {
    return this.agregarFabricanteForm.get('datosGeneralesForm.rfcFabricante') as FormControl;
  }

  /**
   * Crea el formulario principal y define sus subformularios y validaciones.
   */
  crearFormulario(): void {
    this.agregarFabricanteForm = this.fb.group({
      datosGeneralesForm: this.fb.group({
        tercerosNacionalidadFabricante: [
          this.avisoSanitarioState?.tercerosNacionalidadFabricante,
          [Validators.required]
        ],
        tipoPersonaFabricante: [
          this.avisoSanitarioState?.tipoPersonaFabricante,
          [Validators.required]
        ],
        rfcFabricante: [
          { value: this.avisoSanitarioState?.rfcFabricante, disabled: this.avisoSanitarioState?.rfcFabricanteInhabilitar },
          [Validators.required]
        ],
        curpFabricante: [
          { value: this.avisoSanitarioState?.curpFabricante, disabled: this.avisoSanitarioState?.curpFabricanteInhabilitar },
          [Validators.required]
        ],
      }),
      datosPersonalesForm: this.fb.group({
        fabricanteNombre: [
          { value: this.avisoSanitarioState?.fabricanteNombre, disabled: this.avisoSanitarioState?.fabricanteNombreInhabilitar },
          [Validators.required]
        ],
        fabricantePrimerApellido: [
          { value: this.avisoSanitarioState?.fabricantePrimerApellido, disabled: this.avisoSanitarioState?.fabricantePrimerApellidoInhabilitar },
          [Validators.required]
        ],
        fabricanteSegundoApellido: [
          { value: this.avisoSanitarioState?.fabricanteSegundoApellido, disabled: this.avisoSanitarioState?.fabricanteSegundoApellidoInhabilitar }
        ],
        fabricanteRazonSocial: [
          { value: this.avisoSanitarioState?.fabricanteRazonSocial, disabled: this.avisoSanitarioState?.fabricanteRazonSocialInhabilitar },
          [Validators.required]
        ]
      }),
      domicilioForm: this.fb.group({
        cvePaisFabricante: [
          { value: this.avisoSanitarioState?.cvePaisFabricante, disabled: this.avisoSanitarioState?.cvePaisFabricanteInhabilitar },
          [Validators.required]
        ],
        estadoFabricante: [
          { value: this.avisoSanitarioState?.estadoFabricante, disabled: this.avisoSanitarioState?.estadoFabricanteInhabilitar },
          [Validators.required]
        ],
        alcaldiaFabricante: [
          { value: this.avisoSanitarioState?.alcaldiaFabricante, disabled: this.avisoSanitarioState?.alcaldiaFabricanteInhabilitar },
          [Validators.required]
        ],
        localidadFabricante: [
          { value: this.avisoSanitarioState?.localidadFabricante, disabled: this.avisoSanitarioState?.localidadFabricanteInhabilitar },
          [Validators.required]
        ],
        codigoPostalFabricante: [
          { value: this.avisoSanitarioState?.codigoPostalFabricante, disabled: this.avisoSanitarioState?.codigoPostalFabricanteInhabilitar },
          [Validators.required]
        ],
        coloniaFabricante: [
          { value: this.avisoSanitarioState?.coloniaFabricante, disabled: this.avisoSanitarioState?.coloniaFabricanteInhabilitar },
          [Validators.required]
        ],
        calleFabricante: [
          { value: this.avisoSanitarioState?.calleFabricante, disabled: this.avisoSanitarioState?.calleFabricanteInhabilitar },
          [Validators.required]
        ],
        numeroExteriorFabricante: [
          { value: this.avisoSanitarioState?.numeroExteriorFabricante, disabled: this.avisoSanitarioState?.numeroExteriorFabricanteInhabilitar },
          [Validators.required]
        ],
        numeroInteriorFabricante: [
          { value: this.avisoSanitarioState?.numeroInteriorFabricante, disabled: this.avisoSanitarioState?.numeroInteriorFabricanteInhabilitar },
          [Validators.required]
        ],
        ladaFabricante: [
          { value: this.avisoSanitarioState?.ladaFabricante, disabled: this.avisoSanitarioState?.ladaFabricanteInhabilitar },
          [Validators.required]
        ],
        telefonoFabricante: [
          { value: this.avisoSanitarioState?.telefonoFabricante, disabled: this.avisoSanitarioState?.telefonoFabricanteInhabilitar },
          [Validators.required]
        ],
        correoElectronicoFabricante: [
          { value: this.avisoSanitarioState?.correoElectronicoFabricante, disabled: this.avisoSanitarioState?.correoElectronicoFabricanteInhabilitar },
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
          this.paisFabricante = resp.data;
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
    const PAIS = this.domicilioForm.get('cvePaisFabricante')?.value;
    this.tramite260601Store.setTipoProducto(PAIS);
  }

  /**
   * Manejar cambio para Nacionalidad
   * @param valor Valor seleccionado en "Nacionalidad".
   */
  onNacionalidadCambio(valor: string | number): void {
    this.resetDatosPersonalesForm();
    this.resetDomicilioForm();
    this.tramite260601Store.setTercerosNacionalidadFabricante(valor);
    this.tramite260601Store.setTipoPersonaFabricante('');
    this.datosGeneralesForm.get('tipoPersonaFabricante')?.setValue('');
    this.tramite260601Store.setMostrarRfcFabricanteBuscarBoton(false);
    this.tramite260601Store.setMostrarCurpFabricanteBuscarBoton(false);
    this.tramite260601Store.setInhabilitarPaisFabricante(true);

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
    this.tramite260601Store.setTipoPersonaFabricante(valor);
    this.resetDatosPersonalesForm();
    this.resetDomicilioForm();

    if (this.avisoSanitarioState.tercerosNacionalidadFabricante === DATOS_CATEGORIAS_TERCEROS.NACIONAL) {
      if (this.avisoSanitarioState.tipoPersonaFabricante === DATOS_CATEGORIAS_TERCEROS.FISICA || this.avisoSanitarioState.tipoPersonaFabricante === DATOS_CATEGORIAS_TERCEROS.MORAL) {
        this.datosGeneralesForm.get('rfcFabricante')?.enable();
        this.tramite260601Store.setRfcFabricanteInhabilitar(false);
        this.tramite260601Store.setMostrarRfcFabricanteBuscarBoton(true);
        this.tramite260601Store.setMostrarCurpFabricanteBuscarBoton(false);
      } else if (this.avisoSanitarioState.tipoPersonaFabricante === DATOS_CATEGORIAS_TERCEROS.NO_CONTRIBUYENTE) {
        this.datosGeneralesForm.get('curpFabricante')?.enable();
        this.tramite260601Store.setCurpFabricanteInhabilitar(false);
        this.tramite260601Store.setMostrarRfcFabricanteBuscarBoton(false);
        this.tramite260601Store.setMostrarCurpFabricanteBuscarBoton(true);
      }
    } else if (this.avisoSanitarioState.tercerosNacionalidadFabricante === DATOS_CATEGORIAS_TERCEROS.EXTRANJERO) {
      if (this.avisoSanitarioState.tipoPersonaFabricante === DATOS_CATEGORIAS_TERCEROS.FISICA || this.avisoSanitarioState.tipoPersonaFabricante === DATOS_CATEGORIAS_TERCEROS.MORAL) {
        this.datosPersonalesForm.enable();
        this.inhabilitarDatosPersonalesForm(false);
        this.domicilioForm.enable();
        this.inhabilitarDomicilioForm(false);
        this.tramite260601Store.setInhabilitarPaisFabricante(false);
      }
    }
  }

  /**
   * Método para restablecer el Formulario de Datos Personales
   */
  resetDatosPersonalesForm(): void {
    this.datosGeneralesForm.get('rfcFabricante')?.disable();
    this.datosGeneralesForm.get('curpFabricante')?.disable();
    this.tramite260601Store.setRfcFabricanteInhabilitar(true);
    this.tramite260601Store.setCurpFabricanteInhabilitar(true);
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
    this.tramite260601Store.setFabricanteNombre('');
    this.tramite260601Store.setFabricantePrimerApellido('');
    this.tramite260601Store.setFabricanteSegundoApellido('');
    this.tramite260601Store.setFabricanteRazonSocial('');
  }

  /**
   * Método para deshabilitar el Formulario de Datos Personales
   * @param valor El valor indica habilitar/deshabilitar
   */
  inhabilitarDatosPersonalesForm(valor: boolean): void {
    this.tramite260601Store.setFabricanteNombreInhabilitar(valor);
    this.tramite260601Store.setFabricantePrimerApellidoInhabilitar(valor);
    this.tramite260601Store.setFabricanteSegundoApellidoInhabilitar(valor);
    this.tramite260601Store.setFabricanteRazonSocialInhabilitar(valor);
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
    this.tramite260601Store.setPaisFabricante('');
    this.tramite260601Store.setEstadoFabricante('');
    this.tramite260601Store.setAlcaldiaFabricante('');
    this.tramite260601Store.setLocalidadFabricante('');
    this.tramite260601Store.setCodigoPostalFabricante('');
    this.tramite260601Store.setColoniaFabricante('');
    this.tramite260601Store.setCalleFabricante('');
    this.tramite260601Store.setNumeroExteriorFabricante('');
    this.tramite260601Store.setNumeroInteriorFabricante('');
    this.tramite260601Store.setLadaFabricante('');
    this.tramite260601Store.setTelefonoFabricante('');
    this.tramite260601Store.setCorreoElectronicoFabricante('');
  }

  /**
   * Método para deshabilitar el Formulario de Domicilio.
   * @param valor El valor indica habilitar/deshabilitar
   */
  inhabilitarDomicilioForm(valor: boolean): void {
    this.tramite260601Store.setPaisFabricanteInhabilitar(valor);
    this.tramite260601Store.setEstadoFabricanteInhabilitar(valor);
    this.tramite260601Store.setAlcaldiaFabricanteInhabilitar(valor);
    this.tramite260601Store.setLocalidadFabricanteInhabilitar(valor);
    this.tramite260601Store.setCodigoPostalInhabilitar(valor);
    this.tramite260601Store.setColoniaFabricanteInhabilitar(valor);
    this.tramite260601Store.setCalleFabricanteInhabilitar(valor);
    this.tramite260601Store.setNumeroExteriorFabricanteInhabilitar(valor);
    this.tramite260601Store.setNumeroInteriorFabricanteInhabilitar(valor);
    this.tramite260601Store.setLadaFabricanteInhabilitar(valor);
    this.tramite260601Store.setTelefonoFabricanteInhabilitar(valor);
    this.tramite260601Store.setCorreoElectronicoFabricanteInhabilitar(valor);
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
