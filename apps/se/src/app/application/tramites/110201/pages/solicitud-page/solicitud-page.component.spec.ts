import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent } from '@ng-mf/data-access-user';
import { SolicitudPageComponent } from '../../../110201/pages/solicitud-page/solicitud-page.component'; 
import { WizardComponent } from '@ng-mf/data-access-user';

describe('SolicitudPageComponent', () => {
  let fixture: ComponentFixture<SolicitudPageComponent>;
  let component: SolicitudPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        ReactiveFormsModule,
        WizardComponent,
        AlertComponent,
        BtnContinuarComponent
      ],
      declarations: [
        SolicitudPageComponent        
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should run #seleccionaTab()', () => {
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });
  
});