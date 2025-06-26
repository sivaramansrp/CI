import { BandejaDeTareasPendientes, SeleccionadoDepartamento } from '../../../core/models/shared/bandeja-de-tareas-pendientes.model';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BandejaDeSolicitudeService } from '../../../core/services/consultagenerica/bandeja-tareas-pendientes.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../../core/models/shared/configuracion-columna.model';
import { ConsultaioStore } from '../../../core/estados/consulta.store';
import { FormasDinamicasComponent } from '../formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TablaAcciones } from '../../../core/enums/tabla-seleccion.enum';
import { TablaDinamicaComponent } from '../tabla-dinamica/tabla-dinamica.component';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { TipoSolicitud } from '../../../core/enums/tipoSolicitud.enum';
import { TramiteDetails } from '../../../core/models/tramiteDetails';
import { map } from 'rxjs';
import tramiteDetailsData from '@libs/shared/theme/assets/json/tramiteList.json';

/*
 * Componente LibBandejaComponent
 * Este componente es reutilizable para mostrar una bandeja dinámica con tabla, paginación y formularios.
 * Permite navegar a diferentes rutas dependiendo del origen del trámite y mostrar configuraciones dinámicas.
 */
@Component({
  selector: 'lib-bandeja',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    RouterModule,
    TablaDinamicaComponent,
    TablePaginationComponent,
  ],
  templateUrl: './lib-bandeja.component.html',
  styleUrl: './lib-bandeja.component.scss',
  encapsulation: ViewEncapsulation.None,
})
/*
 * Clase genérica LibBandejaComponent<T>
 * Este componente representa una bandeja reutilizable con tabla dinámica, formularios y navegación basada en datos.
 * Se puede utilizar con cualquier tipo de datos que se especifique mediante el tipo genérico <T>.
 * Implementa la interfaz OnInit para inicializar la lógica al montar el componente.
 */
export class LibBandejaComponent<T> implements OnInit {
  /**
   *  Título mostrado en el encabezado de la bandeja 
   */
  @Input() public titulo!: string;
  /** Indica si la bandeja debe mostrar el formulario dinámico 
   * 
   */
  @Input() public tieneBandeja: boolean = false;
  /** 
   * Título de la tabla dentro de la bandeja 
   */
  @Input() public tablaTitulo!: string;
  /**
   * Configuración de columnas para la tabla 
   */
  @Input() configuracionTabla: ConfiguracionColumna<T>[] = [];
  /**
   * Datos que se muestran en la tabla 
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() configuracionTablaDatos: any[] = [];
  /**
    * Datos que se usan en el formulario de la bandeja 
    */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public bandejaSolicitudeDatos: any[] = [];
  /**
   * Propiedad de entrada que contiene un arreglo de objetos de datos a duplicar.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public duplicarDatos: any[] = [];
  /**
   * EventEmitter que emite un evento cada vez que un valor cambia en el componente.
   */
  @Output() obtenerNombreDelDepartamento: EventEmitter<{ campo: string; valor: string}> = new EventEmitter<{ campo: string; valor: string}>();
  /**
   * Propiedad de entrada que contiene la información del departamento actualmente seleccionado.
   */
  @Input() public seleccionadoDepartamento: SeleccionadoDepartamento = {
    tieneDepartamento: false,
    numeroDeProcedimiento: '',
    nombreDelDepartamento: '',
  };
  
  /**
   * URL a la que se navega al seleccionar un trámite 
   */
  public procedureUrl!: string;
  /**
   * Indica si el formulario es válido 
   */
  public hasValidForm: boolean = false;
  /**
   * Formulario reactivo principal que contiene otro formGroup 
   */
  public dinamicasBandejaForma: FormGroup = new FormGroup({
    bandejaSolicitudeFormGroup: new FormGroup({}),
  });
  /** 
   * Acciones disponibles en la tabla (editar, etc.) 
   */
  public tablaAcciones: TablaAcciones[] = [TablaAcciones.EDITAR];
  /**
   * Copia original de la configuración de la tabla 
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public originalConfiguracionTabla: any[] = [];
  /**
   * Lista de detalles de trámite desde JSON 
   */
  public tramiteData: TramiteDetails[] = [];
  /**
   * Controla si la sección de país de origen está colapsada o no 
   */
  public paisDeOriginColapsable = false;
  /**
   * Total de elementos en la tabla 
   */
  public totalItems: number = 0;
  /**
   * Página actual en la paginación 
   */
  public currentPage: number = 1;
  /**
   * Cantidad de elementos por página 
   */
  public itemsPerPage: number = 5;
  /**
   * Datos del cuerpo para miembros de la empresa paginados 
   */
  public miembroDeLaEmpresaBodyData: unknown[] = [];
  /**
   * Indica si la configuración de datos de la tabla está disponible.
   */
  public tieneConfiguracionTablaDatos: boolean = false;
  /*
   * Constructor que inyecta Router y ConsultaioStore
   */
  constructor(
    public router: Router,
    private consultaioStore: ConsultaioStore,
    private bandejaDeSolicitudeService: BandejaDeSolicitudeService
  ) {}
  /*
   * Método del ciclo de vida OnInit
   * Valida si la bandeja contiene formulario y aplica filtro a columnas
   */
  ngOnInit(): void {
    this.filterConfiguracionTabla();
  }
  /*
   * Getter que retorna el formGroup interno
   */
  get bandejaSolicitudeFormGroup(): FormGroup {
    return this.dinamicasBandejaForma.get(
      'bandejaSolicitudeFormGroup'
    ) as FormGroup;
  }
  /*
   * Filtra la configuración de columnas para ocultar ciertas columnas no necesarias
   */
  public filterConfiguracionTabla(): void {
    this.configuracionTabla = this.configuracionTabla.filter(
      (item) =>
        item.encabezado !== 'Departamento' &&
        item.encabezado !== 'Número de procedimiento' &&
        item.encabezado !== 'Origin'
    );
  }
  /*
   * Envía los datos del formulario. Marca el formulario como válido si no hay errores
   */
  public enviarDatos(): void {
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const BANDEJA_SOLICITUDE_FORM_GROUP: null | any = this.dinamicasBandejaForma.get('bandejaSolicitudeFormGroup');
    if(BANDEJA_SOLICITUDE_FORM_GROUP.get('solicitudId').valid) {
      this.configuracionTablaDatos = this.duplicarDatos;
      const SELECTED_PROCEDURE = this.configuracionTablaDatos.filter((item) => Number(item.numeroDeProcedimiento) === Number(this.seleccionadoDepartamento.numeroDeProcedimiento));
      this.configuracionTablaDatos = SELECTED_PROCEDURE;
      this.hasValidForm = true;
      this.tieneConfiguracionTablaDatos = SELECTED_PROCEDURE.length > 0 ? true : false;
    } else {
      this.configuracionTablaDatos = this.duplicarDatos;
      this.hasValidForm = false;
      this.tieneConfiguracionTablaDatos = false;
    }
  }
  /*
   * Maneja el clic sobre una fila de la tabla.
   * Navega a la ruta correspondiente dependiendo del origen del trámite
   */
  public onFilaClic(event: T): void {
    const ROW_OBJETO = event as unknown as BandejaDeTareasPendientes;
    const PROCEDURE: number = Number(ROW_OBJETO.numeroDeProcedimiento);
    const ORIGIN: string = ROW_OBJETO.origin; // Inicializar ORIGEN con un valor predeterminado
    this.tramiteData = tramiteDetailsData.filter(
      (v) => v.tramite === PROCEDURE
    );
    this.procedureUrl = this.tramiteData[0].linkDashboard;

    this.consultaioStore.establecerConsultaio(
      String(PROCEDURE),
      ORIGIN,
      this.tramiteData[0].department,
      ROW_OBJETO.folioTramite,
      ROW_OBJETO.tipoDeTramite,
      ROW_OBJETO.estadoDeTramite,
      !this.tieneBandeja ? false : true,
      false,
      true
    );
    if (!this.tieneBandeja) {
      this.router.navigate([this.procedureUrl]);
    }
    if (ORIGIN === 'FLUJO_FUNCIONARIO_ATENDER_REQUERIMIENTO') {
      this.router.navigate([
        `/${this.tramiteData[0].department}/proceso-requerimiento`,
      ]);
    } else if (ORIGIN === 'FLUJO_FUNCIONARIO_CONFIRMAR-NOTIFICACION') {
      this.router.navigate(['/confirmar-notificacion']);
    } else if (ORIGIN === 'FLUJO_FUNCIONARIO_CONFIRMAR-RESOLUCION') {
      this.router.navigate(['/confirmar-resolucion']);
    } else if ((ORIGIN === 'FLUJO_FUNCIONARIO_EVALUAR')) {
      this.router.navigate([`/${this.tramiteData[0].department}/evaluar`]);
    } else if ((ORIGIN === 'FLUJO_FUNCIONARIO_AUTORIZACION')) {
      this.router.navigate([`/${this.tramiteData[0].department}/autorizar`]);
    }
    else if (ORIGIN === 'SUBSECUENTES') {
      this.router.navigate(['/subsecuentes']);
    } else if(ORIGIN === 'FLUJO_FUNCIONARIO_VERIFICAR-REQUERIMIENTO-RESOLUCION') {
      this.router.navigate([`/${this.tramiteData[0].department}/verificar-dictamen`]);
    }
  }
  /*
   * Alterna la visibilidad del contenido colapsable basado en el orden
   */
  public mostrarColapsable(orden: number): void {
    if (orden === 1) {
      this.paisDeOriginColapsable = !this.paisDeOriginColapsable;
    }
  }
  /*
   * Cambia la página actual en la tabla
   */
  public onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }
  /*
   * Actualiza los datos visibles de la tabla según la paginación
   */
  public updatePagination(): void {
    const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;
    this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
      START_INDEX,
      START_INDEX + this.itemsPerPage
    );
  }
  /**
   * Cambia el número de elementos por página y reinicia la página actual
   */
  public onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  /**
   * Maneja la selección de un departamento emitiendo la información del departamento seleccionado
   * y reseteando el control de formulario 'procedimiento' si ya hay un departamento seleccionado.
   *
   * @param event - Un objeto que contiene el campo seleccionado (`campo`) y su valor (`valor`).
   */
  public obtenerDepartamento(event: { campo: string; valor: string }): void {
    this.obtenerNombreDelDepartamento.emit({ campo: event.campo, valor: event.valor });
    if(this.seleccionadoDepartamento.tieneDepartamento) {
      this.bandejaSolicitudeFormGroup.get('procedimiento')?.setValue('');
    }
  }

  public obtenerProcedure(event: { campo: string; valor: string }): void {
    this.obtenerNombreDelDepartamento.emit({ campo: event.campo, valor: event.valor });
  }

  /**
   * Emite un evento para obtener el nombre del departamento basado en el tipo de solicitud seleccionado.
   *
   * @param event Objeto que contiene el campo y el valor seleccionados.
   *   - campo: El nombre del campo relacionado con la solicitud.
   *   - valor: El valor seleccionado para el campo.
   */
  public obtenerTipoSolicitud(event: { campo: string; valor: string }): void {
    this.obtenerNombreDelDepartamento.emit({ campo: event.campo, valor: event.valor });
  }

  /**
   * Filtra y procesa los datos de la bandeja según el tipo de solicitud seleccionado.
   *
   * Dependiendo del valor de 'tipoSolicitud' en el formulario, ejecuta una lógica diferente:
   * - Si es '1' (solicitante), obtiene el RFC y los roles del formulario y los asigna al cuerpo de la petición.
   * - Si es '2' (funcionario), utiliza valores predeterminados para RFC y roles, realiza una petición al servicio y actualiza la configuración de la tabla.
   * - Si es '3', filtra los datos duplicados según el departamento y número de procedimiento seleccionados.
   *
   * Actualiza los estados internos como la validez del formulario y la existencia de datos en la tabla de configuración.
   */
  public filterDatos(): void {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const BANDEJA_SOLICITUDE_FORM_GROUP: null | any = this.dinamicasBandejaForma.get('bandejaSolicitudeFormGroup');
    const TIPO_SOLICITUD = BANDEJA_SOLICITUDE_FORM_GROUP.controls['tipoSolicitud']?.value;
    const BODY = {
      rfc_usuario: "",
      roles: [""]
    };

    if (TIPO_SOLICITUD === TipoSolicitud.SOLICITANTE) {
      BODY.rfc_usuario = this.bandejaSolicitudeFormGroup.get('rfc')?.value;
      BODY.roles = this.bandejaSolicitudeFormGroup.get('roles')?.value;
    }

    if (TIPO_SOLICITUD === TipoSolicitud.FUNCIONARIO) {
      BODY.rfc_usuario = "FOGE7812179H5";
      BODY.roles = ["Dictaminador"]

        this.bandejaDeSolicitudeService.postBandejaTareas(BODY).pipe(
        map((datos: BandejaDeTareasPendientes[]) => {
          this.configuracionTablaDatos = datos;
        })
      ).subscribe();
      this.hasValidForm = true
      if (this.configuracionTablaDatos.length > 0) {
        this.tieneConfiguracionTablaDatos = true;
      } else {
        this.configuracionTablaDatos = this.duplicarDatos;
        this.tieneConfiguracionTablaDatos = false;
      }
    }
    
    if (TIPO_SOLICITUD === TipoSolicitud.ADMIN) {
      this.configuracionTablaDatos = this.duplicarDatos;
      this.configuracionTablaDatos = this.configuracionTablaDatos.filter((item) => {
      return (
        Number(item.numeroDeProcedimiento) === Number(this.seleccionadoDepartamento.numeroDeProcedimiento) &&
        item.departamento.toLowerCase() === this.seleccionadoDepartamento.nombreDelDepartamento.toLowerCase()
      );
      });
      this.hasValidForm = this.bandejaSolicitudeFormGroup.valid;
      if (this.configuracionTablaDatos.length > 0) {
        this.tieneConfiguracionTablaDatos = true;
      } else {
        this.configuracionTablaDatos = this.duplicarDatos;
        this.tieneConfiguracionTablaDatos = false;
      }
    }
  }
}
