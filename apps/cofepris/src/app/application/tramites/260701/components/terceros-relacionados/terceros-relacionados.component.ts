import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { ConfiguracionColumna, Destinatario, Fabricante260701, TablaDinamicaComponent, TablaSeleccion, TERCEROS } from '@libs/shared/data-access-user/src';
import { AlertComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component";
import { Subject, takeUntil } from 'rxjs';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TercerosRelacionadosModalComponent } from '../terceros-relacionados-modal/terceros-relacionados-modal.component';

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent, AlertComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit,OnDestroy {

  TEXTOS = TERCEROS;
  modalRef?: BsModalRef;
  private destroyNotifier$: Subject<void> = new Subject();
  public destinatarioDatos: Destinatario[] = [];
  public fabricanteTablaDatos: Fabricante260701[] = [];
  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<Destinatario>[] = [
    { encabezado: 'Nombre/denominación o razón social', clave: (item: Destinatario) => item.nombre, orden: 1 },
    { encabezado: 'R.F.C', clave: (item: Destinatario) => item.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (item: Destinatario) => item.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (item: Destinatario) => item.telefono, orden: 4 },
    { encabezado: 'Correo electrónico', clave: (item: Destinatario) => item.correoElectronico, orden: 5 },
    { encabezado: 'Calle', clave: (item: Destinatario) => item.calle, orden: 6 },
    { encabezado: 'Número exterior', clave: (item: Destinatario) => item.numeroExterior, orden: 7 },
    { encabezado: 'Número interior', clave: (item: Destinatario) => item.numeroInterior, orden: 8 },
    { encabezado: 'País', clave: (item: Destinatario) => item.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (item: Destinatario) => item.colonia, orden: 10 },
    { encabezado: 'Localidad', clave: (item: Destinatario) => item.localidad, orden: 11 },
    { encabezado: 'Municipio o alcaldía', clave: (item: Destinatario) => item.municipio, orden: 12 },
    { encabezado: 'Entidad federativa', clave: (item: Destinatario) => item.entidadFederativa, orden: 13 },
    { encabezado: 'Estado/localidad', clave: (item: Destinatario) => item.estado, orden: 14 },
    { encabezado: 'Código postal', clave: (item: Destinatario) => item.codigoPostal, orden: 15 },
    { encabezado: 'Colonia o equivalente', clave: (item: Destinatario) => item.coloniaEquivalente, orden: 16 }
  ];

  /** Configuración de la tabla de sectores */
  public configuracionTablaFabricante: ConfiguracionColumna<Fabricante260701>[] = [
    { encabezado: 'Nombre/denominación o razón social', clave: (item: Fabricante260701) => item.nombre, orden: 1 },
    { encabezado: 'R.F.C', clave: (item: Fabricante260701) => item.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (item: Fabricante260701) => item.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (item: Fabricante260701) => item.telefono, orden: 4 },
    { encabezado: 'Correo electrónico', clave: (item: Fabricante260701) => item.correoElectronico, orden: 5 },
    { encabezado: 'Calle', clave: (item: Fabricante260701) => item.calle, orden: 6 },
    { encabezado: 'Número exterior', clave: (item: Fabricante260701) => item.numeroExterior, orden: 7 },
    { encabezado: 'Número interior', clave: (item: Fabricante260701) => item.numeroInterior, orden: 8 },
    { encabezado: 'País', clave: (item: Fabricante260701) => item.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (item: Fabricante260701) => item.colonia, orden: 10 },
    { encabezado: 'Localidad', clave: (item: Fabricante260701) => item.localidad, orden: 11 },
    { encabezado: 'Municipio o alcaldía', clave: (item: Fabricante260701) => item.municipio, orden: 12 },
    { encabezado: 'Entidad federativa', clave: (item: Fabricante260701) => item.entidadFederativa, orden: 13 },
    { encabezado: 'Estado/localidad', clave: (item: Fabricante260701) => item.estado, orden: 14 },
    { encabezado: 'Código postal', clave: (item: Fabricante260701) => item.cp, orden: 15 }
  ];

  public checkbox = TablaSeleccion.CHECKBOX;
  public tieneFilaSeleccionada: boolean = false;
  public tieneFilaSeleccionadaFabricante: boolean = false;

  constructor(
      private certificadosLicenciasSvc: CertificadosLicenciasService,
      private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.certificadosLicenciasSvc.getDestinatarioDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
        const DATOS = JSON.parse(JSON.stringify(response));
        this.destinatarioDatos = DATOS;
    });

    this.certificadosLicenciasSvc.getFabricanteDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
        const DATOS = JSON.parse(JSON.stringify(response));
        this.fabricanteTablaDatos = DATOS;
    });
  }

  public abrirModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public eliminarDatos(): void {
    if(this.tieneFilaSeleccionada) {
      this.destinatarioDatos.pop();
    }
    if(this.tieneFilaSeleccionadaFabricante) {
      this.fabricanteTablaDatos.pop();
    }
    this.modalRef?.hide();
  }

  public setTablaSeleccionDestinatario(rowSeleccion: Destinatario[]): void {
    this.tieneFilaSeleccionada = rowSeleccion.length > 0 ? true : false;
  }

  public setTablaSeleccionFabricante(rowSeleccion: Fabricante260701[]): void {
    this.tieneFilaSeleccionadaFabricante = rowSeleccion.length > 0 ? true : false;
  }

  public abrirFabricanteModal(titulo: string): void {
    const INITIAL_STATE: ModalOptions = {
      class: 'modal-xl',
      initialState: {
        titulo: titulo
      }
    };
    this.modalRef = this.modalService.show(TercerosRelacionadosModalComponent, INITIAL_STATE);
  }


/**
 * Método para actualizar el banco seleccionado.
 * @param e {Catalogo} Banco seleccionado.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
