import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TEXTOS } from '../../constantes/constantes';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Destinatario } from '../../models/destinatario.model';
import { Fabricante } from '../../models/fabricante.model';
import {
  Solicitud260101State,
  Solicitud260101Store,
} from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  TEXTOS = TEXTOS;

  destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;
  destinatarioConfiguracionTabla: ConfiguracionColumna<any>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: any) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (item: any) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: any) => item.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: any) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: any) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: any) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: any) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: any) => item.numeroInterior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: any) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: any) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: any) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: any) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: any) => item.estado,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (item: any) => item.estado2,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: any) => item.codigo,
      orden: 15,
    },
  ];
  destinatarioDatos: Destinatario[] = [];

  fabricanteSeleccionTabla = TablaSeleccion.CHECKBOX;
  fabricanteConfiguracionTabla: ConfiguracionColumna<any>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: any) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (item: any) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: any) => item.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: any) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: any) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: any) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: any) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: any) => item.numeroInterior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: any) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: any) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: any) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: any) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: any) => item.estado,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (item: any) => item.estado2,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: any) => item.codigo,
      orden: 15,
    },
  ];
  fabricanteDatos: Fabricante[] = [];
  selectedDestinatario: Fabricante[] = [];
  private destroyNotifier$: Subject<void> = new Subject();
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  constructor(
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query
  ) {
    this.obtenerDestinatarioListo();
    this.obtenerFabricanteListo();
  }

  ngOnInit() {
    this.solicitud260101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((res: Solicitud260101State) => {
          this.solicitud260101State = res;
          this.destinatarioDatos = this.solicitud260101State.destinatarioDatos;
        })
      )
      .subscribe();
  }

  obtenerDestinatarioListo() {
    this.solicitudDatosService.obtenerDestinatarioListo().subscribe({
      next: (res: Destinatario[]) => {
        this.destinatarioDatos = res;
        this.solicitud260101Store.setDestinatarioDatos(res);
      },
    });
  }

  obtenerFabricanteListo() {
    this.solicitudDatosService.obtenerFabricanteListo().subscribe({
      next: (res: Fabricante[]) => {
        this.fabricanteDatos = res;
      },
    });
  }

  openModificarMercancias() {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  agregarMercancias() {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  getDestinatarioDatos(event: Fabricante[]) {
    this.selectedDestinatario = event;
  }

  eliminarMercancias(){
    if(this.selectedDestinatario.length > 0){
      this.solicitud260101Store.removeDestinatarioDato(this.selectedDestinatario[0]);
    }
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
