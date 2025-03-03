import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { RevisionService } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
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
export class DatosGeneralesComponent implements OnInit {
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
   * Formulario de movilización.
   * @type {FormGroup}
   */
  movilizacionForm: FormGroup;

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
   * Selección de oficina de inspección.
   * @type {CatalogosSelect}
   */
  oficianaInspeccion!: CatalogosSelect;

  /**
   * Selección de punto de inspección.
   * @type {CatalogosSelect}
   */
  puntoInspeccion!: CatalogosSelect;

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
   * Selección de punto de verificación.
   * @type {CatalogosSelect}
   */
  puntoVerificacion!: CatalogosSelect;

  /**
   * Selección de empresa transportista.
   * @type {CatalogosSelect}
   */
  empresaTransportista!: CatalogosSelect;
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

  constructor(
    private readonly fb: FormBuilder,
    private revisionService: RevisionService,
    private validacionesService: ValidacionesFormularioService
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

    this.forma.setControl('datosDelaSolicitud', this.datosDelaSolicitud);

    this.getAduanaIngreso();
    this.getOficianaInspeccion();
    this.getPuntoInspeccion();
    this.getEstablecimiento();
    this.getRegimenDestinaran();
    this.getMovilizacionNacional();
    this.getPuntoVerificacion();
    this.getEmpresaTransportista();
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
   * Inicializa el grupo de formularios para el componente.
   *
   * Este método crea un grupo de formularios utilizando el servicio FormBuilder de Angular.
   * El grupo de formularios contiene un grupo anidado llamado `datosDelaSolicitud`.
   *
   * @returns {void}
   */
  crearFormulario(): void {
    this.forma = this.fb.group({
      datosDelaSolicitud: this.fb.group({}),
    });
  }
  /**
   * Inicializa el grupo de formularios para "datosDelaSolicitud" con varios controles de formulario y sus respectivos validadores.
   *
   * Los controles de formulario incluyen:
   * - `aduanaIngreso`: Un campo requerido para la entrada de aduana.
   * - `oficinaInspeccion`: Un campo requerido para la oficina de inspección.
   * - `puntoInspeccion`: Un campo requerido para el punto de inspección.
   * - `claveUCON`: Un campo requerido para la clave UCON.
   * - `establecimientoTIF`: Un campo requerido para el establecimiento TIF.
   * - `nombreVeterinario`: Un campo requerido para el nombre del veterinario.
   * - `numeroGuia`: Un campo opcional para el número de guía.
   * - `certficacion`: Un campo opcional para la certificación.
   * - `regimen`: Un campo requerido para el régimen.
   *
   * Después de inicializar el grupo de formularios, establece el control 'datosDelaSolicitud' en el formulario principal.
   *
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
}
