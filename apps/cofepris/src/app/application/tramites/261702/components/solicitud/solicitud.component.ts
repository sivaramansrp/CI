import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManifiestosDeclaracionesComponent } from '../manifiestosDeclaraciones/manifiestosDeclaraciones.component';
import { PermisoDesistirComponent } from '../permisoDesistir/permisoDesistir.component';
import { RepresentanteLegalComponent } from '../../../260211/components/representanteLegal/representanteLegal.component';

@Component({
  selector: 'solicitud',
  standalone: true,
  imports: [
    CommonModule,
    RepresentanteLegalComponent,
    PermisoDesistirComponent,
    ManifiestosDeclaracionesComponent
  ],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements AfterViewInit {

  private manifiestosCheckboxChecked: boolean = false; 

  ngAfterViewInit(): void {
    const CHECKBOX_ELEMENT = document.getElementById('manifiestos');
    if (CHECKBOX_ELEMENT) {
      CHECKBOX_ELEMENT.addEventListener('click', () => {
        this.manifiestosCheckboxChecked = (CHECKBOX_ELEMENT as HTMLInputElement).checked;
      });
    }
  }
}
