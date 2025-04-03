import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { Subject, takeUntil } from 'rxjs';
import { DatosDelTramite } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { OPCIONES_PRODUCTO_RADIO, OPCIONES_SOLICITUD_DE_RADIO } from '@libs/shared/data-access-user/src/core/enums/130301/modificacion.enum';

@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent
  ],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.css',
})
export class DatosDelTramiteComponent implements OnInit,OnDestroy {
  
  /**
   * Opciones de botón de radio.
   */
  radioOpcions = OPCIONES_SOLICITUD_DE_RADIO;

  productoRadioOpcions = OPCIONES_PRODUCTO_RADIO;


  datosDelTramite!:FormGroup
  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  delTramiteFormDatos:DatosDelTramite[] = []
  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
  ) {}
  ngOnInit(): void {
    this.obtenerFormDatos()
    this.datosDelTramite = this.fb.group({
      numeroFolioTramiteOriginal:[{value:'',disabled:true}],
      solicitudOpcion:[{value:'',disabled:true}],
      regimen:[{value:'',disabled:true}],
      clasificacionDelRegimen:[{value:'',disabled:true}],
      productoOpcion:[{value:'',disabled:true}],
      descripcionMercancia:[{value:'',disabled:true}],
      fraccionArancelaria:[{value:'',disabled:true}],
      umt:[{value:'',disabled:true}],
      cantidad:[{value:'',disabled:true}],
      valorFactura:[{value:'',disabled:true}],
    })
  }

  obtenerFormDatos(): void {
    this.service
      .obtenerDelTramiteFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.delTramiteFormDatos = data?.data;
        this.datosDelTramite.patchValue({
          numeroFolioTramiteOriginal: this.delTramiteFormDatos[0].numeroFolioTramiteOriginal,
          solicitudOpcion:this.delTramiteFormDatos[0].solicitudOpcion,
          regimen:this.delTramiteFormDatos[0].regimen,
          clasificacionDelRegimen:this.delTramiteFormDatos[0].clasificacionDelRegimen,
          productoOpcion:this.delTramiteFormDatos[0].productoOpcion,
          descripcionMercancia:this.delTramiteFormDatos[0].descripcionMercancia,
          fraccionArancelaria:this.delTramiteFormDatos[0].fraccionArancelaria,
          umt:this.delTramiteFormDatos[0].umt,
          cantidad:this.delTramiteFormDatos[0].cantidad,
          valorFactura:this.delTramiteFormDatos[0].valorFactura
        });
      });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
