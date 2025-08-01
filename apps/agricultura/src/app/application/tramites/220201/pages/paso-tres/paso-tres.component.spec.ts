import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoTresComponent } from './paso-tres.component';
import { AlertComponent, AnexarDocumentosComponent, FirmaElectronicaComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoTresComponent', () => {
  let COMPONENTE: PasoTresComponent;
  let FIXTURE: ComponentFixture<PasoTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TituloComponent, HttpClientTestingModule, AlertComponent, TablaDinamicaComponent, AnexarDocumentosComponent, ToastrModule.forRoot(), FirmaElectronicaComponent, PasoTresComponent]
    })
      .compileComponents();

    FIXTURE = TestBed.createComponent(PasoTresComponent);
    COMPONENTE = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(COMPONENTE).toBeTruthy();
  });
});