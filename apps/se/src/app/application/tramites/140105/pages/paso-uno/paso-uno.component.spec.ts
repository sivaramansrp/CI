import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoUnoComponent } from './paso-uno.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputRadioComponent, SharedModule, SolicitanteComponent, TablaDinamicaComponent, TableComponent, TercerosComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [
        HttpClientTestingModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        WizardComponent,
        TituloComponent,
        BtnContinuarComponent,
        CrosslistComponent,
        InputCheckComponent,
        AlertComponent,
        InputFechaComponent,
        AnexarDocumentosComponent,
        FirmaElectronicaComponent,
        SolicitanteComponent,
        TercerosComponent,
        CatalogoSelectComponent,
        TableComponent,
        InputRadioComponent,
        ToastrModule.forRoot(),
        TablaDinamicaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});