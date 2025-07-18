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

}
