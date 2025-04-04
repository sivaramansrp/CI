/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CatalogosSelect, TituloComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
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

    public bancoData: CatalogosSelect = {
      labelNombre: 'Banco',
      required: true,
      primerOpcion: 'seleccione una opción',
      catalogos: [],
    };
  
constructor(private registrarsolicitudmcp: RegistrarSolicitudMcpService, private fb: FormBuilder, private cdr: ChangeDetectorRef){}
   
    ngOnInit(): void{
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
          clavedereferencia: ['',Validators.required],
          cadenadeladependencia: ['',Validators.required],
          banco: ['', Validators.required],
          llavedepago: ['',Validators.required],
          fechadepago: ['',Validators.required],
          importedepago: ['',Validators.required]
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

    ngOnDestroy(): void {
      this.destroyed$.next(true);
      this.destroyed$.complete();
    }
}
