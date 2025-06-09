import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciaComponent } from './mercancia.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
@Injectable()
class MockFitosanitarioService {}

describe('MercanciaComponent', () => {
  let component: MercanciaComponent;
  let fixture: ComponentFixture<MercanciaComponent>;
   beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule,MercanciaComponent],
      declarations: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: CamCertificadoService, useClass: MockFitosanitarioService }
      ]
    }).overrideComponent(MercanciaComponent,  {

    }).compileComponents();
    fixture = TestBed.createComponent(MercanciaComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });


});
