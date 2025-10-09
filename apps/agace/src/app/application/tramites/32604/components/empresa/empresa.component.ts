import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, REGEX_RFC, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputRadio, SolicitudRadioLista } from '../../models/empresas-comercializadoras.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
import { Solicitud32604Store } from '../../estados/solicitud32604.store';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputRadioComponent,
  ],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent implements OnInit {
   /** Modelo para la opción de tipo sí/no representado como radio button */
    sinoOpcion: InputRadio = {} as InputRadio;
    
    /** Formulario reactivo para el componente empresa */
    empresaForm!: FormGroup;
  
    /** Subject para manejar la destrucción del componente y evitar fugas de memoria */
    private destroy$: Subject<void> = new Subject<void>();
  
    /**
   * Lista de contenedores.
   */
    contenedores: {
      catalogos: Catalogo[];
      labelNombre: string;
      primerOpcion: string;
    };

        /**
   * Lista de nacionalidad.
   */
    nacionalidad: {
      catalogos: Catalogo[];
      labelNombre: string;
      primerOpcion: string;
    };
  
    /**
     * Constructor de la clase EmpresaComponent.
     * 
     * @param fb Instancia de FormBuilder para la creación y gestión de formularios reactivos.
     * @param empresasComercializadorasService Servicio para operaciones relacionadas con empresas comercializadoras.
     * @param solicitud32604Store Store para el manejo del estado de la solicitud 32604.
     * @param solicitud32604Query Query para consultar el estado de la solicitud 32604.
     * @param consultaioQuery Query para consultar información adicional relacionada.
     * 
     * Inicializa los objetos `contenedores` y `nacionalidad` con valores predeterminados para los catálogos y etiquetas.
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
        labelNombre: 'En su caracter de',
        primerOpcion: 'Seleccione un valor',
      };
      this.nacionalidad = {
        catalogos: [],
        labelNombre: 'Nacionalidad',
        primerOpcion: 'Seleccione un valor',
      };
      
      this.inicializarFormulario();
    }
  
    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * 
     * Realiza las siguientes acciones al iniciar:
     * - Obtiene la opción seleccionada del radio button.
     * - Carga los catálogos necesarios para el componente.
     * - Carga la nacionalidad correspondiente.
     */
    ngOnInit(): void {
      this.conseguirOpcionDeRadio();
      this.cargarCatalogos();
      this.cargarNacionalidad();
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
        });
    }

            /**
     * Cargar catálogos de datos.
     */
    cargarNacionalidad(): void {
      this.empresasComercializadorasService
        .getNationalidad()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.nacionalidad.catalogos = data.data;
        });
    }

    /**
     * Inicializa el formulario reactivo de empresa con validaciones.
     */
    private inicializarFormulario(): void {
      this.empresaForm = this.fb.group({
        caracterDe: ['', [Validators.required]],
        rfcBusqueda: ['', [Validators.required, Validators.pattern(REGEX_RFC)]],
        instalacionesPrincipales: ['', [Validators.required]],
        registroFederalContribuyentes: ['', [Validators.required, Validators.pattern(REGEX_RFC)]],
        nacionalidad: ['', [Validators.required]],
        nombreCompleto: ['', [Validators.required]]
      });
    }

    /**
     * Valida el formulario y procesa el envío si es válido.
     * Si el formulario no es válido, marca todos los campos como touched para mostrar errores.
     */
    validarYEnviarFormulario(): void {
      if (this.empresaForm.valid) {
        // Procesar el formulario válido
        // Aquí iría la lógica para procesar los datos del formulario
        this.procesarFormularioValido();
      } else {
        // Marcar todos los campos como touched para mostrar errores de validación
        this.marcarCamposComoTocados();
      }
    }

    /**
     * Procesa el formulario cuando es válido.
     */
    private procesarFormularioValido(): void {
      // Verificar que el formulario existe y es válido
      if (this.empresaForm.valid) {
        // Lógica para procesar los datos del formulario válido
        // Implementar procesamiento específico según requerimientos
      }
    }

    /**
     * Marca todos los campos del formulario como touched para mostrar errores de validación.
     */
    private marcarCamposComoTocados(): void {
      this.empresaForm.markAllAsTouched();
    }

}
