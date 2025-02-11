import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { RevisionService } from '../../../../core/services/220501/revision.service';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let revisionService: RevisionService; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [RevisionService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    revisionService = TestBed.inject(RevisionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
 it('should get justificación', () => {
    spyOn(revisionService, 'getJustificacion').and.callThrough();
    component.getJustificacion();
    expect(revisionService.getJustificacion).toHaveBeenCalled();
  });

  it('should get banco', () => {
    spyOn(revisionService, 'getBanco').and.callThrough();
    component.getBanco();
    expect(revisionService.getBanco).toHaveBeenCalled();
  });
});
