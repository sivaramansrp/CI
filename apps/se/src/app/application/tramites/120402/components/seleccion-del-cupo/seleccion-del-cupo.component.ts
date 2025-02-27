import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import regimenValues from 'libs/shared/theme/assets/json/220201/regimen.json';
import tratdosValues from 'libs/shared/theme/assets/json/110101/tratdos-dropdown.json';
import nombreValues from 'libs/shared/theme/assets/json/220202/nombre.json';
import subproductoValues from 'libs/shared/theme/assets/json/220202/nombre.json';

import { DescripcionDelCupoService } from 'libs/shared/data-access-user/src/core/services/120402/descripcion-del-cupo/descripcion-del-cupo.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-seleccion-del-cupo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    NgIf
  ],
  templateUrl: './seleccion-del-cupo.component.html',
  styleUrls: ['./seleccion-del-cupo.component.scss'],
})
export class SeleccionDelCupoComponent implements OnInit, OnDestroy {
  seleccionForm!: FormGroup;

  regimen: Catalogo[] = regimenValues.data;
  tratado: Catalogo[] = tratdosValues.tratado;
  producto: Catalogo[] = nombreValues.data;
  subproducto: Catalogo[] = subproductoValues.data;

  seleccionDelCupo: any;
  private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder, private service: DescripcionDelCupoService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSeleccionDelCupo();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initializeForm(): void {
    this.seleccionForm = this.fb.group({
      regimen: ['', Validators.required],
      tratado: ['', Validators.required],
      producto: ['', Validators.required],
      subproducto: ['', Validators.required],
    });
  }

  public regimenOnChange(event: Event): void {
    // Handle regimen change
  }

  public tratadoOnChange(event: Event): void {
    // Handle tratado change
  }

  public productoOnChange(event: Event): void {
    // Handle producto change
  }

  public subproductoOnChange(event: Event): void {
    // Handle subproducto change
  }

    loadSeleccionDelCupo() {
      this.service
        .getSeleccionDelCupo()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {      
          this.seleccionDelCupo = data;
          console.log(this.seleccionDelCupo, 'table json');
          
        });
    }
}
