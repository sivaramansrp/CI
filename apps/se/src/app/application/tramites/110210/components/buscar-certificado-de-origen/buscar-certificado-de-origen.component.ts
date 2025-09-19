import { Catalogo, CertificadoDisponibles, ConsultaioQuery, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { BuscarCertificadoDeOrigenService } from '../../services/buscar-certificado-de-origen/buscarCertificadoDeOrigen.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CertificadoDisponiblesService } from '../../services/certificado-disponibles/certificadoDisponibles.service';
import { CommonModule } from '@angular/common';

import { Tramite110210State, Tramite110210Store } from '../../estados/store/tramite110210.store';
import { Tramite110210Query } from '../../estados/queries/tramite110210.query';

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
  buscarCertificadoDeOrigenFrom!: FormGroup;

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
 * Indica si el formulario está en modo solo lectura.
 * Cuando se establece en `true`, todos los controles del formulario y elementos interactivos
 * se deshabilitan, impidiendo que el usuario realice cambios. Esta propiedad normalmente se
 * configura según el estado de la aplicación, por ejemplo, al visualizar una solicitud enviada
 * o cuando el usuario no tiene permisos de edición.
 */
  esFormularioSoloLectura: boolean = false;
  /**
 * Estado actual de la sección del trámite 120501.
 * Esta propiedad almacena los datos del estado de la sección, obtenidos generalmente
 * desde el store o desde una consulta al backend. Se utiliza para inicializar y actualizar
 * los formularios del componente con los valores correspondientes a la solicitud en curso.
 */
   private seccionState!: Tramite110210State;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {Tramite110210Store} tramite110210Store - Servicio para manejar el estado del trámite.
   * @param {Tramite110210Query} tramite110210Query - Servicio para consultar el estado del trámite.
   */
  constructor(private fb: FormBuilder, 
    private service: BuscarCertificadoDeOrigenService, 
    private tramite110210Store: Tramite110210Store, 
    private tramite110210Query: Tramite110210Query,
    private consultaioQuery: ConsultaioQuery,
    private certificadoService: CertificadoDisponiblesService
  ) {
    
     this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
   
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene los valores del store y los asigna al formulario.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.getValoresStore();
    this.obtenerPaisBloque();
    this.obtenerTratadoAcuerdo();
  }

   /**
 * Inicializa el estado de los formularios según el modo de solo lectura.
 *
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), llama a `guardarDatosFormulario()`
 * para deshabilitar todos los controles. En caso contrario, inicializa los formularios normalmente.
 */
   inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); 
    } else {
      this.inicializarFormulario();
    }
  }
      /**
   * Guarda y actualiza el estado de los formularios según el modo de solo lectura.
   *
   * Inicializa los formularios y luego los deshabilita si el formulario está en modo solo lectura,
   * o los habilita si está en modo edición.
   */
    guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.buscarCertificadoDeOrigenFrom.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.buscarCertificadoDeOrigenFrom.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }

  /**
   * nicializa el formulario reactivo para la búsqueda de certificados de origen.
   * Llama al método para obtener el estado de la solicitud y configura el formulario con los valores actuales del estado de la sección.
   * Los campos incluyen país/bloque, tratado/acuerdo y clave de registro del productor, aplicando validaciones requeridas.
   */
  inicializarFormulario(): void {
    this.obtenerEstadoSolicitud();
    this.buscarCertificadoDeOrigenFrom = this.fb.group({
        paisBloqueClave: [this.seccionState?.paisBloqueClave],
        tratadoAcuerdoClave: [this.seccionState?.tratadoAcuerdoClave],
        cveRegistroProductor: [this.seccionState?.cveRegistroProductor, [Validators.required, Validators.maxLength(12)]],
      });
  }
    /**
   * Suscribe al observable `selectSolicitud$` del query `tramite120501Query` para obtener el estado actual de la solicitud y actualizar la propiedad `seccionState` con los datos recibidos. La suscripción se mantiene activa hasta que se emite un valor en `destroyed$`, evitando fugas de memoria.
   */
  obtenerEstadoSolicitud(): void {
    this.tramite110210Query.selectTramite110210$?.pipe(takeUntil(this.destroyed$))
      .subscribe((data: Tramite110210State) => {
        this.seccionState = data;
      });
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
      (data: Catalogo[]) => {
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
     this.certificadoService.getData().pipe(
        takeUntil(this.destroyed$)
      ).subscribe(
        (data: CertificadoDisponibles[]) => {
            const CVEREGISTROPRODUCTOR = this.buscarCertificadoDeOrigenFrom.get('cveRegistroProductor')?.value;
            const CERTIFICADOS = data.filter(cert => cert.numeroDeCertificado === CVEREGISTROPRODUCTOR);
            if (CERTIFICADOS.length > 0) {
            this.tramite110210Store.setCertificadosDisponibles(CERTIFICADOS);
            }
        }
      );
  }
  /**
   * @method validarFormulario
   * @description
   * Valida el formulario de búsqueda de certificado de origen.
   * Comprueba si el formulario es válido según las reglas de validación configuradas.
   * Si el formulario es válido, retorna `true`.
   * Si el formulario es inválido, marca todos los controles como "tocados" para mostrar los errores de validación y retorna `false`.
   * 
   * @returns {boolean} `true` si el formulario es válido, `false` en caso contrario.
   */
  validarFormulario(): boolean {
    if (this.buscarCertificadoDeOrigenFrom.valid) {
      return true;
    }
    this.buscarCertificadoDeOrigenFrom.markAllAsTouched();
    return false
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