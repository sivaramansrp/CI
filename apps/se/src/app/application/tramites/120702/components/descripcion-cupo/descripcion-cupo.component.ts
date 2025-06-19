import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Solicitud120702State,
  Tramite120702Store,
} from '../../estados/tramite120702.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import {ConsultaioState} from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import {
  INFORMACION_DESCRIPCION_CUPO,
} from '../../constantes/expedicion-certificados-frontera.enum';
import { Tramite120702Query } from '../../estados/tramite120702.query';
/**
 * Componente encargado de mostrar y administrar el formulario de descripción del cupo
 * dentro del trámite 120702.
 *
 * Este componente utiliza formularios reactivos para la captura de información
 * dinámica y se integra con el store de Akita para actualizar el estado global.
 */
@Component({
  selector: 'app-descripcion-cupo',
  standalone: true,
  imports: [ReactiveFormsModule, FormasDinamicasComponent, CommonModule],
  templateUrl: './descripcion-cupo.component.html',
  styleUrl: './descripcion-cupo.component.scss',
})
export class DescripcionCupoComponent implements OnInit, OnDestroy {
  
 /**
  * Estado de la consulta recibido como entrada desde el componente padre.
  */
  @Input({required:true}) consultaState!: ConsultaioState;
    
  /**
   * Formulario principal del componente.
   * Contiene un subgrupo llamado `ninoFormGroup` donde se almacena la forma dinámica.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * Arreglo con los metadatos para construir dinámicamente el formulario de descripción del cupo.
   */
  public informacionFormData = INFORMACION_DESCRIPCION_CUPO;

  /**
   * Subject usado para destruir las suscripciones activas al destruir el componente.
   */
  private destroy$ = new Subject<void>();

  /**
   * Estado actual del trámite 120702, obtenido desde Akita Store.
   */
  public solicitudState!: Solicitud120702State;

  /**
   * Acceso directo al grupo de formulario hijo `ninoFormGroup`.
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * Constructor del componente.
   * @param tramite120702Store Store de Akita para modificar el estado del trámite.
   * @param tramite120702Query Query de Akita para obtener el estado actual del trámite.
   */
  constructor(
    private tramite120702Store: Tramite120702Store,
    private tramite120702Query: Tramite120702Query
  ) {}

  /**
   * Inicializa el componente y suscribe al estado del trámite desde el store.
   */
  ngOnInit(): void {
    this.tramite120702Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((state) => {
          this.solicitudState = state;
        })
      )
      .subscribe();
  }

  /**
   * Método invocado al detectar un cambio en los valores del formulario.
   * @param event Objeto con el nombre del campo y su nuevo valor.
   */
  establecerCambioDeValor(event: { campo: string; valor: unknown }): void {
    if (event) {
      this.cambioEnValoresStore(event.campo, event.valor);
    }
  }

  /**
   * Actualiza un campo específico del estado global en el store.
   * @param campo Nombre del campo a actualizar.
   * @param valor Nuevo valor del campo.
   */
  cambioEnValoresStore(campo: string, valor: unknown): void {
    this.tramite120702Store.setDynamicFieldValue(campo, valor);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Libera todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
