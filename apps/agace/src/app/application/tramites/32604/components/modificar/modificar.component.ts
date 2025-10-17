import { CommonModule } from '@angular/common';
  
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';

import { Domicilios, InputRadio, SolicitudRadioLista } from '../../models/empresas-comercializadoras.model';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
import { Solicitud32604Store } from '../../estados/solicitud32604.store';
@Component({
  selector: 'app-modificar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputRadioComponent,
  ],
  templateUrl: './modificar.component.html',
  styleUrl: './modificar.component.scss',
})
export class ModificarComponent implements OnInit, OnDestroy, OnChanges {
  /**
   * Formulario reactivo para la modificación de domicilio
   */
  form!: FormGroup;

  /** Modelo para la opción de tipo sí/no representado como radio button */
  sinoOpcion: InputRadio = {} as InputRadio;

  /** Subject para manejar la destrucción del componente y evitar fugas de memoria */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Lista de contenedores/tipos de instalación.
   */
  contenedores: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Datos del domicilio a modificar
   */
  @Input() domicilioAModificar: Domicilios | null = null;

  /**
   * Emisor de eventos para enviar el domicilio modificado al componente padre
   */
  @Output() domicilioModificado = new EventEmitter<Domicilios>();

  /**
   * Emisor de eventos para notificar al componente padre que debe cerrar el modal
   */
  @Output() cerrarModalEvento = new EventEmitter<void>();

  /**
   * Constructor de la clase ModificarComponent.
   * 
   * @param fb Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param empresasComercializadorasService Servicio para operaciones relacionadas con empresas comercializadoras.
   * @param solicitud32604Store Almacén para el manejo del estado de la solicitud 32604.
   * @param solicitud32604Query Consulta para obtener información del estado de la solicitud 32604.
   * @param consultaioQuery Consulta para obtener información adicional relacionada.
   * 
   * Inicializa la propiedad `contenedores` con valores predeterminados para los catálogos y etiquetas de la interfaz.
   */
  constructor(
    public fb: FormBuilder,
    public empresasComercializadorasService: EmpresasComercializadorasService,
    public solicitud32604Store: Solicitud32604Store,
    public solicitud32604Query: Solicitud32604Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    this.contenedores = {
      catalogos: [],
      labelNombre: 'Tipo de instalacion',
      primerOpcion: 'Seleccione un valor',
    };
    this.inicializarFormulario();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener la opción seleccionada del radio y cargar los catálogos necesarios.
   */
  ngOnInit(): void {
    this.conseguirOpcionDeRadio();
    this.cargarCatalogos();
  }

  /**
   * Método del ciclo de vida que se ejecuta cuando cambian las propiedades de entrada.
   * Actualiza el formulario cuando se recibe un nuevo domicilio para modificar.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['domicilioAModificar'] && changes['domicilioAModificar'].currentValue) {
      // Solo llenar el formulario si los catálogos ya están cargados
      if (this.contenedores.catalogos && this.contenedores.catalogos.length > 0) {
        this.llenarFormularioConDatos();
      }
    }
  }

  /**
   * Método del ciclo de vida que se ejecuta cuando el componente se destruye.
   * Completa el subject destroy$ para cancelar todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Inicializa el formulario reactivo con validadores
   */
  inicializarFormulario(): void {
    this.form = this.fb.group({
      instalacionPrincipal: ['No', [Validators.required]],
      tipoInstalacion: ['', [Validators.required]],
      entidadFederativa: ['', [Validators.required]],
      municipioDelegacion: ['', [Validators.required]],
      registroSESAT: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required]]
    });
  }

  /**
   * Llena el formulario con los datos del domicilio a modificar
   */
  llenarFormularioConDatos(): void {
    if (this.domicilioAModificar && this.form) {
      // Buscar el ID del tipo de instalación en el catálogo
      let tipoInstalacionId = '';
      if (this.domicilioAModificar.tipoInstalacion && this.contenedores.catalogos.length > 0) {
        const TIPO_ENCONTRADO = this.contenedores.catalogos.find(
          item => item.descripcion === this.domicilioAModificar?.tipoInstalacion || 
                  item.id.toString() === this.domicilioAModificar?.cveTipoInstalacion
        );
        tipoInstalacionId = TIPO_ENCONTRADO ? TIPO_ENCONTRADO.id.toString() : '';
      }

      this.form.patchValue({
        instalacionPrincipal: this.domicilioAModificar.instalacionPrincipal || 'No',
        tipoInstalacion: tipoInstalacionId,
        entidadFederativa: this.domicilioAModificar.entidadFederativa || '',
        municipioDelegacion: this.domicilioAModificar.municipioDelegacion || '',
        registroSESAT: this.domicilioAModificar.registroSESAT || '',
        direccion: this.domicilioAModificar.direccion || '',
        codigoPostal: this.domicilioAModificar.codigoPostal || ''
      });
    }
  }

  /**
   * Actualiza el campo '190' en el estado global.
   *
   * @param {string | number} valor - Valor numérico o de texto para el campo 290.
   */
  actualizar290(valor: string | number): void {
    this.solicitud32604Store.actualizar290(valor);
  }

  /**
   * Método para obtener la opción de radio (sí/no) desde el servicio.
   * Se suscribe al observable y asigna el resultado a `sinoOpcion`.
   */
  conseguirOpcionDeRadio(): void {
    this.empresasComercializadorasService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  /**
 * Cargar catálogos de datos.
 */
  cargarCatalogos(): void {
    this.empresasComercializadorasService
      .getContenedores()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.contenedores.catalogos = data.data;
        // Llenar el formulario después de que los catálogos estén cargados
        this.llenarFormularioConDatos();
      });
  }

  /**
   * Guarda las modificaciones del domicilio
   */
  guardarModificaciones(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Obtener el nombre del tipo de instalación seleccionado
    const TIPO_INSTALACION_SELECCIONADO = this.contenedores.catalogos.find(
      item => item.id.toString() === this.form.value.tipoInstalacion
    );

    const DOMICILIO_MODIFICADO: Domicilios = {
      ...this.domicilioAModificar,
      ...this.form.value,
      cveTipoInstalacion: this.form.value.tipoInstalacion,
      tipoInstalacion: TIPO_INSTALACION_SELECCIONADO ? TIPO_INSTALACION_SELECCIONADO.descripcion : this.form.value.tipoInstalacion
    } as Domicilios;

    // Emitir el domicilio modificado al componente padre
    this.domicilioModificado.emit(DOMICILIO_MODIFICADO);
    
    // Notificar al componente padre para cerrar el modal
    this.cerrarModalEvento.emit();
  }

  /**
   * Cancela la modificación y cierra el modal
   */
  cancelarModificacion(): void {
    this.form.reset();
    this.cerrarModalEvento.emit();
  }
}
