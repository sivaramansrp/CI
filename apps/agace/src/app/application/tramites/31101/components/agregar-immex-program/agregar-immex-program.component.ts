import { AGREGAR_IMMEX_CONFIGURACION } from '../../constants/solicitud.enum';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosGeneralesDeLaSolicitudCatologo } from '../../models/solicitud.model';
import { Domicilios } from '../../models/solicitud.model';
import { EntidadFederativa } from '../../models/solicitud.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-agregar-immex-program',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './agregar-immex-program.component.html',
  styleUrl: './agregar-immex-program.component.scss',
})
export class AgregarImmexProgramComponent implements OnDestroy {
  agregarImmexProgramForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;
  agregarImmexProgramConfiguracionColumnas: ConfiguracionColumna<EntidadFederativa>[] =
    AGREGAR_IMMEX_CONFIGURACION;
  @Output() agregarImmexValor = new EventEmitter<Domicilios>();
  domiciliosDatos: EntidadFederativa[] = [] as EntidadFederativa[];
  entidadFederativa: CatalogosSelect = {} as CatalogosSelect;
  domicilioslista: EntidadFederativa[] = [] as EntidadFederativa[];
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService
  ) {
    this.conseguirDatosGeneralesCatologo();
    this.conseguirEntidadFederativaDatos();
  }

  conseguirDatosGeneralesCatologo(): void {
    this.solicitudService
      .conseguirDatosGeneralesCatologo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudCatologo) => {
          this.entidadFederativa = respuesta.entidadFederativa;
        },
      });
  }

  seleccionArentidadFederativa(evento: Catalogo): void {
    this.domicilioslista = this.domiciliosDatos;
  }

  agregarImmexProgram(): void {
    const VALOR = {
      instalacionPrincipal: '',
      cveTipoInstalacion: '',
      tipoInstalacion: '',
      cveEntidadFederativa: this.domicilioslista[0].cveEntidadFederativa,
      entidadFederativa: '',
      cveDelegacionMunicipio: '',
      municipioDelegacion: this.domicilioslista[0].municipioDelegacion,
      direccion: this.domicilioslista[0].direccion,
      codigoPostal: this.domicilioslista[0].codigoPostal,
      registroSESAT: this.domicilioslista[0].registroSESAT,
      procesoProductivo: '',
      fechaModificacion: '',
      cveEstatus: '',
      estatus: '',
      noExterior: '',
      noInterior: '',
      cveColonia: '',
      calle: '',
      descCol: '',
      idRecinto: '',
      numFolioAcuse: '',
      observaciones: '',
    };
    this.agregarImmexValor.emit(VALOR);
  }

  conseguirEntidadFederativaDatos(): void {
    this.solicitudService
      .conseguirEntidadFederativaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: EntidadFederativa[]) => {
          this.domiciliosDatos = respuesta;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
