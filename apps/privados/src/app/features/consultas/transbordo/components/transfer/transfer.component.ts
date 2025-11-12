import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransferTypeSearch } from '../../interfaces/transfers.interface';
import { TransferDateFormComponent } from '../forms/transfer-date-form/transfer-date-form.component';
import { ManifestNumberFormComponent } from '../forms/manifest-number-form/manifest-number-form.component';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { RoutingService } from '@/core/services/routing.service';
import { APP_ROUTES } from '@/app.routes.constants';
import { STORE_FRONT_ROUTES } from '@/routes.constants';
import { TRANSBORDO_ROUTES } from '../../transbordo.routes.constants';
import { TransferService } from '../../services/transfer.service';
import { catchError, of, take, tap } from 'rxjs';
import { SessionStorageService } from '@/shared/services/session-storage.service';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [FormsModule, TransferDateFormComponent, ManifestNumberFormComponent, ButtonComponent],
  templateUrl: './transfer.component.html',
})
export class TransferComponent implements OnInit {
  @ViewChild(ManifestNumberFormComponent) manifestNumberForm!: ManifestNumberFormComponent;
  @ViewChild(TransferDateFormComponent) transferDateForm!: TransferDateFormComponent;
  private routingService = inject(RoutingService);
  private transferService = inject(TransferService);
  private sessionStorage = inject(SessionStorageService);
  searchType: TransferTypeSearch | null = null;
  searchTypeEnum = TransferTypeSearch;
  displayErrorAlert = signal<boolean>(false);
  displayWarningAlert = signal<boolean>(false);

  ngOnInit(): void {
    this.loadSearchTypeFromSession();
  }

  onSearchTypeChange() {
    this.sessionStorage.set('searchBy', this.searchType);
    this.transferService.searchBy.set(this.searchType);
    this.cleanParamsFromSessionStorage();
    this.setFalseAlerts();
  }

  getManifest() {
    this.transferService
      .manifestHasResults()
      .pipe(
        tap((hasResult: boolean) => {
          if (hasResult) {
            this.routingService.navigate([
              STORE_FRONT_ROUTES.CONSULTAS,
              TRANSBORDO_ROUTES.TRANSBORDO_DETALLE,
            ]);
          } else {
            this.displayWarningAlert.set(true);
          }
        }),
        catchError(() => {
          this.displayErrorAlert.set(true);
          return of();
        }),
        take(1),
      )
      .subscribe();
  }

  submitForm() {
    this.setFalseAlerts();
    const activeComponent = this.getActiveFormComponent();
    if (activeComponent) {
      activeComponent.submitForm();
    }
  }

  resetForm() {
    this.setFalseAlerts();
    const activeComponent = this.getActiveFormComponent();
    if (activeComponent) {
      activeComponent.resetForm();
    }
  }

  setFalseAlerts() {
    this.displayErrorAlert.set(false);
    this.displayWarningAlert.set(false);
  }

  private loadSearchTypeFromSession(): void {
    const searchBy = this.sessionStorage.get<TransferTypeSearch | null>('searchBy');
    if (searchBy) {
      this.transferService.searchBy.set(searchBy);
      this.searchType = searchBy;
    }
  }

  private getActiveFormComponent() {
    switch (this.searchType) {
      case this.searchTypeEnum.DATE_TRANSFER:
        return this.transferDateForm;
      case this.searchTypeEnum.MANIFEST_NUMBER:
        return this.manifestNumberForm;
      default:
        return null;
    }
  }

  private cleanParamsFromSessionStorage() {
    this.sessionStorage.cleanParamsFromSessionStorage(['manifestNumber', 'flight']);
  }
}
