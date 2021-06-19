export class Planner{ //this will be called in file places.service.ts
  constructor(
    public id: string,//id of places
    public title: string,
    public description: string,
    public date: Date,
    public userId : string
    ){}//semua tok hnya access nya pun property tp sekda apa2 info. semua info dlm places.service.ts
}
