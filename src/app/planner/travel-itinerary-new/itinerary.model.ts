import { WishlistItineray } from "src/app/wishlist/wishlist.model";
export class Itinerary{
  constructor(
    public id: string,
    public time: string,
    public notes: string,
    public itinerary: WishlistItineray,
    public userId : string,
    public plannerId: string
    ){}
}
