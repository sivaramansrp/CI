import { AlertComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosGeneralesComponent } from '../../shared/datos-generales/datos-generales.component';
import { PagoDeDerechosComponent } from '../../shared/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosComponent } from '../../shared/terceros-relacionados/terceros-relacionados.component';
/**
 * Componente para la revisión documental.
 */
@Component({
  selector: 'app-revision-documental',
  templateUrl: './revision-documental.component.html',
  styleUrl: './revision-documental.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    DatosGeneralesComponent,
    TercerosRelacionadosComponent,
    PagoDeDerechosComponent
  ],
})
export class RevisionDocumentalComponent {
  /**
   * Índice del tab seleccionado.
   * @type {number}
   */
  indice: number = 1;
  /**
   * Indica si el contenido es colapsable.
   * @type {boolean}
   */
  colapsable: boolean = true;
  /**
   * Índice actual de la fila.
   * @type {number}
   */
  currentIndex: number = 1;
  /**
   * Filas de datos.
   * @type {any[]}
   */
  rows: { [key: string]: string }[] = [];
  /**
   * Formulario principal.
   * @type {any}
   */
  forma: string = '';
  @ViewChild('tercerosRelacionadosRef') tercerosRelacionados!: TercerosRelacionadosComponent;

  @ViewChild('pagoDeDerechosRef') pagoDeDerechos!: PagoDeDerechosComponent;
  /**
   * Selecciona un tab específico.
   * @param {number} i - El índice del tab a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
validarFormularios(): boolean {
  let isValid = true;
  if(this.pagoDeDerechos){
if(!this.pagoDeDerechos.validarFormulario()){
  isValid = false;
}
  }
  else{
    isValid =false;
  }
  if(this.tercerosRelacionados){
if(!this.tercerosRelacionados.validarFormulario()){
  isValid = false;
}
  }
  console.log(isValid,'revision-documental');
return isValid
}
}
