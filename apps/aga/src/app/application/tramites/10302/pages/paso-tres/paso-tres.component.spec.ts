import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoTresComponent } from './paso-tres.component';
import { TramiteStore } from '../../../../estados/tramite.store';
import { FirmaElectronicaComponent, TramiteFolioService } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

fdescribe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      imports: [FirmaElectronicaComponent, HttpClientTestingModule],
      providers: [TramiteFolioService, TramiteStore, ToastrService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
