import { Catalogo, ConsultaioQuery, TituloComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent, InputRadioComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CAPTURA_OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/sagarpa.enum';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { ROWS } from '../../constantes/constantes';
import { RevisionService } from '../../services/revision.service';
import { Solicitud220501Query } from '../../estados/tramites220501.query';
import { Solicitud220501State } from '../../estados/tramites220501.store';
import { Solicitud220501Store } from '../../estados/tramites220501.store';
import { Subject } from 'rxjs';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar los datos generales.
 */
@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.scss'],
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputRadioComponent, CommonModule],
})
export class DatosGeneralesComponent implements OnDestroy {
  /**
   * Formulario principal.
   * @type {FormGroup}
   */
  forma!: FormGroup;

  /**
   * Opciones de rango de días.
   * @type {string[]}
   */
  selectRangoDias: string[] = [];

  /**
   * Indica si el contenido es colapsable.
   * @type {boolean}
   */
  colapsable: boolean = false;

  /**
   * Formulario de datos de la solicitud.
   * @type {FormGroup}
   */
  datosDelaSolicitud!: FormGroup;

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
  aduanaIngreso: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Selección de oficina de inspección.
   * @type {CatalogosSelect}
   */
  oficianaInspeccion: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Selección de punto de inspección.
   * @type {CatalogosSelect}
   */
  puntoInspeccion: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Selección de establecimiento.
   * @type {CatalogosSelect}
   */
  establecimiento: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Selección de régimen al que se destinarán.
   * @type {CatalogosSelect}
   */
  regimenDestinaran: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Selección de movilización nacional.
   * @type {CatalogosSelect}
   */
  movilizacionNacional: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Selección de punto de verificación.
   * @type {CatalogosSelect}
   */
  puntoVerificacion: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Selección de empresa transportista.
   * @type {CatalogosSelect}
   */
  empresaTransportista: CatalogosSelect = {} as CatalogosSelect;
  /**
   * Aduana de ingreso seleccionada.
   * @type {Catalogo}
   */
  aduanadeIngreso!: Catalogo;

  /**
   * Oficina de inspección seleccionada.
   * @type {Catalogo}
   */
  oficianadeInspeccion!: Catalogo;

  /**
   * Punto de inspección seleccionado.
   * @type {Catalogo}
   */
  puntodeInspeccion!: Catalogo;

  /**
   * Establecimiento seleccionado.
   * @type {Catalogo}
   */
  establecimientode!: Catalogo;

  /**
   * Régimen al que se destinarán las mercancías seleccionado.
   * @type {Catalogo}
   */
  regimendeDestinaran!: Catalogo;

  /**
   * Movilización nacional seleccionada.
   * @type {Catalogo}
   */
  movilizaciondeNacional!: Catalogo;

  /**
   * Punto de verificación seleccionado.
   * @type {Catalogo}
   */
  puntodeVerificacion!: Catalogo;

  /**
   * Empresa transportista seleccionada.
   * @type {Catalogo}
   */
  empresadeTransportista!: Catalogo;

  /**
   * Estado de la solicitud 220501.
   * @type {Solicitud220501State}
   */
  solicitud220501State: Solicitud220501State = {} as Solicitud220501State;

  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /** 
   * Variable para almacenar el valor de la opción seleccionada en el botón de radio. 
   */
  esSolicitudFerrosValor!: string;

  /** 
   * Variable que almacena las opciones disponibles para el botón de radio. 
   */
  opcionDeBotonDeRadio = CAPTURA_OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Indica si el formulario está deshabilitado.
   */
  formularioDeshabilitado: boolean = false;

  /**
   * Índice actual de la fila.
   * @type {number}
   */
  currentIndex = 0;
  /**
     * Filas de datos.
     * @type {Row[]}
     */
  rows = ROWS;
  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param revisionService Servicio de revisión para obtener datos.
   * @param validacionesService Servicio de validaciones de formularios.
   * @param solicitud220501Store Store para gestionar el estado de la solicitud 220501.
   * @param solicitud220501Query Query para acceder al estado de la solicitud 220501.
   */
  constructor(
    private readonly fb: FormBuilder,
    private revisionService: RevisionService,
    private validacionesService: ValidacionesFormularioService,
    public solicitud220501Store: Solicitud220501Store,
    public solicitud220501Query: Solicitud220501Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioDeshabilitado = seccionState.readonly;
          if(seccionState.readonly || seccionState.update){
             this.inicializarEstadoFormulario();
          }
        })
      )
      .subscribe();

    this.inicializarFormulario();
  }

  /**
   * Determina si se debe cargar un formulario nuevo o uno existente.
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (this.formularioDeshabilitado) {
      this.forma?.disable();
    }
  }

  /**
   * Inicializa el formulario con los valores del estado de la solicitud 220501.
   * @returns {void}
   */
  inicializarFormulario(): void {
    this.forma = this.fb.group({
      foliodel: [{ value: this.solicitud220501State.fetchapago, disabled: true }],
      aduanaIngreso: [this.solicitud220501State.aduanaIngreso, Validators.required],
      oficinaInspeccion: [this.solicitud220501State.oficinaInspeccion, Validators.required],
      puntoInspeccion: [this.solicitud220501State.puntoInspeccion, Validators.required],
      claveUCON: [{ value: this.solicitud220501State.claveUCON, disabled: true }],
      establecimientoTIF: [this.solicitud220501State.establecimientoTIF, Validators.required],
      nombre: [{ value: this.solicitud220501State.nombre, disabled: true }, Validators.required],
      numeroguia: [{ value: this.solicitud220501State.numeroguia, disabled: true }, Validators.required],
      regimen: [this.solicitud220501State.regimen, Validators.required],
      capturaDatosMercancia: [{ value: this.solicitud220501State.capturaDatosMercancia, disabled: true }, Validators.required],
      coordenadas: [{ value: this.solicitud220501State.coordenadas, disabled: true }],
      movilizacion: [this.solicitud220501State.movilizacion, Validators.required],
      transporte: [{ value: this.solicitud220501State.transporte, disabled: true }],
      punto: [this.solicitud220501State.punto, [Validators.required]],
      nombreEmpresa: [{ value: this.solicitud220501State.nombreEmpresa, disabled: true }, Validators.required],
    });

    this.solicitud220501Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((data: Solicitud220501State) => {
          this.solicitud220501State = data;
          this.forma.patchValue({
            foliodel: this.solicitud220501State.foliodel,
            aduanaIngreso: this.solicitud220501State.aduanaIngreso,
            oficinaInspeccion: this.solicitud220501State.oficinaInspeccion,
            puntoInspeccion: this.solicitud220501State.puntoInspeccion,
            claveUCON: this.solicitud220501State.claveUCON,
            establecimientoTIF: this.solicitud220501State.establecimientoTIF,
            nombre: this.solicitud220501State.nombre,
            numeroguia: this.solicitud220501State.numeroguia,
            regimen: this.solicitud220501State.regimen,
            capturaDatosMercancia: this.solicitud220501State.capturaDatosMercancia,
            coordenadas: this.solicitud220501State.coordenadas,
            movilizacion: this.solicitud220501State.movilizacion,
            transporte: this.solicitud220501State.transporte,
            punto: this.solicitud220501State.punto,
            nombreEmpresa: this.solicitud220501State.nombreEmpresa,
          });
        })
      )
      .subscribe();

    this.getAduanaIngreso();
    this.getOficianaInspeccion();
    this.getPuntoInspeccion();
    this.getEstablecimiento();
    this.getRegimenDestinaran();
    this.getMovilizacionNacional();
    this.getPuntoVerificacion();
    this.getEmpresaTransportista();
    this.actualizarDatosDelaSolicitud();  
    
    this.inicializarEstadoFormulario();
  }

  /**
   * Método para actualizar los datos de la solicitud.
   * Realiza una llamada al servicio `getDatosDelaSolicitud()` para obtener los datos
   * y luego actualiza el store con la respuesta recibida.
   */
  actualizarDatosDelaSolicitud(): void {
    this.revisionService.getDatosDelaSolicitud().pipe(takeUntil(this.destroyed$)).subscribe({
      next: (resp: Solicitud220501State) => {
        this.solicitud220501Store.setFoliodel(resp.foliodel);
        this.solicitud220501Store.setClaveUCON(resp.claveUCON);
        this.solicitud220501Store.setEstablecimientoTIF(resp.establecimientoTIF);
        this.solicitud220501Store.setNombre(resp.nombre);
        this.solicitud220501Store.setNumeroguia(resp.numeroguia);
        this.solicitud220501Store.setCoordenadas(resp.coordenadas);
        this.solicitud220501Store.setTransporte(resp.transporte);
        this.solicitud220501Store.setNombreEmpresa(resp.nombreEmpresa);
      }
    });
  }

  /**
   * Muestra u oculta el contenido colapsable.
   * @returns {void}
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Rota la fila en la dirección especificada.
   * @param {number} direction - La dirección de rotación.
   * @returns {void}
   */
  rotateRow(direction: number): void {
    const TOTALROWS = this.rows.length;
    this.currentDirection = direction;
    this.currentIndex = (this.currentIndex + direction + TOTALROWS) % TOTALROWS;
  }

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
   * Obtiene la aduana de ingreso.
   * Este método llama al servicio de revisión para obtener la aduana de ingreso.
   * @returns {void}
   */
  getAduanaIngreso(): void {
    this.revisionService.getAduanaIngreso().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
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
    this.revisionService.getOficianaInspeccion().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
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
  getPuntoInspeccion(): void {
    this.revisionService.getPuntoInspeccion().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.puntoInspeccion = {
          labelNombre: 'Punto de inspección',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  /**
   * Obtiene el establecimiento.
   * Este método llama al servicio de revisión para obtener el establecimiento.
   * @returns {void}
   */
  getEstablecimiento(): void {
    this.revisionService.getEstablecimiento().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
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
    this.revisionService.getRegimenDestinaran().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.regimenDestinaran = {
          labelNombre: 'Régimen al que se destinará la mercancía',
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
    this.revisionService.getMovilizacionNacional().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;

        this.movilizacionNacional = {
          labelNombre: 'Datos para movilización nacional',
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
    this.revisionService.getPuntoVerificacion().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
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
    this.revisionService.getEmpresaTransportista().pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
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

  /**
   * Selecciona una aduana de ingreso y actualiza el store con la descripción correspondiente.
   * @param event Objeto de tipo Catalogo que contiene la información de la aduana seleccionada.
   */
  seleccionarAduanaIngreso(event: Catalogo): void {
    this.solicitud220501Store.setAduanaIngreso(event.id);
  }

  /**
   * Selecciona una oficina de inspección y actualiza el store con la descripción correspondiente.
   * @param event Objeto de tipo Catalogo que contiene la información de la oficina seleccionada.
   */
  seleccionarOficianaInspeccion(event: Catalogo): void {
    this.solicitud220501Store.setOficinaInspeccion(event.id);
  }

  /**
   * Selecciona un punto de inspección y actualiza el store con la descripción correspondiente.
   * @param event Objeto de tipo Catalogo que contiene la información del punto seleccionado.
   */
  seleccionarPuntoInspeccion(event: Catalogo): void {
    this.solicitud220501Store.setPuntoInspeccion(event.id);
  }

  /** 
   * Método para seleccionar el régimen de la solicitud. 
   * Actualiza el estado con el ID del régimen seleccionado.
   * 
   * @param event - Objeto de tipo Catalogo que contiene la información del régimen seleccionado.
   */
  seleccionarRegimen(event: Catalogo): void {
    this.solicitud220501Store.setRegimen(event.id);
  }

  /**
   * Selecciona una movilización nacional y actualiza el store con la descripción correspondiente.
   * @param event Objeto de tipo Catalogo que contiene la información de la movilización seleccionada.
   */
  seleccionarMovilizacionNacional(event: Catalogo): void {
    this.solicitud220501Store.setMovilizacion(event.id);
  }

  /** 
   * Método para establecer el valor de captura de datos de mercancía. 
   * Actualiza el estado con el valor proporcionado.
   * 
   * @param value - Valor de tipo string o number que representa la captura de datos de la mercancía.
   */
  setCapturaDatosMercancia(value: string | number): void {
    this.solicitud220501Store.setCapturaDatosMercancia(value);
  }

  /** 
   * Método para seleccionar el punto de verificación. 
   * Actualiza el estado con el ID del punto seleccionado.
   * 
   * @param event - Objeto de tipo Catalogo que contiene la información del punto de verificación seleccionado.
   */
  seleccionarPuntoVerificacion(event: Catalogo): void {
    this.solicitud220501Store.setPunto(event.id);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Desuscribe el componente de todos los observables.
   * @returns {void}
   * */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
