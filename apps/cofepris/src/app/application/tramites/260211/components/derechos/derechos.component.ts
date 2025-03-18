import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Catalogo, TituloComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { SanitarioService } from '../../services/sanitario.service';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud260211State, } from '../../../../estados/tramites/sanitario260211.store';

import { Sanitario260211Store } from '../../../../estados/tramites/sanitario260211.store';

import { Permiso260211Query } from '../../../../estados/queries/permiso260211.query';



@Component({
  selector: 'app-derechos',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent],
  templateUrl: './derechos.component.html',
  styleUrl: './derechos.component.css',
})
export class DerechosComponent implements OnInit, OnDestroy {
 derechosForm!:FormGroup;
 private destroyNotifier$: Subject<void> = new Subject();
  private destroyed$ = new Subject<void>();
  public derechosList!: Catalogo[];
  public solicitudState!: Solicitud260211State;
  
  constructor(private fb: FormBuilder,private service:SanitarioService,
    private sanitario260211Store: Sanitario260211Store,
        private permiso260211Query: Permiso260211Query
  ){}

  ngOnInit(): void {

     this.permiso260211Query.selectSolicitud$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.solicitudState = seccionState;
            })
          )
          .subscribe();
    this.derechosForm = this.fb.group({ 
      referencia:[this.solicitudState?.referencia],
      Chandenadependencia:[this.solicitudState?.Chandenadependencia],
      Llave:[this.solicitudState?.Llave],
      benco:[this.solicitudState?.benco],
      deFetch:[this.solicitudState?.deFetch],
      importe:[this.solicitudState?.importe],

});
this.loadComboUnidadMedida();
}

  loadComboUnidadMedida(): void {
    this.service.getDatos().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.derechosList = data as Catalogo[];
    });
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Sanitario260211Store): void {
      const valor = form.get(campo)?.value;
      (this.sanitario260211Store[metodoNombre] as (value: any) => void)(valor);
    }

ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
 
}

