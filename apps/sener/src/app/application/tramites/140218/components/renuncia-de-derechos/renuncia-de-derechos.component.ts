import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { MANIFIESTO_ACEPTACION_HTML } from '../../constantes/renuncia-de-permiso.enum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosSolicitudState, Tramite140218Store } from '../../estados/store/tramite140218.store';
import renuncia from '@libs/shared/theme/assets/json/140218/renuncia.json'
import { Tramite140218Query } from '../../estados/query/tramite140218.query';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-renuncia-de-derechos',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './renuncia-de-derechos.component.html',
  styleUrl: './renuncia-de-derechos.component.scss',
})
export class RenunciaDeDerechosComponent implements OnInit{
  renunciaDerechosForm!: FormGroup;
  manifestoText = MANIFIESTO_ACEPTACION_HTML;

  private destroyNotifier$: Subject<void> = new Subject();
  
  public solicitudState!: DatosSolicitudState;
  constructor(
    private formBuilder: FormBuilder,
    private tramite140218Store: Tramite140218Store,
    private tramite140218Query: Tramite140218Query
  ) {
    //Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  ngOnInit(): void {
    this.crearAgregarFormulario();
  }

  crearAgregarFormulario(){
    this.tramite140218Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState as DatosSolicitudState;
      })
    )
    .subscribe();
    this.renunciaDerechosForm = this.formBuilder.group({
      folioTramite: [this.solicitudState.folioTramite],
      tipoSolicitud:[this.solicitudState.tipoSolicitud],
      regimen:[this.solicitudState.regimen],
      clasificacionRegimen:[this.solicitudState.clasificacionRegimen],
      periodoVigencia:[this.solicitudState.periodoVigencia],
      unidadMedida:[this.solicitudState.unidadMedida],
      fraccionArancelaria:[this.solicitudState.fraccionArancelaria],
      cantidadAutorizada:[this.solicitudState.cantidadAutorizada],
      valorAutorizado:[this.solicitudState.valorAutorizado],
      nico:[this.solicitudState.nico],
      descripcionNico:[this.solicitudState.descripcionNico],
      acotacion:[this.solicitudState.acotacion],
      permisoDesde:[this.solicitudState.permisoDesde],
      permisoHasty:[this.solicitudState.permisoHasty],
      motivoRenuncia:[]
    });

    this.renunciaDerechosForm.get('permisoHasty')?.disable();
    this.renunciaDerechosForm.get('folioTramite')?.disable();
    this.renunciaDerechosForm.get('tipoSolicitud')?.disable();
    this.renunciaDerechosForm.get('regimen')?.disable();
    this.renunciaDerechosForm.get('clasificacionRegimen')?.disable();
    this.renunciaDerechosForm.get('periodoVigencia')?.disable();
    this.renunciaDerechosForm.get('unidadMedida')?.disable();
    this.renunciaDerechosForm.get('fraccionArancelaria')?.disable();
    this.renunciaDerechosForm.get('cantidadAutorizada')?.disable();
    this.renunciaDerechosForm.get('valorAutorizado')?.disable();
    this.renunciaDerechosForm.get('nico')?.disable();
    this.renunciaDerechosForm.get('descripcionNico')?.disable();
    this.renunciaDerechosForm.get('acotacion')?.disable();
    this.renunciaDerechosForm.get('permisoDesde')?.disable();

    this.renunciaDerechosForm.get('permisoHasty')?.setValue(renuncia.formData.permisoHasty);
    this.renunciaDerechosForm.get('folioTramite')?.setValue(renuncia.formData.folioTramite);
    this.renunciaDerechosForm.get('tipoSolicitud')?.setValue(renuncia.formData.tipoSolicitud);
    this.renunciaDerechosForm.get('regimen')?.setValue(renuncia.formData.regimen);
    this.renunciaDerechosForm.get('clasificacionRegimen')?.setValue(renuncia.formData.clasificacionRegimen);
    this.renunciaDerechosForm.get('periodoVigencia')?.setValue(renuncia.formData.periodoVigencia);
    this.renunciaDerechosForm.get('unidadMedida')?.setValue(renuncia.formData.unidadMedida);
    this.renunciaDerechosForm.get('fraccionArancelaria')?.setValue(renuncia.formData.fraccionArancelaria);
    this.renunciaDerechosForm.get('cantidadAutorizada')?.setValue(renuncia.formData.cantidadAutorizada);
    this.renunciaDerechosForm.get('valorAutorizado')?.setValue(renuncia.formData.valorAutorizado);
    this.renunciaDerechosForm.get('nico')?.setValue(renuncia.formData.nico);
    this.renunciaDerechosForm.get('descripcionNico')?.setValue(renuncia.formData.descripcionNico);
    this.renunciaDerechosForm.get('acotacion')?.setValue(renuncia.formData.acotacion);
    this.renunciaDerechosForm.get('permisoDesde')?.setValue(renuncia.formData.permisoDesde);
    this.updateStoreWithFormData();
  }

  private updateStoreWithFormData(): void {
    const UPDATE_PAGO_FORM: DatosSolicitudState = {
      ...this.solicitudState,
      permisoHasty: this.renunciaDerechosForm.get('permisoHasty')?.value,
      folioTramite: this.renunciaDerechosForm.get('folioTramite')?.value,
      tipoSolicitud: this.renunciaDerechosForm.get('tipoSolicitud')?.value,
      regimen: this.renunciaDerechosForm.get('regimen')?.value,
      clasificacionRegimen: this.renunciaDerechosForm.get('clasificacionRegimen')?.value,
      periodoVigencia: this.renunciaDerechosForm.get('periodoVigencia')?.value,
      unidadMedida: this.renunciaDerechosForm.get('unidadMedida')?.value,
      fraccionArancelaria: this.renunciaDerechosForm.get('fraccionArancelaria')?.value,
      cantidadAutorizada: this.renunciaDerechosForm.get('cantidadAutorizada')?.value,
      valorAutorizado: this.renunciaDerechosForm.get('valorAutorizado')?.value,
      nico: this.renunciaDerechosForm.get('nico')?.value,
      descripcionNico: this.renunciaDerechosForm.get('descripcionNico')?.value,
      acotacion: this.renunciaDerechosForm.get('acotacion')?.value,
      permisoDesde: this.renunciaDerechosForm.get('permisoDesde')?.value,
    };
    this.tramite140218Store.update(UPDATE_PAGO_FORM);
  }
}
