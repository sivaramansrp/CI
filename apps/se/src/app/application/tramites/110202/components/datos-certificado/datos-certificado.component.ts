import { Catalogo, SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosCertificadoDeComponent } from "../../../../shared/components/datos-certificado-de/datos-certificado-de.component";
import { ToastrService } from 'ngx-toastr';
import { Tramite110202Query } from '../../estados/tramite110202.query';
import { Tramite110202Store } from '../../estados/tramite110202.store';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatosCertificadoDeComponent],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss'
})
export class DatosCertificadoComponent implements OnDestroy, OnInit {
  
  // Variable booleana que indica si es necesario o no (precisa) en el formulario
  precisa: boolean = true;
  
  // Variable booleana que indica si el idioma está habilitado o no
  idioma: boolean = true;
  
  // Variable booleana que indica si el idioma está habilitado o no
  presenta: boolean = true;
  /**
   * Formulario reactivo que contiene los datos del certificado.
   * Utilizado para la validación y gestión de los datos en el formulario.
   */
  formDatosCertificado!: FormGroup;

  /**
   * Valores actuales del formulario de datos del certificado.
   */
  formDatosCertificadoValues!: { [key: string]: unknown};

  /**
   * Subject utilizado para gestionar el ciclo de vida del componente y cancelar las suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Observable que contiene la lista de idiomas disponibles.
   */
  idiomaDatos$!: Observable<Catalogo[]>;

  /**
   * Observable que contiene la lista de entidades federativas disponibles.
   */
  entidadFederativas$!: Observable<Catalogo[]>;

  /**
   * Observable que contiene la lista de representaciones federales disponibles.
   */
  representacionFederal$!: Observable<Catalogo[]>;

  /**
   * Estado de la sección, gestionado mediante el store.
   * @type {SeccionLibState}
   */
  private seccion!: SeccionLibState;
   /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente. Inicializa el formulario y las dependencias necesarias.
   * @param fb Instancia del FormBuilder para la creación del formulario.
   * @param store Instancia del store para el manejo de datos.
   * @param tramiteQuery Instancia del query para obtener datos de estado.
   * @param certificadoService Servicio encargado de obtener los datos del certificado.
   * @param toastr Servicio de notificaciones (Toastr).
   * @param seccionQuery Consulta para obtener el estado de la sección.
   * @param seccionStore Store para manejar el estado de la sección.
   * @param consultaQuery Consulta para obtener el estado de la consulta.
   */
  constructor(
    private fb: FormBuilder,
    public store: Tramite110202Store,
    public tramiteQuery: Tramite110202Query,
    public certificadoService: CertificadoValidacionService,
    private toastr: ToastrService,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    public consultaQuery: ConsultaioQuery
  ) {

    /**
     * Suscripción al estado del formulario para actualizar los valores del formulario al obtener datos.
     */
    this.tramiteQuery.formDatosCertificado$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe(estado => {
        this.formDatosCertificadoValues = estado;
    });

    /**
     * Suscripción al estado de la sección para obtener y actualizar el estado.
     */
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    /**
     * Asignación de los observables que contienen los catálogos de datos a los que se puede suscribir el componente.
     */
    this.idiomaDatos$ = this.tramiteQuery.selectIdioma$;
    this.entidadFederativas$ = this.tramiteQuery.selectEntidadFederativa$;
    this.representacionFederal$ = this.tramiteQuery.selectrepresentacionFederal$;
  }

  /**
   * Getter para acceder al control del formulario, utilizado para la validación.
   * @returns FormControl del formulario.
   */
  get formularioControl(): FormControl {
    return this.formDatosCertificado.get('') as FormControl;
  }

  /**
   * Método de ciclo de vida de Angular, se ejecuta al inicializar el componente.
   * Se utiliza para cargar los datos y suscribirse a los cambios del formulario.
   */
  ngOnInit(): void {
    this.cargarIdioma();
    this.cargarEntidadFederativa();
    this.cargarRepresentacionFederal();
      this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {          
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
  }

   /**
   * Establece valores en el estado de la tienda para un formulario genérico de certificado.
   * 
   * @param event - Objeto que contiene los datos necesarios para actualizar el estado.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en esta implementación).
   * @param event.campo - Nombre del campo que se actualizará en el estado.
   * @param event.valor - Valor que se asignará al campo especificado.
   * @param event.storeStateName - Nombre del estado de la tienda (no utilizado en esta implementación).
   * 
   * @returns void
   * 
   * @command Este método actualiza el estado de la tienda con los valores proporcionados.
   */
   setValoresStore(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }) :void{
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormDatosCertificado({ [CAMPO]: VALOR });
  }
  /**
   * Método que selecciona un idioma y actualiza el estado en el store.
   * @param estado El estado del idioma seleccionado.
   */
  idiomaSeleccion(estado: Catalogo): void {
    this.store.setIdiomaSeleccion(estado);
  }

  /**
   * Método para obtener los datos del formulario y enviarlos al store.
   * @param e Los datos del formulario.
   */
  obtenerDatosFormulario(e: unknown): void {
    this.store.setFormDatosCertificado(e as { [key: string]: unknown});
  }

  /**
   * Método que selecciona una entidad federativa y actualiza el estado en el store.
   * @param estado El estado de la entidad federativa seleccionada.
   */
  entidadFederativaSeleccion(estado: Catalogo): void {
    this.store.setEntidadFederativaSeleccion(estado);
  }

  /**
   * Método que selecciona una representación federal y actualiza el estado en el store.
   * @param estado El estado de la representación federal seleccionada.
   */
  representacionFederalSeleccion(estado: Catalogo): void {
    this.store.setRepresentacionFederalDatosSeleccion(estado);
  }

  /**
   * Método para cargar la lista de idiomas desde el servicio.
   */
  cargarIdioma(): void {
    this.certificadoService
      .obtenerIdioma()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setIdiomaDatos(data);
        }
      );
  }

  /**
   * Método para cargar la lista de representaciones federales desde el servicio.
   */
  cargarRepresentacionFederal(): void {
    this.certificadoService
      .obtenerRepresentacionFederal()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setRepresentacionFederalDatos(data);
        }
      );
  }

  /**
   * Método para cargar la lista de entidades federativas desde el servicio.
   */
  cargarEntidadFederativa(): void {
    this.certificadoService
      .obtenerEntidadFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setEntidadFederativaDatos(data);
        }
      );
  }

  /**
   * Establece el estado de validez del formulario en el store.
   * @param valida Indica si el formulario es válido o no.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ datos: valida });
  }

  /**
   * Método de ciclo de vida de Angular, se ejecuta al destruir el componente.
   * Cancela todas las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
