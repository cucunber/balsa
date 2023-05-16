import { makeAutoObservable } from "mobx";
import { IUser } from "./type";

class User implements IUser {
    id: IUser['id']
    name: IUser['name']
    surname: IUser['surname']

    constructor(private store: any, user: IUser){
        this.id = user.id;
        this.name = user.name;
        this.surname = user.name;

        makeAutoObservable(this);
    }
}