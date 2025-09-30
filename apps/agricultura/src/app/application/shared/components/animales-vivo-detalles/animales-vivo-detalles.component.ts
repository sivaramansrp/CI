import { AnimalesEventos, DatosDeLaSolicitud, Sensible } from '../../models/datos-de-la-solicitue.model';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FilaSolicitud, FraccionArancelariaDecripcionModel } from '../../../tramites/220201/models/220201/capturar-solicitud.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { CONFIGURACION_SENSIBLES } from '../../constantes/datos-de-la-solicitue.enum';
import { CommonModule } from '@angular/common';
import { RegistroSolicitudService } from '../../../tramites/220201/services/220201/registro-solicitud/registro-solicitud.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-animales-vivo-detalles',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, TituloComponent, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './animales-vivo-detalles.component.html',
  styleUrl: './animales-vivo-detalles.component.scss',

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
   * Evento que se emite para cerrar el componente de detalles de animales vivos.
   * Permite al componente padre manejar la acción de cierre del modal o sección.
   * 
   * @type {EventEmitter<void>}
   */
  @Output() cerrar = new EventEmitter<void>();
  /**
   * @ignore
   * @description
   * Evento emitido por el componente AnimalesVivoDetallesComponent.
   * 
   * Este EventEmitter se utiliza para notificar a los componentes padres cuando ocurre una acción relevante
   * dentro del componente de detalles de animales vivos.
   * 
   * @event
   */
  @Output() animalesVivoDetallesComponent = new EventEmitter<void>();
  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios reactivos.
   */
  constructor(
    private fb: FormBuilder,
    private registroSolicitudService: RegistroSolicitudService
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
      descripcionFraccion: [{ value: 'Descripción', disabled: true }, [Validators.required]],
      nico: ['', Validators.required],
      descripcionNico: [{ value: 'Detalle', disabled: true }, [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      cantidadUMT: ['', [Validators.required, Validators.pattern(/^\d{1,12}(\.\d{1,3})?$/)]],
      umt: [{ value: '1', disabled: true }, Validators.required],
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
    const SEXO_CATALOGO = this.catalogosDatos.sexoList.find(
      (item: Catalogo) => item.clave === this.detalleForm.value.sexo
    );
    const DETALLE = {
      NumeroLote: this.detalleForm.value.numeroLote,
      ColorPelaje: this.detalleForm.value.colorPelaje,
      EdadAnimal: this.detalleForm.value.edadAnimal,
      FaseDesarrollo: this.detalleForm.value.faseDesarrollo,
      FuncionZootecnica: this.detalleForm.value.funcionZootecnica,
      NombreMercancia: this.detalleForm.value.nombreMercancia,
      NumeroIdentificacion: this.detalleForm.value.numeroIdentificacion,
      Raza: this.detalleForm.value.raza,
      NombreCientifico: this.detalleForm.value.nombreCientifico,
      Sexo: SEXO_CATALOGO ? SEXO_CATALOGO.descripcion : '',
      SexoClave: this.detalleForm.value.sexo
    };
    this.sensiblesTablaDatos = [...this.sensiblesTablaDatos, DETALLE];
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
    this.cerrar.emit();
  }

  /**
   * Método para agregar animales a la lista de datos sensibles.
   * Actualmente no implementa ninguna funcionalidad, pero se puede extender en el futuro.
   */
  agregarAnimales(): void {
    if (this.mercanciaForm.invalid) {
      this.mercanciaForm.markAllAsTouched();
    }
    else {
      this.agregarDatosFormulario.emit(
        {
          formulario: this.mercanciaForm.getRawValue(),
          tablaDatos: this.sensiblesTablaDatos
        }
      );
      this.cerrar.emit();
    }

  }

  /**
   * Actualiza los datos almacenados en el store.
   * @method setValoresStore
   */
  setValoresStoreFraccion(): void {
    const VALOR = this.mercanciaForm.value.fraccionArancelaria;
    this.registroSolicitudService.obtieneFraccionArancelariaDescripcion(220201, VALOR).subscribe(
      (response: BaseResponse<FraccionArancelariaDecripcionModel>) => {
        if (response && response.codigo === '00' && response.datos) {          
          this.mercanciaForm.get('descripcionFraccion')?.setValue(response.datos.descripcion);
        } else {
          this.mercanciaForm.get('descripcionFraccion')?.setValue('');
        }
      }
    );
    
  }

  /**
   * Actualiza la descripción del NICO en el formulario `mercanciaForm`.
   * 
   * Este método obtiene la fracción arancelaria y el NICO seleccionados en el formulario,
   * consulta la descripción correspondiente a través del servicio `registroSolicitudService`
   * y actualiza el campo `descripcionNico` en el formulario. Si la respuesta es exitosa,
   * se asigna la descripción obtenida; en caso contrario, se limpia el campo.
   */
  setValoresStoreFraccionNico(): void {
    const VALOR_FRACCION = this.mercanciaForm.value.fraccionArancelaria;
    const VALOR_NICO = this.mercanciaForm.value.nico;
    this.registroSolicitudService.obtieneNicoDescripcion(220201, VALOR_FRACCION, VALOR_NICO).subscribe(
      (response: BaseResponse<Catalogo>) => {
        if (response && response.codigo === '00' && response.datos) {
          this.mercanciaForm.get('descripcionNico')?.setValue(response.datos);
        } else {
          this.mercanciaForm.get('descripcionNico')?.setValue('');
        }
      }
    );
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

