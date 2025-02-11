import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexarDocumentosComponent } from './anexar-documentos.component';

describe('AnexarDocumentosComponent', () => {
  let component: AnexarDocumentosComponent;
  let fixture: ComponentFixture<AnexarDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexarDocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnexarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
