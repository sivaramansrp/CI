import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ConfiguracionColumna, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { PropietarioModel } from '../../models/datos-de-la-solicitud.model';
@Component({
  selector: 'app-propietario',
  standalone: true,
  imports: [CommonModule, TituloComponent ,TablaDinamicaComponent, ReactiveFormsModule,FormsModule ],
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.scss',
})
export class PropietarioComponent {
  propietarioData: PropietarioModel [] = [];
    /** Enum para la selección de tabla */
    TablaSeleccion = TablaSeleccion;
    /**
   * Configuración de columnas de la tabla
   * @type {ConfiguracionColumna<any>[]}
   */
    configuracionTabla: ConfiguracionColumna<PropietarioModel >[] = [
      { encabezado: 'Nombre/denominación o razón social', clave: (item: PropietarioModel ) => item.NombredenominacionORazonSocial, orden: 1 },
      { encabezado: 'R.F.C.', clave: (item: PropietarioModel ) => item.rfc, orden: 2 },
      { encabezado: 'CURP', clave: (item: PropietarioModel ) => item.curp, orden: 3 },
      { encabezado: 'Teléfono', clave: (item: PropietarioModel ) => item.telefono, orden: 4 },
      { encabezado: 'Correo electrónico', clave: (item: PropietarioModel ) => item.CorreoElectronico, orden: 5 },
      { encabezado: 'Calle', clave: (item: PropietarioModel ) => item.calle, orden: 6 },
      { encabezado: 'Número exterior', clave: (item: PropietarioModel ) => item.numeroExterior, orden: 7 },
      { encabezado: 'Número interior', clave: (item: PropietarioModel ) => item.numeroInterior, orden: 8 },
      { encabezado: 'Pais', clave: (item: PropietarioModel ) => item.pais, orden: 9 },
      { encabezado: 'Colonia', clave: (item: PropietarioModel ) => item.colonia, orden: 10 },
      { encabezado: 'Municipio o alcaldía', clave: (item: PropietarioModel ) => item.municipioOAlcaldia, orden: 11 },
      { encabezado: 'Localidad', clave: (item: PropietarioModel ) => item.localidad, orden: 12 },
      { encabezado: 'Entidad federativa', clave: (item: PropietarioModel ) => item.entidadFederativa, orden: 13 },
      { encabezado: 'Estado/localidad', clave: (item: PropietarioModel ) => item.estadoLocalidad, orden: 14 },
      { encabezado: 'Código postal', clave: (item: PropietarioModel ) => item.codigoPostal, orden: 15 }
    ];
}
