import { Component } from '@angular/core';

@Component({
  selector: 'app-datoa-90305',
  templateUrl: './datoa-90305.component.html',
})
export class Datoa90305Component {
   /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
   indice: number = 1;
   /**
    * Este método se utiliza para establecer el índice del subtítulo.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }
}
