import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignciondirectaPageComponent } from './asignciondirecta-page.component';
import { CommonModule } from '@angular/common';
import { WizardComponent } from '@ng-mf/data-access-user';

import { ASIGNACION } from '@ng-mf/data-access-user';

describe('AsignciondirectaPageComponent', () => {
  let component: AsignciondirectaPageComponent;
  let fixture: ComponentFixture<AsignciondirectaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [AsignciondirectaPageComponent, WizardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignciondirectaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial steps', () => {
    expect(component.pantallasPasos).toEqual(ASIGNACION);
  });

  it('should have the correct initial step index', () => {
    expect(component.indice).toBe(1);
  });

  it('should have a reference to the WizardComponent', () => {
    expect(component.wizardComponent).toBeDefined();
  });
});