import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Importante } from '@ng-mf/data-access-user';
import { ImportanteCatalogoSeleccion } from '../../models/registro-muestras-mercancias.model';
import { MuestrasMercanciasStore } from '../../models/registro-muestras-mercancias.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { RenovacionesMuestrasMercanciasQuery } from '../../estados/renovaciones-muestras-mercancias.query';
import { RenovacionesMuestrasMercanciasService } from '../../services/renovaciones-muestras-mercancias/renovaciones-muestras-mercancias.service';
import { RenovacionesMuestrasMercanciasStore } from '../../estados/renovaciones-muestras-mercancias.store';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente para el registro de renovaciones de muestras de mercancías.
 * 
 * Este componente permite gestionar el formulario reactivo para el registro de muestras de mercancías,
 * incluyendo la obtención de opciones desplegables y la manipulación de varios controles de formulario.
 * 
 * @class
 * @implements {OnInit}
 */
@Component({
  selector: 'app-registro-renovaciones-muestras-mercancias',
  templateUrl: './registro-renovaciones-muestras-mercancias.component.html',
  styleUrl: './registro-renovaciones-muestras-mercancias.component.scss',
})
export class RegistroRenovacionesMuestrasMercanciasComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para el registro de muestras de mercancías.
   */
  formRegistroMuestras!: FormGroup;
  /**
   * Constante que contiene los textos importantes.
   */
  TEXTOS = Importante;
  /**
   * Variable que contiene las opciones del importador.
   */
  opcionDeImportador!: CatalogosSelect;
  /**
   * Variable que contiene las opciones de fracción arancelaria AGA.
   */
  fraccionArancelariaAga!: CatalogosSelect;
  /**
   * Propiedad que representa un catálogo de selección.
   * 
   * @type {CatalogosSelect}
   */
  nico!: CatalogosSelect;
  /**
   * Propiedad que representa un catálogo de selección genérico.
   * 
   * @type {CatalogosSelect}
   */
  ideGenerica!: CatalogosSelect;
  /**
   * Representa la selección de catálogo para la toma de muestra de despacho.
   * 
   * @type {CatalogosSelect}
   */
  tomaMuestraDespacho!: CatalogosSelect;
  /**
   * Indica si el panel de despacho o mercancía está activo.
   * 
   * @type {boolean}
   */
  panelDespachoOrMercancia: boolean = false;

  /**
 * Administra el ciclo de vida de la suscripción `darseDeBaja`.
 * 
 * - La variable `darseDeBaja` almacena la suscripción activa,
 *   la cual puede ser `null` si no hay suscripción.
 * - El método `ngOnDestroy` se asegura de que la suscripción
 *   se cancele correctamente cuando el componente se destruya,
 *   evitando fugas de memoria.
 */
  darseDeBaja: Subscription | null = null;

  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor de RegistroRenovacionesMuestrasMercanciasComponent.
   * 
   * @param fb - Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param renovacionesService - Servicio para manejar las operaciones relacionadas con renovaciones de muestras de mercancías.
   */
  constructor(
    public fb: FormBuilder,
    public renovacionesService: RenovacionesMuestrasMercanciasService,
    public renovacionesMuestrasMercanciasStore: RenovacionesMuestrasMercanciasStore,
    public renovacionesMuestrasMercanciasQuery: RenovacionesMuestrasMercanciasQuery
  ) {
     // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta una vez que el componente ha sido inicializado.
   * 
   * En este método se inicializa el formulario `formRegistroMuestras` con varios controles de formulario,
   * algunos de los cuales están deshabilitados y tienen valores predeterminados.
   * 
   * También se llama al método `getOpcionImportador` para obtener las opciones del importador.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.formRegistroMuestras = this.fb.group({
      opcionDeImportador: [''],
      tomaMuestraDespacho: [''],
      descMotivoFaltaMuestra: [{ value: '', disabled: true }],
      comboFraccionConcatenada: [''],
      fraccionConcatenada: [''],
      fracciondescripcion: [{ value: '', disabled: true }],
      comboNicos: [''],
      nicoDescripcion: [{ value: '', disabled: true }],
      nombreQuimico: [
        { value: '', disabled: true },
        [Validators.maxLength(256)],
      ],
      nombreComercial: [
        { value: '', disabled: true },
        [Validators.maxLength(256)],
      ],
      numeroCAS: [
        { value: '', disabled: true },
        [Validators.maxLength(120)],
      ],
      ideGenerica: [{ value: '', disabled: true }],
      descClobGenerica: [{ value: '', disabled: true }],
    });

    // Se suscribe al observable para obtener el registro de muestras de la tienda.
    this.renovacionesMuestrasMercanciasQuery.selectRenovacionesDeRegistro$
      .pipe(
        takeUntil(this.destroyed$),
        map((response: MuestrasMercanciasStore) => {
          this.opcionDeImportador = response.importadorExportadorPrevio;
          this.fraccionArancelariaAga = response.fraccionArancelariaAga;
          this.nico = response.nico;
          this.ideGenerica = response.ideGenerica;
          this.tomaMuestraDespacho = response.tomaMuestraDespacho;
          this.formRegistroMuestras.patchValue({
            opcionDeImportador: response.renovacionesDeRegistro.opcionDeImportador,
            tomaMuestraDespacho: response.renovacionesDeRegistro.tomaMuestraDespacho,
            descMotivoFaltaMuestra: response.renovacionesDeRegistro.descMotivoFaltaMuestra,
            comboFraccionConcatenada: response.renovacionesDeRegistro.comboFraccionConcatenada,
            fraccionConcatenada: response.renovacionesDeRegistro.fraccionConcatenada,
            fracciondescripcion: response.renovacionesDeRegistro.fracciondescripcion,
            comboNicos: response.renovacionesDeRegistro.comboNicos,
            nicoDescripcion: response.renovacionesDeRegistro.nicoDescripcion,
            nombreQuimico: response.renovacionesDeRegistro.nombreQuimico,
            nombreComercial: response.renovacionesDeRegistro.nombreComercial,
            numeroCAS: response.renovacionesDeRegistro.numeroCAS,
            ideGenerica: response.renovacionesDeRegistro.ideGenerica,
            descClobGenerica: response.renovacionesDeRegistro.descClobGenerica,
          });
        })
      )
      .subscribe();
    this.getOpcionImportador();
  }

  /**
   * Obtiene las opciones desplegables del importador y las asigna a las propiedades correspondientes.
   * 
   * Este método realiza una solicitud al servicio `renovacionesService` para obtener las opciones
   * desplegables relacionadas con el importador y las asigna a las propiedades de la clase.
   * 
   * @returns {void} No retorna ningún valor.
   */
  getOpcionImportador(): void {
    this.darseDeBaja = this.renovacionesService.obtenerOpcionesDesplegables().subscribe({
      next: (res: ImportanteCatalogoSeleccion) => {
        this.renovacionesMuestrasMercanciasStore.actualizarImportadorExportador(res.importadorExportadorPrevio)
        this.renovacionesMuestrasMercanciasStore.actualizacionFraccionTarifaAga(res.fraccionArancelariaAga)
        this.renovacionesMuestrasMercanciasStore.actualizarDatosUnicos(res.nico)
        this.renovacionesMuestrasMercanciasStore.actualizacionDeIdeGenerica(res.ideGenerica)
        this.renovacionesMuestrasMercanciasStore.actualizarTakeSampleOffice(res.tomaMuestraDespacho)
        this.renovacionesMuestrasMercanciasStore.actualizarRegistro(res.registroMuestrasDatos)
      },
    });
  }

  /**
   * Muestra la descripción de la fracción arancelaria.
   * 
   * @param {Catalogo} valor - El objeto de catálogo que contiene la descripción de la fracción arancelaria.
   * 
   * Actualiza el campo oculto y el control de descripción en el formulario con la descripción de la fracción arancelaria.
   * Si la descripción contiene un guion (' - '), se toma la parte después del guion como la descripción.
   */
  mostrarDescFraccArancelaria(valor: Catalogo): void {
    let descripcion = '';
    if (valor) {
      const PARTS = valor.descripcion.split(' - ');
      if (PARTS.length >= 2) {
        descripcion = PARTS[1];
      }
    }
    this.formRegistroMuestras.patchValue({
      fraccionConcatenada: valor.descripcion,
      fracciondescripcion: descripcion,
    });
  }

  /**
   * Muestra u oculta el panel de trámite basado en el evento recibido.
   *
   * @param {Catalogo} event - El evento que contiene el id para determinar la acción.
   * @returns {void}
   */
  mostrarOcultarPanelTramite(event: Catalogo): void {
    const VALOR = event.id;
    if (VALOR === 1) {
      this.panelDespachoOrMercancia = true;
    } else {
      this.panelDespachoOrMercancia = false;
    }
  }

  /**
   * Cambia el estado del campo 'descMotivoFaltaMuestra' en el formulario 'formRegistroMuestras'
   * basado en el valor del evento recibido.
   *
   * @param {Catalogo} event - El evento que contiene el id para determinar el estado del campo.
   * 
   * - Si el id del evento es 1, habilita el campo 'descMotivoFaltaMuestra'.
   * - Si el id del evento es 0, deshabilita el campo 'descMotivoFaltaMuestra' y limpia su valor.
   * - Para cualquier otro valor del id, deshabilita el campo 'descMotivoFaltaMuestra'.
   */
  cambiaEstadoMotivo(event: Catalogo): void {
    const VALOR = event.id;
    if (VALOR === 1) {
      this.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enable();
    } else if (VALOR === 0) {
      this.formRegistroMuestras.patchValue({ descMotivoFaltaMuestra: '' });
      this.formRegistroMuestras.get('descMotivoFaltaMuestra')?.disable();
    } else {
      this.formRegistroMuestras.get('descMotivoFaltaMuestra')?.disable();
    }
  }
   /**
     * Hook del ciclo de vida que se invoca cuando se destruye el componente.
     * - Verifica si la suscripción `darseDeBaja` está activa.
     * - Si existe, se da de baja (unsubscribe) del observable para liberar recursos.
     * - Establece `darseDeBaja` a `null` como parte del proceso de limpieza.
     */
  ngOnDestroy(): void {
    if (this.darseDeBaja) {
      this.darseDeBaja.unsubscribe();
      this.darseDeBaja = null;
    }
  }
}
