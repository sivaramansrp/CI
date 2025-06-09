import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, PasoDosComponent, AnexarDocumentosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;

    const anexarComponent = fixture.debugElement.children.find(de => de.componentInstance instanceof AnexarDocumentosComponent)?.componentInstance as AnexarDocumentosComponent;

    if (anexarComponent) {
      anexarComponent.cargaArchivosEvento = new EventEmitter<void>();
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
