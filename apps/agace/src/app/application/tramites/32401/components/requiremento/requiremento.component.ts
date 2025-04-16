import { CapturarRequerimientoComponent } from '../capturar-requerimiento/capturar-requerimiento.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FolioTramite } from '../../models/datos-tramite.model';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeleccionarDocumentosComponent } from '../seleccionar-documentos/seleccionar-documentos.component';

/**
 * Componente que representa el requerimiento del trámite.
 * Incluye selección de pestañas, navegación y manejo de datos del folio.
 */
@Component({
  /** Selector utilizado para identificar el componente en el HTML */
  selector: 'app-requiremento',
  /** Define el componente como autónomo (standalone) */
  standalone: true,
  /** 
   * Importa los módulos y componentes necesarios para el funcionamiento.
   * Incluye formularios reactivos, componentes personalizados y módulos comunes.
   */
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CapturarRequerimientoComponent,
    SeleccionarDocumentosComponent,
  ],
  /** Ruta del archivo HTML que define la estructura del componente */
  templateUrl: './requiremento.component.html',
  /** Ruta del archivo CSS que define los estilos del componente */
  styleUrl: './requiremento.component.css',
})
export class RequirementoComponent implements OnInit {
  /** Datos del folio del trámite */
  folioTramite: FolioTramite = {} as FolioTramite;

  /** Índice utilizado para controlar la navegación entre pestañas */
  indice: number = 1;

  /**
   * Constructor que inyecta el servicio de enrutamiento
   * @param router Servicio para navegar entre rutas
   */
  constructor(private router: Router) {
    // Constructor vacío, se puede agregar lógica adicional si es necesario
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente
   * Configura los datos iniciales del folio.
   */
  ngOnInit(): void {
    this.folioTramite = history?.state?.data;
  }

  /**
   * Cambia el índice de pestaña activa
   * @param i Índice de la pestaña seleccionada
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Navega a la página para capturar el texto libre
   */
  continuar(): void {
    this.router.navigate(['/agace/manifiesto-aereo/capturar-el-texto-libre']);
  }

  /**
   * Navega de regreso a la página principal del manifiesto aéreo
   */
  cancelar(): void {
    this.router.navigate(['/agace/manifiesto-aereo/main']);
  }
}
