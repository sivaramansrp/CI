import { Component, ElementRef, ViewChild } from '@angular/core';
import { TEXTOS } from '../../constantes/constantes';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent {
  TEXTOS = TEXTOS;

  destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;
  destinatarioConfiguracionTabla: ConfiguracionColumna<any>[] = [
    {
      encabezado: 'Nombre/denominacion o razon social',
      clave: (item: any) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C',
      clave: (item: any) => item.rfc,
      orden: 1,
    },
    {
      encabezado: 'CURP',
      clave: (item: any) => item.curp,
      orden: 1,
    },
    {
      encabezado: 'Telefono',
      clave: (item: any) => item.relefono,
      orden: 1,
    },
    {
      encabezado: 'Correo electronico',
      clave: (item: any) => item.electronico,
      orden: 1,
    },
  ];
  destinatarioDatos = [
    {
      nombre: '1234567890',
      rfc: '21/11/2024',
      curp: '29/06/2025',
      relefono: 'test',
      electronico: 'test',
    },
  ];

  fabricanteSeleccionTabla = TablaSeleccion.CHECKBOX;
  fabricanteConfiguracionTabla: ConfiguracionColumna<any>[] = [
    {
      encabezado: 'Nombre/denominacion o razon social',
      clave: (item: any) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C',
      clave: (item: any) => item.rfc,
      orden: 1,
    },
    {
      encabezado: 'CURP',
      clave: (item: any) => item.curp,
      orden: 1,
    },
    {
      encabezado: 'Telefono',
      clave: (item: any) => item.relefono,
      orden: 1,
    },
    {
      encabezado: 'Correo electronico',
      clave: (item: any) => item.electronico,
      orden: 1,
    },
  ];
  fabricanteDatos = [
    {
      nombre: '1234567890',
      rfc: '21/11/2024',
      curp: '29/06/2025',
      relefono: 'test',
      electronico: 'test',
    },
  ];

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;
  
  openModificarMercancias() {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
}
