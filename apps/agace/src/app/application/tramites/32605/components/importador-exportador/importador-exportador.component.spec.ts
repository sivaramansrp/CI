import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportadorExportadorComponent } from './importador-exportador.component';

describe('ImportadorExportadorComponent', () => {
  let component: ImportadorExportadorComponent;
  let fixture: ComponentFixture<ImportadorExportadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportadorExportadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportadorExportadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
