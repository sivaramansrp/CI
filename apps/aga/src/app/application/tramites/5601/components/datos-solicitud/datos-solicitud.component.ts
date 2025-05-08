import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite5601State, Tramite5601Store } from '../../estados/stores/tramite5601.store';
import { CommonModule } from '@angular/common';
import { Tramite5601Query } from '../../estados/queries/tramite5601.query';
import seleccionarOpciones from '@libs/shared/theme/assets/json/5601/selector-5601.json'
/**
 * Componente para gestionar los datos de solicitud, incluyendo su visualización y edición.
 * Se utiliza en un módulo independiente con los componentes necesarios importados.
 */
@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule, TituloComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {

  /**
   * Formulario principal para los datos de la solicitud.
   */
  formulario!: FormGroup;

  /**
   * Formulario para los datos relacionados con la mercancía.
   */
  formularioMercancia!: FormGroup;

  /**
   * Formulario para los datos relacionados con la logística.
   */
  formularioLogistica!: FormGroup;

  /**
   * Formulario para los datos relacionados con la ubicación de la mercancía.
   */
  formularioUbicacionMercancia!: FormGroup;

  /**
   * Catálogo de aduanas disponibles.
   */
  aduanas!: Catalogo[];

  /**
   * Catálogo de secciones aduaneras disponibles.
   */
  seccionAduanera!: Catalogo[];

  /**
   * Catálogo de tipos de operación disponibles.
   */
  tipoOperacion!: Catalogo[];

  /**
   * Catálogo de tipos de moneda disponibles.
   */
  tipoMoneda!: Catalogo[];

  /**
   * Indicador para mostrar o no la fecha de operación.
   */
  mostrarFechaOperacion: boolean = false;

  /**
   * Estado actual de los datos de la solicitud.
   */
  public DatosSolicitudState!: Tramite5601State;

  /**
 * Un Subject que emite un valor `void` cuando el componente es destruido.
 * Se utiliza para gestionar y limpiar suscripciones, evitando fugas de memoria.
 */
  private destroyed$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Inicializa los catálogos y servicios necesarios.
   * @param fb FormBuilder para la creación de formularios reactivos.
   * @param tramite5601Store Servicio para gestionar el estado del trámite 5601.
   * @param tramite5601Query Servicio para consultar el estado del trámite 5601.
   */
  constructor(private fb: FormBuilder, private tramite5601Store: Tramite5601Store, private tramite5601Query: Tramite5601Query) {
    this.aduanas = seleccionarOpciones?.aduanas;
    this.seccionAduanera = seleccionarOpciones?.seccionAduanera;
    this.tipoOperacion = seleccionarOpciones?.tipoOperacion;
    this.tipoMoneda = seleccionarOpciones?.tipoMoneda;
  }

  /**
   * Método del ciclo de vida de Angular que se llama al inicializar el componente.
   * Configura los formularios y suscribe a los cambios en el estado del trámite.
   */
  ngOnInit(): void {
    this.tramite5601Query.selectCertificacion$
      .pipe(
        takeUntil(this.destroyed$),
        map((datosSolicitudState) => {
          this.DatosSolicitudState = datosSolicitudState;
        })
      )
      .subscribe();

    // Configuración del formulario principal
    this.formulario = this.fb.group({
      aduana: [this.DatosSolicitudState.aduana, Validators.required],
      seccionAduanera: [this.DatosSolicitudState.seccionAduanera],
      tipoOperacion: [this.DatosSolicitudState.tipoOperacion, Validators.required],
      fechaOperacion: [this.DatosSolicitudState.fechaOperacion, Validators.required],
      motivoDespachoDomicilio: [this.DatosSolicitudState.motivoDespachoDomicilio, Validators.required],
      observaciones: [this.DatosSolicitudState.observaciones]
    });

    // Configuración del formulario de mercancía
    this.formularioMercancia = this.fb.group({
      especificacionesMercancia: [this.DatosSolicitudState.especificacionesMercancia, Validators.required],
      descripcionMercancia: [this.DatosSolicitudState.descripcionMercancia, Validators.required],
      tipoMoneda: [this.DatosSolicitudState.tipoMoneda, Validators.required],
      valorMercancia: [this.DatosSolicitudState.valorMercancia, Validators.required],
    });

    // Configuración del formulario de logística
    this.formularioLogistica = this.fb.group({
      esquemasControlSeguridad: [this.DatosSolicitudState.esquemasControlSeguridad, Validators.required],
      distanciaRutaTiempos: [this.DatosSolicitudState.distanciaRutaTiempos, Validators.required],
    });

    // Configuración del formulario de ubicación de mercancía
    this.formularioUbicacionMercancia = this.fb.group({
      direccion: [this.DatosSolicitudState.direccion, Validators.required],
      telefono: [this.DatosSolicitudState.telefono, Validators.required],
      distanciaAduana: [this.DatosSolicitudState.distanciaAduana, Validators.required],
      referencias: [this.DatosSolicitudState.referencias, Validators.required],
    });
  }

  /**
   * Método que se ejecuta al cambiar el tipo de operación.
   * Actualiza el estado para mostrar la fecha de operación y guarda el valor en el store.
   */
  alCambiarTipoOperacion(): void {
    this.mostrarFechaOperacion = true;
    this.setValoresStore(this.formulario, 'tipoOperacion', 'setTipoOperacion');
  }

  /**
   * Método genérico para actualizar valores en el store.
   * @param form Formulario reactivo que contiene el campo a actualizar.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el store para actualizar el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite5601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite5601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
* Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
* Este método completa el observable destroyed$ para cancelar las suscripciones activas.
*/
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


}
