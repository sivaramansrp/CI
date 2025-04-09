import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { AlertComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component";
import { AVISO_PRIVACIDAD } from "../../constantes/consulta.enum";
import { TablaDinamicaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";
import {
  CatalogosSelect,
  ConfiguracionColumna,
  TablaSeleccion,
} from "@libs/shared/data-access-user/src";
import { Modal } from 'bootstrap';
import { Destinatario, Fabricante } from "../../models/consulta.model";
import { ConsultaService } from "../../service/consulta.service";
import { ReplaySubject, takeUntil } from "rxjs";
import { Tramite260704Store } from "../../estados/Tramite260704.store";
import { InputRadioComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";
import { CatalogoSelectComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component";
@Component({
  selector: "app-terceros-relacinados",
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    CatalogoSelectComponent
],
  templateUrl: "./terceros-relacinados.component.html",
  styleUrl: "./terceros-relacinados.component.css",
})
export class TercerosRelacinadosComponent implements OnInit, OnDestroy {
  AVISO_PRIVACIDAD = AVISO_PRIVACIDAD;
  TablaSeleccion = TablaSeleccion;
  selectedDestinatario: Fabricante[] = [];
  public destinatarioDatos: Destinatario[] = [];
  fabricanteDatos: Fabricante[] = [];
 @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;
 private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
 tipoPublicos: string = '';
 tipoPersonaSeleccionada: string = '';

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
  constructor(private consulta:ConsultaService,
    private store:Tramite260704Store
  ) {}
  ngOnInit(): void {
    this.getTercerosTabla();
  }

  public getTercerosTabla(): void {
    this.consulta
      .getTercerosTabla()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.destinatarioDatos = data;
      });
  }
  setTipoPersona(value: string | number): void {
    this.tipoPersonaSeleccionada = value.toString(); 
    }

  getDestinatarioDatos(evento: Fabricante[]) {
    this.selectedDestinatario = evento;
  }

  eliminarMercancias(): void {
    if (this.selectedDestinatario.length > 0) {
      this.store.removeDestinatarioDato(
        this.selectedDestinatario[0]
      );
    }
  }
  openModificarMercancias(): void {
      if (this.modalElement) {
        const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
        MODAL_INSTANCE.show();
      }
    }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
}
