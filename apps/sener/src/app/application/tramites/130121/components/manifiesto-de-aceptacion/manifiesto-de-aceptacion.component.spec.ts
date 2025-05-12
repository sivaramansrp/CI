import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManifiestoDeAceptacionComponent } from './manifiesto-de-aceptacion.component';
 
describe('ManifiestoDeAceptacionComponent', () => {
  let component: ManifiestoDeAceptacionComponent;
  let fixture: ComponentFixture<ManifiestoDeAceptacionComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifiestoDeAceptacionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
 
    fixture = TestBed.createComponent(ManifiestoDeAceptacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 
 