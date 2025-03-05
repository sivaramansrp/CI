import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CatalogosSelect } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { HttpCoreService } from 'libs/shared/data-access-user/src/core/services/shared/http/http.service';
import { ValidacionesFormularioService } from 'libs/shared/data-access-user/src/core/services/shared/validaciones-formulario/validaciones-formulario.service';

import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';


import { MediodetransporteService } from 'libs/shared/data-access-user/src/core/services/220402/medio-de-transporte.service';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
})
export class TransporteComponent implements OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  transporteForm!: FormGroup;
  public tiposDocumentos: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * constructor de la clase
   * Fetch the fetchTiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private httpCoreService: HttpCoreService,
    private mediodetransporteService: MediodetransporteService
  ) {
    this.fetchTiposDocumentos();
    this.crearFormTransporte();
  }

  /**
   * Este método se utiliza para crear la forma del transporte. - 220401
   */
  crearFormTransporte() {
    this.transporteForm = this.fb.group({
      mediodeTransporte: ['', [Validators.required]],
      identificaciónDelTransporte: [''],
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
  fetchTiposDocumentos(): void {
    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.tiposDocumentos.catalogos = data as Catalogo[];
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
} // Initialize any properties or start any processes here
