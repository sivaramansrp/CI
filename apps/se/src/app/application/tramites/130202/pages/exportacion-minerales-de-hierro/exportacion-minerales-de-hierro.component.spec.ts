import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportacionMineralesDeHierroComponent } from './exportacion-minerales-de-hierro.component';
import { BtnContinuarComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ExportacionMineralesDeHierroComponent', () => {
  let component: ExportacionMineralesDeHierroComponent;
  let fixture: ComponentFixture<ExportacionMineralesDeHierroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportacionMineralesDeHierroComponent],
      imports: [WizardComponent,
        BtnContinuarComponent,
        TituloComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportacionMineralesDeHierroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
