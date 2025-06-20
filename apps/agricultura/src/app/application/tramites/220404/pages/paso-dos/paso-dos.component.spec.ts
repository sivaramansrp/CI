import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { TramiteStore } from '@libs/shared/data-access-user/src/core/estados/tramite.store';
import { ServiciosExtraordinariosService } from '../../services/servicios-extraordinarios.service';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      imports: [HttpClientTestingModule, FirmaElectronicaComponent, ToastrModule.forRoot()],
      providers: [ToastrService,ServiciosExtraordinariosService,TramiteStore,
        { provide: new InjectionToken('ToastConfig'), useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
