/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CatalogosSelect, TituloComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { map, ReplaySubject, takeUntil } from 'rxjs';
import { Solicitud260702Query } from '../../estados/tramites260702.query';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { Solicitud260702State, Solicitud260702Store } from '../../estados/tramites260702.store';

@Component({
  selector: 'app-pago-de-derecho',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TituloComponent,CatalogoSelectComponent],
  templateUrl: './pago-de-derecho.component.html',
  styleUrls: ['./pago-de-derecho.component.css'],
})
export class PagoDeDerechoComponent implements OnInit,OnDestroy {
  pagoDeDerechosForm!: FormGroup;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    pagoDeDerechosState!: Solicitud260702State;

    public bancoData: CatalogosSelect = {
      labelNombre: 'Banco',
      required: true,
      primerOpcion: 'seleccione una opción',
      catalogos: [],
    };
  
constructor(private registrarsolicitudmcp: RegistrarSolicitudMcpService,
   private fb: FormBuilder, 
   private cdr: ChangeDetectorRef,
   private solicitud260702Store: Solicitud260702Store,
   private solicitud260702Query: Solicitud260702Query){}
   
    ngOnInit(): void{
      this.solicitud260702Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.pagoDeDerechosState = seccionState;
        })
      )
      .subscribe();

      this.createForm();
        this.getBancoData();
    }
  
    getBancoData(){
      this.registrarsolicitudmcp.getBancoData()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((data) => {
              this.bancoData.catalogos = data as Catalogo[];
            });
    }

    createForm(){
      this.pagoDeDerechosForm = this.fb.group({
        pagoDeDerechos: this.fb.group({
          clavedereferencia: [this.pagoDeDerechosState?.clavedereferencia,Validators.required],
          cadenadeladependencia: [this.pagoDeDerechosState?.cadenadeladependencia,Validators.required],
          banco: [this.pagoDeDerechosState?.banco, Validators.required],
          llavedepago: [this.pagoDeDerechosState?.llavedepago,Validators.required],
          fechadepago: [this.pagoDeDerechosState?.fechadepago,Validators.required],
          importedepago: [this.pagoDeDerechosState?.importedepago,Validators.required]
        }),
      });
    }

    clearForm(): void {
     this.pagoDeDerechosForm.reset();
    //  this.pagoDeDerechosForm.patchValue({
    //   pagoDeDerechos: {
    //     banco: 'seleccione una opción', // or the desired default value
    //   },
    // });
    }
    get pagoDeDerechos(): FormGroup {
      return this.pagoDeDerechosForm.get('pagoDeDerechos') as FormGroup;
    }
  
    setValoresStore(
      form: FormGroup,
      campo: string,
      metodoNombre: keyof Solicitud260702Store
    ): void {
      const VALOR = form.get(campo)?.value;
      (this.solicitud260702Store[metodoNombre] as (value: any) => void)(VALOR);
    }
  

    ngOnDestroy(): void {
      this.destroyed$.next(true);
      this.destroyed$.complete();
    }
}
