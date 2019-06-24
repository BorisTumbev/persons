
CREATE TABLE IF NOT EXISTS `persons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(12) NOT NULL,
  `lname` varchar(15) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

INSERT INTO `persons` (`id`, `fname`, `lname`, `date`) VALUES
(1, 'Sylvester', 'Stallone', '2019-02-11 11:11:11'),
(2, 'Jason', 'Statham', '2019-02-11 11:11:11'),
(3, 'Arnold', 'Schwarzenegger', '2019-02-11 11:11:11'),
(4, 'Chuck', 'Norris', '2019-02-11 11:11:11'),
(5, 'Bruce', 'Willis', '2019-02-11 11:11:11');
