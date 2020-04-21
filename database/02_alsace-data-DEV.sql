USE alsace;

INSERT INTO `user_group` (`id`, `name`, `description`, `suggest`, `validate`, `administrate`) VALUES
(1, 'Utilisateur', 'Groupe des utilisateurs', 0, 0, 0),
(2, 'Contributeur', 'Groupe des utilisateurs contributeurs', 1, 0, 0),
(3, 'Modérateur', 'Groupe des utilisateurs modérateurs', 1, 1, 0),
(4, 'Administrateur', 'Groupe des utilisateurs administrateurs', 1, 1, 1);

INSERT INTO `users` (`id`, `mail`, `password`, `tempKey`, `registerDate`, `gcu`, `role`, `activ`) VALUES
(1, 'anthony.schwartz@uha.fr', '$2b$10$8PikvTm5wqU8birdtYacn.ZQri8Bbv6YNu.Dd1bJlN5FfszOwwQKC', null, '2019-12-05 00:00:00', '2019-12-05 00:00:00', 0, 1);

INSERT INTO `users_info` (`id`, `userId`, `lastName`, `firstName`, `groupId`) VALUES
(1, 1, 'schwartz', 'Anthony', 3);



INSERT INTO `houses` (`id_house`, `ref`, `lat`, `lng`, `city`, `street`, `codePostal`, `type`, `description`, `constructionDate`, `projectManager`, `owner`, `materials`, `other`) VALUES
(1, 'ZIMMERSHEIM_001', 47.71983795163616, 7.388144917432134, 'Zimmersheim', NULL, 68440, 'Maison renaissance à  pan-de-bois', 'Maison du charpentier Hans Jost Koch de Willisau (CH), comme nous l\'apprend le cartouche du linteau de fenêtre de la Stube. Elle présente un remarquable décor gravé sur les poteaux principaux des façades sur rue et sur cour (Nord et Est), unique dans le Sundgau, mais qui se rapproche de décors sculptés visibles dans le canton de Lucerne (CH) dont était originaire Hans Jost Koch.', '1665', 'Hans Jost KOCH', 'Hans Jost KOCH', 'pan-de-bois (chêne, sapin), moellons calcaire, torchis', NULL),
(2, 'ZIMMERSHEIM_002', 47.71937609190107, 7.391405859894433, 'Zimmersheim', NULL, 68440, 'Maison renaissance à  pan-de-bois', 'Maison vigneronne à  pan-de-bois sur cave en maçonneie de moellons. Possède une fenêtre à  3 compartiments sur le pignon, portant en linteau une date et les noms des maîtres d\'ouvrage.', '1687', NULL, 'Claus BAUMANN, Catharina BISCHERIN', 'pan-de-bois, moellons calcaire, torchis', NULL),
(3, 'ZIMMERSHEIM_003', 47.715711208345105, 7.38799482167535, 'Zimmersheim', NULL, 68440, 'Bâtiment de production, habitation', 'Ancienne tuilerie de Zimmersheim. Détruite.', 'ND', NULL, NULL, 'pan-de-bois, maÃ§onnerie de briques de terre cuite', NULL),
(4, 'ESCHENTZWILLER_001', 47.71366795606441, 7.399677510632029, 'Eschentzwiller', NULL, 68440, 'Maison renaissance en pierres', 'Maison initialement de 3 travées, prolongée d\'une travée à  l\'arrière, R+1+3 combles. Rdc à  usage de cave, certainement viticole à  l\'origine. Datée sur le linteau de la fenêtre droite du premier niveau de comble.', '1620', NULL, NULL, 'maçonnerie de moellons calcaires', NULL),
(5, 'SCHLIERBACH_001', 47.69209773146265, 7.250290396761253, 'Schlierbach', NULL, 68440, 'Maison', 'Maison à  pan-de-bois démolie en 1983, transférée à  l\'écomusée d\'Alsace. Assemblages à  mi-bois et queue d\'aronde.', '1529', NULL, NULL, 'pan-de-bois, torchis', NULL),
(6, 'SCHLIERBACH_002', 47.69209774146265, 7.250290396763253, 'Schlierbach', NULL, 68440, 'Maison', 'Maison à  pan-de-bois hourdé de torchis présentant une galerie à  registre de croix et un petit losange barré dans le triangle supérieur du pignon.', 'XVIIIième s.', NULL, NULL, 'pan-de-bois, torchis', NULL),
(7, 'SCHLIERBACH_003', NULL, NULL, 'Schlierbach', NULL, 68440, 'Ferme-cour', 'Ensemble renaissance en pierres, reconstruit en grande partie au XXe s. Quelques encadrements avec linteaux \"en accolade\" conservés.', '1561', NULL, NULL, 'maçonnerie de moellons calcaires', NULL),
(8, 'SCHLIERBACH_004', NULL, NULL, 'Schlierbach', NULL, 68440, 'Maison', 'Motif central à  grand losange barré; galerie latérale sur cour en encorbellement. Sablière d\'étage moulurée portant inscription de la date et des noms des maîtres d\'ouvrages.', '1708', NULL, 'Joseph KESSLER, Anna Maria KARMERIN', 'pan-de-bois, maçonnerie', NULL),
(9, 'RIXHEIM_001', NULL, NULL, 'Rixheim', NULL, 68170, 'Maison renaissance à  pan-de-bois', 'Maison à  pan-de-bois et colombage \"en épis\".', 'ND', NULL, NULL, 'pan-de-bois, maçonnerie', NULL),
(10, 'VIEUX_FERRETTE_001', NULL, NULL, 'Vieux-Ferrette', NULL, 68480, 'Maison renaissance à  pan-de-bois', 'Motifs de pan-de-bois à  grands losanges barrés. Sablière d\'étage et entraits moulurés. Porte une date sur le poteau cornier, suivi des noms des maîtres d\'ouvrage, de l\'inscription enigmatique \"GSMR\" et du nom du charpentier.', '1682', 'Hans Jost KOCH', 'Jerg BICH, Maria HASBURGERIN', 'pan-de-bois, maçonnerie ', NULL),
(11, 'BLOTZHEIM_001', NULL, NULL, 'Blotzheim / Inuyama', NULL, 68730, 'Ferme-cour', 'Maison démolie en 1985. Transférée et reconstruite au Japon dans l\'écomusée mondial \"Little World\". Présente un registre de croix courbées une grande croix courbée centrale et un pan-de-bois \"en épis\".', '1582', NULL, NULL, 'pan-de-bois, maçonnerie', NULL),
(12, 'BERENTZWILLER_001', NULL, NULL, 'Berentzwiller', NULL, 68130, '/', 'Maison \"Satter\", restaurant \"zur Krone\" (v. 1900), pan-de-bois \"en épis\".', 'ND', NULL, NULL, 'pan-de-bois, maçonnerie ', NULL),
(13, 'LUEMSCHWILLER_001', NULL, NULL, 'Luemschwiller', NULL, 68720, 'Maison renaissance en pierres', 'Présente des chaînages à  bossages et boulets sculptés, des portes cintrées à  boulet, des encadrements de baies à  meneaux et congés. L\'accès principal se faisait à  l\'étage, par une coursive en bois disparue, dont il reste les corbeaux en pierre.', '1575', NULL, NULL, 'maçonnerie de moellons calcaires ', NULL),
(14, 'LUTTER_001', NULL, NULL, 'Lutter', NULL, 68480, 'Maison renaissance en pierres', 'Présente une galerie en bois coté cour, et à  l\'origine, un pignon en encorbellement (cf reconstitution).', 'Entre 1575 et 1581', NULL, 'Burckardt BIGENWALD', 'maçonnerie de moellons, corbeaux et chaînages en pierre calcaires', NULL),
(15, 'LUTTER_002', NULL, NULL, 'Lutter', NULL, 68480, 'Maison renaissance en pierres', 'Baies renaissance à  simple, double ou triple compartiments séparés par des meneaux. Porte de cave et porte d\'entrée en arc reposant sur des chapiteaux sculptés; ceux de la porte d\'entrée présentent un motif de roses en bandeau.', '1621', NULL, NULL, 'maçonnerie de moellons calcaires', NULL),
(16, 'OTTMARSHEIM_001', NULL, NULL, 'Ottmarsheim', NULL, 68490, 'Maison renaissance à  pan-de-bois', 'Maison à  pan-de-bois et colombage \"en épis\".', 'ND', NULL, NULL, 'pan-de-bois, maçonnerie ', NULL),
(17, 'ECOMUSEE_001', NULL, NULL, 'Ecomusée / Hésingue', NULL, 68190, 'Maison renaissance à  pan-de-bois', 'Maison à  pan-de-bois à  3 nefs et colombage \"en épis\" provenant de Hésingue.', '1574', NULL, NULL, 'pan-de-bois, maçonnerie ', NULL),
(18, 'ECOMUSEE_002', NULL, NULL, 'Ecomusée / Schlierbach', NULL, 68190, 'Maison à  pan-de-bois', 'Maison de Schlierbach de 1529 transférée à  l\'écomusée en 1984. Reconstitution archéologique. Assemblages à  mi-bois et queue d\'aronde.', '1529', NULL, NULL, 'pan-de-bois, maçonnerie ', NULL),
(19, 'GUEMAR_001', 47.80126328948875, 7.214562377162058, 'Guémar', NULL, 68970, 'Bâtiment de production, habitation', 'Ancienne tuilerie de Guémar, détruite.', 'NC', NULL, NULL, 'pan-de-bois, maçonnerie de briques de terre cuite ', NULL);


INSERT INTO `medias` (`id_media`, `fileName`, `category`, `mediaDate`, `houseId`) VALUES
(1, 'ZIMMERSHEIM_001-2019-photo-1.JPG', 'photo', '2019', 1),
(2, 'ZIMMERSHEIM_001-2019-photo-2.jpg', 'photo', '2019', 1),
(3, 'ZIMMERSHEIM_001-2019-photo-3.JPG', 'photo', '2019', 1),
(4, 'ZIMMERSHEIM_001-2019-photo-4.jpg', 'photo', '2019', 1),
(5, 'ZIMMERSHEIM_002-2019-photo-1.jpg', 'photo', '2019', 2),
(6, 'ZIMMERSHEIM_002-2019-photo-2.JPG', 'photo', '2019', 2),
(7, 'ZIMMERSHEIM_002-2019-photo-3.jpg', 'photo', '2019', 2),
(8, 'ZIMMERSHEIM_002-2019-plan-4.jpg', 'plan', '2019', 2),
(9, 'ZIMMERSHEIM_003-2019-photo-1.jpg', 'photo', '2019', 3),
(10, 'ZIMMERSHEIM_003-2019-photo-2.jpg', 'photo', '2019', 3),
(11, 'ZIMMERSHEIM_003-1960-photo-3.jpg', 'photo', '1960', 3),
(12, 'ESCHENTZWILLER_001-2019-photo-1.JPG', 'photo', '2019', 4),
(13, 'SCHLIERBACH_001-1983-photo-1.jpg', 'photo', '1983', 5),
(15, 'SCHLIERBACH_002-2019-photo-1.JPG', 'photo', '2019', 6),
(16, 'SCHLIERBACH_002-2019-photo-2.JPG', 'photo', '2019', 6),
(17, 'SCHLIERBACH_003-2019-photo-1.JPG', 'photo', '2019', 7),
(18, 'SCHLIERBACH_003-2019-photo-2.JPG', 'photo', '2019', 7),
(19, 'SCHLIERBACH_003-2019-photo-3.jpg', 'photo', '2019', 7),
(20, 'SCHLIERBACH_003-2019-photo-4.jpg', 'photo', '2019', 7),
(21, 'SCHLIERBACH_004-2019-photo-1.JPG', 'photo', '2019', 8),
(22, 'SCHLIERBACH_004-2019-photo-2.jpg', 'photo', '2019', 8),
(23, 'SCHLIERBACH_004-2019-photo-3.JPG', 'photo', '2019', 8),
(24, 'RIXHEIM_001-2019-photo-1.JPG', 'photo', '2019', 9),
(25, 'VIEUX_FERRETTE_001-2019-photo-1.jpg', 'photo', '2019', 10),
(26, 'VIEUX_FERRETTE_001-2019-photo-2.jpg', 'photo', '2019', 10),
(27, 'VIEUX_FERRETTE_001-2019-photo-3.jpg', 'photo', '2019', 10),
(28, 'BLOTZHEIM_001-1985-photo-1.jpg', 'photo', '1985', 11),
(30, 'BERENTZWILLER_001-2019-photo-1.jpg', 'photo', '2019', 12),
(31, 'BERENTZWILLER_001-1900-photo-2.jpg', 'photo', '1900', 12),
(32, 'LUEMSCHWILLER_001-2019-photo-1.JPG', 'photo', '2019', 13),
(33, 'LUEMSCHWILLER_001-2019-photo-2.JPG', 'photo', '2019', 13),
(34, 'LUEMSCHWILLER_001-2019-photo-3.jpg', 'photo', '2019', 13),
(35, 'LUEMSCHWILLER_001-2019-photo-4.jpg', 'photo', '2019', 13),
(36, 'LUEMSCHWILLER_001-2019-photo-5.jpg', 'photo', '2019', 13),
(37, 'LUTTER_001-2019-plan-1.jpg', 'plan', '2019', 14),
(39, 'LUTTER_001-2019-plan-2.jpg', 'plan', '2019', 14),
(40, 'LUTTER_002-1919-photo-1.jpg', 'photo', '1919', 15),
(42, 'LUTTER_002-2019-plan-2.JPG', 'plan', '2019', 15),
(43, 'OTTMARSHEIM_001-2019-photo-1.JPG', 'photo', '2019', 16),
(44, 'ECOMUSEE_001-2019-photo-1.JPG', 'photo', '2019', 17),
(45, 'ECOMUSEE_002-2019-photo-1.jpg', 'photo', '2019', 18),
(46, 'ECOMUSEE_002-2019-photo-2.jpg', 'photo', '2019', 18),
(47, 'GUEMAR_001-1990-photo-1.jpg', 'photo', '1990', 19),
(49, 'GUEMAR_001-1986-photo-2.jpg', 'photo', '1986', 19),
(50, 'GUEMAR_001-1920-photo-3.jpg', 'photo', '1920', 19),
(51, 'GUEMAR_001-1919-photo-4.jpg', 'photo', '1919', 19),
(52, 'GUEMAR_001-1917-photo-5.jpg', 'photo', '1917', 19);
