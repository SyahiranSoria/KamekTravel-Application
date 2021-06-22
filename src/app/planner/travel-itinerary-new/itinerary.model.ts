import { WishlistItineray } from "src/app/wishlist/wishlist.model";
export class Itinerary{ //this will be called in file places.service.ts
  constructor(
    public id: string,//id of places
    public time: string,
    public notes: string,
    public itinerary: WishlistItineray,
    public userId : string,
    public plannerId: string
    ){}//semua tok hnya access nya pun property tp sekda apa2 info. semua info dlm places.service.ts
}
