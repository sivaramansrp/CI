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
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RespuestaTabla } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-domicilio-del-establecimiento-260904',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, AlertComponent, TablaDinamicaComponent, InputRadioComponent],
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

  constructor(
    private fb: FormBuilder,
    private httpServicios: HttpClient,

  ) {
    // Constructor
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerTablaDatos();
    this.obtenerEstadoList();
    this.obtenerMercanciasDatos();
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
      avisoCheckbox: [],
      licenciaSanitaria: [
        { value: '', disabled: false },
      ],
      regimen: [],
      aduanasEntradas: [],
      manifests: []
    });

    this.representanteLegal = this.fb.group({
      BtonDeRadio: [],
      rfc: ['', [Validators.required]],
      nombre: [{ value: '', disabled: true }, [Validators.required]],
      apellidoPaterno: [{ value: '', disabled: true }, [Validators.required]],
      apellidoMaterno: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  obtenerTablaDatos() {
    this.httpServicios
      .get<RespuestaTabla>('../../../../../assets/json/260904/tablaDatos.json')
      .subscribe((data): void => {
        this.nicoTablaDatos = data?.data;
      });
  }

  obtenerEstadoList() {
    this.httpServicios
      .get<RespuestaCatalogos>(
        '../../../../../assets/json/260904/seleccion.json'
      )
      .subscribe((data): void => {
        const DATOS = data?.data;
        this.estado = DATOS;
      });
  }

  obtenerMercanciasDatos() {
    this.httpServicios
      .get<MercanciasTabla>(
        '../../../../../assets/json/260904/mercanciasDatos.json'
      )
      .subscribe((data): void => {
        this.mercanciasTablaDatos = data?.data;
      });
  }
}
