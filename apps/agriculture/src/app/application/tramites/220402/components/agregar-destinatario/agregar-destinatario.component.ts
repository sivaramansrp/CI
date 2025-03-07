import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogosSelect } from 'libs/shared/data-access-user/src/core/models/shared/components.model';

import { TipoPersona } from 'libs/shared/data-access-user/src/core/enums/tipoPersona.enum';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { MediodetransporteService } from 'libs/shared/data-access-user/src/core/services/220402/mediodetransporte.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-agregar-destinatario',
  templateUrl: './agregar-destinatario.component.html',
  styleUrl: './agregar-destinatario.component.scss',
})
export class AgregarDestinatarioComponent implements OnDestroy, OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public pais!: CatalogosSelect;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public fisica: boolean = true;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public moral: boolean = false;

  options!: Catalogo[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public tiposDocumentos: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  constructor(private mediodetransporteService: MediodetransporteService) {
    this.fetchTiposDocumentos()
  }
  ngOnInit(): void {
    this.inicializaCatalogos();
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
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.options = data as Catalogo[];
      });
  }
  /**
   *
   * @param  checkBoxName, que acepta datos de tipo cadena
   * @description inputChecked se utiliza para verificar si el checkbox está seleccionado
   */
  inputChecked(checkBoxName: string): void {
    if (checkBoxName === TipoPersona.FISICA) {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
