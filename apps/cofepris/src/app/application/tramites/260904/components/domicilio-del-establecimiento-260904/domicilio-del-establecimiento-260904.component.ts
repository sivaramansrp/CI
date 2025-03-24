import { ALERT } from '../../enums/domicilio-del-establecimiento-260904.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { MERCANCIAS_DATA } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { MercanciasInfo } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { MercanciasTabla } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { NICO_TABLA } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { NicoInfo } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/domicilio-del-establecimiento-260904.enum';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RespuestaTabla } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260904Query } from '../../estados/queries/tramite260904.query';
import { Tramite260904Store } from '../../estados/tramites/tramite260904.store';
import { Validators } from '@angular/forms';

/**
 * Componente para gestionar el domicilio del establecimiento 260904.
 * 
 * @selector app-domicilio-del-establecimiento-260904
 * @standalone true
 * @imports [
 *   CommonModule,
 *   TituloComponent,
 *   ReactiveFormsModule,
 *   CatalogoSelectComponent,
 *   AlertComponent,
 *   TablaDinamicaComponent,
 *   InputRadioComponent
 * ]
 * @templateUrl ./domicilio-del-establecimiento-260904.component.html
 * @styleUrl ./domicilio-del-establecimiento-260904.component.scss
 */
@Component({
  selector: 'app-domicilio-del-establecimiento-260904',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
  ],
  templateUrl: './domicilio-del-establecimiento-260904.component.html',
  styleUrl: './domicilio-del-establecimiento-260904.component.scss',
})
export class DomicilioDelEstablecimiento260904Component implements OnInit {
  /**
   * Formulario principal.
   */
  form!: FormGroup;

  /**
   * Lista de estados.
   */
  estado: Catalogo[] = [];

  /**
   * Textos de alerta.
   */
  TEXTOS = ALERT;

  /**
   * Clase de alerta.
   */
  class = 'alert-warning';

  /**
   * Configuración de selección de tabla.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas de la tabla NICO.
   */
  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;

  /**
   * Datos de la tabla NICO.
   */
  nicoTablaDatos: NicoInfo[] = [];

  /**
   * Formulario de domicilio.
   */
  domicilio!: FormGroup;

  /**
   * Configuración de columnas de la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * Datos de la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Manifiestos de alerta.
   */
  manifests = ALERT.MANIFESTS;

  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Formulario de representante legal.
   */
  representanteLegal!: FormGroup;

  /**
   * Observable para el código postal.
   */
  códigoPostal$: Observable<string | null> =
    this.tramite260904Query.códigoPostal$;

  /**
   * Observable para el estado.
   */
  estado$: Observable<Catalogo | null> = this.tramite260904Query.estado$;

  /**
   * Observable para el municipio o alcaldía.
   */
  municipioOAlcaldía$: Observable<string | null> =
    this.tramite260904Query.municipioOAlcaldía$;

  /**
   * Observable para la localidad.
   */
  localidad$: Observable<string | null> = this.tramite260904Query.localidad$;

  /**
   * Observable para las colonias.
   */
  colonias$: Observable<string | null> = this.tramite260904Query.colonias$;

  /**
   * Observable para la calle.
   */
  calle$: Observable<string | null> = this.tramite260904Query.calle$;

  /**
   * Observable para la lada.
   */
  lada$: Observable<string | null> = this.tramite260904Query.lada$;

  /**
   * Observable para el teléfono.
   */
  telefono$: Observable<string | null> = this.tramite260904Query.telefono$;

  /**
   * Observable para el checkbox de aviso.
   */
  avisoCheckbox$: Observable<string | null> = this.tramite260904Query.avisoCheckbox$;

  /**
   * Observable para el régimen.
   */
  regimen$: Observable<Catalogo | null> = this.tramite260904Query.regimen$;

  /**
   * Observable para las aduanas de entrada.
   */
  aduanasEntradas$: Observable<Catalogo | null> = this.tramite260904Query.aduanasEntradas$;

  /**
   * Observable para el checkbox de AIFA.
   */
  aifaCheckbox$: Observable<string | null> = this.tramite260904Query.aifaCheckbox$;

  /**
   * Observable para los manifiestos.
   */
  manifests$: Observable<string | null> = this.tramite260904Query.manifests$;

  /**
   * Observable para el acuerdo público.
   */
  acuerdoPublico$: Observable<string | null> = this.tramite260904Query.acuerdoPublico$;

  /**
   * Observable para el RFC.
   */
  rfc$: Observable<string | null> = this.tramite260904Query.rfc$;

  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios.
   * @param httpServicios Servicio HTTP para realizar peticiones.
   * @param tramite260904Query Consulta de datos del trámite.
   * @param tramite260904Store Almacenamiento de datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private httpServicios: HttpClient,
    private tramite260904Query: Tramite260904Query,
    private tramite260904Store: Tramite260904Store
  ) {
    // Constructor
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerTablaDatos();
    this.obtenerEstadoList();
    this.obtenerMercanciasDatos();

    this.códigoPostal$.subscribe((códigoPostal) => {
      if (códigoPostal) {
        this.form.get('códigoPostal')?.setValue(códigoPostal);
      }
    });

    this.estado$.subscribe((estado) => {
      if (estado) {
        this.form.get('estado')?.setValue(estado);
      }
    });

    this.municipioOAlcaldía$.subscribe((municipioOAlcaldía) => {
      if (municipioOAlcaldía) {
        this.form.get('municipioOAlcaldía')?.setValue(municipioOAlcaldía);
      }
    });
    this.localidad$.subscribe((localidad) => {
      if (localidad) {
        this.form.get('localidad')?.setValue(localidad);
      }
    });
    this.colonias$.subscribe((colonias) => {
      if (colonias) {
        this.form.get('colonias')?.setValue(colonias);
      }
    });
    this.calle$.subscribe((calle) => {
      if (calle) {
        this.form.get('calle')?.setValue(calle);
      }
    });
    this.lada$.subscribe((lada) => {
      if (lada) {
        this.form.get('lada')?.setValue(lada);
      }
    });
    this.telefono$.subscribe((telefono) => {
      if (telefono) {
        this.form.get('telefono')?.setValue(telefono);
      }
    });

    this.avisoCheckbox$.subscribe((avisoCheckbox) => {
      if (avisoCheckbox) {
        this.domicilio.get('avisoCheckbox')?.setValue(avisoCheckbox);
      }
    });

    this.regimen$.subscribe((regimen) => {
      if (regimen) {
        this.domicilio.get('regimen')?.setValue(regimen);
      }
    });

    this.aduanasEntradas$.subscribe((aduanasEntradas) => {
      if (aduanasEntradas) {
        this.domicilio.get('aduanasEntradas')?.setValue(aduanasEntradas);
      }
    });

    this.aifaCheckbox$.subscribe((aifaCheckbox) => {
      if (aifaCheckbox) {
        this.domicilio.get('aifaCheckbox')?.setValue(aifaCheckbox);
      }
    });

    this.manifests$.subscribe((manifests) => {
      if (manifests) {
        this.domicilio.get('manifests')?.setValue(manifests);
      }
    });

    this.acuerdoPublico$.subscribe((acuerdoPublico) => {
      if (acuerdoPublico) {
        this.representanteLegal.get('acuerdoPublico')?.setValue(acuerdoPublico);
      }
    });

    this.rfc$.subscribe((rfc) => {
      if (rfc) {
        this.representanteLegal.get('rfc')?.setValue(rfc);
      }
    });
  }

  /**
   * Método para crear el formulario.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      códigoPostal: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      municipioOAlcaldía: ['', [Validators.required]],
      localidad: [''],
      colonias: [''],
      calle: ['', [Validators.required]],
      lada: [''],
      telefono: ['', [Validators.required]],
    });

    this.domicilio = this.fb.group({
      avisoCheckbox: [true],
      licenciaSanitaria: [{ value: '', disabled: true }],
      regimen: [],
      aduanasEntradas: [],
      aifaCheckbox: [true],
      manifests: [true],
    });

    this.representanteLegal = this.fb.group({
      acuerdoPublico: [],
      rfc: ['', [Validators.required]],
      nombre: [{ value: 'LUIS AMBROSIO', disabled: true }, [Validators.required]],
      apellidoPaterno: [{ value: 'MARTINEZ', disabled: true }, [Validators.required]],
      apellidoMaterno: [{ value: 'VALENZUELA', disabled: true }, [Validators.required]],
    });
  }

  /**
   * Método para obtener los datos de la tabla.
   */
  obtenerTablaDatos(): void {
    this.httpServicios
      .get<RespuestaTabla>('../../../../../assets/json/260904/tablaDatos.json')
      .subscribe((data): void => {
        this.nicoTablaDatos = data?.data;
      });
  }

  /**
   * Método para obtener la lista de estados.
   */
  obtenerEstadoList(): void {
    this.httpServicios
      .get<RespuestaCatalogos>(
        '../../../../../assets/json/260904/seleccion.json'
      )
      .subscribe((data): void => {
        const DATOS = data?.data;
        this.estado = DATOS;
      });
  }

  /**
   * Método para obtener los datos de mercancías.
   */
  obtenerMercanciasDatos(): void {
    this.httpServicios
      .get<MercanciasTabla>(
        '../../../../../assets/json/260904/mercanciasDatos.json'
      )
      .subscribe((data): void => {
        this.mercanciasTablaDatos = data?.data;
      });
  }

  /**
   * Método para obtener el valor del código postal.
   */
  getCodigoPostal(): void {
    const CODING_POSTAL = this.form.get('códigoPostal')?.value;
    this.tramite260904Store.setCódigoPostal(CODING_POSTAL);
  }

  /**
   * Método para obtener el valor del estado.
   */
  getEstado(): void {
    const ESTADO = this.form.get('estado')?.value;
    this.tramite260904Store.setEstado(ESTADO);
  }

  /**
   * Método para obtener el valor del municipio o alcaldía.
   */
  getMunicipioOAlcaldia(): void {
    const MUNICIPIO_OALCALDIA = this.form.get('municipioOAlcaldía')?.value;
    this.tramite260904Store.setMunicipioOAlcaldía(MUNICIPIO_OALCALDIA);
  }

  /**
   * Método para obtener el valor de la localidad.
   */
  getLocalidad(): void {
    const LOCALIDAD = this.form.get('localidad')?.value;
    this.tramite260904Store.setLocalidad(LOCALIDAD);
  }

  /**
   * Método para obtener el valor de las colonias.
   */
  getColonias(): void {
    const COLONIAS = this.form.get('colonias')?.value;
    this.tramite260904Store.setColonias(COLONIAS);
  }

  /**
   * Método para obtener el valor de la calle.
   */
  getCalle(): void {
    const CALLE = this.form.get('calle')?.value;
    this.tramite260904Store.setCalle(CALLE);
  }

  /**
   * Método para obtener el valor de la lada.
   */
  getLada(): void {
    const LADA = this.form.get('lada')?.value;
    this.tramite260904Store.setLada(LADA);
  }

  /**
   * Método para obtener el valor del teléfono.
   */
  getTelefono(): void {
    const TELEFONO = this.form.get('telefono')?.value;
    this.tramite260904Store.setTelefono(TELEFONO);
  }

  /**
   * Método para obtener el valor del checkbox de aviso.
   */
  getAvisoCheckbox(): void {
    const AVISO_CHECKBOX = this.domicilio.get('avisoCheckbox')?.value;
    this.tramite260904Store.setAvisoCheckbox(AVISO_CHECKBOX);
  }

  /**
   * Método para obtener el valor del régimen.
   */
  getRegimen(): void {
    const REGIMEN = this.domicilio.get('regimen')?.value;
    this.tramite260904Store.setRegimen(REGIMEN);
  }

  /**
   * Método para obtener el valor de las aduanas de entrada.
   */
  getAduanasEntradas(): void {
    const ADUANAS_ENTRADAS = this.domicilio.get('aduanasEntradas')?.value;
    this.tramite260904Store.setAduanasEntradas(ADUANAS_ENTRADAS);
  }

  /**
   * Método para obtener el valor del checkbox de AIFA.
   */
  getAifaCheckbox(): void {
    const AIFA_CHECKBOX = this.domicilio.get('aifaCheckbox')?.value;
    this.tramite260904Store.setAifaCheckbox(AIFA_CHECKBOX);
  }

  /**
   * Método para obtener el valor de los manifiestos.
   */
  getManifests(): void {
    const MANIFESTS = this.domicilio.get('manifests')?.value;
    this.tramite260904Store.setManifests(MANIFESTS);
  }

  /**
   * Método para obtener el valor del acuerdo público.
   */
  getAcuerdoPublico(): void {
    const ACUERDO_PUBLICO = this.representanteLegal.get('acuerdoPublico')?.value;
    this.tramite260904Store.setAcuerdoPublico(ACUERDO_PUBLICO);
  }

  /**
   * Método para obtener el valor del RFC.
   */
  getRfc(): void {
    const RFC = this.representanteLegal.get('rfc')?.value;
    this.tramite260904Store.setRFC(RFC);
  }
}