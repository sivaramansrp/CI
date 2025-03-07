import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoCuatroComponent } from './paso-cuatro.component';
import { AlertComponent, AnexarDocumentosComponent, FirmaElectronicaComponent, FirmaPageComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoCuatroComponent', () => {
  let component: PasoCuatroComponent;
  let fixture: ComponentFixture<PasoCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoCuatroComponent],
      imports: [TituloComponent, HttpClientTestingModule, AlertComponent, TablaDinamicaComponent, AnexarDocumentosComponent, ToastrModule.forRoot(), FirmaElectronicaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasoCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});