import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { ImportacionDeAcuiculturaService, SolicitanteComponent, TercerosComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Import for HTTP testing
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent, TercerosComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        ImportacionDeAcuiculturaService,
        // Other necessary providers
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient); // Inject the HttpClient
    httpTestingController = TestBed.inject(HttpTestingController); // Inject HttpTestingController
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
