import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputRadio, SolicitudRadioLista } from '../../models/empresas-comercializadoras.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
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
export class ModificarComponent implements OnInit {
  /** Modelo para la opción de tipo sí/no representado como radio button */
  sinoOpcion: InputRadio = {} as InputRadio;

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
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.contenedores.catalogos = data.data;
      });
  }
}
