import { ComponentFixture } from '@angular/core/testing';
import { MedioTransporteComponent } from './medio-transporte.component';
import { TestBed } from '@angular/core/testing';

describe('MedioTransporteComponent', () => {
  let component: MedioTransporteComponent;
  let fixture: ComponentFixture<MedioTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedioTransporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedioTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have claveDeControl property', () => {
    expect(component.claveDeControl).toBeDefined();
  });

  it('should set and get claveDeControl', () => {
    component.claveDeControl = 'testValue';
    expect(component.claveDeControl).toBe('testValue');
  });
});