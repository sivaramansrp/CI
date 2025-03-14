import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { init } from '@datorama/akita-ngdevtools';
import { AMBIENTES } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-seleccion-modulo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-modulo.component.html',
  styleUrl: './seleccion-modulo.component.scss',
})
export class SeleccionModuloComponent implements OnInit {

/**
   * Variable para asingar el endpoint de la ruta
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public ruta: string = '';

  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = AMBIENTES.LOCALHOST;
    } else {
      this.ruta = AMBIENTES.DESARROLLO
    }
  }

}
