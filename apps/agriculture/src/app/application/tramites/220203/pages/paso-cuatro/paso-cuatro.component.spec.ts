import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoCuatroComponent } from './paso-cuatro.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { FirmaElectronicaComponent, ImportacionDeAcuiculturaService, TituloComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('PasoCuatroComponent', () => {
  let component: PasoCuatroComponent;
  let fixture: ComponentFixture<PasoCuatroComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoCuatroComponent],
      imports: [HttpClientTestingModule, TituloComponent, FirmaElectronicaComponent, ReactiveFormsModule, ToastrModule.forRoot(),],
      providers: [ImportacionDeAcuiculturaService, ToastrService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasoCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient); // Inject the HttpClient
    httpTestingController = TestBed.inject(HttpTestingController); // Inject HttpTestingController
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
