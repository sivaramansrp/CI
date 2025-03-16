import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';
import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { Solicitud110201State, Tramite110201Store } from '../../state/Tramite110201.store';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.css',
})
export class DestinatarioComponent implements OnInit {
 registroForm!: FormGroup;
  pais!: CatalogosSelect;
  transporte!: CatalogosSelect;
   public solicitudState!: Solicitud110201State;
    private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private registroService: RegistroService,
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
    this.registroForm = this.fb.group({
      pais: [''],
      transporte: [''],
    });
    this.getPaisDestino();
    this.getTransporte();

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

  getPaisDestino(): void {
    this.registroService.getPaisDestino().subscribe((resp) => {
      if (resp.code === 200) {
        const response = resp.data;

        this.pais = {
          labelNombre: 'País destino',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        };
      }
    });
  }

  getTransporte(): void {
    this.registroService.getTransporte().subscribe((resp) => {
      if (resp.code === 200) {
        const response = resp.data;

        this.transporte = {
          labelNombre: 'Medio de transporte',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: response,
        };
      }
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
    }
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
