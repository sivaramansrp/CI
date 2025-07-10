import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CONTROL_INVENTARIOS, DATOS_COMUNES, DOMICILIOS_CONFIGURACION_COLUMNAS, INVENTARIOS_CONFIGURACION, NUMERO_DE_EMPLEADOS_CONFIGURACION } from '../../constants/datos-comunes-tres.enum';
import { Catalogo, ConfiguracionAporteColumna, ConfiguracionColumna, InputRadioComponent, ModeloDeFormaDinamica, TablaConEntradaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Domicilios, Inventarios, NumeroDeEmpleados } from '../../models/datos-comunes-tres.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosComunesTresService } from '../../services/datos-comunes-tres.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-datos-comunes-tres',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TablaDinamicaComponent,
    TituloComponent,
    InputRadioComponent,
    TablaConEntradaComponent
  ],
  templateUrl: './datos-comunes-tres.component.html',
  styleUrl: './datos-comunes-tres.component.scss',
})
export class DatosComunesTresComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  @ViewChild('customTemplate2') customTemplate2!: TemplateRef<unknown>;

  @ViewChild('customTemplate3') customTemplate3!: TemplateRef<unknown>;

  /** Referencia al modal para agregar miembros de la empresa.*/
  @ViewChild('modalAgregarMiembrosEmpresa', { static: false }) modalElement!: ElementRef;

  /** Referencia al modal de la sección de subcontratados.*/
  @ViewChild('modalSeccionSubcontratados', { static: false }) modalSeccionSubcontratadosElement!: ElementRef;

  /** Referencia al modal de instalaciones principales.*/
  @ViewChild('modalInstalacionesPrincipales', { static: false }) modalInstalacionesPrincipalesElement!: ElementRef;

  /** Referencia al modal para agregar miembros de la empresa.*/
  @ViewChild('modalConfirmacion', { static: false }) modalConfirmacion!: ElementRef;

  public templateMap: Record<string, TemplateRef<unknown>> = {};

  public datosComunesForm: FormGroup = new FormGroup({
    ninoFormGroupUno: new FormGroup({}),
    ninoFormGroupDos: new FormGroup({}),
    archivoExtranjero: new FormControl(''),
    proveedoresExtranjero: new FormControl(''),
    clientesActualmente: new FormControl(''),
    proveedoresActualmente: new FormControl(''),
    senaleSiElSAT: new FormControl(''),
    senaleSiIngresaMensualmente: new FormControl(''),
  });

  public formDataUno = DATOS_COMUNES;

  public formDataDos = CONTROL_INVENTARIOS;

  /** Tipo de tabla utilizada para mostrar número de empleados (checkbox) */
  public tablaSeleccionCheckbox = TablaSeleccion.CHECKBOX;

  /** Configuración de columnas para la tabla de número de empleados */
  public numeroDeEmpleadosConfiguracionColumnas: ConfiguracionColumna<NumeroDeEmpleados>[] = NUMERO_DE_EMPLEADOS_CONFIGURACION;

  /** Lista completa de número de empleados */
  public numeroDeEmpleadosLista: NumeroDeEmpleados[] = [] as NumeroDeEmpleados[];

  /** Lista de empleados seleccionados en la tabla */
  public seleccionarNumeroDeEmpleadosLista: NumeroDeEmpleados[] = [] as NumeroDeEmpleados[];

  /** Domicilios seleccionados por el usuario */
  public seleccionarDomiciliosDatos: Domicilios[] = [] as Domicilios[];

  /** Inventarios seleccionados por el usuario */
  public seleccionarInventarios: Inventarios[] = [] as Inventarios[];

   /** Configuración de columnas para la tabla de domicilios */
  public domiciliosConfiguracionColumnas: ConfiguracionColumna<Domicilios>[] = DOMICILIOS_CONFIGURACION_COLUMNAS;

  /** Configuración de columnas para la tabla de inventarios */
  public inventariosConfiguracionColumnas: ConfiguracionAporteColumna<Inventarios>[] = INVENTARIOS_CONFIGURACION;

  /** Datos de los domicilios disponibles */
  public domiciliosDatos: Domicilios[] = [] as Domicilios[];

  /** Datos de inventarios registrados */
  public inventariosDatos: Inventarios[] = [] as Inventarios[];

  public mostrarNumeroSolicitudSeccion: boolean = false;

  /** Modelo para la opción de tipo sí/no representado como radio button */
  public sinoOpciones = [
    {
      "label": "Sí",
      "value": 1
    },
    {
      "label": "No",
      "value": 2
    }
  ];

  /** Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroupUno`*/
  get ninoFormGroupUno(): FormGroup {
    return this.datosComunesForm.get('ninoFormGroupUno') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroupDos`*/
  get ninoFormGroupDos(): FormGroup {
    return this.datosComunesForm.get('ninoFormGroupDos') as FormGroup;
  }

  /** Subject para destruir el componente */
  public destroy$ = new Subject<void>();

  constructor(
    private datosComunesTresService: DatosComunesTresService,
    private changeDetectorRef: ChangeDetectorRef) {
    // 
  }

  ngOnInit(): void {
    this.obtenerSectorProductivoOpciones();
    this.obtenerServicioOpciones();
    this.obtenerBimestreOpciones();
    this.obtenerIndiqueTodosOpciones();
    this.conseguirInventarios();
  }

  /** Método para obtener los datos de inventarios desde el servicio. Los resultados se asignan a la propiedad `inventariosDatos`.*/
  conseguirInventarios(): void {
    this.datosComunesTresService
      .conseguirInventarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: Inventarios[]) => {
          this.inventariosDatos = respuesta;
        },
      });
  }

  obtenerSectorProductivoOpciones(): void {
    this.datosComunesTresService
      .getProductivoDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const PRODUCTIVO_FIELD = this.formDataUno.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'catseleccionados'
        ) as ModeloDeFormaDinamica;
        if (PRODUCTIVO_FIELD && !PRODUCTIVO_FIELD.opciones) {
          if (Array.isArray(data)) {
            PRODUCTIVO_FIELD.opciones = data.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  obtenerServicioOpciones(): void {
    this.datosComunesTresService
      .getServicioDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const SERVICIO_FIELD = this.formDataUno.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'servicio'
        ) as ModeloDeFormaDinamica;
        if (SERVICIO_FIELD && !SERVICIO_FIELD.opciones) {
          if (Array.isArray(data)) {
            SERVICIO_FIELD.opciones = data.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  obtenerBimestreOpciones(): void {
    this.datosComunesTresService
      .getBimestreDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Catalogo) => {
        const BIMESTRE_FIELD = this.formDataUno.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'bimestre'
        ) as ModeloDeFormaDinamica;
        if (BIMESTRE_FIELD) {
          if (Array.isArray(data)) {
            BIMESTRE_FIELD.opciones = data.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  obtenerIndiqueTodosOpciones(): void {
    this.datosComunesTresService
      .getIndiqueTodosdatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Catalogo) => {
        const INDIQUE_TODOS_FIELD = this.formDataUno.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'indiqueTodos'
        ) as ModeloDeFormaDinamica;
        if (INDIQUE_TODOS_FIELD) {
          if (Array.isArray(data)) {
            INDIQUE_TODOS_FIELD.opciones = data.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.templateMap = {
        customSection1: this.customTemplate1,
        customSection2: this.customTemplate2,
        customSection3: this.customTemplate3
      };
    });
  }

  /**
   * Método para establecer un cambio de valor en el store.
   * @param event Objeto que contiene el campo y el valor a actualizar.
   * Si el campo es 'tipoOperacion', se ejecuta el método alCambiarTipoOperacion.
   */
  establecerCambioDeValorUno(event: { campo: string; valor: object | string }): void {
    if (event) {
      // Actualiza el valor dinámico en el store.
      // this.tramite5601Store.setDynamicFieldValue(event.campo, event.valor);
      if (event.campo === 'senaleSiCuenta') {
        this.mostrarCampos('cualEsElNumero');
        this.mostrarCampos('empleados');
        this.mostrarCampos('bimestre');
      }

      if (this.ninoFormGroupUno.get('empleados')?.value) {
        const CONTROL = this.ninoFormGroupUno.get('bimestre');
        if (!this.ninoFormGroupUno.get('bimestre')?.value) {
          if (CONTROL) {
            CONTROL.setErrors({ custom: { mensaje: 'Se debe agregar los datos del número de empleados propios del último bimestre.' } });
            CONTROL.markAsTouched();
            CONTROL.updateValueAndValidity();
            this.changeDetectorRef.detectChanges();
          }
        } else {
          CONTROL?.setErrors({custom: null});
          this.changeDetectorRef.detectChanges();
        }
      }

      if (event.campo === 'senaleEspecializadas') {
        this.mostrarNumeroSolicitudSeccion = true;
        this.mostrarCampos('enSuCasoLFT');
      }

      if (event.campo === 'senaleSiAlMomentoFraccionVI' || event.campo === 'senaleSiSusCertificados' || event.campo === 'senalesiSeSectorial') {
        if (this.modalConfirmacion) {
          const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
          MODAL_INSTANCE.show();
        }
      }
    }
  }

  /**
   * Método para establecer un cambio de valor en el store.
   * @param event Objeto que contiene el campo y el valor a actualizar.
   * Si el campo es 'tipoOperacion', se ejecuta el método alCambiarTipoOperacion.
   */
  establecerCambioDeValorDos(event: { campo: string; valor: object | string }): void {
    if (event) {
      // Actualiza el valor dinámico en el store.
      // this.tramite5601Store.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  mostrarCampos(campo: string): void {
    const CAMPO = this.formDataUno.find(f => f.campo === campo);
    if (CAMPO) {
      CAMPO.mostrar = true;
    }
  }

  /** Guarda la selección de número de empleados hecha por el usuario.*/
  seleccionarNumeroDeEmpleadosDato(evento: NumeroDeEmpleados[]): void {
    this.seleccionarNumeroDeEmpleadosLista = evento;
  }

  /**  Guarda la selección de domicilios hecha por el usuario.*/
  seleccionarDomiciliosDato(evento: Domicilios[]): void {
    this.seleccionarDomiciliosDatos = evento;
  }

  /**  Guarda la selección de inventarios hecha por el usuario.*/
  seleccionarInventariosDatos(evento: Inventarios[]): void {
    this.seleccionarInventarios = evento;
  }

  /** Muestra el modal para agregar subcontratados a la empresa.
  * Utiliza el elemento referenciado como modalSeccionSubcontratadosElement.
  */
  agregarSubcontratados(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalSeccionSubcontratadosElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Muestra el modal para agregar instalaciones principales de la empresa.
   * Utiliza el elemento referenciado como modalInstalacionesPrincipalesElement.
   */
  agregarInstalacionesPrincipales(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalInstalacionesPrincipalesElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /** Elimina los registros de número de empleados seleccionados.*/
  eliminarNumeroDeEmpleadosDato(): void {
    if (this.seleccionarNumeroDeEmpleadosLista.length > 0) {
      this.seleccionarNumeroDeEmpleadosLista.forEach((elemento) => {
        const INDICE = this.numeroDeEmpleadosLista.findIndex(
          (inv) => inv.numeroDeEmpleados === elemento.numeroDeEmpleados
        );
        if (INDICE !== -1) {
          this.numeroDeEmpleadosLista.splice(INDICE, 1);
        }
      });
    }
  }

  /** Elimina los domicilios seleccionados de la lista.*/
  eliminarDomiciliosDatos(): void {
    if (this.seleccionarDomiciliosDatos.length > 0) {
      this.seleccionarDomiciliosDatos.forEach((elemento) => {
        const INDICE = this.domiciliosDatos.findIndex(
          (inv) => inv.tipoInstalacion === elemento.tipoInstalacion
        );
        if (INDICE !== -1) {
          this.domiciliosDatos.splice(INDICE, 1);
        }
      });
    }
  }

  /** Elimina los inventarios seleccionados de la lista.*/
  eliminarInventariosDatos(): void {
    if (this.seleccionarInventarios.length > 0) {
      this.seleccionarInventarios.forEach((elemento) => {
        const INDICE = this.inventariosDatos.findIndex(
          (inv) => inv.nombre === elemento.nombre
        );
        if (INDICE !== -1) {
          this.inventariosDatos.splice(INDICE, 1);
        }
      });
    }
  }

  /** Actualiza el valor del archivo 2 desde un input file.
   * @param {Event} valor - Evento de cambio del input.
   */
  cambioEvento(event: Event, campo: string): void {
    let VALOR;
    if (event.target) {
      VALOR = (event.target as HTMLInputElement).value;
    } else {
      VALOR = event;
    }
    console.log('campo', campo)
    console.log('valor', VALOR)
    // this.solicitud32605Store.actualizarFile2(VALOR);
  }

  /** Limpia y completa la señal de destrucción para evitar fugas de memoria.*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
