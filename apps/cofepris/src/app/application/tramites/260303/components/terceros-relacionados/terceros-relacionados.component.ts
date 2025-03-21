/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable class-methods-use-this */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, ConfiguracionColumna, Fabricante, LASTABLA, Otros, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { FABRICANTE_TABLA, OTROS_TABLA } from '../../services/certificados-licencias-permisos.enum';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FabricanteModalComponent } from '../fabricante-modal/fabricante-modal.component';

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent, TablaDinamicaComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit {

  bsModalRef?: BsModalRef;

  // modal
  public TEXTOS = LASTABLA;
  public fabricanteTablaDatos: Fabricante[] = [];
  public facturadorTablaDatos: Fabricante[] = [];
  public proveedorTablaDatos: Fabricante[] = [];
  public certificadoAnaliticoTablaDatos: Fabricante[] = [];
  public otrosTablaDatos: Otros[] = [];
  public checkbox = TablaSeleccion.CHECKBOX;
  
  public configuracionFabricante = FABRICANTE_TABLA;
  public configuracionOtros = OTROS_TABLA;

  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<Fabricante>[] = this.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionFacturadorTabla: ConfiguracionColumna<Fabricante>[] = this.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionProveedorTabla: ConfiguracionColumna<Fabricante>[] = this.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionCertificadoAnaliticoTabla: ConfiguracionColumna<Fabricante>[] = this.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionOtrosTabla: ConfiguracionColumna<Otros>[] = this.generateConfiguracionTabla(this.configuracionOtros);

  

  constructor(
    private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
    private modalService: BsModalService
    ) {
      //
  }

  ngOnInit(): void {
    this.getFabricanteTablaDatos();
    this.getFacturadorTablaDatos();
    this.getProveedorTablaDatos();
    this.getCertificadoAnaliticoTablaDatos();
    this.getOtrosTablaDatos();
  }

  /**
   * Crea una copia profunda del objeto proporcionado.
   * 
   * Este método serializa el objeto a una cadena JSON y luego lo analiza de nuevo a un nuevo objeto,
   * creando efectivamente una copia profunda. Tenga en cuenta que este enfoque puede no manejar funciones,
   * valores indefinidos o referencias circulares correctamente.
   * 
   * @param obj - El objeto que se va a copiar profundamente. Por defecto es un objeto vacío.
   * @returns Una copia profunda del objeto proporcionado.
   */
    public deepCopy(obj = {}) {
      return JSON.parse(JSON.stringify(obj));
    }

  public getFabricanteTablaDatos(): void {
    this.certificadosLicenciasSvc.getFabricanteDatos().subscribe((response) => {
      const DATA = this.deepCopy(response);
      this.fabricanteTablaDatos = DATA;
    });
  }

  public getFacturadorTablaDatos(): void {
    this.certificadosLicenciasSvc.getFacturadorDatos().subscribe((response) => {
      const DATA = this.deepCopy(response);
      this.facturadorTablaDatos = DATA;
    });
  }

  public getProveedorTablaDatos(): void {
    this.certificadosLicenciasSvc.getProveedorDatos().subscribe((response) => {
      const DATA = this.deepCopy(response);
      this.proveedorTablaDatos = DATA;
    });
  }

  public getCertificadoAnaliticoTablaDatos(): void {
    this.certificadosLicenciasSvc.getCertificadoDatos().subscribe((response) => {
      const DATA = this.deepCopy(response);
      this.certificadoAnaliticoTablaDatos = DATA;
    });
  }

  public getOtrosTablaDatos(): void {
    this.certificadosLicenciasSvc.getOtrosDatos().subscribe((response) => {
      const DATA = this.deepCopy(response);
      this.otrosTablaDatos = DATA;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private generateConfiguracionTabla(datosArray: any): ConfiguracionColumna<any>[] {
    const fields: Array<{ encabezado: string, clave: keyof Fabricante }> = datosArray;
    return fields.map((field, index) => ({
      encabezado: field.encabezado,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clave: (item: any) => item[field.clave],
      orden: index + 1
    }));
  }

  public abrirFabricanteModal(titulo: string): void {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        titulo: titulo
      }
    };
    this.bsModalRef = this.modalService.show(FabricanteModalComponent, initialState);
  }
}
