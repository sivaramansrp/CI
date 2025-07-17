import { AnimalesEventos, AnimalesFormularioSolicitud, DatosDeLaSolicitud, Sensible } from '../../../../shared/models/datos-de-la-solicitue.model';
import { CatalogoSelectComponent, CrosslistComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { CrossListEtiqueta, FilaSolicitud, ListaDeDatosFinal, ListaPasosWizard } from '../../models/220202/fitosanitario.model';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { FitosanitarioQuery } from '../../queries/fitosanitario.query';

@Component({
  selector: 'app-mercancia-form',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, TituloComponent, ReactiveFormsModule, CrosslistComponent],
  templateUrl: './mercancia-form.component.html',
})
export class MercanciaFormComponent implements OnInit, OnDestroy {

  /**
   * Representa el formulario reactivo utilizado para gestionar los datos de la mercancía
   * en el componente de detalles de animales vivos.
   * 
   * @type {FormGroup}
   */
  mercanciaForm!: FormGroup;

  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;


  /**
   * Representa el formulario reactivo utilizado para gestionar los detalles específicos
   * de los animales vivos, como número de lote, color de pelaje, edad, etc.
   * 
   * @type {FormGroup}
   */
  detalleForm!: FormGroup;

  /**
   * Datos de la solicitud que se recibirán como entrada en el componente.
   * 
   * @type {DatosDeLaSolicitud}
   */
  @Input() catalogosDatos: DatosDeLaSolicitud = {} as DatosDeLaSolicitud;

  /**
   * Lista de datos sensibles que se mostrarán en la tabla de detalles de animales vivos.
   * 
   * @type {Sensible[]}
   */
  @Input() sensiblesTablaDatos: Sensible[] = [];

  /**
   * Datos del formulario de solicitud de animales vivos.
   * Este objeto contiene la información relacionada con la solicitud de animales vivos,
   * como los detalles de la mercancía y los datos específicos de los animales.
   * 
   * @type {AnimalesFormularioSolicitud}
   */
  @Input() formularioSolicitud!: AnimalesFormularioSolicitud;

  /**
   * Evento que se emite cuando se agregan datos al formulario de solicitud de animales vivos.
   * Este evento permite al componente padre recibir los datos del formulario para su procesamiento.
   * 
   * @type {EventEmitter<AnimalesEventos>}
   */
  @Output() agregarDatosFormulario = new EventEmitter<AnimalesEventos>();



  /**
 * Etiquetas para la lista cruzada de normas seleccionadas.
 * @type {CrossListEtiqueta}
 */
  public usoNormaSeleccionadaLabel: CrossListEtiqueta = {
    tituluDeLaIzquierda: 'Nombre científico',
    derecha: 'Nombre científico seleccionado',
  };

  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Define el tipo de selección de la tabla, en este caso, se utiliza un checkbox para seleccionar filas.
   * 
   * @type {TablaSeleccion}
   */
  public tablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Almacena los datos sensibles seleccionados en la tabla.
   * Esta propiedad se utiliza para realizar operaciones como eliminar o procesar los datos seleccionados.
   * 
   * @type {Sensible[]}
   */
  public sensiblesTablaSeleccionada: Sensible[] = [];

  private destroyNotifier$ = new Subject<void>();

  public usoCrossListDatos: string[] = [];

  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder,
    private ubicaccion: Location,
    private route: ActivatedRoute,
    private readonly agriculturaApiService: AgriculturaApiService,
    private readonly fitosanitarioQuery: FitosanitarioQuery,
  ) {
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se crea el formulario reactivo y se configuran los campos necesarios.
   */
  ngOnInit(): void {
    this.fitosanitarioQuery
      .select((state: ListaDeDatosFinal) => state.usoCrossListDatos)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: string[]) => {
        this.usoCrossListDatos = datos;
      });

    this.mercanciaForm = this.fb.group({
      tipoRequisito: ['', Validators.required],
      requisito: ['', Validators.required],
      numeroCertificado: ['', [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [''],
      nico: ['', Validators.required],
      descripcionNico: [''],
      descripcion: ['', [Validators.maxLength(1000), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      cantidadUMT: ['', [Validators.pattern(/^\d{1,12}(\.\d{1,3})?$/)]],
      umt: [{ value: '', disabled: true }, Validators.required],
      cantidadUMC: ['', [Validators.pattern(/^\d{1,12}(\.\d{1,3})?$/)]],
      umc: ['', Validators.required],
      uso: ['', Validators.required],
      paisOrigen: ['', Validators.required],
      paisDeProcedencia: ['', Validators.required],
    });

    const ID = this.route.snapshot.paramMap.get('id');
    if (ID) {
      this.fitosanitarioQuery.seleccionarDatosSeleccionados$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((selectedData: FilaSolicitud[]) => {
          const FOUND = selectedData[0]; // Tomar el primer elemento seleccionado
          if (FOUND) {
            this.mercanciaForm.patchValue({
              tipoRequisito: FOUND.tipoRequisito || "1",
              requisito: FOUND.requisito || '',
              numeroCertificado: FOUND.numeroCertificadoInternacional || '',
              fraccionArancelaria: FOUND.fraccionArancelaria || '',
              descripcionFraccion: FOUND.descripcionFraccion || '',
              nico: FOUND.nico || '',
              descripcionNico: FOUND.descripcionNico || '',
              descripcion: FOUND.descripcion || '',
              cantidadUMT: FOUND.cantidadUMT || '',
              umt: FOUND.umt || '',
              cantidadUMC: FOUND.cantidadUMC || '',
              umc: FOUND.umc || '',
              uso: FOUND.uso || '',
              paisOrigen: FOUND.paisDeOrigen || '',
              paisDeProcedencia: FOUND.paisDeProcedencia || ''
            });
          }
        }
        );
    }
  }
  
  aduanasEntradaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
   * Limpia los datos relacionados con los animales vivos.
   * 
   * Este método vacía el arreglo `sensiblesTablaDatos` y reinicia el formulario `mercanciaForm`,
   * dejando ambos en su estado inicial. Útil para restablecer el formulario y los datos de la tabla
   * cuando se requiere comenzar una nueva operación o descartar los cambios actuales.
   */
  limpiarAnimalesVivo(): void {
    this.mercanciaForm.reset();
  }

  /**
 * Navega a la ubicación anterior en el historial de navegación.
 * Utiliza el servicio de ubicación para retroceder una página.
 */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * Método para agregar animales a la lista de datos sensibles.
   * Actualmente no implementa ninguna funcionalidad, pero se puede extender en el futuro.
   */
  agregarAnimales(): void {
    this.agregarDatosFormulario.emit(
      {
        formulario: this.mercanciaForm.value,
        tablaDatos: this.sensiblesTablaDatos
      }
    );
    this.ubicaccion.back();
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de destruir el componente.
   * Emite una señal a través del observable `destroy$` para notificar a los suscriptores que deben limpiar recursos y cancelar suscripciones.
   * Posteriormente, completa el observable para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

