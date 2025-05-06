import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, REGISTRAR_PROVEEDORES_DE_TABLA, REGISTRAR_PROVEEDORES_MANUAL_DE_TABLA } from '../../constants/proveedores.enum';
import { DatosDelRegistrar, DatosDelRegistrarManual } from '../../models/proveedores.model';
import { Subject, takeUntil } from 'rxjs';
import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Tramite420101Query } from '../../estados/tramite420101Query.query';
import { Tramite420101Store } from '../../estados/tramite420101Store.store';

@Component({
  selector: 'app-registrar-de-proveedores',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './registrar-de-proveedores.component.html',
  styleUrl: './registrar-de-proveedores.component.scss',
})
export class RegistrarDeProveedoresComponent implements OnInit, OnDestroy {

  datosTabla: DatosDelRegistrar[] = [];

  datosProveedoresManual: DatosDelRegistrarManual[] = [];

  configuracionTablaRegistrar: ConfiguracionColumna<DatosDelRegistrar>[] = REGISTRAR_PROVEEDORES_DE_TABLA;

  configuracionTablaRegistrarManual: ConfiguracionColumna<DatosDelRegistrarManual>[] = REGISTRAR_PROVEEDORES_MANUAL_DE_TABLA;

  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tramite420101Query: Tramite420101Query,
    private tramite420101Store: Tramite420101Store,
  ) { }

  ngOnInit(): void {
    this.tramite420101Query.getDatosProveedoresManual$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: DatosDelRegistrarManual[]) => {
        this.datosProveedoresManual = datos;
      });
  }

  analizarGramaticalmenteCSV(csv: string): void {
    const LINES = csv.split('\n').filter(line => line.trim() !== '');
    const HEADERS = LINES[0].split(',');
    const HEADER_MAP: { [key: string]: string } = {
      'Id': 'id',
      'RFC': 'rfc',
      'Denominación o razón social': 'razonSocial',
      'Nombre completo ': 'nombreCompleto',
      'Domicilio fiscal': 'domicilioFiscal',
      'Norma': 'norma',
      'Número de programa IMMEX': 'numeroProgramaIMMEX',
      'Número de programa PROSEC': 'numeroProgramaPROSEC',
      'Aduana en las que opera': 'aduanasOpera',
    };
    const DATA = LINES.slice(1).map((line) => {
      const VALUES = line.split(',');
      const OBJ: { [key: string]: string } = {};
      HEADERS.forEach((header, index) => {
        const KEY = HEADER_MAP[header.trim()] || header.trim();
        OBJ[KEY] = VALUES[index]?.trim();
      });
      return OBJ;
    });

    this.datosTabla = DATA.map(item => ({
      id: parseInt(item['id'], 10) || 0,
      rfc: item['rfc'] || '-',
      razonSocial: item['razonSocial'] || '-',
      nombreCompleto: item['nombreCompleto'] || '-',
      domicilioFiscal: item['domicilioFiscal'] || '-',
      norma: item['norma'] || '-',
      numeroProgramaIMMEX: item['numeroProgramaIMMEX'] || '-',
      numeroProgramaPROSEC: item['numeroProgramaPROSEC'] || '-',
      aduanasOpera: item['aduanasOpera'] || '-',
    }));
  }

  archivo(): void {
    const FILE_INPUT = document.getElementById(
      'cargarArchivo'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      const READER = new FileReader();
      READER.onload = (e): void => {
        const TEXT = e.target?.result as string;
        this.analizarGramaticalmenteCSV(TEXT);
      };
      READER.readAsText(FILE);
    }
  }

  navigateRegistroProveedoresManual(): void {
    this.router.navigate(['..', 'registro-de-proveedores-manual'], {
      relativeTo: this.activatedRoute,
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }


}
