export class wishlist{
  constructor(
    public wishlist_id: string,
    public placeId: string,
    public userId: string,
    public description: string,
    public placeTitle: string,
    public placeImage: string,
    ) {}
}


export interface WishlistItineray{
  description: string;
  placeTitle: string;
  placeImage: string;
  placeId: string;
}
