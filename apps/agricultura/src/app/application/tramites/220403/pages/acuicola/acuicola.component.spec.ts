import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcuicolaComponent } from './acuicola.component';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('AcuicolaComponent', () => {
  let component: AcuicolaComponent;
  let fixture: ComponentFixture<AcuicolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardComponent, BtnContinuarComponent, SolicitanteComponent,PasoUnoComponent, HttpClientModule],
      declarations: [AcuicolaComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AcuicolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
