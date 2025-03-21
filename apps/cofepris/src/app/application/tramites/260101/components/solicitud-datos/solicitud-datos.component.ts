import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TEXTOS } from '../../constantes/constantes';
import {
  DatosDeSolicitud,
  Solicitud,
  SolicitudDatos,
} from '../../models/solicitud-datos.model';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { map, Subject, takeUntil } from 'rxjs';
import {
  Catalogo,
  CatalogosSelect,
  ConfiguracionColumna,
  REGEX_CORREO_ELECTRONICO,
  TablaSeleccion,
  TableData,
} from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Solicitud260101State,
  Solicitud260101Store,
} from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Mercancia } from '../../models/mercancia.model';

/**
 * Componente que representa los datos de la solicitud.
 */
@Component({
  selector: 'app-solicitud-datos',
  templateUrl: './solicitud-datos.component.html',
  styleUrl: './solicitud-datos.component.scss',
})
/**
 * Componente que representa los datos de la solicitud
 */
export class SolicitudDatosComponent implements OnInit, OnDestroy {
  /**
   * Obtiene los datos de enumeración y establece valores de TEXTOS
   */
  TEXTOS = TEXTOS;
  /**
   * Controla la visibilidad del panel plegable.
   * El valor predeterminado está establecido en verdadero (ampliado)
   */
  public colapsable = true;

  private destroyNotifier$: Subject<void> = new Subject();

  tablaHeadData: string[] = [
    'Fecha creacion',
    'Mercancia',
    'Cantidad',
    'Proveedor',
  ];

  tablaFilaDatos: SolicitudDatos[] = [];

  public tableDataSCIAN: TableData = {
    tableHeader: [],
    tableBody: [],
  };
  public tableDataMercancias: TableData = {
    tableHeader: [],
    tableBody: [],
  };

  regimenCatalogo: CatalogosSelect = {} as CatalogosSelect;
  aduanaCatalogo: CatalogosSelect = {} as CatalogosSelect;
  estadoCatalogo: CatalogosSelect = {} as CatalogosSelect;
  solicitudForm!: FormGroup;
  selectedMercanciasDatos: Mercancia[] = [];

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  hacerlosRadioOptions = [
    {
      label: 'No',
      value: 1,
    },
    {
      label: 'Sí',
      value: 2,
    },
  ];
  hacerlosPublicos = 0;
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;
  mercanciasSeleccionTabla = TablaSeleccion.CHECKBOX;
  mercanciasConfiguracionTabla: ConfiguracionColumna<any>[] = [
    {
      encabezado: 'Clasificación del producto',
      clave: (item: any) => item.clasificaionProductos,
      orden: 1,
    },
    {
      encabezado: 'Especificar Clasificación del product',
      clave: (item: any) => item.especificarProducto,
      orden: 2,
    },
    {
      encabezado: 'Denominación específico del product',
      clave: (item: any) => item.nombreProductoEspecifico,
      orden: 3,
    },
    { encabezado: 'Marca', clave: (item: any) => item.marca, orden: 4 },
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: any) => item.fraccionArancelaria,
      orden: 5,
    },
    {
      encabezado: 'Descripción de la fracción arancelaria',
      clave: (item: any) => item.descripcionFraccionArancelaria,
      orden: 6,
    },
    {
      encabezado: 'Unidad de medida de comercializacion (UMC)',
      clave: (item: any) => item.umc,
      orden: 7,
    },
    {
      encabezado: 'Cantidad UMC',
      clave: (item: any) => item.cantidadUMC,
      orden: 8,
    },
    {
      encabezado: 'Unidad de medida de tarifa(UMT)',
      clave: (item: any) => item.umt,
      orden: 9,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (item: any) => item.cantidadUMT,
      orden: 10,
    },
    {
      encabezado: 'Pais de origen',
      clave: (item: any) => item.paisDeOrigen,
      orden: 11,
    },
    {
      encabezado: 'Pais de procedencia',
      clave: (item: any) => item.paisDeProcedencia,
      orden: 12,
    },
    {
      encabezado: 'Tipo de producto',
      clave: (item: any) => item.tipoProducto,
      orden: 13,
    },
    {
      encabezado: 'Uso especifico',
      clave: (item: any) => item.usoEspecifico,
      orden: 14,
    },
  ];
  mercanciasDatos: Mercancia[] = [];
  constructor(
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query,
    public fb: FormBuilder
  ) {
    //
  }

  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      razonSocial: [
        { value: this.solicitud260101State.razonSocial, disabled: true },
        [Validators.required],
      ],
      correoElectronico: [
        { value: this.solicitud260101State.correoElectronico, disabled: true },
        [Validators.required, Validators.pattern(REGEX_CORREO_ELECTRONICO)],
      ],
      codigoPostal: [
        { value: this.solicitud260101State.codigoPostal, disabled: true },
        [Validators.required],
      ],
      estado: [this.solicitud260101State.estado, [Validators.required]],
      municipio: [
        { value: this.solicitud260101State.municipio, disabled: true },
        [Validators.required],
      ],
      localidad: [
        { value: this.solicitud260101State.localidad, disabled: true },
      ],
      colonia: [{ value: this.solicitud260101State.colonia, disabled: true }],
      calle: [
        { value: this.solicitud260101State.calle, disabled: true },
        [Validators.required],
      ],
      lada: [{ value: this.solicitud260101State.lada, disabled: true }],
      telefono: [
        { value: this.solicitud260101State.telefono, disabled: true },
        [Validators.required],
      ],
      avisoDeFuncionamiento: [this.solicitud260101State.avisoDeFuncionamiento],
      licenciaSanitaria: [this.solicitud260101State.licenciaSanitaria],
      liveFreshFrozen: [this.solicitud260101State.liveFreshFrozen],
      regimen: [this.solicitud260101State.regimen, [Validators.required]],
      aduana: [this.solicitud260101State.aduana, [Validators.required]],
      hacerlos: [this.solicitud260101State.hacerlos, [Validators.required]],
      rfc: [this.solicitud260101State.rfc, [Validators.required]],
      legalRazonSocial: [
        { value: this.solicitud260101State.legalRazonSocial, disabled: true },
        [Validators.required],
      ],
      apellidoPaterno: [
        { value: this.solicitud260101State.apellidoPaterno, disabled: true },
        [Validators.required],
      ],
      apellidoMeterno: [
        { value: this.solicitud260101State.apellidoMeterno, disabled: true },
      ],
      manifesto:[this.solicitud260101State.manifesto]
    });

    this.solicitud260101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((res: Solicitud260101State) => {
          console.log(res)
          this.solicitud260101State = res;
          this.solicitudForm.patchValue({
            razonSocial: this.solicitud260101State.razonSocial,
            correoElectronico: this.solicitud260101State.correoElectronico,
            codigoPostal: this.solicitud260101State.codigoPostal,
            estado: this.solicitud260101State.estado,
            municipio: this.solicitud260101State.municipio,
            localidad: this.solicitud260101State.localidad,
            colonia: this.solicitud260101State.colonia,
            calle: this.solicitud260101State.calle,
            lada: this.solicitud260101State.lada,
            telefono: this.solicitud260101State.telefono,
            avisoDeFuncionamiento:
              this.solicitud260101State.avisoDeFuncionamiento,
            licenciaSanitaria: this.solicitud260101State.licenciaSanitaria,
            liveFreshFrozen: this.solicitud260101State.liveFreshFrozen,
            regimen: this.solicitud260101State.regimen,
            aduana: this.solicitud260101State.aduana,
            hacerlos: this.solicitud260101State.hacerlos,
            rfc: this.solicitud260101State.rfc,
            legalRazonSocial: this.solicitud260101State.legalRazonSocial,
            apellidoPaterno: this.solicitud260101State.apellidoPaterno,
            apellidoMeterno: this.solicitud260101State.apellidoMeterno,
            manifesto: this.solicitud260101State.manifesto
          });
          this.mercanciasDatos = this.solicitud260101State.mercanciasDatos;
        })
      )
      .subscribe();

    this.obtenerEstadoCatalogo();
    this.obtenerDatosDeAplicacion();
    this.obtenerRegimenDestinaraListo();
    this.obtenerAduanaListo();
    this.obtenerMercanciaListo();
    this.obtenerSolicitud();
  }

  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  obtenerSolicitud(){
    this.solicitudDatosService.obtenerSolicitud().subscribe({
      next: (res: Solicitud) => {
        this.solicitud260101Store.setRazonSocial(res.razonSocial);
        this.solicitud260101Store.setCorreoElectronico(res.correoElectronico);
        this.solicitud260101Store.setCodigoPostal(res.codigoPostal);
        this.solicitud260101Store.setMunicipio(res.municipio);
        this.solicitud260101Store.setLocalidad(res.localidad);
        this.solicitud260101Store.setColonia(res.colonia);
        this.solicitud260101Store.setCalle(res.calle);
        this.solicitud260101Store.setLada(res.lada);
        this.solicitud260101Store.setTelefono(res.telefono);
        this.solicitud260101Store.setLegalRazonSocial(res.legalRazonSocial);
        this.solicitud260101Store.setApellidoPaterno(res.apellidoPaterno);
        this.solicitud260101Store.setApellidoMeterno(res.apellidoMeterno);
      },
    });
  }

  obtenerEstadoCatalogo() {
    this.solicitudDatosService.obtenerEstadoCatalogo().subscribe({
      next: (res: CatalogosSelect) => {
        this.estadoCatalogo = res;
      },
    });
  }

  obtenerDatosDeAplicacion() {
    this.solicitudDatosService.obtenerDatosDeSolicitud().subscribe({
      next: (res: DatosDeSolicitud) => {
        this.tablaHeadData = res.tablaHeadData;
        this.tablaFilaDatos = res.tablaFilaDatos;
        this.tableDataSCIAN =
          Array.isArray(res.tablaFilaDatos) &&
          typeof res.tablaFilaDatos[0] === 'object'
            ? res.tablaFilaDatos[0]?.SCIANLista || ({} as TableData)
            : ({} as TableData);
      }
    });
  }

  obtenerMercanciaListo() {
    this.solicitudDatosService.obtenerMercanciaListo().subscribe({
      next: (res: Mercancia[]) => {
        // this.mercanciasDatos = res;
        this.solicitud260101Store.setMercanciasDatos(res);
      },
    });
  }

  obtenerRegimenDestinaraListo() {
    this.solicitudDatosService.obtenerRegimenDestinaraListo().subscribe({
      next: (res: CatalogosSelect) => {
        this.regimenCatalogo = res;
      },
    });
  }

  obtenerAduanaListo() {
    this.solicitudDatosService.obtenerAduanaListo().subscribe({
      next: (res: CatalogosSelect) => {
        this.aduanaCatalogo = res;
      },
    });
  }

  updateSCIANData(tablaFilaDatos: SolicitudDatos[], index: number): void {
    this.tableDataSCIAN = tablaFilaDatos[index].SCIANLista;
  }

  openModificarMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  openAgregarMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  setEstado(event: Catalogo): void {
    this.solicitud260101Store.setEstado(event.id);
  }

  setLicenciaSanitaria(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setLicenciaSanitaria(VALUE);
  }

  setRegimen(event: Catalogo): void {
    this.solicitud260101Store.setRegimen(event.id);
  }

  setAduana(event: Catalogo): void {
    this.solicitud260101Store.setAduana(event.id);
  }

  setHacerlos(event: number | string): void {
    this.solicitud260101Store.setHacerlos(event);
  }

  setRFC(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setRfc(VALUE);
  }

  getMercanciasDatos(event: any): void {
    this.selectedMercanciasDatos = event;
  }

  eliminarMercancias() {
    if (this.selectedMercanciasDatos.length > 0) {
      this.solicitud260101Store.removeMercanciaDatos(
        this.selectedMercanciasDatos[0]
      );
    }
  }

  setLiveFreshFrozen(event: Event){
    const VALUE = (event.target as HTMLInputElement).checked;
    this.solicitud260101Store.setLiveFreshFrozen(VALUE);
  }

  setAvisoDeFuncionamiento(event: Event){
    const VALUE = (event.target as HTMLInputElement).checked;
    this.solicitud260101Store.setAvisoDeFuncionamiento(VALUE);
  }

  setManifesto(event: Event){
    const VALUE = (event.target as HTMLInputElement).checked;
    this.solicitud260101Store.setManifesto(VALUE);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
