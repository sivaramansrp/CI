import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite630307Query } from '../../estados/tramite630307.query';
import { Tramite630307Store } from '../../estados/tramite630307.store';



@Component({
  selector: 'app-datos-mercancia-importacion-temporal',
  standalone: true,
  imports: [CommonModule,TituloComponent, ReactiveFormsModule,],
  templateUrl: './datos-mercancia-importacion-temporal.component.html',
  styleUrl: './datos-mercancia-importacion-temporal.component.scss',
})
export class DatosMercanciaImportacionTemporalComponent implements OnInit, OnDestroy{
  importacionTemporaldeMercancias!: FormGroup; 
  marca$: Observable<string | null> = this.tramite630307Query.marca$;
 
  modelo$: Observable<string | null> = this.tramite630307Query.modelo$;

  numeroDeSerie$: Observable<string | null> = this.tramite630307Query.numeroDeSerie$;
 
  numeroDeMotor$: Observable<string | null> = this.tramite630307Query.numeroDeMotor$;

  descripcionAdicionalDeLaMercancia$: Observable<string | null> = this.tramite630307Query.descripcionAdicionalDeLaMercancia$;
 
  motivooJustificacionDeLaImportacionTemporal$: Observable<string | null> = this.tramite630307Query.motivooJustificacionDeLaImportacionTemporal$;

  private destroyed$ = new Subject<void>();
  
 constructor(
  private fb: FormBuilder,
  private tramite630307Store: Tramite630307Store,
  private tramite630307Query: Tramite630307Query,
 
) {
  this.importacionTemporaldeMercancias = this.fb.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    numeroDeSerie: ['', Validators.required],
    numeroDeMotor: [ '' , Validators.required],
    descripcionAdicionalDeLaMercancia: ['', Validators.required],
    motivooJustificacionDeLaImportacionTemporal: ['', Validators.required]
  })
}

ngOnInit(): void {
  this.suscribirseImportacionTemporaldeMercancias();
}

suscribirseImportacionTemporaldeMercancias(): void {
  const OBSERVABLES = {
    marca: this.marca$,
    modelo: this.modelo$,
    numeroDeSerie: this.numeroDeSerie$,
    numeroDeMotor: this.numeroDeMotor$,
    descripcionAdicionalDeLaMercancia: this.descripcionAdicionalDeLaMercancia$,
    motivooJustificacionDeLaImportacionTemporal: this.motivooJustificacionDeLaImportacionTemporal$,
  
  };

  Object.entries(OBSERVABLES).forEach(([controlName, OBSERVABLES$]) => {
    OBSERVABLES$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
      if (value) {
        this.importacionTemporaldeMercancias.get(controlName)?.setValue(value);
      }
    });
  });
}

onImportacionTemporaldeMercanciasChange(controlName: string): void {
  const VALUE = this.importacionTemporaldeMercancias.get(controlName)?.value;

  switch (controlName) {
    case 'marca':
      this.tramite630307Store.establecerMarca(VALUE);
      break;
    case 'modelo':
      this.tramite630307Store.establecerModelo(VALUE);
      break;
    case 'numeroDeSerie':
      this.tramite630307Store.establecerNumeroDeSerie(VALUE);
      break;
    case 'numeroDeMotor':
      this.tramite630307Store.establecerNumeroDeMotor(VALUE);
      break;
    case 'descripcionAdicionalDeLaMercancia':
      this.tramite630307Store.establecerDescripcionAdicionalDeLaMercancia(VALUE);
        break;
    case 'motivooJustificacionDeLaImportacionTemporal':
      this.tramite630307Store.establecerMotivooJustificacionDeLaImportacionTemporal(VALUE);
      break;  
    // case 'telefonos':
    //   this.tramite110218Store.establecerTeléfonos(VALUE);
    //   break;
    // case 'faxs':
    //   this.tramite110218Store.establecerFaxs(VALUE);
    //   break;
    // case 'correoElectronicos':
    //   this.tramite110218Store.establecerCorreoElectrónicos(VALUE);
    //   break;
    default:
      break;
  }
}

ngOnDestroy(): void {
  this.destroyed$.next();
  this.destroyed$.complete();
}

}
