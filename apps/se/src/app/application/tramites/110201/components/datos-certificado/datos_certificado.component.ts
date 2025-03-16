import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CatalogosSelect, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { RegistroService } from '../../services/registro.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { Solicitud110201State, Tramite110201Store } from '../../state/Tramite110201.store';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './datos_certificado.component.html',
  styleUrl: './datos_certificado.component.css',
})
export class DatosCertificadoComponent implements OnInit {
   registroForm!: FormGroup;
  idioma!: CatalogosSelect;
  entidad!: CatalogosSelect;
  representacion!: CatalogosSelect;
   public solicitudState!: Solicitud110201State;
    private destroyNotifier$: Subject<void> = new Subject();

  constructor(private registroService: RegistroService,
     private fb: FormBuilder,
     private store: Tramite110201Store,
        private query: Tramite110201Query,
        private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.getIdioma();
    this.getEntidad();
    this.getRepresentacion();
    this.query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe();
  this.donanteDomicilio();
  }

  getIdioma(): void {
    this.registroService.getIdioma().subscribe((resp) => {
      if (resp.code === 200) {
        const response = resp.data;

        this.idioma = {
          labelNombre: 'Idioma',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        };
      }
    });
  }
  getEntidad(): void {
    this.registroService.getEntidad().subscribe((resp) => {
      if (resp.code === 200) {
        const response = resp.data;

        this.entidad = {
          labelNombre: 'Entidad federativa',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        };
      }
    });
  }
  getRepresentacion(): void {
    this.registroService.getRepresentacion().subscribe((resp) => {
      if (resp.code === 200) {
        const response = resp.data;

        this.representacion = {
          labelNombre: 'Representación federal',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        };
      }
    });
  }
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  get validacionForm(): FormGroup {
    return this.registroForm.get('validacionForm') as FormGroup;
  }
  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      
    });
  }
}
