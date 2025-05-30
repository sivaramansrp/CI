import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoDosComponent } from './paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-anexar-documentos',
  standalone: true,
  template: ''
})
class MockAnexarDocumentosComponent {}

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoDosComponent, HttpClientTestingModule, MockAnexarDocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
