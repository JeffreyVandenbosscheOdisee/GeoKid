-- phpMyAdmin SQL Dump
-- version 4.4.1.1
-- http://www.phpmyadmin.net
--
-- Host: 10.3.1.103
-- Gegenereerd op: 06 jun 2016 om 10:32
-- Serverversie: 5.5.41
-- PHP-versie: 5.5.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jeffrwh153_Geo`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `achievements`
--

CREATE TABLE IF NOT EXISTS `achievements` (
  `Id` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Needed_points` int(10) NOT NULL,
  `Type` enum('Tasks','Playgrounds') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `achievements`
--

INSERT INTO `achievements` (`Id`, `Name`, `Needed_points`, `Type`) VALUES
(1, 'Bezoek eerste speelplein', 1, 'Playgrounds'),
(2, 'eerste taak voltooid', 1, 'Tasks'),
(3, '3 taken voltooid', 3, 'Tasks'),
(4, '4 speelpleinen bezocht', 4, 'Playgrounds');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `achievements_has_subaccounts`
--

CREATE TABLE IF NOT EXISTS `achievements_has_subaccounts` (
  `Achievements_Id` int(11) NOT NULL,
  `SubAccounts_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `achievements_has_subaccounts`
--

INSERT INTO `achievements_has_subaccounts` (`Achievements_Id`, `SubAccounts_Id`) VALUES
(1, 21),
(2, 21),
(3, 21),
(1, 22),
(1, 33),
(2, 33),
(3, 33),
(4, 33),
(1, 34),
(2, 34),
(3, 34);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `completed_tasks`
--

CREATE TABLE IF NOT EXISTS `completed_tasks` (
  `Id` int(11) NOT NULL,
  `SubAccounts_Id` int(11) NOT NULL,
  `Playgrounds_Id` int(11) NOT NULL,
  `Tasks_Id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `completed_tasks`
--

INSERT INTO `completed_tasks` (`Id`, `SubAccounts_Id`, `Playgrounds_Id`, `Tasks_Id`) VALUES
(15, 21, 145, 8),
(16, 34, 145, 8),
(17, 33, 54, 20),
(19, 33, 54, 1),
(20, 33, 54, 2),
(21, 33, 54, 7),
(22, 33, 54, 11);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `favorite_parks_masteraccount`
--

CREATE TABLE IF NOT EXISTS `favorite_parks_masteraccount` (
  `Playgrounds_Id` int(11) NOT NULL,
  `MasterAccounts_Id` int(11) NOT NULL,
  `Favorite_playground` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `favorite_parks_masteraccount`
--

INSERT INTO `favorite_parks_masteraccount` (`Playgrounds_Id`, `MasterAccounts_Id`, `Favorite_playground`) VALUES
(3, 6, 0),
(7, 3, 0),
(7, 7, 0),
(55, 3, 0),
(62, 3, 0),
(62, 6, 0),
(65, 3, 0),
(112, 3, 0),
(112, 6, 0),
(113, 3, 0),
(113, 6, 0),
(114, 3, 0),
(122, 6, 0),
(135, 7, 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `functions`
--

CREATE TABLE IF NOT EXISTS `functions` (
  `Id` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `functions`
--

INSERT INTO `functions` (`Id`, `Name`) VALUES
(1, 'petanque'),
(2, 'skate'),
(3, 'zandbak'),
(4, 'voetbal'),
(5, 'speeltoestellen'),
(6, 'avontuurlijk spelen'),
(7, 'basketbal');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `functions_has_playgrounds`
--

CREATE TABLE IF NOT EXISTS `functions_has_playgrounds` (
  `Functions_Id` int(11) NOT NULL,
  `PlayGrounds_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `functions_has_playgrounds`
--

INSERT INTO `functions_has_playgrounds` (`Functions_Id`, `PlayGrounds_Id`) VALUES
(1, 10),
(1, 11),
(2, 11),
(3, 11),
(4, 11),
(5, 11),
(1, 12),
(3, 12),
(4, 12),
(5, 12),
(3, 13),
(5, 13),
(6, 13),
(4, 14),
(5, 14),
(4, 15),
(5, 15),
(6, 15),
(7, 15),
(3, 16),
(4, 16),
(5, 16),
(3, 17),
(5, 17),
(3, 18),
(5, 18),
(1, 20),
(5, 20),
(5, 21),
(6, 21),
(4, 22),
(1, 23),
(5, 23),
(3, 24),
(5, 24),
(3, 25),
(5, 25),
(2, 26),
(3, 27),
(1, 28),
(3, 28),
(5, 28),
(6, 28),
(2, 29),
(4, 29),
(7, 29),
(1, 30),
(3, 30),
(5, 30),
(3, 31),
(4, 31),
(5, 31),
(7, 31),
(2, 32),
(3, 32),
(5, 32),
(1, 33),
(3, 33),
(4, 33),
(5, 33),
(7, 33),
(4, 34),
(5, 34),
(3, 35),
(5, 35),
(3, 36),
(5, 36),
(1, 37),
(3, 37),
(4, 37),
(5, 37),
(6, 37),
(3, 38),
(5, 38),
(4, 39),
(4, 40),
(3, 41),
(5, 41),
(5, 42),
(7, 42),
(5, 43),
(1, 44),
(4, 44),
(5, 44),
(5, 45),
(6, 45),
(4, 46),
(5, 46),
(5, 47),
(3, 48),
(5, 48),
(7, 49),
(3, 50),
(4, 50),
(5, 50),
(3, 51),
(4, 51),
(5, 51),
(7, 51),
(3, 52),
(5, 52),
(5, 53),
(1, 54),
(3, 54),
(4, 54),
(5, 54),
(7, 54),
(7, 55),
(3, 56),
(4, 56),
(5, 56),
(1, 57),
(4, 57),
(5, 57),
(3, 58),
(5, 58),
(3, 60),
(4, 60),
(5, 60),
(7, 60),
(1, 62),
(3, 62),
(4, 62),
(5, 62),
(3, 63),
(5, 63),
(7, 63),
(1, 64),
(3, 64),
(4, 64),
(5, 64),
(7, 64),
(3, 65),
(5, 65),
(3, 66),
(4, 66),
(5, 66),
(6, 66),
(7, 66),
(3, 67),
(5, 67),
(3, 68),
(5, 68),
(7, 68),
(1, 69),
(3, 69),
(4, 69),
(5, 69),
(3, 70),
(5, 70),
(1, 71),
(3, 71),
(4, 71),
(5, 71),
(7, 71),
(1, 72),
(3, 72),
(5, 72),
(6, 72),
(3, 73),
(5, 73),
(2, 74),
(3, 74),
(5, 74),
(5, 75),
(3, 76),
(4, 76),
(5, 76),
(1, 77),
(7, 78),
(5, 79),
(7, 79),
(3, 80),
(5, 80),
(7, 80),
(3, 81),
(5, 81),
(7, 81),
(5, 82),
(3, 83),
(5, 83),
(3, 84),
(5, 84),
(3, 85),
(5, 85),
(2, 86),
(5, 86),
(7, 86),
(1, 87),
(3, 87),
(5, 87),
(3, 88),
(4, 88),
(5, 88),
(6, 88),
(3, 89),
(5, 89),
(3, 90),
(4, 90),
(5, 90),
(7, 90),
(3, 91),
(4, 91),
(5, 91),
(3, 92),
(4, 92),
(5, 92),
(3, 93),
(5, 93),
(2, 94),
(5, 94),
(7, 94),
(4, 95),
(3, 96),
(4, 96),
(5, 96),
(3, 97),
(4, 97),
(5, 97),
(3, 98),
(5, 98),
(6, 98),
(5, 99),
(3, 100),
(5, 100),
(5, 101),
(7, 102),
(7, 103),
(3, 104),
(6, 104),
(4, 105),
(1, 106),
(3, 106),
(5, 106),
(5, 107),
(3, 108),
(4, 108),
(5, 108),
(7, 108),
(6, 109),
(1, 110),
(3, 110),
(5, 110),
(7, 111),
(3, 112),
(5, 112),
(6, 112),
(3, 113),
(5, 113),
(6, 113),
(1, 114),
(3, 114),
(5, 114),
(1, 115),
(4, 115),
(1, 116),
(3, 116),
(5, 116),
(2, 117),
(4, 117),
(5, 117),
(7, 117),
(4, 118),
(5, 118),
(6, 118),
(3, 119),
(5, 119),
(3, 120),
(5, 120),
(1, 121),
(3, 121),
(5, 121),
(7, 121),
(5, 122),
(1, 123),
(3, 123),
(4, 123),
(5, 123),
(7, 123),
(4, 124),
(5, 124),
(3, 125),
(5, 125),
(7, 126),
(3, 127),
(4, 127),
(5, 127),
(3, 128),
(5, 128),
(6, 129),
(3, 130),
(5, 130),
(7, 130),
(5, 131),
(7, 132),
(1, 133),
(4, 133),
(7, 133),
(3, 134),
(4, 134),
(5, 134),
(6, 134),
(1, 135),
(3, 135),
(5, 135),
(5, 136),
(3, 138),
(4, 138),
(5, 138),
(5, 139),
(3, 140),
(5, 140),
(3, 141),
(5, 141),
(6, 141),
(1, 142),
(6, 143),
(1, 144),
(5, 144),
(1, 145),
(4, 146),
(1, 147),
(1, 148),
(1, 149),
(2, 150),
(7, 150);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `masteraccounts`
--

CREATE TABLE IF NOT EXISTS `masteraccounts` (
  `Id` int(11) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FamilyName` varchar(150) NOT NULL,
  `Street_And_Nr` varchar(150) NOT NULL,
  `ZipCode` int(11) NOT NULL,
  `City` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `masteraccounts`
--

INSERT INTO `masteraccounts` (`Id`, `Email`, `Password`, `FamilyName`, `Street_And_Nr`, `ZipCode`, `City`) VALUES
(3, 'Jeffrey.vandenbossche@gmail.com', '$2y$10$.mFBmNGLq/qHP5ou67bz1u1qc1vvBWpso6.L21T6OC1MWZ.TnFnbi', 'Vandenbossche', 'Hoogstraat 17', 9820, 'Merelbeke'),
(6, 'jeffreyvdb17@hotmail.com', '$2y$10$CcuXp1RAHDYaBvXzORRRcezeq4gK4eIWIyR/Qfo0VO3ai1TWOEjPi', 'Vandenbossche', '17', 9820, 'Merelbeke'),
(7, 'elin_jonkers@hotmail.com', '$2y$10$0k/eWnDoUq0lVxGUNf0eoulLq1ADaEqp1UB4uIAalYe.HKCSbwt2e', 'Jonkers', '15', 2990, 'Wuustwezel'),
(8, 'Jeffreytest@hotmail.com', '$2y$10$9l4AgUPcUmUm3/Pk.z.1s.htJvHZazCSDwmQEwoKEfJV1FXCYheCq', 'VDB', 'Melkweg 1', 9000, 'Gent'),
(9, 'Jeffrey.vandenbossche12@gmail.com', '$2y$10$hcCm3tPwC3UWcNiMCkfOwOwTBZoy/wnbssc3UPu3eMMZ63nat/jAG', 'Vandenbossche', 'Hoogstraat 17', 9820, 'Merelbeke'),
(10, 'jeffrey.vandenbosschetest@gmail.com', '$2y$10$9j/b8SB.JZF3/nNMcxL7cOL1pH445AyZl2cXlbr7nyJGYTHC1i2oG', 'Vand', 'Hoogstraat 17', 9820, 'Merelbeke');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `playgrounds`
--

CREATE TABLE IF NOT EXISTS `playgrounds` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Longitude` float NOT NULL,
  `Latitude` float NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `playgrounds`
--

INSERT INTO `playgrounds` (`Id`, `Name`, `Longitude`, `Latitude`) VALUES
(1, 'Pastorijdreef woongroen', 3.66938, 51.0215),
(2, 'Gentstraat woongroen', 3.75825, 51.0848),
(3, 'Joannes Schinckdreef woongroen', 3.62055, 51.0669),
(4, 'Pieter Huyssensplein woongroen', 3.72248, 51.0209),
(5, 'Londenstraat voorhavenpark', 3.7285, 51.0774),
(6, 'Adolf Lootensstraat petanque', 3.61455, 51.0529),
(7, 'Hondelee woongroen', 3.71583, 50.997),
(8, 'Esperantostraat woongroen', 3.76758, 51.071),
(9, 'Hogeweg petanque', 3.74574, 51.0719),
(10, 'Antoon Catriestraat buurtpark', 3.65785, 51.05),
(11, 'Keiskantstraat recreatieterrein Keiskant', 3.64134, 51.0448),
(12, 'Pinguinstraat woongroen', 3.76401, 51.0273),
(13, 'Gustaaf Le Fevere de ten Hovelaan Frans Tochpark', 3.7606, 51.0385),
(14, 'Driebeekstraat recreatieterrein', 3.76834, 51.0373),
(15, 'Kerkstraat Arbedpark Noord speelterrein', 3.75301, 51.0445),
(16, 'Voordries speelterrein', 3.7673, 51.0415),
(17, 'Platanendreef speelterrein', 3.7652, 51.0442),
(18, 'Groeningestraat buurtpark', 3.7736, 51.0425),
(19, 'Scheldekaai speelterrein', 3.74441, 51.0449),
(20, 'Bassijnstraat woongroen', 3.74799, 51.0454),
(21, 'Oude Brusselseweg speelterrein', 3.74886, 51.041),
(22, 'Meulestedesteenweg woongroen', 3.72728, 51.0861),
(23, 'Meulesteedsesteenweg buurttuin t Postje', 3.72686, 51.0845),
(24, 'Marseillestraat woongroen', 3.72886, 51.0846),
(25, 'Zuiderlaan recreatieterrein Blaarmeersen camping', 3.6811, 51.0464),
(26, 'Zuiderlaan recreatieterrein Blaarmeersen skatezon', 3.6846, 51.047),
(27, 'Zuiderlaan recreatieterrein Blaarmeersen strandzon', 3.68752, 51.043),
(28, 'Zuiderlaan recreatieterrein Blaarmeersen waterkant', 3.69126, 51.0419),
(29, 'Rerum Novarumplein multisportterrein en skatezone', 3.71785, 51.0221),
(30, 'Kikvorsstraat woongroen', 3.71603, 51.0218),
(31, 'Steenakker recreatieterrein Henri Storyplein', 3.72531, 51.0182),
(32, 'Dracenastraat recrea Jan Yoens skate en speelzone', 3.71513, 51.0761),
(33, 'Dracenastraat recrea Jan Yoens sport- en speelzone', 3.71389, 51.0748),
(34, 'Limbastraat speelterrein', 3.72228, 51.0762),
(35, 'Vorkstraat buurtpark', 3.73374, 51.0751),
(36, 'Lübeckstraat buurtpark', 3.73912, 51.0722),
(37, 'Scandinaviëstraat woongroen', 3.74013, 51.0708),
(38, 'Bevelandstraat speelterrein', 3.73005, 51.069),
(39, 'Bevelandstraat voetbalterrein', 3.73091, 51.0685),
(40, 'Roggestraat buurtpark FNO-park', 3.70958, 51.0675),
(41, 'Pioenstraat speelterrein', 3.70593, 51.0695),
(42, 'Linnenstraat woongroen', 3.69416, 51.0685),
(43, 'Spinnerijdoorgang woongroen', 3.69117, 51.0671),
(44, 'Fluweelstraat woongroen', 3.69268, 51.0698),
(45, 'Wielewaalstraat buurtpark', 3.69533, 51.0652),
(46, 'Oosteeklostraat woongroen', 3.71767, 51.0657),
(47, 'Justus de Harduwijnlaan woongroen', 3.7283, 51.0672),
(48, 'Vogelenzangpark buurtpark', 3.72024, 51.0648),
(49, 'Opgeëistenlaan wijkpark Rabotpark', 3.71685, 51.065),
(50, 'Opgeëistenlaan speelterrein', 3.71692, 51.0631),
(51, 'Tolhuislaan recreatieterrein Tolhuis', 3.7256, 51.0644),
(52, 'Désiré Fiévéstraat woongroen', 3.73154, 51.0624),
(53, 'Kolveniersgang woongroen', 3.71436, 51.061),
(54, 'Gebroeders de Smetstraat speelterrein Zonnestraal', 3.70536, 51.0632),
(55, 'Fonteineplein speelterrein', 3.69572, 51.0618),
(56, 'Emilius Seghersplein buurtpark Luizengevecht', 3.7037, 51.0596),
(57, 'Filips van Cleeflaan woongroen', 3.71088, 51.0606),
(58, 'Lodewijk van Malestraat woongroen', 3.71417, 51.059),
(59, 'Rodelijvekensstraat woongroen', 3.72458, 51.0614),
(60, 'Godshuishammeke speelterrein', 3.72747, 51.0617),
(61, 'Ham speelloods', 3.73376, 51.0607),
(62, 'Zondernaamstraat buurtpark', 3.73445, 51.0595),
(63, 'Bibliotheekstraat wijkpark Baudelohof', 3.72922, 51.0585),
(64, 'Boerderijstraat speelterrein', 3.69541, 51.0587),
(65, 'Ooievaarstraat buurtpark', 3.69877, 51.0581),
(66, 'Nieuwewandeling wijkpark Groene Valleipark', 3.70167, 51.0538),
(67, 'Heldenplein woongroen', 3.69477, 51.0529),
(68, 'Spaans Kasteelplein speelterrein', 3.73703, 51.0544),
(69, 'Ossenstraat buurtpark Rommelwaterpark', 3.73991, 51.0505),
(70, 'Ferdinand Lousbergkaai buurtpark Astridpark', 3.73755, 51.0505),
(71, 'Wolterslaan buurtpark', 3.74561, 51.049),
(72, 'Nijverheidsstraat wijkpark Bijgaardepark', 3.74483, 51.0498),
(73, 'Snoekstraat speelterrein', 3.7422, 51.0469),
(74, 'Zuidparklaan stadspark Koning Albertpark', 3.73098, 51.046),
(75, 'Bijlokevest buurtpark', 3.71072, 51.0483),
(76, 'Landingsplein buurtpark', 3.69643, 51.0512),
(77, 'yachtdreef woongroen', 3.70304, 51.0464),
(78, 'Europalaan woongroen', 3.70103, 51.0459),
(79, 'Verenigde Natielaan woongroen', 3.70499, 51.0453),
(80, 'Belvédèreweg woongroen', 3.69662, 51.0474),
(81, 'Duifhuisstraat speelterrein', 3.70228, 51.0418),
(82, 'Handbalstraat speelterrein', 3.70819, 51.0405),
(83, 'Muinklaan stadspark Muinkpark', 3.73002, 51.0429),
(84, 'Brusselsepoortstraat speelterrein Hollainhof', 3.73697, 51.0443),
(85, 'Fam Van Rijsselberghedreef stadspark Citadelpark', 3.71957, 51.0372),
(86, 'Flamingostraat speelterrein', 3.70678, 51.0293),
(87, 'Lucas de Heerestraat buurtpark', 3.72166, 51.0334),
(88, 'Tarbotstraat buurtpark Lousbergspark', 3.74036, 51.0472),
(89, 'Vuurkruisersstraat woongroen', 3.73521, 51.0337),
(90, 'Gaston Crommenlaan buurtpark', 3.73632, 51.0361),
(91, 'Centrumplein woongroen', 3.74037, 51.0354),
(92, 'Adolf Papeleupark woongroen', 3.74952, 51.0296),
(93, 'De Naeyerdreef De Vijvers stadsdeelpark', 3.74915, 51.0358),
(94, 'Brusselsesteenweg Keizerpark wijkpark', 3.74037, 51.0419),
(95, 'Welpengang speelterrein', 3.68632, 51.085),
(96, 'Paul van Thieghem de Ten Berghe', 3.67844, 51.0791),
(97, 'Venusstraat woongroen', 3.66524, 51.0809),
(98, 'Mercuriusstraat woongroen', 3.66656, 51.0791),
(99, 'Claeys Bouüaertpark binnen', 3.67599, 51.0735),
(100, 'Claeys Bouüaertpark buiten', 3.67231, 51.0763),
(101, 'Zandloperstraat speelterrein', 3.67671, 51.0711),
(102, 'Driepikkelstraat recreatieterrein', 3.68168, 51.0671),
(103, 'Lusthoflaan recreatieterrein', 3.70011, 51.0758),
(104, 'Mimosastraat woongroen', 3.70206, 51.075),
(105, 'Ooistraat speelterrein', 3.76751, 51.1051),
(106, 'Sint-Laurentiuslaan buurtpark', 3.76534, 51.0984),
(107, 'Edmond Ronsestraat buurtpark', 3.76748, 51.0968),
(108, 'Wolfputstraat recreatieterrein', 3.76352, 51.0932),
(109, 'Gentstraat slotendries', 3.7592, 51.0832),
(110, 'Krijtekerkweg buurtpark', 3.77183, 51.084),
(111, 'Invalidenstraat speelterrein', 3.76211, 51.0772),
(112, 'Wijnakker prettige wildernis', 3.75806, 51.0548),
(113, 'Jos Verdegemstraat speelterrein', 3.75787, 51.0563),
(114, 'Rozebroekslag recreatieterrein', 3.76011, 51.06),
(115, 'Heiveldstraat Potuit speelterrein', 3.7532, 51.0628),
(116, 'Biest buurtpark', 3.75383, 51.0675),
(117, 'Heiveldstraat bibliotheek speelterrein', 3.77404, 51.0671),
(118, 'Sleutelbloemstraat buurtpark', 3.75274, 51.0739),
(119, 'Serafijnstraat speelterrein', 3.74386, 51.062),
(120, 'Halvemaanstraat woongroen', 3.74503, 51.0612),
(121, 'Azaleastraat buurtpark', 3.75108, 51.0599),
(122, 'Nieuwewijkstraat speelterrein', 3.74334, 51.0608),
(123, 'Wasstraat speelterrein', 3.74493, 51.0555),
(124, 'Sint Bernadette Sapiniere', 3.75179, 51.0718),
(125, 'Vennestraat speelterrein', 3.6706, 51.0245),
(126, 'Krijzeltand speelterrein', 3.66922, 51.02),
(127, 'Tijgerlelielaan woongroen', 3.67321, 51.0224),
(128, 'Jozefienenstraat woongroen', 3.82782, 51.1557),
(129, 'Spesbroekstraat speelbos', 3.71723, 51.1016),
(130, 'Watersnepstraat speelterrein', 3.71854, 51.0929),
(131, 'Waterlelielaan speelterrein', 3.71423, 51.0909),
(132, 'Roodborstjesstraat speelterrein', 3.70622, 51.0815),
(133, 'Botestraat stadsdeelpark Vyncke-Bovyn', 3.69484, 51.0836),
(134, 'Zandstraat woongroen', 3.70776, 51.0768),
(135, 'Ter Linden recreatieterrein Hekers', 3.711, 51.0027),
(136, 'Kortrijksesteenweg Maaltebruggepark stadspark', 3.69974, 51.0202),
(137, 'Buisstraat kapoenenpleintje', 3.64675, 51.0425),
(138, 'Meierij speelterrein', 3.73709, 51.0317),
(139, 'New-Orleansstraat woongroen', 3.73007, 51.0814),
(140, 'Acaciastraat buurtpark', 3.69969, 51.0616),
(141, 'Malpertuusplein buurtpark', 3.68785, 51.0666),
(142, 'Reinaertstraat Pierkespark', 3.70111, 51.059),
(143, 'Zuidbroek Groene Velden', 3.66403, 51.0768),
(144, 'Klaverdries woongroep', 3.65918, 51.0523),
(145, 'Leon Sarteelstraat woongroen', 3.79255, 51.0691),
(146, 'Draverstraat woongroen', 3.76938, 51.068),
(147, 'Roerstraat woongroen', 3.73137, 51.0726),
(148, 'Gasthuisstraat woongroen', 3.76521, 51.1016),
(149, 'Hyacintstraat woongroen', 3.70351, 51.0705),
(150, 'Georges De Baetsplaats skatezone', 3.81483, 51.1566);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `playgrounds_has_subaccounts`
--

CREATE TABLE IF NOT EXISTS `playgrounds_has_subaccounts` (
  `playgrounds_Id` int(11) NOT NULL,
  `subaccounts_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `playgrounds_has_subaccounts`
--

INSERT INTO `playgrounds_has_subaccounts` (`playgrounds_Id`, `subaccounts_Id`) VALUES
(145, 21),
(117, 22),
(6, 33),
(7, 33),
(54, 33),
(117, 33),
(145, 34);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `subaccounts`
--

CREATE TABLE IF NOT EXISTS `subaccounts` (
  `Id` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `MasterAccounts_Id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `subaccounts`
--

INSERT INTO `subaccounts` (`Id`, `Name`, `MasterAccounts_Id`) VALUES
(20, 'Jeffrey123', 6),
(21, 'Elin', 6),
(22, 'Jeffrey', 3),
(23, 'Elin', 7),
(24, 'Jeff', 7),
(33, 'Jeffrey', 3),
(34, 'JeffreyTest', 6);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `Id` int(11) NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Tag` enum('skate','voetbal','zandbak','speeltoestellen','Avontuurlijk') DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `tasks`
--

INSERT INTO `tasks` (`Id`, `Name`, `Tag`) VALUES
(1, 'Tel 10 bomen', NULL),
(2, 'Zoek 5 takken', NULL),
(3, 'Zoek het basketbalveld', ''),
(4, 'Scoor 5 doelpunten', 'voetbal'),
(5, 'Ga 4 keer van de glijbaan', 'speeltoestellen'),
(6, 'Tel hoeveel skaters er zijn', 'skate'),
(7, 'Speel 5 minuten in de zandbak', 'zandbak'),
(8, 'Loop 4 rondjes rond minstens 10 bomen', NULL),
(9, 'Beklim een boomstam ', 'Avontuurlijk'),
(10, 'Zoek 5 verschillende bloemen', NULL),
(11, 'Tel 10 vogels', NULL),
(12, 'Schommel 3 minuten', 'speeltoestellen'),
(13, 'Maak een zandkasteel', 'zandbak'),
(14, 'Speel een spelletje petanque', ''),
(15, 'maak een selfie met een random iemand', NULL),
(16, 'Maak een tekening in het zand', 'zandbak'),
(17, 'Zoek een spin en kom ze tonen', NULL),
(18, 'Maak een kroon uit natuurmateriaal', NULL),
(19, 'Hoeveel banken staan er in het park', NULL),
(20, 'Doe 5 koprollen', NULL),
(21, 'Spring 20 keer in de lucht', NULL),
(22, 'Zoen een boom', NULL),
(23, 'Pluk 20 grassprietjes en sorteer deze van klein naar groot', NULL);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id_UNIQUE` (`Id`);

--
-- Indexen voor tabel `achievements_has_subaccounts`
--
ALTER TABLE `achievements_has_subaccounts`
  ADD PRIMARY KEY (`Achievements_Id`,`SubAccounts_Id`),
  ADD KEY `fk_Achievements_has_SubAccounts_SubAccounts1_idx` (`SubAccounts_Id`),
  ADD KEY `fk_Achievements_has_SubAccounts_Achievements1_idx` (`Achievements_Id`);

--
-- Indexen voor tabel `completed_tasks`
--
ALTER TABLE `completed_tasks`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_Completed_tasks_Playfields1_idx` (`Playgrounds_Id`),
  ADD KEY `fk_Completed_tasks_Tasks1_idx` (`Tasks_Id`),
  ADD KEY `fk_Completed_tasks_SubAccounts1` (`SubAccounts_Id`);

--
-- Indexen voor tabel `favorite_parks_masteraccount`
--
ALTER TABLE `favorite_parks_masteraccount`
  ADD PRIMARY KEY (`Playgrounds_Id`,`MasterAccounts_Id`),
  ADD KEY `fk_Playfields_has_MasterAccounts_MasterAccounts1_idx` (`MasterAccounts_Id`),
  ADD KEY `fk_Playfields_has_MasterAccounts_Playfields1_idx` (`Playgrounds_Id`);

--
-- Indexen voor tabel `functions`
--
ALTER TABLE `functions`
  ADD PRIMARY KEY (`Id`);

--
-- Indexen voor tabel `functions_has_playgrounds`
--
ALTER TABLE `functions_has_playgrounds`
  ADD PRIMARY KEY (`Functions_Id`,`PlayGrounds_Id`),
  ADD KEY `fk_Functions_has_Playfields_Playfields1_idx` (`PlayGrounds_Id`),
  ADD KEY `fk_Functions_has_Playfields_Functions1_idx` (`Functions_Id`);

--
-- Indexen voor tabel `masteraccounts`
--
ALTER TABLE `masteraccounts`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id_UNIQUE` (`Id`);

--
-- Indexen voor tabel `playgrounds`
--
ALTER TABLE `playgrounds`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id_UNIQUE` (`Id`);

--
-- Indexen voor tabel `playgrounds_has_subaccounts`
--
ALTER TABLE `playgrounds_has_subaccounts`
  ADD PRIMARY KEY (`playgrounds_Id`,`subaccounts_Id`),
  ADD KEY `fk_playgrounds_has_subaccounts_subaccounts1_idx` (`subaccounts_Id`),
  ADD KEY `fk_playgrounds_has_subaccounts_playgrounds1_idx` (`playgrounds_Id`);

--
-- Indexen voor tabel `subaccounts`
--
ALTER TABLE `subaccounts`
  ADD PRIMARY KEY (`Id`,`MasterAccounts_Id`),
  ADD UNIQUE KEY `Id_UNIQUE` (`Id`),
  ADD KEY `fk_SubAccounts_MasterAccounts1_idx` (`MasterAccounts_Id`);

--
-- Indexen voor tabel `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id_UNIQUE` (`Id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `achievements`
--
ALTER TABLE `achievements`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT voor een tabel `completed_tasks`
--
ALTER TABLE `completed_tasks`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT voor een tabel `functions`
--
ALTER TABLE `functions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT voor een tabel `masteraccounts`
--
ALTER TABLE `masteraccounts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT voor een tabel `playgrounds`
--
ALTER TABLE `playgrounds`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=151;
--
-- AUTO_INCREMENT voor een tabel `subaccounts`
--
ALTER TABLE `subaccounts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT voor een tabel `tasks`
--
ALTER TABLE `tasks`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `achievements_has_subaccounts`
--
ALTER TABLE `achievements_has_subaccounts`
  ADD CONSTRAINT `fk_Achievements_has_SubAccounts_Achievements1` FOREIGN KEY (`Achievements_Id`) REFERENCES `achievements` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Achievements_has_SubAccounts_SubAccounts1` FOREIGN KEY (`SubAccounts_Id`) REFERENCES `subaccounts` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `completed_tasks`
--
ALTER TABLE `completed_tasks`
  ADD CONSTRAINT `fk_Completed_tasks_Playfields1` FOREIGN KEY (`Playgrounds_Id`) REFERENCES `playgrounds` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Completed_tasks_SubAccounts1` FOREIGN KEY (`SubAccounts_Id`) REFERENCES `subaccounts` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Completed_tasks_Tasks1` FOREIGN KEY (`Tasks_Id`) REFERENCES `tasks` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `favorite_parks_masteraccount`
--
ALTER TABLE `favorite_parks_masteraccount`
  ADD CONSTRAINT `fk_Playfields_has_MasterAccounts_MasterAccounts1` FOREIGN KEY (`MasterAccounts_Id`) REFERENCES `masteraccounts` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Playfields_has_MasterAccounts_Playfields1` FOREIGN KEY (`Playgrounds_Id`) REFERENCES `playgrounds` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `functions_has_playgrounds`
--
ALTER TABLE `functions_has_playgrounds`
  ADD CONSTRAINT `fk_Functions_has_Playfields_Functions1` FOREIGN KEY (`Functions_Id`) REFERENCES `functions` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Functions_has_Playfields_Playfields1` FOREIGN KEY (`PlayGrounds_Id`) REFERENCES `playgrounds` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `playgrounds_has_subaccounts`
--
ALTER TABLE `playgrounds_has_subaccounts`
  ADD CONSTRAINT `fk_playgrounds_has_subaccounts_playgrounds1` FOREIGN KEY (`playgrounds_Id`) REFERENCES `playgrounds` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_playgrounds_has_subaccounts_subaccounts1` FOREIGN KEY (`subaccounts_Id`) REFERENCES `subaccounts` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `subaccounts`
--
ALTER TABLE `subaccounts`
  ADD CONSTRAINT `fk_SubAccounts_MasterAccounts1` FOREIGN KEY (`MasterAccounts_Id`) REFERENCES `masteraccounts` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
