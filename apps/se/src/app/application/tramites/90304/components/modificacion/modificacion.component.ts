import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';

import { EmpresasLista, EmpresasListaResquesta, ModificacionResquesta } from '../../models/prosec.model';
import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { ProducirMercanciasComponent } from '../../../../shared/components/producir-mercancias/producir-mercancias.component';
import { ProsecService } from '../../services/prosec/prosec.service';
import { TABLA_EMPRESAS_LISTA } from '../../constantes/prosec.enum';

/**
 * Componente para mostrar la información de modificación de un trámite.
 * @component ModificacionComponent
 */
@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [
    ProducirMercanciasComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TituloComponent
  ],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.scss'
})
export class ModificacionComponent implements OnInit, OnDestroy {
  /**
   * Formulario de modificación
   * @type {FormGroup}
   */
  modificacionForm!: FormGroup;

  /**
   * Lista de empresas obtenidas del servicio
   * @type {EmpresasLista[]}
   */
  empresasLista: EmpresasLista[] = [];

  /**
   * Tabla de selección de empresas
   * @type {TablaSeleccion}
   */
  tablaSeleccion = TablaSeleccion.BUTTON;

  /**
   * Configuración de la tabla de empresas
   * @type {ConfiguracionColumna<EmpresasLista>[]}
   */
  configuracionTabla = TABLA_EMPRESAS_LISTA;

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

   /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
   /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - FormBuilder para crear formularios reactivos.
   * @param {ProsecService} prosecService - Servicio para obtener los datos de modificación.
   */
  constructor(
    private fb: FormBuilder,
    private prosecService: ProsecService,
    private consultaioQuery: ConsultaioQuery
  ) {
    // constructor vacío
  }

  /**
   * Se ejecuta al inicializar el componente.
   * Llama a los métodos `obtenerModificacionDatos` y `obtenerEmpresasListaDatos` para obtener los datos necesarios.
   * Inicializa el formulario principal llamando a `crearModificacionForm`.
   * @returns {void}
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
        })
      )
      .subscribe();
    this.obtenerEmpresasListaDatos();
    this.crearModificacionForm();
    this.obtenerModificacionDatos();
  }

  /**
   * Crea el formulario de modificación utilizando FormBuilder.
   * Inicializa los campos del formulario y los desactiva para evitar la edición directa.
   * @returns {void}
   */
  crearModificacionForm(): void {
    this.modificacionForm = this.fb.group({
      registroFederalContribuyentes: [{ value: '', disabled: true }],
      representacionFederal: [{ value: '', disabled: true }],
      tipoModificacion: [{ value: '', disabled: true }],
      modificacionPrograma: [{ value: '', disabled: true }],
    });
  }

  /**
   * Obtiene los datos de modificación desde el servicio `ProsecService`.
   * Se suscribe al observable y actualiza el formulario con los datos obtenidos.
   * @returns {void}
   */
  obtenerModificacionDatos(): void {
    this.prosecService.obtenerModificacionDatos()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe((modificacion: ModificacionResquesta) => {
        this.modificacionForm.patchValue({
          registroFederalContribuyentes: modificacion.data[0].registroFederalContribuyentes,
          representacionFederal: modificacion.data[0].representacionFederal,
          tipoModificacion: modificacion.data[0].tipoModificacion,
          modificacionPrograma: modificacion.data[0].modificacionPrograma,
        });
      });
  }

  /**
   * Obtiene la lista de empresas desde el servicio `ProsecService`.
   * Se suscribe al observable y almacena los datos en `empresasLista`.
   * @returns {void}
   */
  obtenerEmpresasListaDatos(): void {
    this.prosecService.obtenerEmpresasListaDatos()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe((empresas: EmpresasListaResquesta) => {
        this.empresasLista = empresas.data.length > 0 ? empresas.data : [];
      });
  }
  isBaja: boolean = true;
  onFilaClic(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    if (TARGET.tagName === 'BUTTON' && TARGET.textContent?.trim() === 'BAJA') {
      this.isBaja = false;
      TARGET.textContent = 'Activar';
    }
    TARGET.textContent = 'Activar';
  }
  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}
