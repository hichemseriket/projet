import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class UserManager {
    userList = [
        {
            id: 1,
            mail: 'bob@gmail.com',
            active: true,
            name: 'Durand',
            firstName: 'Bob',
            role: 0,
            checked: false
        },
        {
            id: 2,
            mail: 'henriette@chaussette.fe',
            active: true,
            name: 'Chaussette',
            firstName: 'Henriette',
            role: 2,
            checked: false
        },
        {
            id: 3,
            mail: 'rambo@sulfateuse.de',
            active: true,
            name: 'Rambo',
            firstName: 'John',
            role: 1,
            checked: false
        },
        // {
        //     id: 4,
        //     mail: 'aa@aa',
        //     active: false,
        //     name: 'aAaA',
        //     firstName: 'AAaaAAA',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 5,
        //     mail: 'uha@uha.uha',
        //     active: true,
        //     name: 'Robéru',
        //     firstName: 'H-A',
        //     role: 1,
        //     checked: false
        // },
        // {
        //     id: 6,
        //     mail: 'alsaceproject@gmail.com',
        //     active: true,
        //     name: 'Alsace',
        //     firstName: 'Project',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 7,
        //     mail: 'test@test.test',
        //     active: false,
        //     name: 'Test',
        //     firstName: 'User',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 8,
        //     mail: 'boyard@fort.fr',
        //     active: true,
        //     name: 'Père',
        //     firstName: 'Fourras',
        //     role: 0,
        //     checked: false
        // },
        // {
        //     id: 9,
        //     mail: 'zzdine@laposte.net',
        //     active: true,
        //     name: 'Zidane',
        //     firstName: 'Zinedine',
        //     role: 1,
        //     checked: false
        // },
        // {
        //     id: 10,
        //     mail: 'azerty@gmail.com',
        //     active: true,
        //     name: 'Azerty',
        //     firstName: 'Robert',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 11,
        //     mail: 'qwerty',
        //     active: true,
        //     name: 'Qwerty',
        //     firstName: 'Marie-Odile',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 12,
        //     mail: 'gpludide@ze.fr',
        //     active: false,
        //     name: 'Quoi',
        //     firstName: 'Feur',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 13,
        //     mail: 'neige@hiver.fi',
        //     active: true,
        //     name: 'Noel',
        //     firstName: 'Père',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 14,
        //     mail: 'nya@nya.nyan',
        //     active: true,
        //     name: 'Nya',
        //     firstName: 'Nyanyan',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 15,
        //     mail: 'elprofessor@fache.com',
        //     active: true,
        //     name: 'Paconten',
        //     firstName: 'Michel',
        //     role: 1,
        //     checked: false
        // },
        // {
        //     id: 16,
        //     mail: 'bestadmin@levrai.fr',
        //     active: true,
        //     name: 'Dindon',
        //     firstName: 'Pigeon',
        //     role: 0,
        //     checked: false
        // },
        // {
        //     id: 17,
        //     mail: 'perdu@cache.pala',
        //     active: false,
        //     name: 'ceki',
        //     firstName: 'jesepa',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 18,
        //     mail: 'ds@sd.de',
        //     active: true,
        //     name: 'Kim',
        //     firstName: 'Mik',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 19,
        //     mail: 'pasmoi@lui.elle',
        //     active: true,
        //     name: 'Toi',
        //     firstName: 'Eux',
        //     role: 2,
        //     checked: false
        // },
        // {
        //     id: 20,
        //     mail: 'thelast@user.fr',
        //     active: true,
        //     name: 'Last',
        //     firstName: 'User',
        //     role: 2,
        //     checked: false
        // }

    ];
}
