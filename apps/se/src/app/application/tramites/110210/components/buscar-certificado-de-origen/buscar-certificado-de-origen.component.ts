import { BuscarCertificadoDeOrigenService, Catalogo, CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { Tramite110210Query } from '../../estados/queries/tramite110210.query';
import { Tramite110210Store } from '../../estados/store/tramite110210.store';

/**
 * @descripcion
 * El componente `BuscarCertificadoDeOrigenComponent` es responsable de gestionar la lógica
 * y la interfaz de usuario para buscar certificados de origen en la aplicación.
 *
 * @selector app-buscar-certificado-de-origen
 * @templateUrl ./buscar-certificado-de-origen.component.html
 * @styleUrl ./buscar-certificado-de-origen.component.scss
 */
@Component({
  selector: 'app-buscar-certificado-de-origen',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './buscar-certificado-de-origen.component.html',
  styleUrl: './buscar-certificado-de-origen.component.scss',
})
export class BuscarCertificadoDeOrigenComponent implements OnInit, OnDestroy {
  /**
   * Formulario para buscar el certificado de origen.
   * @type {FormGroup}
   */
  buscarCertificadoDeOrigenFrom: FormGroup;

  /**
   * Arreglo de objetos `Catalogo` que representa los países o bloques.
   * @type {Catalogo[]}
   */
  paisBloque: Catalogo[] = [];

  /**
   * Arreglo de objetos `Catalogo` que representa los tratados o acuerdos.
   * @type {Catalogo[]}
   */
  tratadoAcuerdo: Catalogo[] = [];

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {Tramite110210Store} tramite110210Store - Servicio para manejar el estado del trámite.
   * @param {Tramite110210Query} tramite110210Query - Servicio para consultar el estado del trámite.
   */
  constructor(private fb: FormBuilder, private service: BuscarCertificadoDeOrigenService, private tramite110210Store: Tramite110210Store, private tramite110210Query: Tramite110210Query) {
    this.buscarCertificadoDeOrigenFrom = this.fb.group({
      cveRegistroProductor: ['', [Validators.required, Validators.maxLength(12)]],
      solicitud: this.fb.group({
        idSolicitud: [null],
        idSolicitudProductor: [''],
      }),
    });
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene los valores del store y los asigna al formulario.
   */
  ngOnInit(): void {
    this.getValoresStore();
    this.obtenerPaisBloque();
    this.obtenerTratadoAcuerdo();
  }

  /**
 * @descripcion
 * Método que obtiene los datos de los países o bloques desde el servicio
 * y los asigna a la propiedad `paisBloque`.
 *
 * Este método utiliza un observable para suscribirse a los datos proporcionados
 * por el servicio `BuscarCertificadoDeOrigenService` y se asegura de desuscribirse
 * automáticamente cuando el componente se destruye, utilizando el operador `takeUntil`.
 *
 * @returns {void}
 */
  obtenerPaisBloque(): void {
    this.service.getPaisBloque().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.paisBloque = data;
      }
    );
  }

  /**
 * @descripcion
 * Método que obtiene los datos de los países o bloques desde el servicio
 * y los asigna a la propiedad `tratadoAcuerdo`.
 *
 * Este método utiliza un observable para suscribirse a los datos proporcionados
 * por el servicio `BuscarCertificadoDeOrigenService` y se asegura de desuscribirse
 * automáticamente cuando el componente se destruye, utilizando el operador `takeUntil`.
 *
 * @returns {void}
 */
  obtenerTratadoAcuerdo(): void {
    this.service.getTratadoAcuerdo().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.tratadoAcuerdo = data;
      }
    );
  }

  /**
   * Establece los valores en el store.
   * @param {FormGroup} form - El formulario del cual se obtienen los valores.
   * @param {string} campo - El nombre del campo del formulario.
   * @param {keyof Tramite110210Store} metodoNombre - El nombre del método del store.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110210Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110210Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }



  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValoresStore(): void {
    this.tramite110210Query.selectTramite110210$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.buscarCertificadoDeOrigenFrom.patchValue({
            cveRegistroProductor: seccionState.cveRegistroProductor,
            paisBloqueClave: seccionState.paisBloqueClave,
            tratadoAcuerdoClave: seccionState.tratadoAcuerdoClave,
          });
        })
      )
      .subscribe();
  }

  /**
   * Verifica si un control del formulario es inválido.
   * @param {string} nombreControl - Nombre del control del formulario.
   * @returns {boolean} - Retorna true si el control es inválido, de lo contrario false.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.buscarCertificadoDeOrigenFrom.get(nombreControl);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }

  /**
   * Actualiza el estado del grid de comercializadores de productos.
   */
  actualizaGridComercializadoresProductos(): void {
    const IDSOLICITUD = this.buscarCertificadoDeOrigenFrom.get('solicitud.idSolicitud')?.value;
    if (IDSOLICITUD === null) {
      this.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.enable();
    } else {
      this.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.disable();
    }
  }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}