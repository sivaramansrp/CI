import { CapturaOpcionesDeBotonDeRadio } from '../../enums/sagarpa.enum';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
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
 * Interfaz para definir la estructura de las filas.
 */
interface Row {
  Partida: string;
  Tiporequisito: string;
  Requisito: string;
  Certificado: number;
  Fraccion: string;
  Descripcion: string;
  Nico: string;
}

/**
 * Componente para gestionar los datos generales.
 */
@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.scss'],
})
export class DatosGeneralesComponent implements OnInit, OnDestroy {
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

  solicitud220501State : Solicitud220501State = {} as Solicitud220501State;

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
  opcionDeBotonDeRadio = CapturaOpcionesDeBotonDeRadio;


  constructor(
    private readonly fb: FormBuilder,
    private revisionService: RevisionService,
    private validacionesService: ValidacionesFormularioService,
    public solicitud220501Store: Solicitud220501Store,
    public solicitud220501Query: Solicitud220501Query
  ) {
  //
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      foliodel: [{ value: this.solicitud220501State.fetchapago, disabled: true }],
      aduanaIngreso: [this.solicitud220501State.aduanaIngreso, Validators.required],
      oficinaInspeccion: [this.solicitud220501State.oficinaInspeccion, Validators.required],
      puntoInspeccion: [this.solicitud220501State.puntoInspeccion, Validators.required],
      claveUCON: [{ value: this.solicitud220501State.claveUCON, disabled: true }],
      establecimientoTIF: [this.solicitud220501State.establecimientoTIF, Validators.required],
      nombre: [this.solicitud220501State.nombre, Validators.required],
      numeroguia:[{value:this.solicitud220501State.numeroguia, disabled: true},Validators.required],
      regimen:[this.solicitud220501State.regimen,Validators.required],
      capturaDatosMercancia: [this.solicitud220501State.capturaDatosMercancia],
      coordenadas: [{ value: this.solicitud220501State.coordenadas, disabled: true }],
      movilizacion: [this.solicitud220501State.movilizacion, Validators.required],
      transporte: [{ value: this.solicitud220501State.transporte, disabled: true }],
      punto: [this.solicitud220501State.punto, [Validators.required]],
      nombreEmpresa: [this.solicitud220501State.nombreEmpresa, Validators.required],
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
  }

  /**
   * Método para actualizar los datos de la solicitud.
   * Realiza una llamada al servicio `getDatosDelaSolicitud()` para obtener los datos
   * y luego actualiza el store con la respuesta recibida.
   */
  actualizarDatosDelaSolicitud(): void {
    this.revisionService.getDatosDelaSolicitud().subscribe({
      next: (resp:Solicitud220501State) => {
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
   * Filas de datos.
   * @type {Row[]}
   */
  rows: Row[] = [
    {
      Partida: '1',
      Tiporequisito: 'Inspección ocular',
      Requisito: 'Requisito',
      Certificado: 123456,
      Fraccion: '01039201',
      Descripcion: 'Con pedigree o certificado de alto registro.',
      Nico: '00',
    },
    {
      Partida: '2',
      Tiporequisito: 'inspección de oído',
      Requisito: 'Requisito',
      Certificado: 123456,
      Fraccion: '01039201',
      Descripcion: 'Con pedigree o certificado de alto registro.',
      Nico: '00',
    },
    {
      Partida: '3',
      Tiporequisito: 'inspección de nariz',
      Requisito: 'Requisito',
      Certificado: 123456,
      Fraccion: '01039201',
      Descripcion: 'Con pedigree o certificado de alto registro.',
      Nico: '00',
    },
  ];


  /**
   * Muestra u oculta el contenido colapsable.
   * @returns {void}
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
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
  getPuntoInspeccion(): void {
    this.revisionService.getPuntoInspeccion().subscribe((resp) => {
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
