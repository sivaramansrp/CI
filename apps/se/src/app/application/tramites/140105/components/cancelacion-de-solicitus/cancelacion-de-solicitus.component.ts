import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Cancelacion } from '../../models/cancelacion-de-solicitus.model';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import * as formData from '../../constants/datos-del-formulario.json';
@Component({
  selector: 'app-cancelacion-de-solicitus',
  templateUrl: './cancelacion-de-solicitus.component.html',
  styleUrl: './cancelacion-de-solicitus.component.scss',
})
export class CancelacionDeSolicitusComponent implements OnInit {
  solicitudForm?: FormGroup;
  public cancelacionForm!: FormGroup;
  configuracionColumnasoli: ConfiguracionColumna<Cancelacion>[] = [
    { encabezado: 'Folio trámite', clave: (fila) => fila.folioTramite, orden: 1 },
    { encabezado: 'Tipo solicitud', clave: (fila) => fila.tipoDeSolicitud, orden: 2 },
    { encabezado: 'Régimen', clave: (fila) => fila.regimen, orden: 3 },
    { encabezado: 'Clasificación régimen', clave: (fila) => fila.cdr, orden: 4 },
    { encabezado: 'Condición de la mercancía', clave: (fila) => fila.condicionDeLaMercancia, orden: 5 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 6 },
    { encabezado: 'Unidad de medida', clave: (fila) => fila.umt, orden: 7 },
    { encabezado: 'Cantidad solicitada', clave: (fila) => fila.cantidad, orden: 8 },
    { encabezado: 'Valor solicitado', clave: (fila) => fila.usd, orden: 9 },
  ];
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.CHECKBOX;
  cuerpoTabla: Cancelacion[] = [];
  public datosDePermiso: boolean = false;

  constructor(private fb: FormBuilder, private servicioDeMensajesService: ServicioDeMensajesService) { }
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
    this.cancelacionForm = this.fb.group({
      motivoCancelacion: ['', Validators.required],
    });

    this.servicioDeMensajesService.datos$.subscribe((datos) => {
      this.datosDePermiso = datos;
      if (this.datosDePermiso) {
        this.cuerpoTabla = [formData as Cancelacion];
      }
    });

  }

  ngOnDestroy() {
    this.servicioDeMensajesService.establecerDatosDePermiso(false);
  }

  public busqueda(event: any): void {
    this.servicioDeMensajesService.enviarMensaje(true);
  }
  public eliminarRegistro(event: any): void {
    this.cuerpoTabla = [];
  }


}
