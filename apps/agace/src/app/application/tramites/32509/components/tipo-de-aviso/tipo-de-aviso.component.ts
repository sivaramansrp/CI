import { AVISO_OPCIONES, CASO_FORTUITO, DESTRUCCION_FECHA, ETIQUETA_DE_ARCHIVO, MENSAJE, TEXTO } from '../../constantes/destruccion-o-donacion';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestruccionState, DestruccionStore } from '../../estados/Tramite32509.store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { DestruccionQuery } from '../../estados/Tramite32509.query';

/**
 * @description Componente para gestionar el formulario de tipo de aviso en el trámite 32509.
 */
@Component({
  selector: 'app-tipo-de-aviso',
  templateUrl: './tipo-de-aviso.component.html',
  styleUrl: './tipo-de-aviso.component.scss',
})
export class TipoDeAvisoComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} avisoForm - Formulario reactivo para capturar los datos del aviso.
   */
  avisoForm!: FormGroup;

  /**
   * @property {Array} avisoOpciones - Opciones disponibles para el tipo de aviso.
   */
  avisoOpciones = AVISO_OPCIONES;

  /**
   * @property {string} MENSAJE - Mensaje informativo relacionado con el aviso.
   */
  MENSAJE = MENSAJE;

  /**
   * @property {string} desrtuccionFecha - Fecha de destrucción predeterminada.
   */
  desrtuccionFecha = DESTRUCCION_FECHA;

  /**
   * @property {Array} casoFortuitoOpcion - Opciones para el caso fortuito.
   */
  casoFortuitoOpcion = CASO_FORTUITO;

  /**
   * @property {string} avisoValor - Valor seleccionado para el tipo de aviso.
   */
  avisoValor: string = 'deposito_fiscal';

  /**
   * @property {string} TEXTO - Texto informativo relacionado con el aviso.
   */
  TEXTO = TEXTO;

  /**
   * @property {HTMLInputElement} entradaArchivo - Referencia al input de archivo.
   */
  entradaArchivo!: HTMLInputElement;

  /**
   * @property {string} etiquetaDeArchivo - Etiqueta del archivo seleccionado.
   */
  etiquetaDeArchivo: string = ETIQUETA_DE_ARCHIVO;

  /**
   * @property {File | null} archivoMedicamentos - Archivo seleccionado para los medicamentos.
   */
  archivoMedicamentos: File | null = null;

  /**
   * @property {Subject<void>} destroyNotifier$ - Notificador para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {DestruccionState} destruccionState - Estado actual del formulario de destrucción.
   */
  private destruccionState!: DestruccionState;

  /**
   * @property {SeccionLibState} seccionState - Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

  /**
   * @property {string} DestruccionFecha - Fecha de destrucción seleccionada.
   */
  DestruccionFecha: string = '15/03/2025';

  /**
   * @constructor
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {DestruccionStore} store - Almacén para gestionar el estado del formulario.
   * @param {DestruccionQuery} query - Consulta para obtener el estado del formulario.
   * @param {SeccionLibStore} seccionStore - Almacén para gestionar el estado de la sección.
   * @param {SeccionLibQuery} seccionQuery - Consulta para obtener el estado de la sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private store: DestruccionStore,
    private query: DestruccionQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) {}

  /**
   * @description Inicializa el componente y configura las suscripciones necesarias.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();
    this.query.selectDestruccion$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.destruccionState = state as DestruccionState;
        })
      )
      .subscribe();
    this.initActionBuilder();

    this.campoObligatorioChange();

    this.seccionStore.establecerSeccion([false]);

    this.avisoForm.statusChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        () => {
          if(this.avisoForm.valid) {
            this.seccionStore.establecerSeccion([true]);
            this.seccionStore.establecerFormaValida([true])
        }
      }
      );
  }

  /**
   * @description Configura el formulario reactivo con los valores iniciales.
   */
  initActionBuilder(): void {
    this.avisoForm = this.fb.group({
      tipoDeAviso: [this.destruccionState.tipoDeAviso],
      nombre: [this.destruccionState.nombre, Validators.required],
      rfc: [this.destruccionState.rfc, Validators.required],
      entidadFederativa: [this.destruccionState.entidadFederativa, Validators.required],
      alcaldiaMunicipo: [this.destruccionState.alcaldiaMunicipo, Validators.required],
      colonia: [this.destruccionState.colonia, Validators.required],
      calle: [this.destruccionState.calle, Validators.required],
      numeroExterior: [this.destruccionState.numeroExterior, Validators.required],
      numeroInterior: [this.destruccionState.numeroInterior],
      codigoPostal: [this.destruccionState.codigoPostal, Validators.required],
      cartaCupo: [this.destruccionState.cartaCupo, Validators.required],
      numeraDeAcuse: [this.destruccionState.numeraDeAcuse, Validators.required],
      destruccionMercancia: [this.destruccionState.destruccionMercancia, Validators.required],
      merccanciaEntidadFederativa: [this.destruccionState.merccanciaEntidadFederativa, Validators.required],
      merccanciaAlcaldiaMunicipo: [this.destruccionState.merccanciaAlcaldiaMunicipo, Validators.required],
      merccanciaColonia: [this.destruccionState.merccanciaColonia, Validators.required],
      merccanciaCalle: [this.destruccionState.merccanciaCalle, Validators.required],
      merccanciaNumeroExterior: [this.destruccionState.merccanciaNumeroExterior, Validators.required],
      merccanciaNumeroInterior: [this.destruccionState.merccanciaNumeroInterior],
      merccanciaCodigoPostal: [this.destruccionState.merccanciaCodigoPostal, Validators.required],
      destruir: [this.destruccionState.destruir, Validators.required],
      tarifa: [this.destruccionState.tarifa, Validators.required],
      destruccionEntidadFederativa: [this.destruccionState.destruccionEntidadFederativa, Validators.required],
      destruccionAlcaldiaMunicipo: [this.destruccionState.destruccionAlcaldiaMunicipo, Validators.required],
      destruccionColonia: [this.destruccionState.destruccionColonia, Validators.required],
      destruccionCalle: [this.destruccionState.destruccionCalle, Validators.required],
      destruccionNumeroExterior: [this.destruccionState.destruccionNumeroExterior, Validators.required],
      destruccionNumeroInterior: [this.destruccionState.destruccionNumeroInterior],
      destruccionCodigoPostal: [this.destruccionState.destruccionCodigoPostal, Validators.required],
      destruccionHora: [this.destruccionState.destruccionHora, Validators.required],
      desturccionProceso: [this.destruccionState.desturccionProceso, Validators.required],
      casofortuito: [this.destruccionState.casofortuito, Validators.required],
      donoMercancia: [this.destruccionState.donoMercancia, Validators.required],
      condicionesMateriales: [this.destruccionState.condicionesMateriales, Validators.required],
      caboDestruccionFecha: [{ value: this.destruccionState.caboDestruccionFecha || '', disabled: true }, Validators.required],
    });
  }

  /**
   * @description Cambia los campos obligatorios del formulario según el tipo de aviso seleccionado.
   * Este método ajusta los validadores de los campos relacionados con la destrucción dependiendo
   * del valor actual del tipo de aviso. Si el tipo de aviso es 'deposito_fiscal', los campos se
   * marcan como requeridos; en caso contrario, se eliminan los validadores requeridos.
   * Se actualiza la validez de los controles afectados.
   * @returns {void}
   */
  campoObligatorioChange(): void {
      const DESTRUCCIONENTIDADFEDERATIVA = this.avisoForm.get('destruccionEntidadFederativa');
      const DESTRUCCIONALCALDIAMUNICIPO = this.avisoForm.get('destruccionAlcaldiaMunicipo');
      const DESTRUCCIONCOLONIA = this.avisoForm.get('destruccionColonia');
      const DESTRUCCIONCALLE = this.avisoForm.get('destruccionCalle');
      const DESTRUCCIONNUMEROEXTERIOR = this.avisoForm.get('destruccionNumeroExterior');
      const DESTRUCCIONNUMEROINTERIOR = this.avisoForm.get('destruccionNumeroInterior');
      const DESTRUCCIONCODIGOPOSTAL = this.avisoForm.get('destruccionCodigoPostal');
      const DESTRUCCIONHORA = this.avisoForm.get('destruccionHora');
      const DESTRUCCIONPROCESO = this.avisoForm.get('desturccionProceso');
      const CASOFORTUITO = this.avisoForm.get('casofortuito');
      if(this.destruccionState.tipoDeAviso === 'deposito_fiscal') {
        DESTRUCCIONENTIDADFEDERATIVA?.setValidators([Validators.required]);
        DESTRUCCIONALCALDIAMUNICIPO?.setValidators([Validators.required]);
        DESTRUCCIONCOLONIA?.setValidators([Validators.required]);
        DESTRUCCIONCALLE?.setValidators([Validators.required]);
        DESTRUCCIONNUMEROEXTERIOR?.setValidators([Validators.required]);
        DESTRUCCIONNUMEROINTERIOR?.setValidators([Validators.required]);
        DESTRUCCIONCODIGOPOSTAL?.setValidators([Validators.required]);
        DESTRUCCIONHORA?.setValidators([Validators.required]);
        DESTRUCCIONPROCESO?.setValidators([Validators.required]);
        CASOFORTUITO?.setValidators([Validators.required]);
      }
      else{
        DESTRUCCIONENTIDADFEDERATIVA?.clearValidators();
        DESTRUCCIONALCALDIAMUNICIPO?.clearValidators();
        DESTRUCCIONCOLONIA?.clearValidators();
        DESTRUCCIONCALLE?.clearValidators();
        DESTRUCCIONNUMEROEXTERIOR?.clearValidators();
        DESTRUCCIONNUMEROINTERIOR?.clearValidators();
        DESTRUCCIONCODIGOPOSTAL?.clearValidators();
        DESTRUCCIONHORA?.clearValidators();
        DESTRUCCIONPROCESO?.clearValidators();
        CASOFORTUITO?.clearValidators();
      }
      DESTRUCCIONENTIDADFEDERATIVA?.updateValueAndValidity();
      DESTRUCCIONALCALDIAMUNICIPO?.updateValueAndValidity();
      DESTRUCCIONCOLONIA?.updateValueAndValidity();
      DESTRUCCIONCALLE?.updateValueAndValidity();
      DESTRUCCIONNUMEROEXTERIOR?.updateValueAndValidity();
      DESTRUCCIONNUMEROINTERIOR?.updateValueAndValidity();
      DESTRUCCIONCODIGOPOSTAL?.updateValueAndValidity();
      DESTRUCCIONHORA?.updateValueAndValidity();
      DESTRUCCIONPROCESO?.updateValueAndValidity();
      CASOFORTUITO?.updateValueAndValidity();
    }


  /**
   * @description Actualiza la fecha de destrucción en el formulario.
   * @param {string} nuevoValor - Nuevo valor de la fecha.
   */
  cambioFecha(nuevoValor: string): void {
    this.avisoForm.patchValue({
      caboDestruccionFecha: nuevoValor,
    });
    this.DestruccionFecha = nuevoValor;
  }

  /**
   * @description Actualiza el valor del tipo de aviso en el formulario.
   * @param {string} nombreControl - Nombre del control en el formulario.
   * @param {string} valor - Valor a asignar.
   */
  avisoValorRadio(nombreControl: string, valor: string): void {
    this.avisoForm.patchValue({
      [nombreControl]: valor,
    });
    this.avisoValor = valor;
  }

  /**
   * @description Activa la selección de un archivo.
   */
  activarSeleccionArchivo(): void {
    this.entradaArchivo = document.getElementById('archivoMedicamentos') as HTMLInputElement;
    if (this.entradaArchivo) {
      this.entradaArchivo.click();
    }
  }

  /**
   * @description Maneja el cambio de archivo seleccionado.
   * @param {Event} event - Evento de cambio de archivo.
   */
  onCambioDeArchivo(event: Event): void {
    const TARGET = event.target as HTMLInputElement;

    if (TARGET.files && TARGET.files.length > 0) {
      this.archivoMedicamentos = TARGET.files[0];
      this.etiquetaDeArchivo = this.archivoMedicamentos.name;
    } else {
      this.etiquetaDeArchivo = ETIQUETA_DE_ARCHIVO;
    }
  }

  /**
   * @description Establece valores en el store a partir del formulario.
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Nombre del campo en el formulario.
   * @param {keyof DestruccionStore} metodoNombre - Método del store a invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof DestruccionStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: string | number | boolean | null) => void)(
      VALOR
    );
  }

  /**
   * Limpia las suscripciones activas cuando el componente es destruido.
   * Este método se llama automáticamente cuando el componente es destruido para evitar fugas de memoria.
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}