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
    Validators
  } from '@angular/forms';

import { CONFIGURACION_DOMICILIOS, CONFIGURACION_SERVICIO_IMMEX } from "../../constantes/modificacion.enum";
import { Servicio,ServicioInmex,Servicios} from "../../models/datos-info.model";
import { AmpliacionServiciosQuery } from '../../estados/tramite80205.query'; 
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosStore } from '../../estados/tramite80205.store';  
import { ApiResponse} from "../../models/datos-info.model";
import { ConfiguracionColumna } from '../../models/configuracion-columna.model';

import{Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ampliacion-servicios',
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
  formulario: FormGroup;
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
    private ampliacionServiciosQuery: AmpliacionServiciosQuery, 
    private ampliacionServiciosStore: AmpliacionServiciosStore,
    private readonly httpServicios: HttpClient
  ) {
   
    this.inicializarFormularioInfoRegistro();
    this.formulario = this.fb.group({
      entidadFederativa: ['', [Validators.required, Validators.min(0)]],
    });
    this.ampliacionServiciosQuery.selectAduanaDeIngresoSelecion$.pipe(
    ).subscribe(aduanaDeIngresoSelecion => {
      if(aduanaDeIngresoSelecion ) {
        this.formulario.patchValue({
          entidadFederativa: aduanaDeIngresoSelecion .id
        });
      }
      this.ampliacionServiciosStore.setFormValida({entidadFederativa: this.formulario.valid})
    });
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit():void {
    this.obtenerIngresoSelectList();
    this.getDatos();
    this.suscribirseADatosImmex();
    this.suscribirseADatos();
    this.suscribirseAFields();
    
  }
  enCambioDeCampo(fieldName: string, newValue: string): void {
    switch (fieldName) {
      case 'rfcEmpresa':
        this.ampliacionServiciosStore.setRfcEmpresa(newValue);
        break;
      case 'numeroPrograma':
        this.ampliacionServiciosStore.setNumeroPrograma(newValue);
        break;
      case 'tiempoPrograma':
        this.ampliacionServiciosStore.setTiempoPrograma(newValue);
        break;
      default:
        break;
    }
  }
  

  /**
   * Obtiene los datos del servicio.
   * @method getDatos
   */
  suscribirseADatos(): void {
    this.subscription.add(
      this.ampliacionServiciosQuery.selectDatos$.subscribe((datos) => {
        this.datos = datos; // Update local `datos` array when store data changes
      })
    );
  }
  suscribirseAFields(): void {
    
    this.subscription.add(
      this.ampliacionServiciosQuery.select(state => ({
        rfcEmpresa: state.rfcEmpresa,
        numeroPrograma: state.numeroPrograma,
        tiempoPrograma: state.tiempoPrograma
      })).subscribe((fields) => {
        
        this.rfcEmpresa = fields.rfcEmpresa;
        this.numeroPrograma = fields.numeroPrograma;
        this.tiempoPrograma = fields.tiempoPrograma;
      })
    );
  
  }
  
  getDatos(): void { this.subscription.add(
    this.ampliacionServiciosService.getDatos().subscribe((respuesta) => {
      const RESPONSE = respuesta as unknown as ApiResponse;
      if (RESPONSE) {
        // Store the response data in the store
        this.ampliacionServiciosStore.setInfoRegistro(RESPONSE.infoServicios);
        this.initializeFormFromStore();
      }
    })
  );
  }
  suscribirseADatosImmex(): void {
    // Subscribe to `datosImmex` from the store to keep the component updated reactively
    this.ampliacionServiciosQuery.selectDatosImmex$.subscribe((datosImmex) => {
      this.datosImmex = datosImmex; // Update local variable with the latest data from the store
    });
  }
  initializeFormFromStore(): void {
    this.ampliacionServiciosQuery.selectInfoRegistro$.subscribe((infoRegistro) => {
      // If the store has data, initialize the form
      this.formularioInfoRegistro = this.fb.group({
        seleccionaLaModalidad: [{ value: infoRegistro.seleccionaLaModalidad, disabled: true }],
        folio: [{ value: infoRegistro.folio, disabled: true }],
        ano: [{ value: infoRegistro.ano, disabled: true }],
      });
    });
  }
  
  

  /**
   * Inicializa el formulario de información de registro.
   * @method inicializarFormularioInfoRegistro
   */
  
  inicializarFormularioInfoRegistro(): void {
    this.formularioInfoRegistro = this.fb.group({
      seleccionaLaModalidad: [{ value: '', disabled: true }],
      folio: [{ value: '', disabled: true }],
      ano: [{ value: '', disabled: true }],
    });
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
    // Fetch AduanaDeIngreso list using the service and store it in the Akita store
    this.subscription.add(
      this.ampliacionServiciosService.obtenerIngresoSelectList().subscribe((data) => {
        const DATOS = data as Catalogo[];
        
        // Set the fetched data into the store
        this.ampliacionServiciosStore.setAduanaDeIngreso(DATOS);

        // You can also directly assign it to the component if needed, but it's better to use the store for reactivity
        this.ampliacionServiciosQuery.selectAduanaDeIngreso$.subscribe((aduanaDeIngreso) => {
          this.aduanaDeIngreso = aduanaDeIngreso;
        });
      })
    );
  }

  /**
   * Elimina servicios del grid.
   * @method eliminarServiciosGrid
   */
  eliminarServiciosGrid(): void {
    const INDICE = this.datosImmex.findIndex((item: Servicio) => item.descripiónDelServicio === this.domiciliosSeleccionados[0]?.['descripiónDelServicio']);
    if (INDICE !== -1) {
      const DATOS_IMMEX_ACTUALIZADOS = [...this.datosImmex];
      DATOS_IMMEX_ACTUALIZADOS.splice(INDICE, 1); 
      this.ampliacionServiciosStore.setDatosImmex(DATOS_IMMEX_ACTUALIZADOS); 
    }
  }
  

  /**
   * Agrega servicios a la ampliación.
   * @method agregarServiciosAmpliacion
   */
  agregarServiciosAmpliacion(): void {
    const CUERPODATOS = { descripiónDelServicio: this.recibioDatos[0].descripcion, tipode: this.recibioDatos[0].tipode };
    this.ampliacionServiciosStore.setDatosImmex([...this.datosImmex, CUERPODATOS]); 
  }

  /**
   * Elimina empresas nacionales.
   * @method eliminarEmpresasNacionales
   */
  eliminarEmpresasNacionales(): void {
    const INDICE = this.datos.findIndex((item: ServicioInmex) => item.RegistroContribuyentes === this.empresasSeleccionados[0]?.RegistroContribuyentes);
    if (INDICE !== -1) {
      const DATOSACTUALIZADOS = [...this.datos]; 
      DATOSACTUALIZADOS.splice(INDICE, 1); 
      this.ampliacionServiciosStore.setDatos(DATOSACTUALIZADOS); 
    }
  }

  /**
   * Actualiza el grid de empresas nacionales.
   * @method actualizaGridEmpresasNacionales
   */
  actualizaGridEmpresasNacionales(): void {
    const CUERPODATOS = {
      Servicio: "Auditoría de sistemas de seguridad",
      RegistroContribuyentes: this.rfcEmpresa,
      DenominaciónSocial: "AAL970927390",
      NumeroIMMEX: this.numeroPrograma,
      AñoIMMEX: this.tiempoPrograma
    };

    const DATOSACTUALIZADOS = [...this.datos, CUERPODATOS]; 
    this.ampliacionServiciosStore.setDatos(DATOSACTUALIZADOS);
    this.rfcEmpresa = '';
    this.numeroPrograma = '';
    this.tiempoPrograma = '';
    this.ampliacionServiciosStore.setCamposEmpresa(this.rfcEmpresa, this.numeroPrograma, this.tiempoPrograma);

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
    this.ampliacionServiciosStore.setAduanaDeIngresoSeleccion(data as Catalogo);
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