// @ts-nocheck
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SolicitanteComponent, SolicitanteService } from '@ng-mf/data-access-user';

import { PasoUnoComponent } from './paso-uno.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [PasoUnoComponent, SolicitanteComponent, HttpClientModule],
      providers: [SolicitanteService],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    component.tabChanged = new EventEmitter<number>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the indice and emit tabChanged event when seleccionaTab is called', () => {
    const newIndex = 2;
    jest.spyOn(component.tabChanged, 'emit');

    component.seleccionaTab(newIndex);


    expect(component.indice).toBe(newIndex);
    expect(component.tabChanged.emit).toHaveBeenCalledWith(newIndex);
  });
});