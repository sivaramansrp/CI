import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportadorEnDestinoComponent } from './importador-en-destino.component';

describe('ImportadorEnDestinoComponent', () => {
  let component: ImportadorEnDestinoComponent;
  let fixture: ComponentFixture<ImportadorEnDestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportadorEnDestinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportadorEnDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
