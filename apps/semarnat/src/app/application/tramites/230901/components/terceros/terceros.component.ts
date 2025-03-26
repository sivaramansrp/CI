import { Catalogo, ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';


interface ConfiguracionItem {
  pais: string;
  ciudad:string;
  EntidadFederativa: string;
  Domicilio: string;
  CodigoPostal: number;
}

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.css',
})
export class TercerosComponent {
destinatarioForm!: FormGroup;
catalogos: Catalogo[] = [];
configuracionTabla!: ConfiguracionColumna<ConfiguracionItem>[];
tablaDatos: ConfiguracionItem[]=[];
TablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;
}
