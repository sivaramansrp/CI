import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { PasoTresComponent } from './paso-tres.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[AnexarDocumentosComponent,
        ToastrModule.forRoot() 
      ],
      declarations: [PasoTresComponent],
      providers: [
        ToastrService
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
