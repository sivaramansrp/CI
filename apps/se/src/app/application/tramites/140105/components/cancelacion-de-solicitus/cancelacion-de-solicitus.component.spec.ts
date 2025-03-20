import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionDeSolicitusComponent } from './cancelacion-de-solicitus.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputRadioComponent, SelectCatalogosComponent, SharedModule, SolicitanteComponent, TablaDinamicaComponent, TableComponent, TercerosComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
describe('CancelacionDeSolicitusComponent', () => {
  let component: CancelacionDeSolicitusComponent;
  let fixture: ComponentFixture<CancelacionDeSolicitusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelacionDeSolicitusComponent],
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
        SelectCatalogosComponent,
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
        TablaDinamicaComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeSolicitusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
