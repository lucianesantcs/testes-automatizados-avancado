import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Photo } from "./interfaces/photo";
import { PhotoBoardComponent } from "./photo-board.component";
import { PhotoBoardModule } from "./photo-board.module";

// função que cria uma lista com as mesmas propriedades
// dos dados vindo da api, sem necessidade de chamá-la
function buildPhotoList(): Photo[] {
  const photos: Photo[] = [];
  for (let index = 0; index < 8; index++) {
    photos.push({
      id: index + 1,
      url: "",
      description: "",
    });
  }

  return photos;
}

describe(PhotoBoardComponent.name + ' alternative', () => {
  let fixture: ComponentFixture<PhotoBoardTestComponent>;
  let component: PhotoBoardTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoBoardTestComponent],
      imports: [PhotoBoardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoBoardTestComponent);
    component = fixture.componentInstance;
  });

  it("Should display rows and columns when (@Input photos) has value", () => {
    component.photos = buildPhotoList();
    fixture.detectChanges();

    expect(component.board.rows.length).withContext("Number of rows").toBe(2);
    expect(component.board.rows[0].length)
      .withContext("Number of columns from the first row")
      .toBe(4);
    expect(component.board.rows[1].length)
      .withContext("Number of columns from the second row")
      .toBe(4);
  });
});

@Component({
  template: `<app-photo-board [photos]="photos"></app-photo-board>`,
})

class PhotoBoardTestComponent {
  @ViewChild(PhotoBoardComponent) public board: PhotoBoardComponent;
  public photos: Photo[] = [];
}
