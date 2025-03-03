import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoCuatroComponent } from './paso-cuatro.component';
import { BtnContinuarComponent, FirmaElectronicaComponent, SolicitanteComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { HttpClientModule } from '@angular/common/http';

describe('PasoCuatroComponent', () => {
  let component: PasoCuatroComponent;
  let fixture: ComponentFixture<PasoCuatroComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PasoCuatroComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent
      ],
      imports: [  WizardComponent,
        BtnContinuarComponent,
        SolicitanteComponent,
        FirmaElectronicaComponent,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
