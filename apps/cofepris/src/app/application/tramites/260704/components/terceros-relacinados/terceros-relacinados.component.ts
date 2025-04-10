import { AlertComponent, CatalogoSelectComponent, InputRadioComponent, TablaDinamicaComponent, TituloComponent } from "@ng-mf/data-access-user";
import { CatalogosSelect, ConfiguracionColumna, TablaSeleccion, ValidacionesFormularioService } from "@libs/shared/data-access-user/src";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Destinatario, Fabricante } from "../../models/consulta.model";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ReplaySubject, map, takeUntil } from "rxjs";
import { Solicitud260704State, Tramite260704Store } from "../../estados/Tramite260704.store";
import { AVISO_PRIVACIDAD } from "../../constantes/consulta.enum";
import { CommonModule } from "@angular/common";
import { ConsultaService } from "../../service/consulta.service";
import { Modal } from 'bootstrap';
import { Tramite260704Query } from "../../estados/Tramite260704.query";

@Component({
  selector: "app-terceros-relacinados",
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./terceros-relacinados.component.html",
  styleUrl: "./terceros-relacinados.component.css",
})
export class TercerosRelacinadosComponent implements OnInit, OnDestroy {
  AVISO_PRIVACIDAD = AVISO_PRIVACIDAD;
  tercerosForm!: FormGroup;
  TablaSeleccion = TablaSeleccion;
  selectedDestinatario: Fabricante[] = [];
  public destinatarioDatos: Destinatario[] = [];
  fabricanteDatos: Fabricante[] = [];
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  tipoDePublicos: string = '';
  tipoPersonaSeleccionada: string = '';
  public solicitudState!: Solicitud260704State;

  tipoPersonaRadioOptions = [
    { label: 'Física', value: 'fisica' },
    { label: 'Moral', value: 'moral' },
  ];

  public estadoCatalogo: CatalogosSelect = {
    labelNombre: 'Estado',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  public destinatarioConfiguracionTabla: ConfiguracionColumna<Destinatario>[] = [
    {
      encabezado: "Nombre/denominación o razón social",
      clave: (item: Destinatario) => item.nombre,
      orden: 1,
    },
    { encabezado: "R.F.C.", clave: (item: Destinatario) => item.rfc, orden: 2 },
    { encabezado: "CURP", clave: (item: Destinatario) => item.curp, orden: 3 },
    {
      encabezado: "Teléfono",
      clave: (item: Destinatario) => item.telefono,
      orden: 4,
    },
    {
      encabezado: "Correo electrónico",
      clave: (item: Destinatario) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: "Calle",
      clave: (item: Destinatario) => item.calle,
      orden: 6,
    },
    {
      encabezado: "Número exterior",
      clave: (item: Destinatario) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: "Número interior",
      clave: (item: Destinatario) => item.numeroInterior,
      orden: 8,
    },
    { encabezado: "País", clave: (item: Destinatario) => item.pais, orden: 9 },
    {
      encabezado: "Colonia",
      clave: (item: Destinatario) => item.colonia,
      orden: 10,
    },
    {
      encabezado: "Municipio o alcaldía",
      clave: (item: Destinatario) => item.municipio,
      orden: 11,
    },
    {
      encabezado: "Localidad",
      clave: (item: Destinatario) => item.localidad,
      orden: 12,
    },
    {
      encabezado: "Estado",
      clave: (item: Destinatario) => item.estado,
      orden: 13,
    },
    {
      encabezado: "Estado",
      clave: (item: Destinatario) => item.estado2,
      orden: 14,
    },
    {
      encabezado: "Código postal",
      clave: (item: Destinatario) => item.codigo,
      orden: 15,
    },
  ];
  public fabricanteConfiguracionTabla: ConfiguracionColumna<Fabricante>[] = [
    {
      encabezado: "Nombre/denominación o razón social",
      clave: (item: Fabricante) => item.nombre,
      orden: 1,
    },
    { encabezado: "R.F.C.", clave: (item: Fabricante) => item.rfc, orden: 2 },
    { encabezado: "CURP", clave: (item: Fabricante) => item.curp, orden: 3 },
    {
      encabezado: "Teléfono",
      clave: (item: Fabricante) => item.telefono,
      orden: 4,
    },
    {
      encabezado: "Correo electrónico",
      clave: (item: Fabricante) => item.correoElectronico,
      orden: 5,
    },
    { encabezado: "Calle", clave: (item: Fabricante) => item.calle, orden: 6 },
    {
      encabezado: "Número exterior",
      clave: (item: Fabricante) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: "Número interior",
      clave: (item: Fabricante) => item.numeroInterior,
      orden: 8,
    },
    { encabezado: "País", clave: (item: Fabricante) => item.pais, orden: 9 },
    {
      encabezado: "Colonia",
      clave: (item: Fabricante) => item.colonia,
      orden: 10,
    },
    {
      encabezado: "Municipio o alcaldía",
      clave: (item: Fabricante) => item.municipio,
      orden: 11,
    },
    {
      encabezado: "Localidad",
      clave: (item: Fabricante) => item.localidad,
      orden: 12,
    },
    {
      encabezado: "Estado",
      clave: (item: Fabricante) => item.estado,
      orden: 13,
    },
    {
      encabezado: "Estado",
      clave: (item: Fabricante) => item.estado2,
      orden: 14,
    },
    {
      encabezado: "Código postal",
      clave: (item: Fabricante) => item.codigo,
      orden: 15,
    },
  ];
  constructor(private consulta: ConsultaService,
    public store: Tramite260704Store,
    private query: Tramite260704Query,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService) {
     // Constructor vacío, no requiere inicialización adicional.
    }
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    this.obtenerTablaTerceros();
  }

  public obtenerTablaTerceros(): void {
    this.consulta
      .obtenerTablaTerceros()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.destinatarioDatos = data;
      });
  }
  setTipoPersona(value: string | number): void {
    this.tipoPersonaSeleccionada = value.toString();
  }

  obtenerDatosDestinatario(evento: Fabricante[]): void {
    this.selectedDestinatario = evento;
  }

  eliminarMercancias(): void {
    if (this.selectedDestinatario.length > 0) {
      this.store.removeDestinatarioDato(
        this.selectedDestinatario[0]
      );
    }
  }
  abrirModificarProductos(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260704Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  donanteDomicilio(): void {
    this.tercerosForm = this.fb.group({
      destinatario: [this.solicitudState?.destinatario, [Validators.required]],
      fabricante: [this.solicitudState?.fabricante, [Validators.required]],
      tipoPersona: [this.solicitudState?.tipoPersona, [Validators.required]],
      nombre: [this.solicitudState?.nombre, [Validators.required]],
      primerApellido: [this.solicitudState?.primerApellido, [Validators.required]],
      segundoApellido: [this.solicitudState?.segundoApellido, [Validators.required]],
      denominacion: [this.solicitudState?.denominacion, [Validators.required]],
      pais: [this.solicitudState?.pais, [Validators.required]],
      estados: [this.solicitudState?.estados, [Validators.required]],
      codigoDeZip: [this.solicitudState?.codigoDeZip, [Validators.required]],
      camino: [this.solicitudState?.camino, [Validators.required]],
      numeroExterior: [this.solicitudState?.numeroExterior, [Validators.required]],
      numeroInterior: [this.solicitudState?.numeroInterior, [Validators.required]],
      ladaDeTerceros: [this.solicitudState?.ladaDeTerceros, [Validators.required]],
      fon: [this.solicitudState?.fon, [Validators.required]],
      email: [this.solicitudState?.email, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
