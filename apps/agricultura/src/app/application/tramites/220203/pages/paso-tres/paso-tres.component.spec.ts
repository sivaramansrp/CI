import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoTresComponent } from './paso-tres.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FirmaElectronicaComponent, } from '@ng-mf/data-access-user';

import { ToastrModule } from 'ngx-toastr';


describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      imports: [FirmaElectronicaComponent, ToastrModule.forRoot(), HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
