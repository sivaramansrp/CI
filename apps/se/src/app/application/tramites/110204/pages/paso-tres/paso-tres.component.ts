import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
constructor(private router: Router) {
  // no hacer nada
}

  obtieneFirma(ev: string):void{
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);

    }
  }
}
