import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoosanitarioParaImportacionComponent } from './zoosanitario-para-importacion.component';

describe('ZoosanitarioParaImportacionComponent', () => {
  let component: ZoosanitarioParaImportacionComponent;
  let fixture: ComponentFixture<ZoosanitarioParaImportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoosanitarioParaImportacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoosanitarioParaImportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
