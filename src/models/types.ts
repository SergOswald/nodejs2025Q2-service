export interface User {
    id: string;
    login: string;
    password: string; // stored in memory (but not returned)
  }
  
  export interface Artist {
    id: string;
    name: string;
  }
  
  export interface Album {
    id: string;
    name: string;
    artistId: string | null;
  }
  
  export interface Track {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
  }
  
  export interface FavoritesResponse {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }
  