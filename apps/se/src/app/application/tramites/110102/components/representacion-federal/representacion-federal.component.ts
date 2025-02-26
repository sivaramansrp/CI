import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { BtnContinuarComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component";
import { Catalogo, CatalogoSelectComponent, DatosPasos, TituloComponent } from '@ng-mf/data-access-user';
import { RepresentacionFederalService } from 'libs/shared/data-access-user/src/core/services/110102/representacionfederal.service';






@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, BtnContinuarComponent],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.scss',
})
export class RepresentacionFederalComponent implements OnInit {
  formularioRepresentacionFederalForm: FormGroup;
  entidadesFrontera: Catalogo[] = [];
  representacionFederalOptions: Catalogo[] = [];
  private destroyed$ = new Subject<void>();
  btnData:DatosPasos={
    txtBtnSig: 'Continuar',
    txtBtnAnt: '',
    indice: 1,
    nroPasos: 0
  }

  constructor(
    private fb: FormBuilder,private service:RepresentacionFederalService)
   {
    this.formularioRepresentacionFederalForm = this.fb.group({
      solicitudEntidadFederativaEntidadClave: ['', Validators.required],
      unidadAdministrativaClave: ['',Validators.required]
    });
  }

  ngOnInit(): void {
 
    this.cargarEntidadesFrontera();
      const ENTIDAD = "-1";
      const REPRESENTACIONFEDERAL = "-1";

      if (ENTIDAD !== "-1") {
        this.recuperarRepresentacionFederalSE(ENTIDAD);
        this.formularioRepresentacionFederalForm.get('unidadAdministrativaClave')?.setValue(REPRESENTACIONFEDERAL);
      } else {
        this.representacionFederalOptions = [];
      }
    }
  



  cargarEntidadesFrontera(): void {
    this.service.getEntidadFederativa().pipe(
      takeUntil(this.destroyed$)).subscribe(
        (data)=>{
            this.entidadesFrontera=data
        }
      )
  }

  onEntidadFederativaChange(valor: any): void {
    if (valor !== '-1') {
      this.recuperarRepresentacionFederalSE(valor.id);
    } else {
      this.representacionFederalOptions = [];
    }
  }

  recuperarRepresentacionFederalSE(entidadFederativa: string): void {
    this.service.getRepresentacionfederal(entidadFederativa).pipe(
      takeUntil(this.destroyed$)).subscribe(
        (data)=>{
            this.representacionFederalOptions=data
        }
      )
  }

 
}
