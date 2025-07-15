import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentoExportacionComponent } from './documento-exportacion.component';

describe('DocumentoExportacionComponent', () => {
  let component: DocumentoExportacionComponent;
  let fixture: ComponentFixture<DocumentoExportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoExportacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentoExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
