import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSongUserComponent } from './show-song-user.component';

describe('ShowSongUserComponent', () => {
  let component: ShowSongUserComponent;
  let fixture: ComponentFixture<ShowSongUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSongUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSongUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
