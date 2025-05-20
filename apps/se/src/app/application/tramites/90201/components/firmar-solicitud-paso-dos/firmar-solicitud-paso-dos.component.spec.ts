import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmarSolicitudPasoDosComponent } from './firmar-solicitud-paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('FirmarSolicitudPasoDosComponent', () => {
  let component: FirmarSolicitudPasoDosComponent;
  let fixture: ComponentFixture<FirmarSolicitudPasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmarSolicitudPasoDosComponent,HttpClientTestingModule,ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FirmarSolicitudPasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
