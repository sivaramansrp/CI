import { Pipe, PipeTransform } from '@angular/core';

/**
 * @Pipe - PhoneNumberPipe
 *
 * Este pipe se utiliza para transformar valores de texto en traducciones específicas.
 * Actualmente, solo proporciona traducciones para "HELLO" y "GOODBYE".
 */
@Pipe({ name: 'número-de-teléfono' })
export class PhoneNumberPipe implements PipeTransform {

  /**
   * Diccionario de traducciones.
   */
  private translations: { [key: string]: string } = {
    'HELLO': 'Hola',
    'GOODBYE': 'Adiós'
  };

  /**
   * Transforma un valor de texto en su traducción correspondiente.
   *
   * @param value - El valor de texto a transformar.
   * @param args - Argumentos adicionales (no utilizados actualmente).
   * @returns La traducción del valor de texto, o el valor original si no se encuentra una traducción.
   */
  transform(value: string, ...args: string[]): string {
    return this.translations[value] || value;
  }

  /**
   * Método estático para transformar un valor.
   *
   * @param value - El valor a transformar.
   * @returns El valor transformado.
   */
  static transform(value: string | boolean | number): string | boolean | number {
    return value;
  }
}