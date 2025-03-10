import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder} from '@angular/forms';
import { FormGroup} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './destinatario.component.html',
  styleUrls: ['./destinatario.component.scss'],
})
export class DestinatarioComponent implements OnInit, OnDestroy {

  datosdeldestinatario: FormGroup;
  domiciliodeldestinatario: FormGroup;
  nombre$: Observable<string | null> = this.tramite110218Query.nombre$;
  primerApellido$: Observable<string | null> = this.tramite110218Query.primerApellido$;
  númeroderegistroFiscal$: Observable<string | null> = this.tramite110218Query.númeroderegistroFiscal$;
  razónSocial$: Observable<string | null> = this.tramite110218Query.razónSocial$;
  calle$: Observable<string | null> = this.tramite110218Query.calle$;
  númeroLetra$: Observable<string | null> = this.tramite110218Query.númeroLetra$;
  ciudad$: Observable<string | null> = this.tramite110218Query.ciudad$;
  correoElectrónico$: Observable<string | null> = this.tramite110218Query.correoElectrónico$;
  fax$: Observable<string | null> = this.tramite110218Query.fax$;
  teléfono$: Observable<string | null> = this.tramite110218Query.teléfono$;

  private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder, private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query, private service: CertificadoTecnicoJaponService) {
    this.datosdeldestinatario = this.fb.group({
      nombre: [""],
      primerApellido: [""],
      segundoApellido: [""],
      númeroderegistroFiscal: [""],
      razónSocial: [""],
    });
    this.domiciliodeldestinatario = this.fb.group({
      calle: [""],
      númeroLetra: [""],
      ciudad: [""],
      correoElectrónico: [""],
      fax: [""],
      teléfono: [""],
    });
  }

  ngOnInit(): void {
    this.subscribeToStoreChanges();
    this.getTabledatas();
  }
  getTabledatas(): void {
    this.service.getdestinatario().subscribe(
      (data: any) => {
        this.datosdeldestinatario.patchValue({
          segundoApellido: data.segundoApellido,
         
        });
      }
    );
  }

  subscribeToStoreChanges(): void {
    const OBSERVABLES: Record<string, Observable<string | null>> = {
      nombre: this.nombre$,
      primerApellido: this.primerApellido$,
      númeroderegistroFiscal: this.númeroderegistroFiscal$,
      razónSocial: this.razónSocial$,
      calle: this.calle$,
      númeroLetra: this.númeroLetra$,
      ciudad: this.ciudad$,
      correoElectrónico: this.correoElectrónico$,
      fax: this.fax$,
      teléfono: this.teléfono$,
    };

    Object.entries(OBSERVABLES).forEach(([controlName, observable$]) => {
      observable$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
        if (controlName in this.datosdeldestinatario.controls) {
          this.datosdeldestinatario.get(controlName)?.setValue(value);
        } else if (controlName in this.domiciliodeldestinatario.controls) {
          this.domiciliodeldestinatario.get(controlName)?.setValue(value);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onDatosdeldestinatarioChange(controlName: string): void {
    const VALUE = this.datosdeldestinatario.get(controlName)?.value;

    switch (controlName) {
      case 'nombre':
        this.tramite110218Store.setnombre(VALUE);
        break;
      case 'primerApellido':
        this.tramite110218Store.setprimerApellido(VALUE);
        break;
      case 'númeroderegistroFiscal':
        this.tramite110218Store.setnúmeroderegistroFiscal(VALUE);
        break;
      case 'razónSocial':
        this.tramite110218Store.setrazónSocial(VALUE);
        break;
      default:
        console.warn(`Unhandled control name: ${controlName}`);
        break;
    }
  }

  onDomiciliodeldestinatarioChange(controlName: string): void {
    const VALUE = this.domiciliodeldestinatario.get(controlName)?.value;

    switch (controlName) {
      case 'calle':
        this.tramite110218Store.setcalle(VALUE);
        break;
      case 'númeroLetra':
        this.tramite110218Store.setnúmeroLetra(VALUE);
        break;
      case 'ciudad':
        this.tramite110218Store.setciudad(VALUE);
        break;
      case 'correoElectrónico':
        this.tramite110218Store.setcorreoElectrónico(VALUE);
        break;
      case 'fax':
        this.tramite110218Store.setfax(VALUE);
        break;
      case 'teléfono':
        this.tramite110218Store.setteléfono(VALUE);
        break;
      default:
        console.warn(`Unhandled control name: ${controlName}`);
        break;
    }
  }
}
