import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Cancelacion } from '../../models/cancelacion-de-solicitus.model';

@Component({
  selector: 'app-cancelacion-de-solicitus',
  templateUrl: './cancelacion-de-solicitus.component.html',
  styleUrl: './cancelacion-de-solicitus.component.scss',
})
export class CancelacionDeSolicitusComponent implements OnInit {
  solicitudForm?: FormGroup;
  configuracionColumnasoli: ConfiguracionColumna<Cancelacion>[] = [
    { encabezado: 'Folio trámite', clave: (fila) => fila.folioTramite, orden: 1 },
    { encabezado: 'Tipo solicitud', clave: (fila) => fila.tipoSolicitud, orden: 2 },
    { encabezado: 'Régimen', clave: (fila) => fila.regimen, orden: 3 },
    { encabezado: 'Clasificación régimen', clave: (fila) => fila.clasificacionRegimen, orden: 4 },
    { encabezado: 'Condición de la mercancía', clave: (fila) => fila.condicionMercancia, orden: 5 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 6 },
    { encabezado: 'Unidad de medida', clave: (fila) => fila.unidadMedida, orden: 7 },
    { encabezado: 'Cantidad solicitada', clave: (fila) => fila.cantidadSolicitada, orden: 8 },
    { encabezado: 'Valor solicitado', clave: (fila) => fila.valorSolicitado, orden: 9 },
  ];
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.CHECKBOX;
  cuerpoTabla: Cancelacion[] = [];

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      folioTramite: ['', Validators.required],
      tipoSolicitud: ['', Validators.required],
      regimen: ['', Validators.required],
      clasificacionRegimen: ['', Validators.required],
      condicionMercancia: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      cantidadSolicitada: ['', [Validators.required]],
      valorSolicitado: ['', [Validators.required]],
    });
  }

}
