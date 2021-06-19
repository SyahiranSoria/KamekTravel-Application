import { PlaceLocation } from "./location.model";

export class Place{
  poi_keyword: string; //this will be called in file places.service.ts
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public phoneNumber: number,
    public imageUrl: string,
    public userId : string,
    public location: PlaceLocation,
    public rate: number,
    public numrating: number,
    public category: string,
    public keyword1: string,
    public keyword2: string,
    public keyword3: string,
    public sundayFrom: string,
    public sundayTo: string,
    public mondayFrom: string,
    public mondayTo: string,
    public tuesdayFrom: string,
    public tuesdayTo: string,
    public wednesdayFrom: string,
    public wednesdayTo: string,
    public thursdayFrom: string,
    public thursdayTo: string,
    public fridayFrom: string,
    public fridayTo: string,
    public saturdayFrom: string,
    public saturdayTo: string,
    public website: string,
    public address: string
    ){}//semua tok hnya access nya pun property tp sekda apa2 info. semua info dlm places.service.ts
}
