-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-01-2019 a las 12:41:14
-- Versión del servidor: 5.7.23
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_ci2`
--

-- 
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

DROP TABLE IF EXISTS `tareas`;
CREATE TABLE IF NOT EXISTS `tareas` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `fecha` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `nombre`, `descripcion`, `fecha`, `imagen`) VALUES
(15, 'Proyecto Avianca', 'Crear plataforma para los vuelos internacionales y nacionales, la cual entregue informaciÃ³n precisa del peso, velocidad y consumo de combustible.', '2019-01-20', 'image-1547615949-descarga (1).jfif'),
(16, 'Proyecto Oriflame', 'Crear Landing-Page para la empresa Oriflame, la cual liste todos los productos que se maneja.', '2019-03-16', 'image-1547618811-fases1.jpg'),
(17, 'Empresa ETA', 'Proyecto para crear un videojuego llamado Gta, el cual consta de un personaje que puede robar carros.', '2019-06-15', 'image-1547618569-8.jpg'),
(18, 'Proyecto Rappi', 'Crear una aplicaciÃ³n, la cual pueda mejorar el servicio de mensajerÃ­a por medio de una plataforma, en la cual puede interactuar el mensajero con el comprador.', '2019-05-10', 'image-1547619165-9.png'),
(19, 'Proyecto Uber', 'Crear una aplicaciÃ³n para mejorar la seguridad, rapidez, comodidad del medio de transporte, ya que es un servicio mÃ¡s personalizado.', '2019-01-13', 'image-1547618752-Objetivos3.jpg'),
(20, 'AplicaciÃ³n Trivago', 'Proyecto para crear aplicaciÃ³n web, la cual liste los hoteles a nivel mundial , con sus precios, ofertas y capacidades.', '2019-04-13', 'image-1547618715-Gefies.png'),
(21, 'Proyecto Netflix', 'Crear plataforma para mejorar la calidad y velocidad de las pelÃ­culas y series que estÃ©n de moda a un precio muy bajo.', '2019-06-22', 'image-1547619145-fases2.jpg'),
(22, 'AplicaciÃ³n Spotify', 'Proyecto para crear aplicaciÃ³n android, para seleccionar la musica favorita y poder descargar y escuchar sin Internet.', '2019-07-28', 'image-1547618673-fases3.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `password`) VALUES
(1, 'Alice', 'alice@alice.com', 'password');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
