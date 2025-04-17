import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query';
import { DatosProcedureState } from '../../../../estados/tramites/tramites261101.store';
import { DatosSolicitudService } from '../../services/datoSolicitude.service'
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Mercancias } from '../../modelos/mercancias.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src'
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-mercancias',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, CatalogoSelectComponent,TituloComponent],
  templateUrl: './mercancias.component.html',
  styleUrl: './mercancias.component.css',
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

  /** Configuración para las columnas de la tabla */
  configuracionTabla: ConfiguracionColumna<Mercancias>[] = [
    { encabezado: 'Clasificación del producto ', clave: (item: Mercancias) => item.clasificacionDelProducto, orden: 1 },
    { encabezado: 'Especificar clasificación del product  ', clave: (item: Mercancias) => item.especificarClasificacionDelProduct, orden: 2 },
    { encabezado: 'Denominación ', clave: (item: Mercancias) => item.denominacion, orden: 3 },
    { encabezado: 'Denominación distintiva  ', clave: (item: Mercancias) => item.denominacionDistintiva, orden: 4 },
    { encabezado: 'Número CAS  ', clave: (item: Mercancias) => item.numeroCAS, orden: 5 },
    { encabezado: 'Fracción arancelaria', clave: (item: Mercancias) => item.fraccionArancelaria, orden: 6 },
    { encabezado: 'Descripción de I fracción ', clave: (item: Mercancias) => item.descripcionDeFraccion, orden: 7 },
  ];
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
   * Constructor para SolicitanteComponent.
   * 
   * @param fb - Una instancia de FormBuilder utilizada para crear y gestionar formularios.
   */
  constructor( private datosSolicitudService: DatosSolicitudService,
    private query: DatosProcedureQuery,
  ) {
    // Constructor del componente
  }

  /**
   * Gancho de ciclo de vida que se llama después de que se inicializan las propiedades enlazadas a datos de una directiva.
   * Inicializa el componente configurando los valores del formulario.
   * 
   */
  ngOnInit(): void {
    this.mercanciasData();
    this.obtenerDatosFormulario();
    this.crearFormulario();
  }

  /**
   * Cargar datos de domicilioEstablecimiento
   */
  mercanciasData(): void {
    this.datosSolicitudService.getMercanciasData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.mercanciasDatas = response;
      });
  }
  crearFormulario(): void {
    this.Aduana = new FormGroup({
      Aduana: new FormControl(this.seccionState),
    });
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
}

