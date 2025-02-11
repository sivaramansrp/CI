import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';

import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { HttpCoreService } from '../../../../core/services/shared/http/http.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';

/**
 * Este componente se utiliza para mostrar la forma del transporte. - 220401
 * @param transporteForm: Forma del transporte
 * @returns Validations of the form
 */
@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html'
})

export class TransporteComponent implements OnDestroy {
  /**
   * Esta variable se utiliza para destruir la suscripción.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Esta variable se utiliza para crear la forma del transporte.
   */
  transporteForm!: FormGroup;

  public tiposDocumentos: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  }
  /**
   * constructor de la clase
   * Fetch the fetchtiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private httpCoreService: HttpCoreService
  ) {
    this.fetchtiposDocumentos();
    this.crearFormTransporte();
  }

  /**
   * Este método se utiliza para crear la forma del transporte. - 220401
   */
  crearFormTransporte() {
    this.transporteForm = this.fb.group({
      mediodeTransporte: ['', [Validators.required]],
      identificationDelTransporte: [''],
      numerodeContenedor: [''],
      fetchdeEmbarque: [''],
      numerodeFlejes: ['']
    });
  }

  /**
   * Este método se utiliza para validar la forma del transporte. - 220401
   * @param form: Forma del transporte
   * @param field: campo del formulario
   * @returns Validaciones del formulario
   */
  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Este método se utiliza para marcar los controles del formulario como tocados. - 220401
   */
  validarTransporteFormulario() {
    if (this.transporteForm.invalid) {
      this.transporteForm.markAllAsTouched();
      return;
    }
  }
/**
 * Este método se utiliza para obtener los datos de los medios de transporte.
 */
  fetchtiposDocumentos() {
    this.httpCoreService.get('./../../../../../../assets/json/220401/mediodetransporte.json').pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.tiposDocumentos['catalogos'] = data as Catalogo[];
    });
  }
  /**
   * Este método se utiliza para destruir la suscripción.
   * @returns destroyed$
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}