import { Component, OnDestroy, OnInit } from '@angular/core';
import { FORMULARIO_DETALLES,FORMULARIO_LOGISTICA_OPERACIONES,MERCANCIA_DETALLES, UBICACION_MERCANCIA } from '../../constantes/tramite5601.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite5601State, Tramite5601Store } from '../../estados/stores/tramite5601new.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Tramite5601Query } from '../../estados/queries/tramite5601.query';
import seleccionarOpciones from '@libs/shared/theme/assets/json/5601/selector-5601.json'
/**
 * Componente para gestionar los datos de solicitud, incluyendo su visualización y edición.
 * Se utiliza en un módulo independiente con los componentes necesarios importados.
 */
@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormasDinamicasComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {

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

  public formularioDatosSolicitud = FORMULARIO_DETALLES;

  public formularioDatosMercancia = MERCANCIA_DETALLES;

  public formularioLogisticaOperaciones = FORMULARIO_LOGISTICA_OPERACIONES;

  public formularioUbicacionMercancia = UBICACION_MERCANCIA

  

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


  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  public formularioMercancia: FormGroup = new FormGroup({
    mercanciaFormGroup: new FormGroup({}),
  });

  public formularioLogistica: FormGroup = new FormGroup({
    logisticaFormGroup: new FormGroup({}),
  });

  public formularioUbicacion: FormGroup = new FormGroup({
    ubicacionFormGroup: new FormGroup({}),
  });

  get formularioFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  get datosMercanciaFormGroup(): FormGroup {
    return this.formularioMercancia.get('mercanciaFormGroup') as FormGroup;
  }

  get formularioLogisticaFormGroup(): FormGroup {
    return this.formularioLogistica.get('logisticaFormGroup') as FormGroup;
  }

  get formularioUbicacionFormGroup(): FormGroup {
    return this.formularioUbicacion.get('ubicacionFormGroup') as FormGroup;
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

      this.formularioDatosSolicitud = FORMULARIO_DETALLES.map(campo => {
        switch (campo.id) {
          case 'aduana':
            return { ...campo, opciones: this.aduanas };
          case 'seccionAduanera':
            return { ...campo, opciones: this.seccionAduanera };
          case 'tipoOperacion':
            return { ...campo, opciones: this.tipoOperacion };
          case 'tipoMoneda':
              return { ...campo, opciones: this.tipoMoneda };
          default:
            return campo;
        }
      });

      this.formularioDatosMercancia = MERCANCIA_DETALLES.map(campo => {
        switch (campo.id) {
          case 'tipoMoneda':
              return { ...campo, opciones: this.tipoMoneda };
          default:
            return campo;
        }
      });
  }


  alCambiarTipoOperacion(): void {
    const CAMPO_FECHA_OPERACION = this.formularioDatosSolicitud.find(f => f.campo === 'fechaOperacion');
    if (CAMPO_FECHA_OPERACION) {
      CAMPO_FECHA_OPERACION.mostrar = true;
    }
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

  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.tramite5601Store.setDynamicFieldValue(event.campo, event.valor);

      if (event.campo === 'tipoOperacion') {
        this.alCambiarTipoOperacion();
      }
    }
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
