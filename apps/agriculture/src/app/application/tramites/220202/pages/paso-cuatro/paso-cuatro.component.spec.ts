import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoCuatroComponent } from './paso-cuatro.component';
import { FirmaElectronicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';


describe('PasoCuatroComponent', () => {
  let component: PasoCuatroComponent;
  let fixture: ComponentFixture<PasoCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoCuatroComponent],
      imports: [FirmaElectronicaComponent, HttpClientTestingModule, TituloComponent, ToastrModule.forRoot()]
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