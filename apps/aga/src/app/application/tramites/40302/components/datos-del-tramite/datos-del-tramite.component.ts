import { AcuseComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosDelTramiteService } from '../../services/datos-del-tramite.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [TituloComponent,ReactiveFormsModule,AcuseComponent],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.scss'
})
export class DatosDelTramiteComponent implements OnInit , OnDestroy{
public solicitudForm! : FormGroup;
private destroy$ = new Subject<void>();

constructor(private fb: FormBuilder, private datosService: DatosDelTramiteService){
  this.establecerSolicitudForm();
}

  ngOnInit(): void {
    this.datosService.setInitialValues();
    this.subscribeToState();
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete();
  }

  public establecerSolicitudForm(): void {
    this.solicitudForm = this.fb.group({
      cveFolioCaat: [{ value: '', disabled: true }],
      descTipoCaat: [{ value: '', disabled: true }],
      descTipoAgente: [{ value: '', disabled: true }],
      directorGeneralNombre: ['', [Validators.required, Validators.maxLength(200)]],
      primerApellido:  ['', [Validators.required, Validators.maxLength(200)]],
      segundoApellido:  ['', [Validators.maxLength(200)]],
    })
  }

public subscribeToState(): void {
  this.datosService
    .getSolicitudState()
    .pipe(takeUntil(this.destroy$)) 
    .subscribe({
      next: (state) => {
        this.solicitudForm.patchValue(state); 
      },
    });
}
}
