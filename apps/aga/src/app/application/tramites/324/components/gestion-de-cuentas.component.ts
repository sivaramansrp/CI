import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaConEntradaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { AccesosTabla } from '../models/tecnologicos.model';

@Component({
  selector: 'app-gestion-de-cuentas',
  standalone: true,
  imports: [CommonModule,TituloComponent,TablaDinamicaComponent],
  templateUrl: './gestion-de-cuentas.component.html',
  styleUrl: './gestion-de-cuentas.component.scss',
})
export class GestionDeCuentasComponent {
  TablaSeleccion = TablaSeleccion;
  public accesosTablaDatos: AccesosTabla[] = [];

  public headers: ConfiguracionColumna<AccesosTabla>[] = [
    {
      encabezado: 'RFC',
      clave: (ele: AccesosTabla) => ele.rfc,
      orden: 1,
    },
    {
      encabezado: 'Sistema',
      clave: (ele: AccesosTabla) => ele.sistema,
      orden: 2,
    },
    {
      encabezado: 'Rol/Perfil',
      clave: (ele: AccesosTabla) => ele.rol,
      orden: 3,
    },
    {
      encabezado: 'Tipo Movimiento',
      clave: (ele: AccesosTabla) => ele.tipoMovimiento,
      orden: 4,
    },
    {
      encabezado: 'Aduana',
      clave: (ele: AccesosTabla) => ele.aduana,
      orden: 5,
    },
  ];
}
