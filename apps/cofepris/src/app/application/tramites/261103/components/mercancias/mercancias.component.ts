import { CONFIGURACIONCOLUMNA } from '../../enum/mercancias.enum';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query';
import { DatosProcedureState } from '../../../../estados/tramites/tramites261103.store';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Mercancias } from '../../modelos/mercancias.model';
import { ModificacionPermisoImportacionMedicamentosService } from '../../services/modificacion-permiso-importacion-medicamentos.service'
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src'
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-mercancias',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, CatalogoSelectComponent,TituloComponent],
  templateUrl: './mercancias.component.html',
  styleUrl: './mercancias.component.scss',
})
export class MercanciasComponent implements OnInit, OnDestroy {
  /**
 * Formulario reactivo para datos preoperativos.
 */
  domicilioEstablecimiento!: FormGroup;
  /**
* Formulario reactivo para datos preoperativos.
*/
  Aduana!: FormGroup;
  /** Enum para el tipo de selección de tabla */
  public TablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /** Array para almacenar la respuesta de permisos cancelar */
  mercanciasDatas: Mercancias[] = [];

  /** Subject para notificar la destrucción del componente */
  private destroy$ = new Subject<void>();

      /**
       * Configuración de las columnas de la tabla para mostrar los trámites asociados.
       */
      configuracionTabla: ConfiguracionColumna<Mercancias>[] =
        CONFIGURACIONCOLUMNA;
    /**
 * Estado de la sección que contiene los datos del procedimiento.
 * 
 * Esta propiedad almacena el estado actual de los datos relacionados con el procedimiento.
 * Se inicializa a través de un observable en el método `obtenerDatosFormulario`, 
 * que suscribe a los cambios en el estado y actualiza esta propiedad con los datos más recientes.
 * 
 * Tipo: `DatosProcedureState`
 * 
 * @private
 */
  private seccionState!: DatosProcedureState;

/**
 * Subject para notificar la destrucción del componente.
 */
private destroyNotifier$: Subject<void> = new Subject();

/**
* Indica si el formulario está en modo solo lectura.
* Cuando es `true`, los campos del formulario no se pueden editar.
*/
esFormularioSoloLectura: boolean = false;
  /**
   * Constructor para SolicitanteComponent.
   * 
   * @param fb - Una instancia de FormBuilder utilizada para crear y gestionar formularios.
   */
  
  constructor( private modificacionPermisoImportacionMedicamentosService: ModificacionPermisoImportacionMedicamentosService,
    private query: DatosProcedureQuery,private consultaioQuery: ConsultaioQuery
  ) {
    // Constructor del componente
  }

  /**
   * Gancho de ciclo de vida que se llama después de que se inicializan las propiedades enlazadas a datos de una directiva.
   * Inicializa el componente configurando los valores del formulario.
   * 
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: { readonly: boolean }) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe()
    this.mercanciasData();
    this.obtenerDatosFormulario();
  }

  /**
   * Cargar datos de domicilioEstablecimiento
   */
  mercanciasData(): void {
    this.modificacionPermisoImportacionMedicamentosService.getMercanciasData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.mercanciasDatas = response;
      });
  }
  /**
 * Método para crear y configurar el formulario reactivo `Aduana`.
 * 
 * Este formulario contiene un único control llamado `Aduana`, que se inicializa
 * con el estado actual de la sección (`seccionState`). Este estado es obtenido
 * previamente a través de un observable en el método `obtenerDatosFormulario`.
 * 
 * El formulario es utilizado para gestionar los datos relacionados con la aduana
 * en el contexto del componente.
 */
  crearFormulario(): void {
    this.query.selectProrroga$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.seccionState = seccionState;
      })
    )
    .subscribe()
    this.Aduana = new FormGroup({
      Aduana: new FormControl(this.seccionState),
    });
    if (this.esFormularioSoloLectura) {
      this.Aduana.disable();
    } else {
      this.Aduana.enable();
    }
  }


  /**
* Gancho de ciclo de vida OnDestroy
*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
* Gancho de ciclo de vida obtenerDatosFormulario
*/
  obtenerDatosFormulario(): void {
    this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: DatosProcedureState) => {
        this.seccionState = data;
      });
  }
  /**
 * Inicializa el estado del formulario.
 * 
 * Este método realiza las siguientes acciones dependiendo del modo del formulario:
 * 
 * 1. Si el formulario está en modo solo lectura (`esFormularioSoloLectura`):
 *    - Llama al método `crearFormulario` para inicializar el formulario reactivo.
 * 
 * 2. Si el formulario no está en modo solo lectura:
 *    - Llama al método `mercanciasData` para cargar los datos de las mercancías.
 *    - Llama al método `obtenerDatosFormulario` para obtener los datos del estado actual.
 *    - Llama al método `crearFormulario` para inicializar el formulario reactivo.
 * 
 * Este método es útil para configurar el estado inicial del formulario y sincronizarlo
 * con los datos del estado global de la aplicación.
 * 
 * @returns {void}
 */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.crearFormulario();
    } else {
      this.mercanciasData();
      this.obtenerDatosFormulario();
      this.crearFormulario();
    }
  }
}

