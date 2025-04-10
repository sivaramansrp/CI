// import { LayoutDirectorGeneralService } from '../../services/layout-director-general.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud40301Query } from '../../estados/tramite40301.query';
import { Solicitud40301Store } from '../../estados/tramite40301.store';

@Component({
  selector: 'app-layout-director-general',
  templateUrl: './layoutDirectorGeneral.component.html',
  styleUrls: ['./layoutDirectorGeneral.component.scss']
})
export class LayoutDirectorGeneralComponent implements OnInit {
  solicitudForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private layoutDirectorGeneralService: LayoutDirectorGeneralService
    private solicitud40301Store: Solicitud40301Store,
    private tramite40301session: Solicitud40301Query,
  ) { }

  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
        directorGeneralNombre: this.fb.control<string>('', [Validators.required, Validators.maxLength(200)]),
        primerApellido: this.fb.control<string>('', [Validators.required, Validators.maxLength(200)]),
        segundoApellido: this.fb.control<string | null>(null, [Validators.maxLength(200)])
    });

    // this.tramite40301Store.
  }

  onChange(control: string): void {
    const VALUE = this.solicitudForm.get(control)?.value;
    console.log(`Valor del ${control}:`, VALUE);
    this.solicitud40301Store.setDirectorGeneralNombre(VALUE);
  }
  
  /**
 * Actualiza el nombre del Director General en el store.
 *
 * Este método obtiene el valor actual del campo `directorGeneralNombre` del formulario `solicitudForm`
 * y lo envía al store `solicitud40301Store` mediante el método `setDirectorGeneralNombre`.
 */
  public actualizarDirectorGeneralNombre(control: string): void {
    const DIRECTOR_GENERAL_NOMBRE = this.solicitudForm.get(control)?.value;
    this.solicitud40301Store.setDirectorGeneralNombre(DIRECTOR_GENERAL_NOMBRE);
  }

  /**
 * Actualiza el primer apellido en el store.
 *
 * Este método obtiene el valor actual del campo `primerApellido` del formulario `solicitudForm`
 * y lo envía al store `solicitud40301Store` mediante el método `setDirectorGeneralNombre`.
 */
  public actualizarPrimerApellido(control: string): void {
    const PRIMER_APELLIDO = this.solicitudForm.get(control)?.value;
    this.solicitud40301Store.setPrimerApellido(PRIMER_APELLIDO);
  }

  /**
 * Actualiza el segundo apellido en el store.
 *
 * Este método obtiene el valor actual del campo `segundoApellido` del formulario `solicitudForm`
 * y lo envía al store `solicitud40301Store` mediante el método `setDirectorGeneralNombre`.
 */
  public actualizarApellidoMaterno(control: string): void {
    const SEGUNDO_APELLIDO = this.solicitudForm.get(control)?.value;
    this.solicitud40301Store.setSegundoApellido(SEGUNDO_APELLIDO);
  }

}