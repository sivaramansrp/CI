import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionDeSolicitudComponent } from './cancelacion-de-solicitud.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputRadioComponent, SharedModule, SolicitanteComponent, TablaDinamicaComponent, TableComponent, TercerosComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
describe('CancelacionDeSolicitusComponent', () => {
  let component: CancelacionDeSolicitudComponent;
  let fixture: ComponentFixture<CancelacionDeSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelacionDeSolicitudComponent],
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
        TablaDinamicaComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
