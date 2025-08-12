import { Component, QueryList, ViewChildren } from '@angular/core';
import { CrossListLable,CrosslistComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import Procedencia from '@libs/shared/theme/assets/json/260212/pis-de-procedencia.json'

export const TIPO_T: string = 't';

@Component({
  selector: 'app-pais-de-origen',
  standalone: true,
  imports: [CommonModule,
     CrosslistComponent
    ],
  templateUrl: './pais-de-origen.component.html',
  styleUrl: './pais-de-origen.component.scss',
})
export class PaisDeOrigenComponent {
  /**
   * Referencia a los componentes de la lista de fechas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
 * Arreglo para almacenar el rango de días seleccionables.
 */
  selectRangoDias = Procedencia;
  /**
 * Arreglo para almacenar las fechas seleccionadas por el usuario.
 */
  fechasSeleccionadas: string[] = Procedencia;
  /**
   * Arreglo para almacenar los datos relacionados con las fechas.
   */
  fechasDatos: string[] = Procedencia;

  /**
   * Constructor de la clase PaisDeOriginComponent.
   */
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  constructor(){}

  /**
   * Etiquetas para el componente CrossList que representan el país de origen.
   */
  public paisDeOrigenLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen:',
    derecha: 'País(es) seleccionado(s)*:',
  };

  /**
   * Etiquetas para el componente CrossList que representan el país de procedencia.
   */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia:',
    derecha: 'País(es) seleccionado(s)*:',
  };

  /**
   * Etiquetas para el componente CrossList que representan el Uso específico.
   */
  public usoEspecificoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Uso específico:',
    derecha: 'Uso específico seleccionado*:',
  };

  /**
 * Control de formulario para manejar una fecha individual.
 */
  fecha: FormControl = new FormControl('');

  /**
   * Control de formulario para manejar una fecha seleccionada por el usuario.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /** Indica si la sección de país de origen está plegada o desplegada. */
  public paisDeOrigenPlegable: boolean = false;

  /** Indica si la sección de país de procedencia está plegada o desplegada. */
  public paisDeProcedenciaPlegable: boolean = false;

  /** Indica si la sección de uso específico está plegada o desplegada. */
  public usoEspecificoPlegable: boolean = false;


  /**
   * Alterna la visibilidad de la sección plegable.
   */
  mostrarPaisDeOrigen():void {
    this.paisDeOrigenPlegable = !this.paisDeOrigenPlegable;
  }

  /**
   * Alterna la visibilidad de la sección plegable.
   */
  mostrarPaisDeProcedencia():void {
    this.paisDeProcedenciaPlegable = !this.paisDeProcedenciaPlegable;
  }


  /**
   * Alterna la visibilidad de la sección plegable.
   */
  mostrarUsoEpecifico():void {
    this.usoEspecificoPlegable = !this.usoEspecificoPlegable;
  }


  /**
   * Configuración de los botones y sus respectivas funciones para manipular las selecciones.
   */
  botones = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.forEach(cmp => cmp.agregar('t')),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.forEach(cmp => cmp.agregar('')),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.forEach(cmp => cmp.quitar('')),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.forEach(cmp => cmp.quitar('t')),
    },
  ];


  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  agregar(tipo: string) {
    if (tipo === TIPO_T) {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const fechaValor = this.fecha.value.map(Number);
      this.fechasSeleccionadas?.push(this.fechasDatos[fechaValor]);
      this.fechasDatos.splice(fechaValor, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo = ''): void {
    if (tipo === TIPO_T) {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const fechaValor = this.fechaSeleccionada?.value.map(Number);
      this.fechasDatos.push(this.fechasSeleccionadas[fechaValor]);
      this.fechasSeleccionadas?.splice(fechaValor, 1);
    }
  }

}
