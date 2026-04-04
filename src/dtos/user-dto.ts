export class UserDto {
    email: string;
    id: number;
    isActivated: boolean;

    constructor(model: any) {
        this.email = model.email;
        this.id = model.idUser || model._id;
        this.isActivated = model.isActivated
    }
}