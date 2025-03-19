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
  SolicitudDatos,
} from '../../models/solicitud-datos.model';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { map, Subject, takeUntil } from 'rxjs';
import {
  Catalogo,
  CatalogosSelect,
  REGEX_CORREO_ELECTRONICO,
  TableData,
} from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Solicitud260101State,
  Solicitud260101Store,
} from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';

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
      label: 'Si',
      value: 2,
    },
  ];
  hacerlosPublicos = 1;
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;

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
    });

    this.solicitud260101Query.seleccionarSolicitud$.pipe(
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
          avisoDeFuncionamiento: this.solicitud260101State.avisoDeFuncionamiento,
          licenciaSanitaria: this.solicitud260101State.licenciaSanitaria,
          liveFreshFrozen: this.solicitud260101State.liveFreshFrozen,
          regimen: this.solicitud260101State.regimen,
          aduana: this.solicitud260101State.aduana,
          hacerlos: this.solicitud260101State.hacerlos,
          rfc: this.solicitud260101State.rfc,
          legalRazonSocial: this.solicitud260101State.legalRazonSocial,
          apellidoPaterno: this.solicitud260101State.apellidoPaterno,
          apellidoMeterno: this.solicitud260101State.apellidoMeterno,
        });
      })
    ).subscribe();

    this.obtenerEstadoCatalogo();
    this.obtenerDatosDeAplicacion();
    this.obtenerRegimenDestinaraListo();
    this.obtenerAduanaListo();
  }

  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
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
        this.tableDataMercancias =
          Array.isArray(res.tablaFilaDatos) &&
          typeof res.tablaFilaDatos[0] === 'object'
            ? res.tablaFilaDatos[0]?.mercancias || ({} as TableData)
            : ({} as TableData);
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

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
