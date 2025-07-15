import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { FilaSolicitud } from '../../../tramites/220201/models/220201/capturar-solicitud.model';
import { CONFIGURACION_SENSIBLES } from '../../constantes/datos-de-la-solicitue.enum';
import { AnimalesEventos, AnimalesFormularioSolicitud, DatosDeLaSolicitud, Sensible } from '../../models/datos-de-la-solicitue.model';

@Component({
  selector: 'app-animales-vivo-detalles',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, TituloComponent, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './animales-vivo-detalles.component.html',
})
export class AnimalesVivoDetallesComponent implements OnInit, OnDestroy {

  /**
   * Representa el formulario reactivo utilizado para gestionar los datos de la mercancía
   * en el componente de detalles de animales vivos.
   * 
   * @type {FormGroup}
   */
  mercanciaForm!: FormGroup;

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
  @Input() catalogosDatos!: DatosDeLaSolicitud;

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
  @Input() formularioSolicitud!: FilaSolicitud;

  /**
   * Evento que se emite cuando se agregan datos al formulario de solicitud de animales vivos.
   * Este evento permite al componente padre recibir los datos del formulario para su procesamiento.
   * 
   * @type {EventEmitter<AnimalesEventos>}
   */
  @Output() agregarDatosFormulario = new EventEmitter<AnimalesEventos>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es true, los campos del formulario no serán editables por el usuario.
   * 
   * @type {boolean}
   */
  esSoloLectura: boolean = true;

  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Configuración de las columnas de la tabla que muestra los datos sensibles.
   * Utiliza una constante predefinida para definir la estructura de la tabla.
   * 
   * @type {ConfiguracionColumna<Sensible>[]}
   */
  public configuracionSensiblesTabla: ConfiguracionColumna<Sensible>[] = CONFIGURACION_SENSIBLES;

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

  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder,
    private ubicaccion: Location,
  ) {
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se crea el formulario reactivo y se configuran los campos necesarios.
   */
  ngOnInit(): void {
    this.crearFormulario();
  }


  /**
   * Crea e inicializa los formularios reactivos `mercanciaForm` y `detalleForm` 
   * utilizando FormBuilder. Cada formulario contiene los campos necesarios para 
   * capturar la información relacionada con los detalles de animales vivos y 
   * mercancía, aplicando las validaciones requeridas en cada campo según corresponda.
   *
   * - `mercanciaForm`: Incluye campos como tipo de requisito, requisito, número de certificado,
   *   fracción arancelaria, descripción, cantidad, unidad de medida, especie, uso, país de origen y procedencia, entre otros.
   * - `detalleForm`: Incluye campos para detalles específicos del animal como número de lote, color de pelaje,
   *   edad, fase de desarrollo, función zootécnica, nombre de la mercancía, número de identificación, raza,
   *   nombre científico y sexo (este último es obligatorio).
   *
   * @returns {void} No retorna ningún valor. Inicializa los formularios como propiedades del componente.
   */
  crearFormulario(): void {
    this.mercanciaForm = this.fb.group({
      id: [0, Validators.required],
      tipoRequisito: ['', Validators.required],
      requisito: ['', Validators.required],
      numeroCertificadoInternacional: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [{ value: 'test', disabled: true }, [Validators.required]],
      nico: ['', Validators.required],
      descripcionNico: [{ value: 'test', disabled: true }, [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      cantidadUMT: ['', [Validators.required, Validators.pattern(/^\d{1,12}(\.\d{1,3})?$/)]],
      umt: [{ value: '', disabled: true }, Validators.required],
      cantidadUMC: ['', [Validators.required, Validators.pattern(/^\d{1,12}(\.\d{1,3})?$/)]],
      umc: ['', Validators.required],
      especie: ['', Validators.required],
      uso: ['', Validators.required],
      paisDeOrigen: ['', Validators.required],
      paisDeProcedencia: ['', Validators.required],
    });

    this.detalleForm = this.fb.group({
      numeroLote: ['', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      colorPelaje: [''],
      edadAnimal: [''],
      faseDesarrollo: [''],
      funcionZootecnica: [''],
      nombreMercancia: [''],
      numeroIdentificacion: [''],
      raza: [''],
      nombreCientifico: [''],
      sexo: ['']
    });

    if (this.formularioSolicitud) {
      console.log('Formulario de solicitud recibido:', this.formularioSolicitud);
      this.mercanciaForm.patchValue({
        ...this.formularioSolicitud
      });
    }
  }

  /**
   * Agrega un nuevo detalle a la lista `sensiblesTablaDatos` utilizando los valores actuales del formulario `detalleForm`.
   * Cada campo del formulario se asigna a la propiedad correspondiente del nuevo objeto.
   * Después de agregar el detalle, el formulario se reinicia para permitir la entrada de nuevos datos.
   *
   * @returns {void} No retorna ningún valor.
   */
  agregarDetalle(): void {
    this.sensiblesTablaDatos.push({
      NumeroLote: this.detalleForm.value.numeroLote,
      ColorPelaje: this.detalleForm.value.colorPelaje,
      EdadAnimal: this.detalleForm.value.edadAnimal,
      FaseDesarrollo: this.detalleForm.value.faseDesarrollo,
      FuncionZootecnica: this.detalleForm.value.funcionZootecnica,
      NombreMercancia: this.detalleForm.value.nombreMercancia,
      NumeroIdentificacion: this.detalleForm.value.numeroIdentificacion,
      Raza: this.detalleForm.value.raza,
      NombreCientifico: this.detalleForm.value.nombreCientifico,
      Sexo: this.detalleForm.value.sexo
    });
    this.detalleForm.reset();
  }

  /**
   * Elimina los elementos seleccionados de la tabla de datos sensibles.
   * 
   * Esta función filtra los elementos de `sensiblesTablaDatos` eliminando aquellos que están presentes
   * en `sensiblesTablaSeleccionada`. Después de la eliminación, limpia la selección estableciendo 
   * `sensiblesTablaSeleccionada` como un arreglo vacío.
   *
   * @returns {void} No retorna ningún valor.
   */
  eliminarDetalle(): void {
    this.sensiblesTablaDatos = this.sensiblesTablaDatos.filter((item) => !this.sensiblesTablaSeleccionada.includes(item));
    this.sensiblesTablaSeleccionada = [];
  }

  /**
   * Limpia los datos relacionados con los animales vivos.
   * 
   * Este método vacía el arreglo `sensiblesTablaDatos` y reinicia el formulario `mercanciaForm`,
   * dejando ambos en su estado inicial. Útil para restablecer el formulario y los datos de la tabla
   * cuando se requiere comenzar una nueva operación o descartar los cambios actuales.
   */
  limpiarAnimalesVivo(): void {
    this.sensiblesTablaDatos = [];
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
    if (this.mercanciaForm.invalid) {
      this.mercanciaForm.markAllAsTouched();
      console.log('Formulario inválido', this.mercanciaForm.errors, this.mercanciaForm.value);
    }
    else {
      this.agregarDatosFormulario.emit(
        {
          formulario: this.mercanciaForm.value,
          tablaDatos: this.sensiblesTablaDatos
        }
      );
      this.ubicaccion.back();
    }

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

