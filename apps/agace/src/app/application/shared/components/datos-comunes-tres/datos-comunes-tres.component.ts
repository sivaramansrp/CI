import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Catalogo, ConfiguracionColumna, ModeloDeFormaDinamica, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { DATOS_COMUNES, NUMERO_DE_EMPLEADOS_CONFIGURACION } from '../../constants/datos-comunes-tres.enum';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosComunesTresService } from '../../services/datos-comunes-tres.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Modal } from 'bootstrap';
import { NumeroDeEmpleados } from '../../models/datos-comunes-tres.model';

@Component({
  selector: 'app-datos-comunes-tres',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './datos-comunes-tres.component.html',
  styleUrl: './datos-comunes-tres.component.scss',
})
export class DatosComunesTresComponent implements OnInit, AfterViewInit {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  @ViewChild('customTemplate2') customTemplate2!: TemplateRef<unknown>;

  /** Referencia al modal para agregar miembros de la empresa.*/
  @ViewChild('modalAgregarMiembrosEmpresa', { static: false }) modalElement!: ElementRef;

  /** Referencia al modal de la sección de subcontratados.*/
  @ViewChild('modalSeccionSubcontratados', { static: false }) modalSeccionSubcontratadosElement!: ElementRef;

  /** Referencia al modal para agregar miembros de la empresa.*/
  @ViewChild('modalConfirmacion', { static: false }) modalConfirmacion!: ElementRef;

  public templateMap: Record<string, TemplateRef<unknown>> = {};

  public datosComunesForm: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  public datosComunesFormData = DATOS_COMUNES;

  /** Tipo de tabla utilizada para mostrar número de empleados (checkbox) */
  public numeroDeEmpleadosTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de columnas para la tabla de número de empleados */
  public numeroDeEmpleadosConfiguracionColumnas: ConfiguracionColumna<NumeroDeEmpleados>[] = NUMERO_DE_EMPLEADOS_CONFIGURACION;

  /** Lista completa de número de empleados */
  public numeroDeEmpleadosLista: NumeroDeEmpleados[] = [] as NumeroDeEmpleados[];

  /** Lista de empleados seleccionados en la tabla */
  public seleccionarNumeroDeEmpleadosLista: NumeroDeEmpleados[] = [] as NumeroDeEmpleados[];

  public mostrarNumeroSolicitudSeccion: boolean = false;

  /**
  * Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup`
  */
  get ninoFormGroup(): FormGroup {
    return this.datosComunesForm.get('ninoFormGroup') as FormGroup;
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
  }

  obtenerSectorProductivoOpciones(): void {
    this.datosComunesTresService
      .getProductivoDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const PRODUCTIVO_FIELD = this.datosComunesFormData.find(
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
        const SERVICIO_FIELD = this.datosComunesFormData.find(
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
        const BIMESTRE_FIELD = this.datosComunesFormData.find(
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
        const INDIQUE_TODOS_FIELD = this.datosComunesFormData.find(
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
        customSection2: this.customTemplate2
      };
    });
  }

  /**
   * Método para establecer un cambio de valor en el store.
   * @param event Objeto que contiene el campo y el valor a actualizar.
   * Si el campo es 'tipoOperacion', se ejecuta el método alCambiarTipoOperacion.
   */
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      // Actualiza el valor dinámico en el store.
      // this.tramite5601Store.setDynamicFieldValue(event.campo, event.valor);
      if (event.campo === 'senaleSiCuenta') {
        this.mostrarCampos('cualEsElNumero');
        this.mostrarCampos('empleados');
        this.mostrarCampos('bimestre');
      }

      if (this.ninoFormGroup.get('empleados')?.value) {
        const CONTROL = this.ninoFormGroup.get('bimestre');
        if (!this.ninoFormGroup.get('bimestre')?.value) {
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

      if (event.campo === 'senaleSiAlMomentoFraccionVI' || event.campo === 'senaleSiSusCertificados') {
        if (this.modalConfirmacion) {
          const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
          MODAL_INSTANCE.show();
        }
      }
    }
  }

  mostrarCampos(campo: string): void {
    const CAMPO = this.datosComunesFormData.find(f => f.campo === campo);
    if (CAMPO) {
      CAMPO.mostrar = true;
    }
  }

  /** Guarda la selección de número de empleados hecha por el usuario.*/
  seleccionarNumeroDeEmpleadosDato(evento: NumeroDeEmpleados[]): void {
    this.seleccionarNumeroDeEmpleadosLista = evento;
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
}
