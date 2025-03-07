import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  
})
export class PasoTresComponent {
constructor(private router: Router) {
  // No se necesita lógica de inicialización adicional.
}

  obtieneFirma(ev: string):void{
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);

    }
  }
}
