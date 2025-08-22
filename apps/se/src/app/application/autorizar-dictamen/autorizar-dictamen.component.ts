import { CommonModule } from '@angular/common';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EncabezadoRequerimientoComponent, FirmaElectronicaComponent,NotificacionesComponent, ReviewersTabsComponent} from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerarDictamenComponent } from '@libs/shared/data-access-user/src/tramites/components/generar-dictamen/generar-dictamen.component';

@Component({
  selector: 'app-autorizar-dictamen',
  standalone: true,
    imports: [CommonModule, ReviewersTabsComponent,
      EncabezadoRequerimientoComponent,
      FormsModule, ReactiveFormsModule,
      GenerarDictamenComponent,
      FirmaElectronicaComponent,
     NotificacionesComponent],
  templateUrl: './autorizar-dictamen.component.html',
  styleUrl: './autorizar-dictamen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutorizarDictamenComponent { }
