import { ActivatedRoute, Router } from '@angular/router'; // Importa clases para manejar rutas y navegación.
import { Component, OnDestroy, OnInit } from '@angular/core'; // Importa las clases base para componentes de Angular.
import { CommonModule } from '@angular/common'; // Importa funcionalidades comunes de Angular.

import { FormBuilder, ReactiveFormsModule } from '@angular/forms'; // Importa clases para formularios reactivos.
import { Subject, map, takeUntil } from 'rxjs'; // Importa clases para manejar observables y suscripciones.

import { CONFIGURACION_ACCIONISTAS_TABLA, Monumentos } from '../../constantes/permiso-de-exportacion.enum'; // Importa la configuración de la tabla y la interfaz `Monumentos`.

import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src'; // Importa componentes compartidos para tablas y títulos.

import { Solicitud280101State, Tramite280101Store } from '../../../../estados/tramite/tramite280101.store'; // Importa el estado y el store del trámite.
import { Tramite280101Query } from '../../../../estados/queries/tramite280101.query'; // Importa la consulta para el estado del trámite.

/**
 * Componente para gestionar el formulario del solicitante.
 */
@Component({
  selector: 'app-monumento', // Define el selector del componente.
  templateUrl: './monumento.component.html', // Ruta al archivo de plantilla HTML del componente.
  styleUrl: './monumento.component.scss', // Ruta al archivo de estilos SCSS del componente.
  standalone: true, // Indica que el componente es independiente y no necesita declararse en un módulo.
  imports: [
    CommonModule, // Módulo común de Angular para funcionalidades básicas.
    ReactiveFormsModule, // Módulo para trabajar con formularios reactivos.
    TablaDinamicaComponent, // Componente reutilizable para tablas dinámicas.
    TituloComponent // Componente reutilizable para mostrar títulos.
  ]
})
export class MonumentoComponent implements OnInit,OnDestroy{
  /**
   * Configuración de la tabla de accionistas.
   */
  configTableArray = CONFIGURACION_ACCIONISTAS_TABLA;

  /**
   * Selección de la tabla.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Estado de la solicitud 280101.
   */
  public solicitudState!: Solicitud280101State;

  /**
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Datos de la tabla de monumentos.
   */
  public monumentoTablaDatos: Monumentos[] = [];

  /**
   * Lista de monumentos seleccionados.
   */
  public monumentoSeleccionLista: Monumentos[] = [];

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param router Router para la navegación.
   * @param activatedRoute ActivatedRoute para rutas relativas.
   * @param store Store para manejar el estado del trámite.
   * @param query Query para obtener el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private store: Tramite280101Store,
    private query: Tramite280101Query
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el estado de la solicitud y asigna los datos de la tabla de monumentos.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$), // Finaliza la suscripción al destruir el componente.
        map((seccionState) => {
          this.solicitudState = seccionState; // Asigna el estado de la solicitud.
        })
      )
      .subscribe();

    this.monumentoTablaDatos = this.solicitudState.monumentoTablaDatos; // Asigna los datos de la tabla de monumentos.
  }

  /**
   * Navega a la página para agregar un nuevo monumento.
   */
  agregar(): void {
    this.router.navigate(['../datos-monumento'], {
      relativeTo: this.activatedRoute, // Navegación relativa a la ruta actual.
    });
  }

  /**
   * Borra el monumento seleccionado de la tabla.
   */
  Borrar(): void {
    if (this.monumentoSeleccionLista.length === 0) {
      return; // Si no hay elementos seleccionados, no realiza ninguna acción.
    }
    if (this.monumentoSeleccionLista.length) {
      this.store.borrorMonumentos(this.monumentoSeleccionLista[0]); // Borra el primer monumento seleccionado del estado.
    }
    this.monumentoSeleccionLista = []; // Limpia la lista de selección.
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}