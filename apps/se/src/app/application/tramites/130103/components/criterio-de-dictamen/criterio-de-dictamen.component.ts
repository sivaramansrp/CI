import { CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA } from '../../constantes/importacion-definitiva.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface DatosDelTramite {
  id: string;
  label_nombre: string;
  campo: string;
  clase: string;
  tipo_input: string;
  desactivado: boolean;
  solo_lectura: boolean;
  validadores: { tipo: string }[];
  marcador_de_posicion: string;
  margin_top?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opciones?: any[];
}

@Component({
  selector: 'app-criterio-de-dictamen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './criterio-de-dictamen.component.html',
  styleUrl: './criterio-de-dictamen.component.scss',
})
export class CriterioDeDictamenComponent {
  /**
      * compo doc
      * @property criterioDeDictamenFormData
      * @type {DatosDelTramite[]}
      * @description
      * Esta propiedad contiene la configuración de los campos del formulario dinámico 
      * utilizado en el componente. La configuración está basada en la constante 
      * `CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA`, que define los detalles de cada campo, como su 
      * identificador, etiqueta, tipo de entrada, validadores, y más.
      * 
      * Se utiliza para renderizar dinámicamente los campos del formulario y para 
      * gestionar su comportamiento, como la validación y la interacción con los datos 
      * obtenidos de los servicios.
      */
      public criterioDeDictamenFormData: DatosDelTramite[] = CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA;
}
