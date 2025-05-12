import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SanidadCertificadoComponent } from './sanidad-certificado.component';
import { BtnContinuarComponent, WizardComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Import NO_ERRORS_SCHEMA
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

describe('SanidadCertificadoComponent', () => {
  let component: SanidadCertificadoComponent;
  let fixture: ComponentFixture<SanidadCertificadoComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SanidadCertificadoComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent, // Declare all components used in the test

      ],
      imports: [
        HttpClientTestingModule, // Import HttpClientTestingModule for mock HTTP requests
        ReactiveFormsModule, // Import ReactiveFormsModule if you're using reactive forms
        ToastrModule.forRoot(),
        BtnContinuarComponent, // If used within the component
        WizardComponent, // If used within the component // Import ToastrModule for toasts if used in your component
      ],
      providers: [
        ImportacionDeAcuiculturaService, // Your service provider
        ToastrService, // Toastr provider if it's used for notifications
        // Other necessary providers
      ],
      schemas: [NO_ERRORS_SCHEMA], // Add NO_ERRORS_SCHEMA to bypass unrecognized elements
    })
      .compileComponents();

    fixture = TestBed.createComponent(SanidadCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient); // Inject the HttpClient
    httpTestingController = TestBed.inject(HttpTestingController); // Inject HttpTestingController
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
