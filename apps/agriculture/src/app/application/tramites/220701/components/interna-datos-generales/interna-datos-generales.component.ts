/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
import { Catalogo, ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ChangeDetectorRef } from '@angular/core';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { INSTRUCCION_DOBLE_CLIC } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
import { MERCANCIA_SERVICIO } from '../../modelos/datos-de-interfaz.model';
import { OnInit } from '@angular/core';
import { mercanciaInfo} from '../../modelos/datos-de-interfaz.model';
import { MercanciaDatosService } from '../../servicios/mercancia-datos.service'
import { ReactiveFormsModule } from '@angular/forms';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RevisionService } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Validators } from "@angular/forms";
import { delay, map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
/**
 * Interfaz para definir la estructura de las filas.
 */

interface PuntoInspeccion {
  labelNombre: string;
  required: boolean;
  primerOpcion: string;
  catalogos: Catalogo[];
}
@Component({
  selector: 'interna-datos-generales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, TablaDinamicaComponent,],
  templateUrl: './interna-datos-generales.component.html',
  styleUrl: './interna-datos-generales.component.scss'
})
export class InternaDatosGeneralesComponent implements OnInit {
    /**
   * Grupo de formularios principal.
   * @property {FormGroup} forma
   */
    forma!: FormGroup;
      /**
   * Grupo de formularios anidado para los datos de la solicitud.--220701
   * @property {FormGroup} datosDelaSolicitud
   */
  datosDelaSolicitud!: FormGroup;
  /**
   * Selección de empresa transportista.
   * @type {CatalogosSelect}
   */
  empresaTransportista!: CatalogosSelect;
  /**
   * Aduana de ingreso seleccionada.
   * @type {Catalogo}
   */
  
    /**
   * Formulario de movilización.
   * @type {FormGroup}
   */
    movilizacionForm!: FormGroup;
  /**
   * Dirección actual de rotación.
   * @type {number | null}
   */
  currentDirection: number | null = 1;
      /**
   * Datos del dropdown.
   * @type {any[]}
   */
  dropdownData = [];
    /**
   * Selección de aduana de ingreso.
   * @type {CatalogosSelect}
   */
    aduanaIngreso!: CatalogosSelect;
  /**
   * Configuración para el select de aduana de ingreso. --220701
   * @property {Catalogo} aduanaDeIngreso
   */
  aduanaDeIngreso: Catalogo[] = [];

    /**
   * Configuración para el select de sanidad agropecuaria. --220701
   * @property {CatalogosSelect} sanidadAgropecuaria
   */
    sanidadAgropecuaria: Catalogo[] = [];
  /**
   * Configuración para el select de punto de inspección.--220701
   * @property {CatalogosSelect} puntoInspeccion
   */
  puntoInspeccion: Catalogo[] = [];
  /**
   * Selección de punto de verificación.
   * @type {CatalogosSelect}
   */
  puntoVerificacion!: CatalogosSelect;
    /**
   * Selección de oficina de inspección.
   * @type {CatalogosSelect}
   */
    oficianaInspeccion!: CatalogosSelect;
  /**
   * Selección de establecimiento.
   * @type {CatalogosSelect}
   */
  establecimiento!: CatalogosSelect;

  /**
   * Selección de régimen al que se destinarán.
   * @type {CatalogosSelect}
   */
  regimenDestinaran!: CatalogosSelect;

  /**
   * Selección de movilización nacional.
   * @type {CatalogosSelect}
   */
  movilizacionNacional!: CatalogosSelect;

  /**
   * Configuración para el select de establecimiento TIF.--220701
   * @property {CatalogosSelect} establecimientoTIF
   */
  establecimientoTIF: Catalogo[] = [];

  /**
   * Configuración para el select de veterinario.--220701
   * @property {CatalogosSelect} veterinario
   */
  veterinario: Catalogo[] = [];
  id?: number;
  descripcion: string = '';
  tam?: string;
  dpi?: string

  /**
   * Configuración para el select de régimen.--220701
   * @property {CatalogosSelect} regimen
   */
  regimen: Catalogo[] = [];
  selectedValue: string = 'no';


  /**
   * Configuración de las columnas de la tabla para servicios MERCANCIA.
   * @type {ConfiguracionColumna<mercanciaInfo>[]}
   */
    mercanciaTabla: ConfiguracionColumna<mercanciaInfo>[] = MERCANCIA_SERVICIO;
    /**
     * Datos de los servicios MERCANCIA.
     * @type {mercanciaInfo[]}
     */
    immexTableDatos: mercanciaInfo[] = [];

      /**
   * @property {any[]} permisoImmexDatos - Array de datos permiso immex.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  permisoImmexDatos: any[] = [];

          /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--220701
   */
    constructor(
      private readonly fb: FormBuilder,
      private revisionService: RevisionService,
      private validacionesService: ValidacionesFormularioService,
      private mercanciaDatosService: MercanciaDatosService,
      private httpServicios: HttpClient,
      private cdr: ChangeDetectorRef
    ) { 
    this.crearFormulario();
       this.initActionFormBuild();
      this.movilizacionForm = this.fb.group({
        coordenadas: [{ value: '', disabled: true }],
        nombre: ['', Validators.required],
        medio: ['Aereo', Validators.required],
        transporte: [{ value: '020202', disabled: true }],
        punto: ['', [Validators.required]],
      });
  }
    /**
   * Crea el grupo de formularios principal.
   * @method crearFormulario
   */
    crearFormulario(): void {
      this.forma = this.fb.group({
        datosDelaSolicitud: this.fb.group({}),
      });
    }

    /**
   * @returns {void}
   */
  initActionFormBuild(): void {
    this.datosDelaSolicitud = this.fb.group({
      aduanaIngreso: ['', Validators.required],
      oficinaInspeccion: ['', Validators.required],
      puntoInspeccion: ['', Validators.required],
      claveUCON: ['', [Validators.required]],
      establecimientoTIF: ['', Validators.required],
      regimen: ['', Validators.required],
      foliodel: [{ value: '1502200200120240301000015', disabled: true }],
    });

    this.forma.setControl('datosDelaSolicitud', this.datosDelaSolicitud);
  }

  /**
   * Índice actual de la fila.
   * @type {number}
   */
  currentIndex = 0;

  /**
   * Rota la fila en la dirección especificada.
   * @param {number} direction - La dirección de rotación.
   * @returns {void}
   */

  /**
   * Verifica si un campo del formulario es válido.
   * @param {FormGroup} form - El formulario.
   * @param {string} field - El campo a verificar.
   * @returns {boolean} - Verdadero si el campo es válido, falso en caso contrario.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) === true;
  }
  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.datosDelaSolicitud = this.fb.group({
      aduanaIngreso: ['', Validators.required],
      oficinaInspeccion: ['', Validators.required],
      puntoInspeccion: ['', Validators.required],
      claveUCON: [{ value: '', disabled: true }],
      establecimientoTIF: ['', Validators.required],
      regimen: ['', Validators.required],
      foliodel: [{ value: '1502200200120240301000015', disabled: true }],
    });
    this.disableFormControls();
    this.forma.setControl('datosDelaSolicitud', this.datosDelaSolicitud);
    this.getOficianaInspeccion();
    this.getEstablecimiento();
    this.getRegimenDestinaran();
    this.getMovilizacionNacional();
    this.getPuntoVerificacion();
    this.getEmpresaTransportista();
    this.obtenerListasDesplegables();
    this.fetchData();
  }
  /**
   * Subject para manejar la desuscripción de observables.
   * @type {Subject<void>}
   */
  private unsubscribe$ = new Subject<void>();

  fetchData(): void {
    this.mercanciaDatosService.getDatos()
      // .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response: any) => {
          if (response && Array.isArray(response.permisoImmexDatos)) {
            this.immexTableDatos = response.permisoImmexDatos;
            this.cdr.detectChanges();
            } else {
              console.error('La respuesta de la API no tiene el formato esperado:', response);
            }
          },
          error: (error) => {
            console.error('Error al obtener datos:', error);
          }
      });
  }
    /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
    obtenerListasDesplegables() {
      this.obtenerIngresoSelectList();
      this.obtenerSanidadAgropecuariaList();
      this.obtenerPuntoInspeccionList();
      this.obtenerEstablecimientoList();
      this.obtenerVeterinarioList();
      this.obtenerRegimenList();
    }
    /**
   * Obtiene la lista para el select de aduana de ingreso.
   * @method obtenerIngresoSelectList
   */
    obtenerIngresoSelectList() {
      this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/aduana_de_ingreso.json').subscribe((data): void => {
        const DATOS = data?.data;
        this.aduanaDeIngreso = DATOS;
      });
    }

      /**
   * Obtiene la lista para el select de sanidad agropecuaria.
   * @method obtenerSanidadAgropecuariaList
   */
  obtenerSanidadAgropecuariaList() {
    this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/oficina_de_inspeccion.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.sanidadAgropecuaria = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de punto de inspección.
   * @method obtenerPuntoInspeccionList
   */
  obtenerPuntoInspeccionList() {
    this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/punto.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.puntoInspeccion = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de establecimiento.
   * @method obtenerEstablecimientoList
   */
  obtenerEstablecimientoList() {
    this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/establecimiento.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.establecimientoTIF = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de veterinario.
   * @method obtenerVeterinarioList
   */

  obtenerVeterinarioList() {
    this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/nombre.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.veterinario = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de régimen.
   * @method obtenerRegimenList
   */
  obtenerRegimenList() {
    this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/regimen.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.regimen = DATOS;
    });
  }
      /**
   * Obtiene la aduana de ingreso.
   * Este método llama al servicio de revisión para obtener la aduana de ingreso.
   * @returns {void}
   */
  getAduanaIngreso(): void {
    this.revisionService.getAduanaIngreso().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.aduanaIngreso = {
          labelNombre: 'Aduana de ingreso',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene la oficina de inspección.
   * Este método llama al servicio de revisión para obtener la oficina de inspección.
   * @returns {void}
   */
  getOficianaInspeccion(): void {
    this.revisionService.getOficianaInspeccion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.oficianaInspeccion = {
          labelNombre: 'Oficina de Inspección de Sanidad Agropecuaria',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene el punto de inspección.
   * Este método llama al servicio de revisión para obtener el punto de inspección.
   * @returns {void}
   */


  /**
   * Obtiene el establecimiento.
   * Este método llama al servicio de revisión para obtener el establecimiento.
   * @returns {void}
   */
  getEstablecimiento(): void {
    this.revisionService.getEstablecimiento().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.establecimiento = {
          labelNombre: 'Establecimiento TIF',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }
  /**
   * Obtiene el régimen al que se destinarán las mercancías.
   * Este método llama al servicio de revisión para obtener el régimen.
   * @returns {void}
   */
  getRegimenDestinaran(): void {
    this.revisionService.getRegimenDestinaran().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.regimenDestinaran = {
          labelNombre: 'Régimen al que se destinarán las mercancías',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene la movilización nacional.
   * Este método llama al servicio de revisión para obtener la movilización nacional.
   * @returns {void}
   */
  getMovilizacionNacional(): void {
    this.revisionService.getMovilizacionNacional().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.movilizacionNacional = {
          labelNombre: 'Movilización Nacional',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene el punto de verificación.
   * Este método llama al servicio de revisión para obtener el punto de verificación.
   * @returns {void}
   */
  getPuntoVerificacion(): void {
    this.revisionService.getPuntoVerificacion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.puntoVerificacion = {
          labelNombre: 'Punto de verificación federal',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }
  /**
   * Obtiene la empresa transportista.
   * Este método llama al servicio de revisión para obtener la empresa transportista.
   * @returns {void}
   */
  getEmpresaTransportista(): void {
    this.revisionService.getEmpresaTransportista().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.empresaTransportista = {
          labelNombre: 'Nombre de la empresa transportista',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  disableFormControls(): void {
    this.forma.get('foliodel')?.disable();
  }
}
