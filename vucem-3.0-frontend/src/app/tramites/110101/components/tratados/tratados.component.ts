import { Component } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';

import { CommonModule } from '@angular/common';
import tratadosDropdown from '../../../../../assets/json/110101/tratdos-dropdown.json';

import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-tratados',
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
  standalone: true,
  imports:[TituloComponent, SelectCatalogosComponent,CommonModule,TableComponent]
})
export class TratadosComponent {

  dropdownConfigs = [
    { labelNombre: 'Pais o bloque', required: true, catalogos: tratadosDropdown.pais, primerOpcion: '' },
    { labelNombre: 'Tratado o Acuerdo', required: true, catalogos: tratadosDropdown.tratado, primerOpcion: '' },
    { labelNombre: 'Criterio de origen', required: true, catalogos: tratadosDropdown.origen, primerOpcion: '' }
  ];

    seleccionar(){
      console.log('Seleccionar');
    }
  
    commonTableHeaders = ['Pais o bloque', 'Tratado o Acuerdo', 'Criterio de origen'];
     mercanciasData = [
      {
        tbodyData: ['Establecimiento 1','123-456-7890','Calle 123'],
      }
    ]
}
