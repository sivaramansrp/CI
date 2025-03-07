import { Component } from '@angular/core';
import { RegistroCuentasBancariasService } from '../../services/registro-cuentas-bancarias.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {

  componenteActual: string = 'DatosGenerales';

  constructor(private _registroCuentasBancariasSvc: RegistroCuentasBancariasService,) {
    this._registroCuentasBancariasSvc.componenteActual.subscribe(component => {
      this.componenteActual = component;
    });
  }
}
