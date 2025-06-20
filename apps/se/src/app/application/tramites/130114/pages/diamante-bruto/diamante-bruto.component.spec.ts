import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiamanteBrutoComponent } from './diamante-bruto.component';
import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DiamanteBrutoComponent', () => {
  let component: DiamanteBrutoComponent;
  let fixture: ComponentFixture<DiamanteBrutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiamanteBrutoComponent], 
      imports: [
        CommonModule, 
        WizardComponent,
        BtnContinuarComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(DiamanteBrutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
