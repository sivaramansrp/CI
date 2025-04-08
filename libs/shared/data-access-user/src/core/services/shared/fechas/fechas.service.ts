import { Injectable } from '@angular/core';
import { SEMANA_D } from '../../../enums/constantes-alertas.enum';

@Injectable({
  providedIn: 'root',
})
export class FechasService {
  /**
   * Devuelve la fecha actual en formato 'DD-MM-AAAA'
   * @param {string} fecha
   * @param {boolean} dma, si es false, regresa el formato 'AAAA-MM-DD'
   * @returns {string} Fecha en formato 'DD-MM-AAAA' o 'AAAA-MM-DD'
   */
  formatoFechaGuion(fecha: string, dma = true): string {
    const [dia, mes, anio] = fecha.split('/');
    if (dma) {
      return `${dia}-${mes}-${anio}`;
    }
    return `${anio}-${mes}-${dia}`;
  }

  /**
   * Obtiene el nombre del día de la semana en español.
   * @param {Date} fecha
   * @returns {string} Nombre del día de la semana en español.
   */
  obtenerNombreDiaSemana(fecha: Date): string {
    const diasSemana = SEMANA_D;
    return diasSemana[fecha.getDay()];
  }

  /**
   * Obtener los días entre fechas.
   * @param {string} fechaInicio, fecha final en formato string.
   * @param {string} fechaFinal, fecha final en formato string.
   * @returns {Array<string>} Array con las fechas comprendidas entre la fecha de inicio y la fecha final
   */
  obtenerDiasEntreFechas(fechaInicio: string, fechaFinal: string, horaInicial: string, horaFinal: string): string[] {
    const inicio = `${fechaInicio}T${horaInicial}`;
    const fin = `${fechaFinal}T${horaFinal}`;
    const fechaPrincipio = new Date(inicio);
    const fechaFin = new Date(fin);    
    
    const dias = [];

    while (fechaPrincipio <= new Date(fechaFin)) {
      // Formatear la fecha actual en formato Día de la semana, DD/MM/YYYY, HH:MM
      const diaSemana = this.obtenerNombreDiaSemana(fechaPrincipio);
      const dia = String(fechaPrincipio.getDate()).padStart(2, '0');
      const mes = String(fechaPrincipio.getMonth() + 1).padStart(2, '0');
      const año = fechaPrincipio.getFullYear();
      dias.push(`${diaSemana}, ${dia}/${mes}/${año}`); // Incrementar la fecha en un día
      fechaPrincipio.setDate(fechaPrincipio.getDate() + 1);
    }    
    return dias;
  }
}
