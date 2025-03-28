
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot()
      ],
      providers: [
             {
               provide: ActivatedRoute,
               useValue: {
                 params: of({ id: '123' }), // Mock params if needed
                 snapshot: {
                   paramMap: {
                     get: (key: string) => '123' // Mock paramMap if needed
                   }
                 }
               }
             }
           ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
