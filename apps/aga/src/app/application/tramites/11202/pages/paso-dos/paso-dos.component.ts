import { Component } from '@angular/core';

/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoDosComponent
 * @selector app-paso-dos
 * @templateUrl ./paso-dos.component.html
 * @styleUrls ./paso-dos.component.scss
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss']
})
export class PasoDosComponent {
  items: any[] = [];

  archivoSeleccionadoCSV(evento: any): void {
    const archivo = evento.target.files[0];
 
    if (archivo && archivo.name.endsWith('.csv')) {
      const lector = new FileReader();
 
      lector.onload = (e: any) => {
        const datosCSV = e.target.result;
        const datosProcesados = this.procesarCSV(datosCSV);
        console.log('Datos CSV procesados:', datosProcesados);
      };
 
      lector.readAsText(archivo);
    } else {
     // alert('Por favor, sube un archivo CSV válido');
    }
  }
 
  procesarCSV(datosCSV: string): any[] {
    const lineas = datosCSV.split('\n'); // Separar el archivo en líneas
    const resultado: any[] = [];
    const encabezados = lineas[0].split(','); // Suponemos que la primera línea es el encabezado
 
    // Recorrer cada línea a partir de la segunda línea
    for (let i = 1; i < lineas.length; i++) {
      const lineaActual = lineas[i].trim();
      if (lineaActual) {
        const valores = lineaActual.split(','); // Separar por coma
        const objeto: any = {};
 
        // Combinar los encabezados con los valores en un objeto
        for (let j = 0; j < encabezados.length; j++) {
          objeto[encabezados[j].trim()] = valores[j] ? valores[j].trim() : '';
        }
 
        resultado.push(objeto);
      }
    }
 
    return resultado;
  }
 

}