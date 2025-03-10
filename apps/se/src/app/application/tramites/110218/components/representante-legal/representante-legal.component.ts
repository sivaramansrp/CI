import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder} from '@angular/forms';
import { FormGroup} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';


@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent {
  datosdelexportador: FormGroup;
  nombredelRepresentante$: Observable<string | null> = this.tramite110218Query.nombredelRepresentante$;
  cargo$: Observable<string | null> = this.tramite110218Query.cargo$;
  teléfonos$: Observable<string | null> = this.tramite110218Query.teléfonos$;
  faxs$: Observable<string | null> = this.tramite110218Query.faxs$;
  correoElectrónicos$: Observable<string | null> = this.tramite110218Query.correoElectrónicos$;

  private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder, private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query, private service: CertificadoTecnicoJaponService) {
    this.datosdelexportador = this.fb.group({
      nombredelRepresentante: [""],
      empresa: [""],
      cargo: [""],
      teléfonos: [""],
      faxs: [""],
      correoElectrónicos: [""],
    })
  }

  ngOnInit(): void {
    this.subscribeToStoreChanges();
    this.getTabledatas();
  }
  getTabledatas(): void {
    this.service.getrepresentante().subscribe(
      (data: any) => {
        this.datosdelexportador.patchValue({
          empresa: data.empresa,
         
        });
      }
    );
  }
  subscribeToStoreChanges(): void {
    const OBSERVABLES = {
      nombredelRepresentante: this.nombredelRepresentante$,
      cargo: this.cargo$,
      teléfonos: this.teléfonos$,
      faxs: this.faxs$,
      correoElectrónicos: this.correoElectrónicos$,
    };

    Object.entries(OBSERVABLES).forEach(([controlName, OBSERVABLES$]) => {
      OBSERVABLES$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
        if (value) {
          this.datosdelexportador.get(controlName)?.setValue(value);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onDatosdelexportadorChange(controlName: string): void {
    const VALUE = this.datosdelexportador.get(controlName)?.value;

    switch (controlName) {
      case 'nombredelRepresentante':
        this.tramite110218Store.setnombredelRepresentante(VALUE);
        break;
      case 'cargo':
        this.tramite110218Store.setcargo(VALUE);
        break;
      case 'teléfonos':
        this.tramite110218Store.setteléfonos(VALUE);
        break;
      case 'faxs':
        this.tramite110218Store.setfaxs(VALUE);
        break;
      case 'correoElectrónicos':
        this.tramite110218Store.setcorreoElectrónicos(VALUE);
        break;
      default:
        console.warn(`Unhandled control name: ${controlName}`);
        break;
    }
  }
}
