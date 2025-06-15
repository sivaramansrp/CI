import { Component } from '@angular/core';
import pkg from '@package-json';
@Component({
  selector: 'lib-pie-pagina-informacion',
  standalone: true,
  imports: [],
  templateUrl: './pie-pagina-informacion.component.html',
  styleUrl: './pie-pagina-informacion.component.scss'
})
export class PiePaginaInformacionComponent {
version = pkg.version;
}
