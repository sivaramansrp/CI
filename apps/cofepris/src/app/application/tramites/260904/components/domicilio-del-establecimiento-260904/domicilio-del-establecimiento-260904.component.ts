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
import { MERCANCIAS_DATA } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { MercanciasInfo } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { MercanciasTabla } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { NICO_TABLA } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { NicoInfo } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/domicilio-del-establecimiento-260904.enum';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RespuestaTabla } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260904Query } from '../../estados/queries/tramite260904.query';
import { Tramite260904Store } from '../../estados/tramites/tramite260904.store';
import { Validators } from '@angular/forms';

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
  form!: FormGroup;
  estado: Catalogo[] = [];
  TEXTOS = ALERT;
  class = 'alert-warning';
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;
  nicoTablaDatos: NicoInfo[] = [];
  domicilio!: FormGroup;
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;
  mercanciasTablaDatos: MercanciasInfo[] = [];
  manifests = ALERT.MANIFESTS;
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  representanteLegal!: FormGroup;

  códigoPostal$: Observable<string | null> =
    this.tramite260904Query.códigoPostal$;

  estado$: Observable<Catalogo | null> = this.tramite260904Query.estado$;

  municipioOAlcaldía$: Observable<string | null> =
    this.tramite260904Query.municipioOAlcaldía$;

  localidad$: Observable<string | null> = this.tramite260904Query.localidad$;

  colonias$: Observable<string | null> = this.tramite260904Query.colonias$;

  calle$: Observable<string | null> = this.tramite260904Query.calle$;

  lada$: Observable<string | null> = this.tramite260904Query.lada$;

  telefono$: Observable<string | null> = this.tramite260904Query.telefono$;

  avisoCheckbox$: Observable<string | null> = this.tramite260904Query.avisoCheckbox$;

  regimen$: Observable<Catalogo | null> = this.tramite260904Query.regimen$;

  aduanasEntradas$: Observable<Catalogo | null> = this.tramite260904Query.aduanasEntradas$;

  aifaCheckbox$: Observable<string | null> = this.tramite260904Query.aifaCheckbox$;

  manifests$: Observable<string | null> = this.tramite260904Query.manifests$;

  acuerdoPublico$: Observable<string | null> = this.tramite260904Query.acuerdoPublico$;

  rfc$: Observable<string | null> = this.tramite260904Query.rfc$;


  constructor(
    private fb: FormBuilder,
    private httpServicios: HttpClient,
    private tramite260904Query: Tramite260904Query,
    private tramite260904Store: Tramite260904Store
  ) {
    // Constructor
  }

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

  crearFormulario(): void {
    this.form = this.fb.group({
      códigoPostal: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      municipioOAlcaldía: ['', [Validators.required]],
      localidad: [''],
      colonias: [''],
      calle: ['', [Validators.required]],
      lada: ['', [Validators.required]],
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

  obtenerTablaDatos(): void {
    this.httpServicios
      .get<RespuestaTabla>('../../../../../assets/json/260904/tablaDatos.json')
      .subscribe((data): void => {
        this.nicoTablaDatos = data?.data;
      });
  }

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

  obtenerMercanciasDatos(): void {
    this.httpServicios
      .get<MercanciasTabla>(
        '../../../../../assets/json/260904/mercanciasDatos.json'
      )
      .subscribe((data): void => {
        this.mercanciasTablaDatos = data?.data;
      });
  }

  getCodigoPostal(): void {
    const CODING_POSTAL = this.form.get('códigoPostal')?.value;
    this.tramite260904Store.setCódigoPostal(CODING_POSTAL);
  }

  getEstado(): void {
    const ESTADO = this.form.get('estado')?.value;
    this.tramite260904Store.setEstado(ESTADO);
  }

  getMunicipioOAlcaldia(): void {
    const MUNICIPIO_OALCALDIA = this.form.get('municipioOAlcaldía')?.value;
    this.tramite260904Store.setMunicipioOAlcaldía(MUNICIPIO_OALCALDIA);
  }

  getLocalidad(): void {
    const LOCALIDAD = this.form.get('localidad')?.value;
    this.tramite260904Store.setLocalidad(LOCALIDAD);
  }

  getColonias(): void {
    const COLONIAS = this.form.get('colonias')?.value;
    this.tramite260904Store.setColonias(COLONIAS);
  }

  getCalle(): void {
    const CALLE = this.form.get('calle')?.value;
    this.tramite260904Store.setCalle(CALLE);
  }

  getLada(): void {
    const LADA = this.form.get('lada')?.value;
    this.tramite260904Store.setLada(LADA);
  }

  getTelefono(): void {
    const TELEFONO = this.form.get('telefono')?.value;
    this.tramite260904Store.setTelefono(TELEFONO);
  }

  getAvisoCheckbox(): void {
    const AVISO_CHECKBOX = this.domicilio.get('avisoCheckbox')?.value;
    this.tramite260904Store.setAvisoCheckbox(AVISO_CHECKBOX);
  }

  getRegimen(): void {
    const REGIMEN = this.domicilio.get('regimen')?.value;
    this.tramite260904Store.setRegimen(REGIMEN);
  }

  getAduanasEntradas(): void {
    const ADUANAS_ENTRADAS = this.domicilio.get('aduanasEntradas')?.value;
    this.tramite260904Store.setAduanasEntradas(ADUANAS_ENTRADAS);
  }

  getAifaCheckbox(): void {
    const AIFA_CHECKBOX = this.domicilio.get('aifaCheckbox')?.value;
    this.tramite260904Store.setAifaCheckbox(AIFA_CHECKBOX);
  }

  getManifests(): void {
    const MANIFESTS = this.domicilio.get('manifests')?.value;
    this.tramite260904Store.setManifests(MANIFESTS);
  }

  getAcuerdoPublico(): void {
    const ACUERDO_PUBLICO = this.representanteLegal.get('acuerdoPublico')?.value;
    this.tramite260904Store.setAcuerdoPublico(ACUERDO_PUBLICO);
  }

  getRfc(): void {
    const RFC = this.representanteLegal.get('rfc')?.value;
    this.tramite260904Store.setRFC(RFC);
  }

}
