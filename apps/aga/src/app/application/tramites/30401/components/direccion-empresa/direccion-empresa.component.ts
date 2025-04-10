import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Tramite30401Store } from '../../estados/tramites30401.store';

@Component({
  selector: 'app-direccion-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  templateUrl: './direccion-empresa.component.html',
  styleUrl: './direccion-empresa.component.scss',
})
export class DireccionEmpresaComponent implements OnInit {
  inicializarFormulario!: FormGroup;
  @Input() entidadFederativaList$!: Observable<Catalogo[]>;
  @Input() delegacionMunicipioList$!: Observable<Catalogo[]>;
  @Input() coloniaList$!: Observable<Catalogo[]>;
  @Input() grupoDeFormulario!:string;
  @Input() titulo!:string;

constructor(
    public grupoDeFormaRaiz: FormGroupDirective,
    private tramite30401Store: Tramite30401Store,
  ) {
     // No se necesita lógica de inicialización adicional.
  }

  ngOnInit(): void {
    this.inicializarFormulario = this.grupoDeFormaRaiz.control.get(this.grupoDeFormulario) as FormGroup;
  }

  /**
     * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
     * @param form - El formulario reactivo.
     * @param campo - El nombre del campo en el formulario.
     */
  setValoresStore(form: FormGroup, campo: string) :void{
    const VALOR = form.get(campo)?.value;
    this.tramite30401Store.establecerDatos({ [campo]: VALOR });
  }
      /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.inicializarFormulario.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }
}
