import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { ConfiguracionColumna, Destinatario, TablaDinamicaComponent, TERCEROS } from '@libs/shared/data-access-user/src';
import { AlertComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component";
import { Subject, takeUntil } from 'rxjs';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent, AlertComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit,OnDestroy {

  TEXTOS = TERCEROS;
  private destroyNotifier$: Subject<void> = new Subject();
  public destinatarioDatos: Destinatario[] = [];
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

  constructor(
      private certificadosLicenciasSvc: CertificadosLicenciasService
  ) {}

  ngOnInit(): void {
    this.certificadosLicenciasSvc.getDestinatarioDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
            const DATOS = JSON.parse(JSON.stringify(response));
            this.destinatarioDatos = DATOS;
        });
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
