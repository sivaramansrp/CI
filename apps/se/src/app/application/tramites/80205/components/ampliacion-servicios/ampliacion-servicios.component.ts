import { Catalogo, 
  CatalogoSelectComponent,
  FormularioDinamico,
  TablaDinamicaComponent, 
  TablaSeleccion, 
  UppercaseDirective 
  } from '@ng-mf/data-access-user';

  import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
  } from '@angular/forms';

import { CONFIGURACION_DOMICILIOS, CONFIGURACION_SERVICIO_IMMEX } from "../../constantes/modificacion.enum";
import { Servicio,ServicioInmex,Servicios} from "../../models/datos-info.model";
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { ApiResponse} from "../../models/datos-info.model";
import { ConfiguracionColumna } from '../../models/configuracion-columna.model';

import{Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

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

export class AmpliacionServiciosComponent implements OnInit, OnDestroy {

  
  /**
   * Índice de la pestaña.
   * @property {number} tabindex
   */
  @Input() tabindex!: number;

  private subscription: Subscription = new Subscription();
  tipoPersona!: number;
  domicilioFiscal: FormularioDinamico[] = [];
  serviciosDropDown: string = "";
  recibioDatos: Servicio[] = [];
  formularioInfoRegistro!: FormGroup;
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO
  rfcEmpresa: string = '';
  numeroPrograma: string = '';
  tiempoPrograma: string = '';
  configuracionTabla: ConfiguracionColumna<ServicioInmex>[]= CONFIGURACION_DOMICILIOS;
  configuracionTablaServicio: ConfiguracionColumna<Servicio>[] = CONFIGURACION_SERVICIO_IMMEX;
  datos :ServicioInmex[] = [];
  datosImmex:Servicio[] = [];
  domiciliosSeleccionados: Servicio[] = [];
  empresasSeleccionados: ServicioInmex[] = [];
  
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
   
    this.inicializarFormularioInfoRegistro();
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit():void {
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
      this.ampliacionServiciosService.getDatos().subscribe((respuesta) => {
        const RESPONSE = respuesta as unknown as ApiResponse; 
        if (RESPONSE) {
          this.infoRegistro = RESPONSE.infoServicios;
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
  
  /**
   * Obtiene la lista de selección de ingreso.
   * @method obtenerIngresoSelectList
   */
  obtenerIngresoSelectList(): void {
    this.subscription.add(
      this.ampliacionServiciosService.obtenerIngresoSelectList().subscribe((data)=> {
        const DATOS= data as Catalogo[];
        this.aduanaDeIngreso = DATOS;
      })
      
    );
  }


  /**
   * Elimina servicios del grid.
   * @method eliminarServiciosGrid
   */
  eliminarServiciosGrid(): void {
    const INDICE = this.datosImmex.findIndex((item:Servicio) => item.descripiónDelServicio === this.domiciliosSeleccionados[0]?.['descripiónDelServicio']);
    this.datosImmex.splice(INDICE, 1);
  }

  /**
   * Agrega servicios a la ampliación.
   * @method agregarServiciosAmpliacion
   */
  agregarServiciosAmpliacion(): void {
    const CUERPODATOS = { descripiónDelServicio: this.recibioDatos[0].descripcion, tipode: this.recibioDatos[0].tipode };
this.datosImmex.push(CUERPODATOS);
  }

  /**
   * Elimina empresas nacionales.
   * @method eliminarEmpresasNacionales
   */
  eliminarEmpresasNacionales(): void {
    const INDICE = this.datos.findIndex((item:ServicioInmex) => item.RegistroContribuyentes === this.empresasSeleccionados[0]?.RegistroContribuyentes);
    this.datos.splice(INDICE, 1);
  }

  /**
   * Actualiza el grid de empresas nacionales.
   * @method actualizaGridEmpresasNacionales
   */
  actualizaGridEmpresasNacionales(): void {
    const CUERPODATOS = { Servicio: "Auditoría de sistemas de seguridad", RegistroContribuyentes: this.rfcEmpresa, DenominaciónSocial: "AAL970927390", NumeroIMMEX: this.numeroPrograma, AñoIMMEX: this.tiempoPrograma };
    this.datos.push(CUERPODATOS);
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
  procesarDatosDelHijo(data: Catalogo | Catalogo[]): void {
   
    this.recibioDatos = Array.isArray(data) ? data : [data];
  }
  

  /**
   * Selecciona domicilios.
   * @method seleccionarDomicilios
   * @param {any} domicilios - Domicilios seleccionados.
   */
  seleccionarDomicilios(domicilios: Servicio): void {
    this.domiciliosSeleccionados = [{ ...domicilios }];
  }

  /**
   * Selecciona empresas.
   * @method seleccionarEmpresas
   * @param {any} empresas - Empresas seleccionadas.
   */
  seleccionarEmpresas(empresas: ServicioInmex): void {
    this.empresasSeleccionados = [{ ...empresas }];
  }
}