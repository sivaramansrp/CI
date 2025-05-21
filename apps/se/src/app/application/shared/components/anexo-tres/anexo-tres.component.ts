import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component,Input,OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Solicitud80104State, Tramite80104Store } from '../../../estados/tramites/tramite80104.store';
import {Subject,map,takeUntil } from 'rxjs';
import { ANEXO_TRES_ALERTA } from '../../constantes/anexo-dos-y-tres.enum';
import { FraccionArancelariaDescripcion } from '../../models/empresas.model';
import { Tramite80104Query } from '../../../estados/queries/tramite80104.query';

/**
 * Decorador que define la configuración del componente AnexoTresComponent.
 * 
 * - selector: Nombre del selector HTML utilizado para insertar este componente en las plantillas.
 * - standalone: Indica que el componente es independiente y puede usarse sin un módulo.
 * - imports: Lista de componentes y módulos necesarios para el funcionamiento del componente.
 * - templateUrl: Ruta del archivo de plantilla HTML asociado al componente.
 * - styleUrl: Ruta del archivo de estilos SCSS asociado al componente.
 */

@Component({
  selector: 'app-anexo-tres',
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    ],
  templateUrl: './anexo-tres.component.html',
  styleUrl: './anexo-tres.component.scss'
})
/**
 * Componente encargado de gestionar el Anexo Tres del formulario 80104.
 * Permite agregar, eliminar y visualizar fracciones arancelarias tanto para el Anexo Dos como para el Anexo Tres.
 * 
 * Implementa OnInit para inicializar formularios y datos al cargar el componente.
 * Implementa OnDestroy para limpiar suscripciones al destruir el componente.
 */
export class AnexoTresComponent implements OnInit, OnDestroy {

  /** Mensaje de alerta para Anexo Tres */
  public anexoTresAlerta = ANEXO_TRES_ALERTA;

  /**
   * Configuración de columnas para los datos del Anexo Dos.
   * Se recibe como propiedad desde el componente padre.
   */
  @Input() configuracionDosDatos: ConfiguracionColumna<FraccionArancelariaDescripcion>[] = [];

  /** Formulario reactivo para el Anexo Dos */
  anexoDosForm!: FormGroup;

  /** Formulario reactivo para el Anexo Tres */
  anexoTresForm!: FormGroup;

  /** Tipo de selección por checkbox para tablas dinámicas */
  public checkbox = TablaSeleccion.CHECKBOX;

  /** Estado actual de la solicitud almacenado desde la store */
  public solicitudState!: Solicitud80104State;

  /** Observable para destruir suscripciones al destruir el componente */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Lista de elementos agregados al Anexo Dos */
  anexoDos: FraccionArancelariaDescripcion[] = [];

  /** Lista de elementos agregados al Anexo Tres */
  anexoTres: FraccionArancelariaDescripcion[] = [];

  /**
   * Constructor que inyecta servicios de formularios y de estado (store y query).
   */
  constructor(
    private fb: FormBuilder,
    private tramite80104Store: Tramite80104Store,
    private tramite80104Query: Tramite80104Query
  ) {}

  /**
   * Ciclo de vida: se ejecuta al inicializar el componente.
   * Inicializa los formularios y sus valores.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
  }

  /**
   * Inicializa los formularios y obtiene valores actuales desde la store.
   * También se suscribe al estado de la solicitud.
   */
  private inicializarFormulario(): void {
    this.tramite80104Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud80104State;
        })
      )
      .subscribe();
/* 
 * Se inicializa el formulario reactivo para el Anexo Dos.
 * Contiene dos controles:
 * - fraccionArancelaria: campo de entrada para el número de fracción arancelaria.
 * - descripcion: campo de entrada para la descripción de la fracción arancelaria.
 * Actualmente no se aplican validadores, pero pueden añadirse si se requiere validación en el futuro.
 */
    this.anexoDosForm = this.fb.group({
      fraccionArancelaria: [''],
      descripcion: ['']
    });
    /* Formulario para Anexo Tres con campos de fracción y descripción */
    this.anexoTresForm = this.fb.group({
      fraccionTres: [''],
      descripcionTres: ['']
    });
    /* Obtiene los valores actuales del estado para Anexo Dos y Anexo Tres */
    this.anexoDos = this.tramite80104Query.getValue().anexoDos;
    this.anexoTres = this.tramite80104Query.getValue().anexoTres;
  }

  /**
   * Establece un valor específico en la store utilizando el nombre del método correspondiente.
   * @param form Formulario reactivo de donde se extrae el valor
   * @param campo Campo dentro del formulario
   * @param metodoNombre Nombre del método de la store que será invocado
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite80104Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite80104Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Agrega un nuevo elemento a la lista del Anexo Dos y actualiza la store.
   */
  anexoDosAgregar(): void {
    const NUEVOITEM: FraccionArancelariaDescripcion[] = [{
      fraccionArancelaria: this.anexoDosForm.value.fraccionArancelaria,
      descripcion: this.anexoDosForm.value.descripcion,
    }];
    this.anexoDos = NUEVOITEM;
    this.tramite80104Store.setAnexoDos(NUEVOITEM);
    this.anexoDosForm.reset();
  }

  /**
   * Agrega un nuevo elemento a la lista del Anexo Tres y actualiza la store.
   */
  anexoTresAgregar(): void {
    const NUEVOITEM: FraccionArancelariaDescripcion[] = [{
      fraccionArancelaria: this.anexoTresForm.value.fraccionTres,
      descripcion: this.anexoTresForm.value.descripcionTres,
    }];
    this.anexoTres = NUEVOITEM;
    this.tramite80104Store.setAnexoTres(NUEVOITEM);
    this.anexoTresForm.reset();
  }

  /**
   * Elimina (resetea) el formulario del Anexo Dos sin alterar el estado global.
   */
  anexoDosElimiar(): void {
    this.anexoDosForm.reset();
  }

  /**
   * Elimina (resetea) el formulario del Anexo Tres sin alterar el estado global.
   */
  anexoTresElimiar(): void {
    this.anexoTresForm.reset();
  }

  /**
   * Ciclo de vida: se ejecuta al destruir el componente.
   * Libera recursos cancelando suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
