import { CapturistaStore, CapturistaStoreService } from '../../../estados/capturista.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';
import { TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { BusquedaRFCCURPQuery } from '../../../queries/capturista.query';
import { CONFIGURACION_ENCABEZADO_CAPTURISTAS } from '../../core/constantes/capturista.enum';
import { Capturista } from '../../core/models/capturista.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService } from '../../core/service/usuarios.service';

@Component({
  selector: 'app-registro-capturista-privado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './registro-capturista-privado.component.html',
  styleUrl: './registro-capturista-privado.component.scss',
})
export class RegistroCapturistaPrivadoComponent implements OnInit, OnDestroy {
   /** Formulario reactivo para la consulta de capturista */
  FormRegistroCapturistaPrivado!: FormGroup;
  /** Notificador para cancelar suscripciones al destruir el componente */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Capturista consultado actualmente */
  capturistaConsultado?: Capturista;
  /** Estado actual del capturista */
  public capturistaState!: CapturistaStore;
  /** Listado de capturistas registrados */
  listadoCapturistas: Capturista[] = [];
  /** Controla la visualización de la tabla de capturistas */
  visualizarTabla: boolean = false;
  /** Configuración del encabezado de la tabla de capturistas */
  encabezadoDeTablaCapturistas = CONFIGURACION_ENCABEZADO_CAPTURISTAS;
  /** Capturistas seleccionados en la tabla */
  capturistasSeleccionados: Capturista[] = [];
  /** Enum para la selección en la tabla */
  tablaSeleccion = TablaSeleccion;

  /**
   * Constructor que inyecta los servicios y dependencias necesarias.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param router Router para la navegación.
   * @param usuariosService Servicio para operaciones de usuario.
   * @param capturistaStore Servicio para gestionar el estado de capturistas.
   * @param BusquedaQuery Query para la búsqueda de RFC/CURP.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private capturistaStore: CapturistaStoreService,
    private BusquedaQuery: BusquedaRFCCURPQuery
  ) {
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se crea el formulario reactivo para la consulta de capturista.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.BusquedaQuery.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.capturistaState = seccionState;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
    this.confirmarCapturista();
  }

  /**
   * Crea el formulario reactivo para la consulta de capturista.
   * Inicializa los campos 'rfc' y 'curp' como vacíos.
   */
  crearFormulario() {
    this.FormRegistroCapturistaPrivado = this.fb.group({
      rfc: [''],
      curp: ['']
    });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy() {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Consulta un capturista usando los valores del formulario (RFC y/o CURP).
   * Si encuentra un capturista, lo almacena en el estado y navega a la vista de consulta.
   * Si no encuentra, limpia la variable capturistaConsultado.
   * Maneja errores de la petición mostrando un mensaje en consola.
   */
  consultaCapturista() {
    const RFC = this.FormRegistroCapturistaPrivado.get('rfc')?.value;
    const CURP = this.FormRegistroCapturistaPrivado.get('curp')?.value;
    this.usuariosService.consultaCapturista(RFC, CURP)
      .pipe(
        map((data) => {
          if (data) {
            this.capturistaConsultado = data;
            this.capturistaStore.setConsultaCapturista(data);
            this.router.navigate(['login/consulta-capturista']);
          } else {
            this.capturistaConsultado = undefined;
          }
        }),
        catchError((error) => {
          console.error('Error al consultar capturista:', error);
          return of(undefined);
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

   /**
   * Confirma y agrega el capturista consultado a la lista si corresponde.
   * Actualiza el estado de visualización de la tabla y la lista de capturistas.
   */
  confirmarCapturista() {
    if (this.capturistaState.registrarDatos) {
      this.capturistaStore.setVisualizarTabla(this.visualizarTabla = true);
      this.visualizarTabla = this.capturistaState.visualizarTabla;
      if (this.capturistaState.listaCapturistas.length === 0) {
        this.listadoCapturistas = [];
        this.capturistaStore.setListaCapturistas(this.listadoCapturistas);
      }
      this.listadoCapturistas = this.capturistaState.listaCapturistas;
      this.listadoCapturistas.push(this.capturistaState.consultaCapturista);
      this.capturistaStore.setListaCapturistas(this.listadoCapturistas);
    }
  }

  /**
   * Elimina los capturistas seleccionados de la lista y actualiza el estado.
   */
  eliminarSeleccionados() {
    this.capturistasSeleccionados.forEach((capturista) => {
      const INDEX = this.listadoCapturistas.indexOf(capturista);
      if (INDEX > -1) {
        this.listadoCapturistas.splice(INDEX, 1);
      }
    });
    this.capturistaStore.setListaCapturistas(this.listadoCapturistas);
    this.capturistasSeleccionados = [];
  }

  /**
   * Navega a la pantalla de firma electrónica.
   */
  enviarFirma() {
    this.router.navigate(['login/firma-electronica']);
  }
}
