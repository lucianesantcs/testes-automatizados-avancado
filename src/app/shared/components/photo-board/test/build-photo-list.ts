import { Photo } from "../interfaces/photo";

// função que cria uma lista com as mesmas propriedades
// dos dados vindo da api, sem necessidade de chamá-la
export function buildPhotoList(): Photo[] { 
    const photos: Photo[] = [];
    for(let index = 0; index < 8; index++) {
      photos.push({
        id: index + 1,
        url: '',
        description: ''
      });
  
    }
  
    return photos;
  }