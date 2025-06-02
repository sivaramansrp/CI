import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, PersonaTerceros, TercerosComponent } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { AcuiculturaQuery } from '../../estados/sanidad-certificado.query';
import { CommonModule } from '@angular/common';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

/**
 * @descripcion
 * Componente encargado de la gestión de terceros en el trámite de importación de acuicultura.
 * Permite visualizar y actualizar la lista de personas asociadas como terceros, así como controlar
 * el modo de solo lectura del formulario según el estado del trámite.
 */
@Component({
  selector: 'app-tercerospage',
  standalone: true,
  imports: [
    CommonModule,
    TercerosComponent
  ],
  templateUrl: './tercerospage.component.html',
  styleUrl: './tercerospage.component.scss',
})
export class TercerospageComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Subject utilizado como notificador para destruir suscripciones y evitar fugas de memoria.
   * 
   * @remarks
   * Este Subject se emite cuando el componente se destruye, permitiendo que las suscripciones
   * a observables se cancelen correctamente usando el operador `takeUntil`.
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Lista de personas asociadas como terceros en el trámite actual.
   */
  personas: PersonaTerceros[] = [];

  /**
   * Indica si el formulario se encuentra en modo solo lectura.
   * Determina si el formulario debe mostrarse únicamente para lectura, sin permitir modificaciones.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @descripcion
   * Constructor del componente. Inyecta los servicios y queries necesarios para la gestión de terceros.
   * @param consultaQuery Servicio para consultar el estado del trámite.
   * @param importacionDeAcuiculturaService Servicio para actualizar los terceros relacionados.
   * @param acuiculturaQuery Query para obtener los terceros relacionados seleccionados.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private readonly importacionDeAcuiculturaService: ImportacionDeAcuiculturaService,
    private readonly acuiculturaQuery: AcuiculturaQuery
  ) {}

  /**
   * @descripcion
   * Inicializa el componente y suscribe al estado de solo lectura del formulario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((seccionState) => {
        this.esFormularioSoloLectura = seccionState?.readonly;
      });
  }

  /**
   * @descripcion
   * Después de la inicialización de la vista, suscribe a los terceros relacionados seleccionados.
   */
  ngAfterViewInit(): void {
    this.acuiculturaQuery.seleccionarTercerosRelacionados$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosDeLaSolicitud) => {
        if (datosDeLaSolicitud) {
          this.personas = datosDeLaSolicitud;
        }
      });
  }

  /**
   * @descripcion
   * Actualiza la lista de terceros relacionados cuando se detecta un cambio.
   * @param event Lista actualizada de personas terceros.
   */
  onPersonasChanged(event: PersonaTerceros[]): void {
    this.importacionDeAcuiculturaService.updateTercerosRelacionados(event);
  }

  /**
   * @descripcion
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Notifica y completa el Subject para cancelar todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}