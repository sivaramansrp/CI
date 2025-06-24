import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoosanitarioParaImportacionComponent } from './zoosanitario-para-importacion.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('ZoosanitarioParaImportacionComponent', () => {
  let component: ZoosanitarioParaImportacionComponent;
  let fixture: ComponentFixture<ZoosanitarioParaImportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoosanitarioParaImportacionComponent,ReactiveFormsModule,
        CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoosanitarioParaImportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
