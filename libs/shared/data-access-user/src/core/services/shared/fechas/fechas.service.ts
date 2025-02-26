import { DatosParaValidacionFecha } from '../../../models/shared/fechas.model';
import { Injectable } from '@angular/core';
import { MILISEGUNDOS } from 'libs/shared/data-access-user/src/tramites/constantes/constantes';
import { SEMANA_D } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';

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
  formatoFechaGuion(fecha: string, dma: boolean = true): string {
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
  obtenerDiasEntreFechas(fechaInicio: string, fechaFinal: string): string[] {
    const [diaInicio, mesInicio, anioInicio] = fechaInicio
      .split('-')
      .map(Number);
    const [diaFin, mesFin, anioFin] = fechaFinal.split('-').map(Number);

    const fechaPrincipio = new Date(anioInicio, mesInicio - 1, diaInicio);
    const fechaFin = new Date(anioFin, mesFin - 1, diaFin);
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

  /**
   * Valida si existen 24 horas en una fecha.
   * @param {DatosParaValidacionFecha} datosFechas - Datos para validar la fecha.
   * @returns {boolean} True si la fecha tiene 24 horas, false si no.
   */
  validacion24Horas(datosFechas: DatosParaValidacionFecha): boolean {
    const { fechaInicio, horaInicio, fechaFin, horaFin } = datosFechas;

    const fechaInicial = new Date(`${fechaInicio}T${horaInicio}:00`);
    const fechaFinal = new Date(`${fechaFin}T${horaFin}:00`);

    const milisegundosDia = MILISEGUNDOS.DIA;
    const diferenciaFechas = fechaFinal.getTime() - fechaInicial.getTime();

    if (diferenciaFechas <= milisegundosDia) {
      return true;
    }
    return false;
  }

  /**
   * Valida si el rango de la fecha es igual o menor a una semana, es decir, 7 días.
   * @param {DatosParaValidacionFecha} datosFechas - Datos para validar la fecha.
   * @returns {boolean} True si el rango de la fecha es igual o menor a una semana, false si no.
   */
  validacionSemana(datosFechas: DatosParaValidacionFecha): boolean {
    const { fechaInicio, fechaFin } = datosFechas;

    const fechaInicial = new Date(fechaInicio);
    const fechaFinal = new Date(fechaFin);

    const milisegundosSemana = MILISEGUNDOS.SEMANA;
    const diferenciaFechas = fechaFinal.getTime() - fechaInicial.getTime();

    if (diferenciaFechas <= milisegundosSemana) {
      return true;
    }
    return false;
  }

  /**
   * Valida si el rango de la fecha es igual o menor a un mes, es decir, 30 días.
   * @param {DatosParaValidacionFecha} datosFechas - Datos para validar la fecha.
   * @returns {boolean} True si el rango de la fecha es igual o menor a un mes, false si no.
   */
  validacionMes(datosFechas: DatosParaValidacionFecha): boolean {
    const { fechaInicio, fechaFin } = datosFechas;

    const fechaInicial = new Date(fechaInicio);
    const fechaFinal = new Date(fechaFin);

    const milisegundosMes = MILISEGUNDOS.MES;
    const diferenciaFechas = fechaFinal.getTime() - fechaInicial.getTime();

    if (diferenciaFechas <= milisegundosMes) {
      return true;
    }
    return false;
  }
}
