import { Component, Input, OnInit } from '@angular/core';

import { Datos_De_Tabla, Datos_de_fila } from '../../../../core/models/220202/fitosanitario.model';

import { INSTRUCCION_DOBLE_CLIC } from '../../../../shared/constantes/220202/fitosanitario.enums';

import { HttpClient } from '@angular/common/http';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Catalogo, RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';



/**
 * @Componente DatosDeLaSolicitudComponent
 * @description Componente para la sección de datos de la solicitud en el formulario de fitosanitarios.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnInit {
  colapsable: boolean = false;
  mesaColumnas: any = [{
    tbodyData: ['Establecimiento 1', '123-456-7890', 'correo', 'Actividad 1', 'Otro detalle', 'Certificado 001', 'Domicilio 1'],
  }];
  selectRangoDias: string[] = [];
  instruccionDobleClic: string = INSTRUCCION_DOBLE_CLIC;
  mesaCuerpo: any = [];
  tablaDeDatosDeCelda: Datos_de_fila[] = []
  procedureData: FormGroup;
  aduanaList: Catalogo[];
  agropecuariaList: Catalogo[];
  puntoList: Catalogo[];
  regimeList: Catalogo[];
  productoList: Catalogo[];
  usoList: Catalogo[];
  umcList: Catalogo[];
  nicoList: Catalogo[];
  arancelariaList: Catalogo[];
  forma: FormGroup;
  mercanciaForma: FormGroup;
  formularioDeTransporte: FormGroup;

  constructor(private readonly httpServicios: HttpClient,
    private readonly fb: FormBuilder
  ) {
    this.mesaColumnasData();
  }
  ngOnInit(): void {
    this.obtenerTodosLosDatosDeLaLista();
    this.obtenerTablaCelulaValor();

  }
  createFromFields() {
    this.forma = this.fb.group({
      aduana: [''],
      agropecuaria: [''],
      punto: [''],
      guia: [''],
      regimen: [''],
      ferrocarril: [''],
      mercancias: this.fb.array([]),
      aduanaMercancia: [''],
      requisito: [''],
      numCertificadoInternacional: [''],
      arancelaria: [''],
      descFraccionArancelaria: [{ value: '', disabled: true }],
      nico: [''],
      descNico: [{ value: '', disabled: true }],
      descripcion: [''],
      cantidadUMT: [''],
      umt: [{ value: '', disabled: true }],
      cantidadUMC: [''],
      umc: [''],
      uso: [''],
      producto: [''],
    });
    const mercanciasArray = this.forma.get('mercancias') as FormArray;
    mercanciasArray.push(this.fb.group({
      seleccionado: [''], // Checkbox
      noPartida: [''],
      tipoRequisito: [''],
      requisito: [''],
      numCertificadoInternacional: [''],
      fraccionArancelaria: [''],
      descFraccion: [''],
      nico: ['']
    }));
  }
  obtenerTodosLosDatosDeLaLista() {
    this.getaduanaLista();
    this.getagropecuariaLista();
    this.getPuntoLista();
    this.getRegimenLista();
    this.getAduanaLista();
    this.getArancelariaLista();
    this.getNicoLista();
    this.getAduanaLista();
    this.getNicoLista();
    this.getProductoLista();
    this.getUmCLista();
    this.getusoLista();
  }

  obtenerTablaCelulaValor() {
    this.httpServicios.get<Datos_De_Tabla>('../../../../../assets/json/220202/solicitud.json').subscribe((data) => {
      this.tablaDeDatosDeCelda = data?.data;
    });
  }

  mesaColumnasData() {
    this.httpServicios.get<any>('../../../../../assets/json/220202/contenidodetabla.json').subscribe((data) => {
      let val = data.data;
      this.mesaColumnas = val[0].header;
    });
  }
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }
  getaduanaLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/aduana_de_ingreso.json').subscribe((data): void => {
      const datos = data?.data;
      this.aduanaList = datos as Catalogo[];
    });
  }
  getagropecuariaLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/aduana_de_ingreso.json').subscribe((data): void => {
      const datos = data?.data;
      this.agropecuariaList = datos as Catalogo[];
    });
  }
  getPuntoLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/punto.json').subscribe((data): void => {
      const datos = data?.data;
      this.puntoList = datos as Catalogo[];
    });
  }
  getRegimenLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/regimen.json').subscribe((data): void => {
      const datos = data?.data;
      this.regimeList = datos as Catalogo[];
    });
  }
  getAduanaLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/aduana_de_ingreso.json').subscribe((data): void => {
      const datos = data?.data;
      this.aduanaList['catalogos'] = datos as Catalogo[];
    });
  }
  getArancelariaLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.arancelariaList = datos as Catalogo[];
    });
  }
  getNicoLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.nicoList = datos as Catalogo[];
    });
  }
  getUmCLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.umcList = datos as Catalogo[];
    });
  }
  getusoLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.usoList = datos as Catalogo[];
    });
  }
  getProductoLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.productoList = datos as Catalogo[];
    });
  }
}
