/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import enlace from 'libs/shared/theme/assets/json/31601/enlace.json';
import enlaceData from 'libs/shared/theme/assets/json/31601/enlace-data.json';
import { Solicitud31601State, Tramite31601Store } from '../../../../estados/tramites/tramite31601.store';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query';
import { map, Subject, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

/**
 * Componente para gestionar el enlace de un representante, incluyendo su información en un formulario.
 */
@Component({
  selector: 'app-enlace', // Selector del componente en la plantilla HTML
  standalone: true, // Define que el componente puede funcionar de forma independiente (sin módulo específico)
  imports: [
    TableComponent, // Componente para mostrar tablas
    TituloComponent, // Componente para mostrar un título
    ReactiveFormsModule, // Módulo para trabajar con formularios reactivos
    FormsModule, // Módulo para trabajar con formularios
  ],
  templateUrl: './enlace.component.html', // Ruta a la plantilla HTML
  styleUrl: './enlace.component.scss', // Ruta al archivo de estilos SCSS
})
export class EnlaceComponent implements OnInit, OnDestroy {
  private destroyNotifier$: Subject<void> = new Subject();
  esFormularioSoloLectura: boolean = false; 
  /**
   * Encabezados de la tabla de enlace.
   */
  public enlaceHeaderData: string[] = [];

  /**
   * Cuerpo de la tabla de enlace, donde se almacenan los datos.
   */
  public enlanceBodyData: unknown = [];

  /**
   * Datos de la tabla de enlace que se cargan desde un archivo JSON.
   */
  public enlaceTableData = enlace;

  /**
   * Formulario reactivo para el representante.
   */
  public represtantante!: FormGroup;

  /**
   * Datos predefinidos de un representante, que se cargan en el formulario.
   */
  representativeData = enlaceData;
  public solicitudState!: Solicitud31601State;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios.
   */
  constructor(private fb: FormBuilder,
    private tramite31601Store: Tramite31601Store,
    private tramite31601Query: Tramite31601Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.getRegistroForm();
      })
    )
    .subscribe()
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y carga los encabezados de la tabla.
   */
  ngOnInit(): void {
    this.getRegistroForm()

    // Carga los datos de la tabla
    this.getEnlace();
  }

  /**
   * Método que obtiene los encabezados de la tabla de enlace.
   */
  public getEnlace() {
    this.enlaceHeaderData = this.enlaceTableData.tableHeader;
  }

  /**
   * Variable que controla la visibilidad del modal.
   */
  public modal: string = 'modal';

  /**
   * Referencia al elemento de cierre del modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Método que abre el modal y carga el formulario con los datos predefinidos del representante.
   */
  public abrirModal() {
    this.modal = 'show'; // Muestra el modal
    this.getRegistroForm(); // Carga los datos en el formulario
  }

  /**
   * Método que configura el formulario con los datos del representante.
   */
  public getRegistroForm() {
    this.tramite31601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe()
    this.represtantante = this.fb.group({
      resigtroReprestantante: [this.solicitudState?.resigtroReprestantante ? this.solicitudState?.resigtroReprestantante : this.representativeData.resigtro, Validators.required],
      rfcReprestantante: [this.solicitudState?.rfcReprestantante ? this.solicitudState?.rfcReprestantante : this.representativeData.rfc, Validators.required],
      nombreReprestante: [this.solicitudState?.nombreReprestante ? this.solicitudState?.nombreReprestante : this.representativeData.nombre, Validators.required],
      apellidoPaterno: [this.solicitudState?.apellidoPaterno ? this.solicitudState?.apellidoPaterno : this.representativeData.apellidoPaterno, Validators.required],
      apellidoMaterno: [this.solicitudState?.apellidoMaterno ? this.solicitudState?.apellidoMaterno : this.representativeData.apellidoMaterno, Validators.required],
      cargo: [this.solicitudState?.cargo ? this.solicitudState?.cargo : this.representativeData.cargo, Validators.required],
      cuidad: [this.solicitudState?.cuidad ? this.solicitudState?.cuidad : this.representativeData.cuidad, Validators.required],
      telefonoReprestantante: [this.solicitudState?.telefonoReprestantante ? this.solicitudState?.telefonoReprestantante : this.representativeData.telefono, Validators.required],
      correoReprestantante: [this.solicitudState?.correoReprestantante ? this.solicitudState?.correoReprestantante : this.representativeData.correo, Validators.required],
      suplente: [this.solicitudState?.suplente, Validators.required],
    });

    if (this.esFormularioSoloLectura) {
      Object.keys(this.represtantante.controls).forEach((key) => {
        this.represtantante.get(key)?.disable();
      })
    } else {
      Object.keys(this.represtantante.controls).forEach((key) => {
        this.represtantante.get(key)?.enable();
      })
    }  

    // Rellena el formulario con los datos del representante
    this.patchData();
  }

  /**
   * Método que parchea los datos en el formulario, cargando la información del representante.
   */
  public patchData() {
    
    // Deshabilita los campos que no deben ser modificados
    this.represtantante.get('rfc')?.disable();
    this.represtantante.get('nombre')?.disable();
    this.represtantante.get('apellidoPaterno')?.disable();
    this.represtantante.get('apellidoMaterno')?.disable();
    this.represtantante.get('cuidad')?.disable();
  }
  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
