import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class HouseManager {
    houseList = [
        {
            id_house: 1,
            ref: "ZIMMERSHEIM_001",
            lat: 47.71983795163616,
            lng: 7.388144917432134,
            city: "Zimmersheim",
            street: "",
            codePostal: "68440",
            type: "Maison renaissance à  pan-de-bois",
            description: "Maison du charpentier Hans Jost Koch de Willisau (CH), comme nous l'apprend le cartouche du linteau de fenêtre de la Stube. Elle présente un remarquable décor gravé sur les poteaux principaux des façades sur rue et sur cour (Nord et Est), unique dans le Sundgau, mais qui se rapproche de décors sculptés visibles dans le canton de Lucerne (CH) dont était originaire Hans Jost Koch.",
            constructionDate: 1665,
            projectManager: "Hans Jost KOCH",
            owner: "Hans Jost KOCH",
            materials: "pan-de-bois (chêne, sapin), moellons calcaire, torchis",
            other: "",
            checked: false
        },
    //     {
    //         id_house: 2,
    //         ref: "ZIMMERSHEIM_002",
    //         lat: 47.71937609190107,
    //         long: 7.391405859894433,
    //         city: "Zimmersheim",
    //         street: "",
    //         codePostal: "68440",
    //         type: "Maison renaissance Ã Â  pan-de-bois",
    //         description: "Maison vigneronne Ã Â  pan-de-bois sur cave en maÃ§onneie de moellons. PossÃ¨de une fenÃªtre Ã Â  3 compartiments sur le pignon, portant en linteau une date et les noms des maÃ®tres d'ouvrage.",
    //         constructionDate: "1687",
    //         projectManager: "",
    //         owner: "Claus BAUMANN, Catharina BISCHERIN",
    //         materials: "pan-de-bois, moellons calcaire, torchis",
    //         other: "",
    //         checked: false
    //     },
    //     {
    //         id_house: 3,
    //         ref: "ZIMMERSHEIM_003",
    //         lat: 47.715711208345105,
    //         long: 7.38799482167535,
    //         city: "Zimmersheim",
    //         street: "",
    //         codePostal: "68440",
    //         type: "Bâtiment de production, habitation",
    //         description: "Ancienne tuilerie de Zimmersheim. DÃ©truite.",
    //         constructionDate: "ND",
    //         projectManager: "",
    //         owner: "",
    //         materials: "pan-de-bois, maÃƒÂ§onnerie de briques de terre cuite",
    //         other: "",
    //         checked: false
    //     },
    //     {
    //         id_house: 4,
    //         ref: "ESCHENTZWILLER_001",
    //         lat: 47.71366795606441,
    //         long: 7.399677510632029,
    //         city: "Eschentzwiller",
    //         street: "",
    //         codePostal: "68440",
    //         type: "Maison renaissance en pierres",
    //         description: "Maison initialement de 3 travÃ©es, prolongÃ©e d'une travÃ©e Ã Â  l'arriÃ¨re, R+1+3 combles. Rdc Ã Â  usage de cave, certainement viticole Ã Â  l'origine. DatÃ©e sur le linteau de la fenÃªtre droite du premier niveau de comble.",
    //         constructionDate: "1620",
    //         projectManager: "",
    //         owner: "",
    //         materials: "maÃ§onnerie de moellons calcaires",
    //         other: "",
    //         checked: false
    //     },
    //     {
    //         id_house: 5,
    //         ref: "SCHLIERBACH_001",
    //         lat: 47.69209773146265,
    //         long: 7.250290396761253,
    //         city: "Schlierbach",
    //         street: "",
    //         codePostal: "68440",
    //         type: "Maison",
    //         description: "Maison Ã Â  pan-de-bois dÃ©molie en 1983, transfÃ©rÃ©e Ã Â  l'Ã©comusÃ©e d'Alsace. Assemblages Ã Â  mi-bois et queue d'aronde.",
    //         constructionDate: "1529",
    //         projectManager: "",
    //         owner: "",
    //         materials: "pan-de-bois, torchis",
    //         other: "",
    //         checked: false
    //     },
    //     {
    //         id_house: 6,
    //         ref: "SCHLIERBACH_002",
    //         lat: null,
    //         long: null,
    //         city: "Schlierbach",
    //         street: "",
    //         codePostal: "68440",
    //         type: "Maison",
    //         description: "Maison Ã Â  pan-de-bois hourdÃ© de torchis prÃ©sentant une galerie Ã Â  registre de croix et un petit losange barrÃ© dans le triangle supÃ©rieur du pignon.",
    //         constructionDate: "XVIII ème S.",
    //         projectManager: "",
    //         owner: "",
    //         materials: "pan-de-bois, torchis",
    //         other: "",
    //         checked: false
    //     }
    ];
}
