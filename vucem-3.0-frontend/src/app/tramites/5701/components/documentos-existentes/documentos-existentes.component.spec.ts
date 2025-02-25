import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosExistentesComponent } from './documentos-existentes.component';

describe('DocumentosExistentesComponent', () => {
  let component: DocumentosExistentesComponent;
  let fixture: ComponentFixture<DocumentosExistentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentosExistentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentosExistentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
