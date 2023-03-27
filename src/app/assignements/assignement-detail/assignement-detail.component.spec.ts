import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignementDetailComponent } from './assignement-detail.component';

describe('AssignementDetailComponent', () => {
  let component: AssignementDetailComponent;
  let fixture: ComponentFixture<AssignementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignementDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
