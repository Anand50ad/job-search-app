import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFavouritesComponent } from './job-favourites.component';

describe('JobFavouritesComponent', () => {
  let component: JobFavouritesComponent;
  let fixture: ComponentFixture<JobFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobFavouritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
