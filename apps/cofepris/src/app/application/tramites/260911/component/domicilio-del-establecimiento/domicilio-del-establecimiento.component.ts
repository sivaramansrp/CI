import { AlertComponent, InputCheckComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ALERT } from '../../enums/domicilio-del-establecimiento.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import {DomicilioDelEstablecimientoService} from '../../services/domicilio-del-establecimiento/domicilio-del-establecimiento.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { MERCANCIAS_DATA } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { MercanciasInfo } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';

import { NICO_TABLA } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { NicoInfo } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/domicilio-del-establecimiento.enum';

import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RespuestaTabla } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260911Query } from '../../estados/queries/tramite260911.query';
import { Tramite260911Store } from '../../estados/store/tramite260911.store';
import { Validators } from '@angular/forms';

/**
 * Componente para gestionar el domicilio del establecimiento.
 * 
 * @selector app-domicilio-del-establecimiento
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
 * @templateUrl ./domicilio-del-establecimiento.component.html
 * @styleUrl ./domicilio-del-establecimiento.component.scss
 */
@Component({
  selector: 'app-domicilio-del-establecimiento',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    InputCheckComponent
  ],
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrl: './domicilio-del-establecimiento.component.scss',
})
export class DomicilioDelEstablecimientoComponent implements OnInit , OnDestroy {
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
  codigoPostal$: Observable<string | null> =
    this.tramite260911Query.codigoPostal$;

  /**
   * Observable para el estado.
   */
  estado$: Observable<Catalogo | null> = this.tramite260911Query.estado$;

  /**
   * Observable para el municipio o alcaldía.
   */
  municipioOAlcaldia$: Observable<string | null> =
    this.tramite260911Query.municipioOAlcaldia$;

  /**
   * Observable para las colonias.
   */
  colonias$: Observable<string | null> = this.tramite260911Query.colonias$;

  /**
   * Observable para la calle.
   */
  calle$: Observable<string | null> = this.tramite260911Query.calle$;

  /**
   * Observable para la lada.
   */
  lada$: Observable<string | null> = this.tramite260911Query.lada$;

  /**
   * Observable para el teléfono.
   */
  telefono$: Observable<string | null> = this.tramite260911Query.telefono$;

  /**
   * Observable para el checkbox de aviso.
   */
  avisoCheckbox$: Observable<string | null> = this.tramite260911Query.avisoCheckbox$;

  /**
   * Observable para el régimen.
   */
  regimen$: Observable<Catalogo | null> = this.tramite260911Query.regimen$;

  /**
   * Observable para las aduanas de entrada.
   */
  aduanasEntradas$: Observable<Catalogo | null> = this.tramite260911Query.aduanasEntradas$;

  /**
   * Observable para el checkbox de AIFA.
   */
  aifaCheckbox$: Observable<string | null> = this.tramite260911Query.aifaCheckbox$;

  /**
   * Observable para los manifiestos.
   */
  manifests$: Observable<string | null> = this.tramite260911Query.manifests$;

  /**
   * Observable para el acuerdo público.
   */
  acuerdoPublico$: Observable<string | null> = this.tramite260911Query.acuerdoPublico$;

  /**
   * Observable para el RFC.
   */
  rfc$: Observable<string | null> = this.tramite260911Query.rfc$;

  private destroy$ = new Subject<void>();


  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios.
   * @param httpServicios Servicio HTTP para realizar peticiones.
   * @param tramite260911Query Consulta de datos del trámite.
   * @param tramite260911Store Almacenamiento de datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private httpServicios: HttpClient,
    private tramite260911Query: Tramite260911Query,
    private tramite260911Store: Tramite260911Store,
    private domicilioDelEstablecimientoService:DomicilioDelEstablecimientoService
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
 
    this.tramite260911Query.selectTramite260911$
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.form.patchValue({
        codigoPostal: data.codigoPostal,
        estado: data.estado,
        municipioOAlcaldia: data.municipioOAlcaldia,
        localidad: data.localidad,
        colonias: data.colonias,
        calle: data.calle,
        lada: data.lada,
        telefono: data.telefono,
      });
 
      this.domicilio.patchValue({
        avisoCheckbox: data.avisoCheckbox,
        regimen: data.regimen,
        aduanasEntradas: data.aduanasEntradas,
        aifaCheckbox: data.aifaCheckbox,
        manifests: data.manifests,
      });
 
      this.representanteLegal.patchValue({
        acuerdoPublico: data.acuerdoPublico,
        rfc: data.rfc,
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Método para crear el formulario.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      codigoPostal: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      municipioOAlcaldia: ['', [Validators.required]],
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
    this.domicilioDelEstablecimientoService
      .obtenerTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.nicoTablaDatos = data?.data;
      });
  }

   /**
   * Método para obtener la lista de estados.
   */
   obtenerEstadoList(): void {
    this.domicilioDelEstablecimientoService
      .obtenerEstadoList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.estado = data?.data || [];
      });
  }
 

  /**
   * Método para obtener los datos de mercancías.
   */
  obtenerMercanciasDatos(): void {
    this.domicilioDelEstablecimientoService
      .obtenerMercanciasDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mercanciasTablaDatos = data?.data || [];
      });
  }

  /**
   * Método para obtener el valor del código postal.
   */
  getCodigoPostal(): void {
    const CODING_POSTAL = this.form.get('codigoPostal')?.value;
    this.tramite260911Store.setCodigoPostal(CODING_POSTAL);
  }

  /**
   * Método para obtener el valor del estado.
   */
  getEstado(): void {
    const ESTADO = this.form.get('estado')?.value;
    this.tramite260911Store.setEstado(ESTADO);
  }

  /**
   * Método para obtener el valor del municipio o alcaldía.
   */
  getMunicipioOAlcaldia(): void {
    const MUNICIPIO_OALCALDIA = this.form.get('municipioOAlcaldia')?.value;
    this.tramite260911Store.setMunicipioOAlcaldia(MUNICIPIO_OALCALDIA);
  }

  /**
   * Método para obtener el valor de la localidad.
   */
  getLocalidad(): void {
    const LOCALIDAD = this.form.get('localidad')?.value;
    this.tramite260911Store.setLocalidad(LOCALIDAD);
  }

  /**
   * Método para obtener el valor de las colonias.
   */
  getColonias(): void {
    const COLONIAS = this.form.get('colonias')?.value;
    this.tramite260911Store.setColonias(COLONIAS);
  }

  /**
   * Método para obtener el valor de la calle.
   */
  getCalle(): void {
    const CALLE = this.form.get('calle')?.value;
    this.tramite260911Store.setCalle(CALLE);
  }

  /**
   * Método para obtener el valor de la lada.
   */
  getLada(): void {
    const LADA = this.form.get('lada')?.value;
    this.tramite260911Store.setLada(LADA);
  }

  /**
   * Método para obtener el valor del teléfono.
   */
  getTelefono(): void {
    const TELEFONO = this.form.get('telefono')?.value;
    this.tramite260911Store.setTelefono(TELEFONO);
  }

  /**
   * Método para obtener el valor del checkbox de aviso.
   */
  getAvisoCheckbox(): void {
    const AVISO_CHECKBOX = this.domicilio.get('avisoCheckbox')?.value;
    this.tramite260911Store.setAvisoCheckbox(AVISO_CHECKBOX);
  }

  /**
   * Método para obtener el valor del régimen.
   */
  getRegimen(): void {
    const REGIMEN = this.domicilio.get('regimen')?.value;
    this.tramite260911Store.setRegimen(REGIMEN);
  }

  /**
   * Método para obtener el valor de las aduanas de entrada.
   */
  getAduanasEntradas(): void {
    const ADUANAS_ENTRADAS = this.domicilio.get('aduanasEntradas')?.value;
    this.tramite260911Store.setAduanasEntradas(ADUANAS_ENTRADAS);
  }

  /**
   * Método para obtener el valor del checkbox de AIFA.
   */
  getAifaCheckbox(): void {
    const AIFA_CHECKBOX = this.domicilio.get('aifaCheckbox')?.value;
    this.tramite260911Store.setAifaCheckbox(AIFA_CHECKBOX);
  }

  /**
   * Método para obtener el valor de los manifiestos.
   */
  getManifests(): void {
    const MANIFESTS = this.domicilio.get('manifests')?.value;
    this.tramite260911Store.setManifests(MANIFESTS);
  }

  /**
   * Método para obtener el valor del acuerdo público.
   */
  getAcuerdoPublico(): void {
    const ACUERDO_PUBLICO = this.representanteLegal.get('acuerdoPublico')?.value;
    this.tramite260911Store.setAcuerdoPublico(ACUERDO_PUBLICO);
  }

  /**
   * Método para obtener el valor del RFC.
   */
  getRfc(): void {
    const RFC = this.representanteLegal.get('rfc')?.value;
    this.tramite260911Store.setRFC(RFC);
  }
}