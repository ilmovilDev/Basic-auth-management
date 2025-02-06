import { Injectable } from "@nestjs/common";

@Injectable()
export class SeedData {

    constructor(){}

    public getRoles = () => [
        { name: 'root' },
        { name: 'admin' },
        { name: 'client' },
    ]
    
}