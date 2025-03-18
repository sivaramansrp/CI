import { Catalogo } from '../../../../shared/models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PROYECTO_IMMEX_CONFIG } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { PoryectoDatos } from '../../../../shared/models/nuevo-programa-industrial.model';
import { ProyectoImmexComponent } from '../../../../shared/components/proyecto-immex/proyecto-immex.component';
import { ProyectoImmexEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-proyecto-immex-vista',
  standalone: true,
  imports: [CommonModule, ProyectoImmexComponent],
  templateUrl: './proyecto-immex-vista.component.html',
  styleUrl: './proyecto-immex-vista.component.scss',
})
export class ProyectoImmexVistaComponent {
  public proyectoImmexDatos: PoryectoDatos = {
    fraccionArancelaria: '6465469',
    anexoDos: 'NO SENSIBLE',
    tipo: 'EXPORTACCION',
    umt: 'KILOGRAM',
    descripcion: 'TEST COMPLEMENTOR',
    tipoDeDocumente: '',
    fechaDeFirma: '',
    fechaDeVigencia: '',
    rfcTaxId: 0,
    razonSocial: ''
  }

  public documentoCatalogDatos: Catalogo[] = [
    {
      id: 0,
      descripcion: 'Cantrado De Maqula'
    }
  ]
  public proyectoImmexConfiguartion = {
       proyectoImmexSeleccionCheckBox: TablaSeleccion.CHECKBOX,
        proyectoImmexTabla: PROYECTO_IMMEX_CONFIG
    };

  public proyectoImmexTablaLista: ProyectoImmexEncabezado[] = [];

  obtenerProyectoTablaDevolverLaLlamada(event: ProyectoImmexEncabezado[]): void{
    this.proyectoImmexTablaLista = event;
  }
}
