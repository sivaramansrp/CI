import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Catalogo, RespuestaCatalogos } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { CONFIGURACION_DOMICILIOS, CONFIGURACION_SERVICIO_IMMEX } from '../../constantes/modificacion.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AmpliacionServiciosService } from 'libs/shared/data-access-user/src/core/services/80205/ampliacion-servicios.service';
import { FormularioDinamico } from 'libs/shared/data-access-user/src/core/models/shared/forms-model';
import { Servicios } from 'libs/shared/data-access-user/src/core/models/80205/ampliacion-servicios.model';
import { Subscription } from 'rxjs';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { UppercaseDirective } from 'libs/shared/data-access-user/src/tramites/directives/Uppercase/uppercase.directive';

/**
 * Componente para la ampliación de servicios.
 * @component AmpliacionServiciosComponent
 * @selector ampliacion-servicios
 * @templateUrl ./ampliacion-servicios.component.html
 * @styleUrl ./ampliacion-servicios.component.scss
 */
@Component({
  selector: 'ampliacion-servicios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UppercaseDirective,
    CatalogoSelectComponent,
    FormsModule,
    TablaDinamicaComponent
  ],
  templateUrl: './ampliacion-servicios.component.html',
  styleUrl: './ampliacion-servicios.component.scss',
})
export class AmpliacionServiciosComponent implements OnInit {
  /**
   * Índice de la pestaña.
   * @property {number} tabindex
   */
  @Input() tabindex!: number;

  private subscription: Subscription = new Subscription();

  tipoPersona!: number;
  domicilioFiscal: FormularioDinamico[] = [];
  tableHeaderData: string[] = [];
  serviciosDropDown: string = "";
  recibioDatos: any = '';
  formularioInfoRegistro!: FormGroup;
  tablaseleccion: any = 'RADIO';
  rfcEmpresa: string = '';
  numeroPrograma: string = '';
  tiempoPrograma: string = '';
  configuracionTabla: ConfiguracionColumna<any>[] = CONFIGURACION_DOMICILIOS;
  configuracionTablaServicio: ConfiguracionColumna<any>[] = CONFIGURACION_SERVICIO_IMMEX;
  datos: any = [];
  datosImmex: any = [];
  domiciliosSeleccionados: any = [];
  empresasSeleccionados: any = [];
  /**
   * Variable para almacenar los datos cuando se hace clic en el botón "Agregar".
   * @property {any[]} datosEmpresas
   */
  datosEmpresas: any[] = [];
  datosDelaSolicitud!: FormGroup;
  forma!: FormGroup;
  aduanaDeIngreso!: Catalogo[];
  autorizadosBodyData: [] = [];
  infoRegistro!: Servicios;

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {AmpliacionServiciosService} ampliacionServiciosService - Servicio para obtener datos de ampliación de servicios.
   * @param {HttpClient} httpServicios - Servicio HTTP para realizar peticiones.
   */
  constructor(
    private fb: FormBuilder,
    private ampliacionServiciosService: AmpliacionServiciosService,
    private readonly httpServicios: HttpClient
  ) {
    this.crearFormulario();
    this.initActionFormBuild();
    this.inicializarFormularioInfoRegistro();
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit() {
    this.obtenerIngresoSelectList();
    this.inicializarFormularioInfoRegistro();
    this.getDatos();
  }

  /**
   * Obtiene los datos del servicio.
   * @method getDatos
   */
  getDatos(): void {
    this.subscription.add(
      this.ampliacionServiciosService.getDatos().subscribe((respuesta: any) => {
        if (respuesta && respuesta['code'] == 200) {
          this.infoRegistro = respuesta['data'].infoServicios;
          this.inicializarFormularioInfoRegistro();
        }
      })
    );
  }

  /**
   * Inicializa el formulario de información de registro.
   * @method inicializarFormularioInfoRegistro
   */
  inicializarFormularioInfoRegistro(): void {
    if (this.infoRegistro) {
      this.formularioInfoRegistro = this.fb.group({
        seleccionaLaModalidad: [{ value: this.infoRegistro.seleccionaLaModalidad, disabled: true }],
        folio: [{ value: this.infoRegistro.folio, disabled: true }],
        año: [{ value: this.infoRegistro.año, disabled: true }],
      });
    } else {
      this.formularioInfoRegistro = this.fb.group({
        seleccionaLaModalidad: [{ value: '', disabled: true }],
        folio: [{ value: '', disabled: true }],
        año: [{ value: '', disabled: true }],
      });
    }
  }

  /**
   * Crea un formulario vacío con dos grupos de formularios, datosGenerales y domicilioFiscal.
   * @method crearFormulario
   */
  crearFormulario(): void {
    this.forma = this.fb.group({
      datosDelaSolicitud: this.fb.group({}),
    });
  }

  /**
   * Obtiene la lista de selección de ingreso.
   * @method obtenerIngresoSelectList
   */
  obtenerIngresoSelectList(): void {
    this.subscription.add(
      this.ampliacionServiciosService.obtenerIngresoSelectList().subscribe((data: any): void => {
        const datos = data?.data;
        this.aduanaDeIngreso = datos;
      })
    );
  }

  /**
   * Inicializa el formulario de acción.
   * @method initActionFormBuild
   */
  initActionFormBuild(): void {
    this.datosDelaSolicitud = this.fb.group({
      aduanaIngreso: ['', Validators.required],
    });
  }

  /**
   * Elimina servicios del grid.
   * @method eliminarServiciosGrid
   */
  eliminarServiciosGrid(): void {
    const indice = this.datosImmex.findIndex((item: any) => item.descripiónDelServicio === this.domiciliosSeleccionados[0].descripiónDelServicio);
    this.datosImmex.splice(indice, 1);
  }

  /**
   * Agrega servicios a la ampliación.
   * @method agregarServiciosAmpliacion
   */
  agregarServiciosAmpliacion(): void {
    let cuerpoDatos = { descripiónDelServicio: this.recibioDatos.descripcion, tipode: this.recibioDatos.tipode };
    this.datosImmex.push(cuerpoDatos);
  }

  /**
   * Elimina empresas nacionales.
   * @method eliminarEmpresasNacionales
   */
  eliminarEmpresasNacionales(): void {
    const indice = this.datos.findIndex((item: any) => item.RegistroContribuyentes === this.empresasSeleccionados[0].RegistroContribuyentes);
    this.datos.splice(indice, 1);
  }

  /**
   * Actualiza el grid de empresas nacionales.
   * @method actualizaGridEmpresasNacionales
   */
  actualizaGridEmpresasNacionales(): void {
    let cuerpoDatos = { Servicio: "Auditoría de sistemas de seguridad", RegistroContribuyentes: this.rfcEmpresa, DenominaciónSocial: "AAL970927390", NumeroIMMEX: this.numeroPrograma, AñoIMMEX: this.tiempoPrograma };
    this.datos.push(cuerpoDatos);
    this.rfcEmpresa = '';
    this.numeroPrograma = '';
    this.tiempoPrograma = '';
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Maneja los datos recibidos del componente hijo.
   * @method procesarDatosDelHijo
   * @param {any} data - Datos recibidos.
   */
  procesarDatosDelHijo(data: any): void {
    this.recibioDatos = data;
  }

  /**
   * Selecciona domicilios.
   * @method seleccionarDomicilios
   * @param {any} domicilios - Domicilios seleccionados.
   */
  seleccionarDomicilios(domicilios: any): void {
    this.domiciliosSeleccionados = [{ ...domicilios }];
    console.log(domicilios);
  }

  /**
   * Selecciona empresas.
   * @method seleccionarEmpresas
   * @param {any} empresas - Empresas seleccionadas.
   */
  seleccionarEmpresas(empresas: any): void {
    this.empresasSeleccionados = [{ ...empresas }];
    console.log(empresas);
  }
}