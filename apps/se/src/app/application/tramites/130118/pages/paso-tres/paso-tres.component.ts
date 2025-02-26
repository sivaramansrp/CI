import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
constructor(private router: Router) {}

  obtieneFirma(ev: string){
    const firma: string = ev;
    if (firma) {
      this.router.navigate(['servicios-extraordinarios/acuse']);

    }
  }
}
