
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALERTA_DE_MANIFESTO_Y_DECLARACIONES } from '../../constantes/datos-solicitud.enum';
import { AbstractControl } from '@angular/forms';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { Catalogo } from '../../models/datos-solicitud.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ScianConfig } from '../../models/datos-solicitud.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaScianConfig } from '../../models/datos-solicitud.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { tap } from 'rxjs';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, TablaDinamicaComponent, AlertComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit {

  @Input() public scianConfig!: ScianConfig<TablaScianConfig>;

  public datosSolicitudForm!: FormGroup;
  public estadoDatos: Catalogo[] = [];
  public regimenDatos: Catalogo[] = [];
  public adunasDeEntradasDatos: Catalogo[] = [];
  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';
  public manifiestosCasillaDeVerificacion = false;
  public alertaDeManifestoContenido = ALERTA_DE_MANIFESTO_Y_DECLARACIONES


  constructor(public fb:FormBuilder) { }

  ngOnInit(): void {
    this.datosSolicitudForm = this.fb.group({
      rfcSanitario: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      denominacionRazon: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      correoElectronico: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      codigoPostal: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      municipioAlcaldia: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      localidad: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      lada: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      aviso: ['', [Validators.required]],
      licenciaSanitaria: ['', [Validators.required]],
      regimen: ['', [Validators.required]],
      adunasDeEntradas: ['', [Validators.required]],
      aeropuerto: [false, [Validators.required]],
      publico: ['no', [Validators.required]],
      representanteRfc: ['', [Validators.required]],
      representanteNombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
    });

    this.datosSolicitudForm.statusChanges.pipe(
      tap((form) => {
      if (form) {
        this.datosSolicitudForm.patchValue({
          representanteNombre: '',
          apellidoPaterno: '',
          apellidoMaterno: ''
        });
      }
    })).subscribe();
  }

    /**
     * Valida si el campo de un formulario no contiene errores
     * @param {AbstractControl} control  : Control del formulario
     * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
     * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
     */
    // eslint-disable-next-line class-methods-use-this
    public isValid(control: AbstractControl, campo?: string): boolean | null {
      if (control instanceof FormGroup && campo) {
        return control.controls[campo].errors && control.controls[campo].touched;
      }
      return control.errors && control.touched;
    }

    manifestoSellecionado(): void {
      this.manifiestosCasillaDeVerificacion = !this.manifiestosCasillaDeVerificacion;
    }

  buscarRepresentanteRfc(): void {
   const RFC = this.datosSolicitudForm.get('representanteRfc')?.value;
      if (RFC) {
        this.datosSolicitudForm.patchValue({
          representanteNombre: 'EUROFOODS DE MEXICO',
          apellidoPaterno: 'GONZALEZ',
          apellidoMaterno: 'PINAL'
        });
      }
  }
  
}
