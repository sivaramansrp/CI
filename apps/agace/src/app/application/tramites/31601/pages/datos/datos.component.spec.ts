import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatosComponent } from './datos.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import {NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,SolicitanteComponent,require('@angular/common/http/testing').HttpClientTestingModule],
      declarations: [DatosComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el índice inicial en 1', () => {
    expect(component.indice).toBe(1);
  });
});