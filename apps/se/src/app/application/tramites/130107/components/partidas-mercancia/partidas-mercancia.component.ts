import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { ImportacionesAgropecuariasState, ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { PARTIDAS } from '../../constantes/datos-de-la-solicitud.enum';
import { PARTIDAS_DE_LA_MERCANCIA } from '../../constantes/datos-de-la-solicitud.enum';
import { PARTIDAS_TABLA } from '../../constantes/importaciones-agropecuarias.enum';
import { PLANTILLA_PRODUCTO } from '../../constantes/datos-de-la-solicitud.enum';
import { Partidas } from '../../models/partidas.model';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';

/**
 * @component PartidasDeLaMercanciaComponent
 * @description
 * Componente principal para gestionar las partidas de la mercancía en el flujo del trámite 130107.
 * Este componente incluye la lógica para manejar formularios dinámicos, tablas de partidas y datos relacionados con los insumos.
 * 
 * @selector app-partidas-de-la-mercancia
 * @templateUrl ./Partidas-de-la-mercancia.component.html
 * @styleUrl ./Partidas-de-la-mercancia.component.scss
 */
@Component({
  selector: 'app-partidas-de-la-mercancia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent, TablaDinamicaComponent],
  templateUrl: './partidas-mercancia.component.html',
  styleUrl: './partidas-mercancia.component.scss',
})

export class PartidasDeLaMercanciaComponent implements OnInit, OnDestroy {
  /**
   * @property destroy$
   * @description
   * Sujeto utilizado para destruir las suscripciones y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   */
  private destroy$ = new Subject<void>();

  /**
   * @property forma
   * @description
   * Formulario principal del componente.
   * Incluye un grupo de formularios para manejar los datos de los insumos.
   * 
   * @type {FormGroup}
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * @property ninoFormGroup
   * @description
   * Getter para acceder al grupo de formularios de insumos.
   * Retorna el grupo de formularios correspondiente.
   * 
   * @type {FormGroup}
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * @property PartidasDeLaMercancia
   * @description
   * Datos dinámicos del formulario relacionados con las partidas de la mercancía.
   * 
   * @type {ModeloDeFormaDinamica[]}
   */
  public partidasDeLaMercancia = PARTIDAS_DE_LA_MERCANCIA;

  /**
   * @property PartidasDeLa
   * @description
   * Datos adicionales relacionados con las partidas.
   * 
   * @type {ModeloDeFormaDinamica[]}
   */
  public partidasDeLa = PARTIDAS;

  /**
   * @property partidasTabla
   * @description
   * Configuración de las columnas de la tabla de partidas.
   * 
   * @type {ConfiguracionColumna<Partidas>[]}
   */
  public partidasTabla: ConfiguracionColumna<Partidas>[] = PARTIDAS_TABLA;

  /**
   * @property TablaSeleccion
   * @description
   * Tipo de selección para la tabla de partidas.
   * 
   * @type {TablaSeleccion}
   */
  public tablaSeleccion = TablaSeleccion;

  /**
   * @property datospartidas
   * @description
   * Lista de datos de las partidas de la mercancía.
   * 
   * @type {Partidas[]}
   */
  public datospartidas: Partidas[] = [];

  /**
   * @property solicitudDeRegistroState
   * @description
   * Estado actual de la solicitud de registro.
   * 
   * @type {ImportacionesAgropecuariasState}
   */
  public solicitudDeRegistroState!: ImportacionesAgropecuariasState;

  /**
   * @constructor
   * @description
   * Constructor del componente que inyecta los servicios necesarios para manejar los datos y formularios.
   * 
   * @param importacionesAgropecuariasStore Store para manejar el estado de la solicitud.
   * @param importacionesAgropecuariasQuery Query para obtener datos del estado de la solicitud.
   * @param servicioDeFormularioService Servicio para manejar la validación de formularios.
   */
  constructor(
    private importacionesAgropecuariasStore: ImportacionesAgropecuariasStore,
    private importacionesAgropecuariasQuery: ImportacionesAgropecuariasQuery,
    private servicioDeFormularioService: ServicioDeFormularioService
  ) {}

  /**
   * @method ngOnInit
   * @description
   * Método que se ejecuta al inicializar el componente.
   * Configura las suscripciones y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.importacionesAgropecuariasQuery.selectSolicitudDeRegistroTpl$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudDeRegistroState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * @method establecerCambioDeValor
   * @description
   * Método que establece un cambio de valor en el formulario dinámico.
   * Actualiza el valor en el store y en el servicio de formularios.
   * 
   * @param event Objeto que contiene el campo y el valor a actualizar.
   */
  
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      const VALID_VALUE = typeof event.valor === 'object' ? JSON.stringify(event.valor) : event.valor;
      this.importacionesAgropecuariasStore.setDynamicFieldValue(event.campo, VALID_VALUE);
      this.servicioDeFormularioService.setFormValue('partidasForm', {
        [event.campo]: event.valor,
      });
    }
  }

  /**
   * @method agregarPartida
   * @description
   * Método que agrega una nueva partida a la lista de partidas.
   * Valida el formulario antes de agregar la partida.
   */
  agregarPartida(): void {
    if (this.ninoFormGroup.valid) {
      const PRODUCTOS = {
        cantidad: this.ninoFormGroup.get('cantidad')?.value,
        unidad_de_medida: PLANTILLA_PRODUCTO.unidad_de_medida,
        fraccion_arancelaria_tigie: PLANTILLA_PRODUCTO.fraccion_arancelaria_tigie,
        descripcion: this.ninoFormGroup.get('descripcion')?.value,
        precio_unitario: PLANTILLA_PRODUCTO.precio_unitario,
        total_usd: this.ninoFormGroup.get('valorPartidaUsd')?.value,
      };
      this.datospartidas?.push(PRODUCTOS);
      this.ninoFormGroup.reset();
    }
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método que destruye las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}