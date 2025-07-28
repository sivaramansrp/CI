import { CATALOGOS_ID, Catalogo, CatalogosService, ConsultaioQuery } from '@ng-mf/data-access-user';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud231001State, Tramite231001Store } from '../../estados/tramites/tramite231001.store';
import { Subject, map } from 'rxjs';
import { AdministrarResiduosService } from '../../services/administrar-residuos.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite231001Query } from '../../estados/queries/tramite231001.query';
import { takeUntil } from 'rxjs';

/**
 * Componente para administrar residuos
 */
@Component({
  selector: 'app-administrar-residuos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TableComponent,CatalogoSelectComponent],
  templateUrl: './administrar-residuos.component.html',
  styleUrl: './administrar-residuos.component.scss',
})
export class AdministrarResiduosComponent implements OnInit, OnDestroy {
  /**
   * Datos del encabezado de la tabla
   */
  tableHeaderData: string[] = [];
  /**
   * Datos del cuerpo de la tabla
   */
  tableBodyData: { tbodyData: string[] }[] = [];
  /**
   * Datos de la tabla obtenidos de un archivo JSON
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getEstablecimientoTableData: any;
  /**
   * Formulario para el recuento total de filas
   */
  formularioParaRecuentoTotal!: FormGroup;

  /**
   * Sujeto utilizado para gestionar la destrucción y limpieza de suscripciones en el componente.
   * Se emite un valor cuando el componente se destruye, permitiendo cancelar observables y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();
    /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando se establece en `true`, todos los controles del formulario y elementos interactivos
 * se deshabilitan, impidiendo que el usuario realice cambios. Esta propiedad normalmente se
 * configura según el estado de la aplicación, por ejemplo, al visualizar una solicitud enviada
 * o cuando el usuario no tiene permisos de edición.
 */
  esFormularioSoloLectura: boolean = false;
    /**
 * Estado actual de la sección del trámite 120501.
 * Esta propiedad almacena los datos del estado de la sección, obtenidos generalmente
 * desde el store o desde una consulta al backend. Se utiliza para inicializar y actualizar
 * los formularios del componente con los valores correspondientes a la solicitud en curso.
 */
   private seccionState!: Solicitud231001State;
   
     /**
      *  aduanas
      *  Arreglo que almacena los catálogos de aduanas.
      */
     aduanas!: Catalogo[];


  /**
   * Constructor de la clase
   * FormBuilder para crear formularios reactivos
   * Servicio para administrar residuos
   */
  constructor(private fb: FormBuilder,
     private service: AdministrarResiduosService,
     private consultaioQuery: ConsultaioQuery,
    private catalogosServices: CatalogosService,
    private tramite231001Query: Tramite231001Query,
    private tramite231001Store: Tramite231001Store
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
           this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.loadAdministrarResiduos();
    this.aduanasdata();
  }

      /**
 * Inicializa el estado de los formularios según el modo de solo lectura.
 *
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), llama a `guardarDatosFormulario()`
 * para deshabilitar todos los controles. En caso contrario, inicializa los formularios normalmente.
 */
   inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); 
    } else {
      this.crearFormularioParaRecuentoTotal();
    }
  }
   /**
 * Guarda y actualiza el estado de los formularios según el modo de solo lectura.
 *
 * Inicializa los formularios y luego los deshabilita si el formulario está en modo solo lectura,
 * o los habilita si está en modo edición.
 */
  guardarDatosFormulario(): void {
    this.crearFormularioParaRecuentoTotal();
    if (this.esFormularioSoloLectura) {
      this.formularioParaRecuentoTotal.disable();
     
    } else {
      this.formularioParaRecuentoTotal.enable();
    }
}
  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Se utiliza para emitir y completar el observable `destroyed$`, permitiendo limpiar suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Obtiene los datos del establecimiento y los asigna a las variables de la tabla
   */
  public getEstablecimiento(): void {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
}

  /**
   * Crea el formulario para el recuento total de filas
   */
  crearFormularioParaRecuentoTotal(): void {
    this.obtenerEstadoSolicitud();
    this.formularioParaRecuentoTotal = this.fb.group({
      recuentoTotalDeFilas: [{ value: '', disabled: true }],
      aduanas: [this.seccionState?.aduanas, Validators.required],
    });
  }

   /**
   * Suscribe al observable `selectSolicitud$` del query `tramite120501Query` para obtener el estado actual de la solicitud y actualizar la propiedad `seccionState` con los datos recibidos. La suscripción se mantiene activa hasta que se emite un valor en `destroyed$`, evitando fugas de memoria.
   */
  obtenerEstadoSolicitud(): void {
    this.tramite231001Query.selectSolicitud$?.pipe(takeUntil(this.destroyed$))
      .subscribe((data: Solicitud231001State) => {
        this.seccionState = data;
      });
  }
  /**
   * Actualiza el recuento total de filas en el formulario
   */
  public actualizarRecuentoTotalDeFilas(): void {
    const TOTAL_ROW_COUNT = this.tableBodyData.length;
    this.formularioParaRecuentoTotal.patchValue({ recuentoTotalDeFilas: TOTAL_ROW_COUNT });
}

  /**
   * Carga los datos para administrar residuos
   */
  loadAdministrarResiduos(): void {
    this.service
      .getAdministrarResiduos()
      .pipe(
        takeUntil(this.destroyed$) // Se usa takeUntil para asegurarse de que las suscripciones se cancelen al destruirse el componente
      )
      .subscribe((data) => {
        this.getEstablecimientoTableData = data;
        this.getEstablecimiento();
        this.actualizarRecuentoTotalDeFilas();
      });
  }
 /**
 * Obtiene el valor de un campo específico del formulario y lo establece en el store utilizando el método proporcionado.
 */
setValoresStore(form: FormGroup, campo: string): void {
  const VALOR = form.get(campo)?.value;
  this.tramite231001Store.actualizarEstado({ [campo]: VALOR });
}
  
  
  /**
   * Obtiene los datos de las aduanas desde el servicio de catálogos.
   */
  aduanasdata(): void {
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_ADUANAS).subscribe({
      next: (resp) => {
        if (resp.length > 0) {
          this.aduanas = resp;
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });
  }
}