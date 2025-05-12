import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoosanitarioPageComponent } from './zoosanitario-page.component';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ZoosanitarioPageComponent', () => {
  let component: ZoosanitarioPageComponent;
  let fixture: ComponentFixture<ZoosanitarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoosanitarioPageComponent, PasoDosComponent, PasoUnoComponent, PasoTresComponent],
      imports: [WizardComponent, BtnContinuarComponent, SolicitanteComponent, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ZoosanitarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});