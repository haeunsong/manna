CREATE DATABASE  IF NOT EXISTS `manna` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `manna`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: manna
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `boardNumber` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `content` text,
  `writeDatetime` varchar(45) DEFAULT NULL,
  `writerNickname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`boardNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (6,'세번째 페이지에 있는 글을 수정했어요.','헤헤헤','2024-03-28 20:20:07','나는 별명이에요.'),(7,'adsfasdf','adfadf','2024-03-28 20:51:55','adfadf'),(8,'드디어 된다!!','오예에에에 기쁘다. ','2024-03-28 20:53:26','meyame'),(9,'과연 두근두근 히히','본문을 작성해주세요!! 과연 이미지도 올라갈까아아아요오옹!\n','2024-03-28 21:00:18','호야호잇'),(11,'잘 업로드가 될까요','폰 케이스 바꾸고 싶다. 뭘로 바꾸지.? 봄이다. 힐링이다. 근데 세로 사진은 지나치게 크게 첨부가 되네. 하하.','2024-04-02 20:04:16','호야호잇'),(12,'가장 최신글이에요 과연..?','가장 최신글인데 나 잘 뜨나? 이건 조금 길게 써서 테스트를 해보자. 메인 화면에 어떻게 뜨는 것인가!\n무슨 글을 끌어와볼까요?\n\n두 나무 근처까지 그들이 왔다. 두 나무는 기다렸다. 사람은 날카로운 도구로 한 나무의 줄기를 찍었다. 찍고 또 찍었다. 나무는 점점 기울었다. 나무는 나무를 바라볼 수밖에 없었다. 나무가 쓰러졌다. 강렬한 고통의 냄새가 나무를 에워쌌다. 사람들은 쓰러진 나무의 가지와 잎을 대충 잘라낸 뒤 줄기를 수레에 싣고 떠났다.\n\n  홀로 남은 나무 주변을 뒹구는 푸른 이파리와 나뭇가지.\n\n  수수께끼처럼 남은 그루터기.\n\n  그와 같은 죽음은 처음이었다.\n\n  그처럼 강제적인 죽음은.\n\n  세월에 순응해 쓰러지거나 비바람에 뿌리째 뽑히거나 속부터 썩어 마침내 부러지는 나무는 숱했다. 쓰러지고 뽑힌 뒤에도 나무는 그 자리에서 숲이 되었다. 그루터기만 남기고 줄기는 통째로 사라져버리는 기괴한 죽음은 300년이 몇 번씩 거듭되는 동안 단 한 번도 없었다. 숲에서 보고 들은 죽음과 완전히 달랐다. 그러므로 그것은 죽음이 아니었다. 이별 또한 아니었다. 훼손이었다. 파괴였다. 폭발이자 비극이었다. - <단 한 사람>, 최진영 - 밀리의 서재 \n\n\n\n','2024-04-03 09:19:27','나는야룰루'),(13,'하루에 2시간도 코테안하면서! 일주일에 몇 문제 안풀면서!','어려움을 논하지 말라...\n','2024-04-04 12:57:52','투덜투덜'),(15,'타이틀 이미지가 잘 설정이 될까?','타이틀 이미지야, 잘 설정이 되니?\n블라 블라 이곳에 어떤 본문을 쓸 까요. 그렇습니다. BoardListView 를 만들되, 이는 entity 가 아니라 DTO 입니다. 그렇기에 따로 mysql 에 테이블을 만들어주지 않아도 됩니다.\n\n1. BoardListView.java 파일 만들어 주기\n\n@Data\npublic class BoardListView {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    int boardNumber;\n\n    String title;\n    String content;\n    String titleImage; // 타이틀 이미지\n\n    String writeDatetime;\n    String writerNickname;\n\n}\n\n2. BoardService.java 수정\n\n   2-1) 처음에 게시물을 post 하는 로직 수정이 필요하다. 이미지를 모두 저장해주었으면, 아래 로직을 추가해준다.\n// 이미지 저장 후, 첫 번째 이미지를 대표 이미지로 설정한다.\n         if (!images.isEmpty()) {\n               board.setTitleImage(images.get(0));\n         }\n\n\n\n  2-2) 게시물을 불러올 때 Board 엔터티로 불러오되, 보여줄 때는 Board 엔터티 그대로 보여주는게 아니라, 새로 만든 BoardListView dto 형식으로 보여준다.\n\n아래 형식으로!\n\n  public List<BoardListView> getAllPosts() {\n// 최근 작성한 순서대로 불러오기\n        List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, \"writeDatetime\"));\n        List<BoardListView> boardListViews = new ArrayList<>();\n        for (Board board : boards) {\n            BoardListView boardListView = new BoardListView();\n            boardListView.setBoardNumber(board.getBoardNumber());\n            boardListView.setTitle(board.getTitle());\n            boardListView.setContent(board.getContent());\n            boardListView.setWriteDatetime(board.getWriteDatetime());\n            boardListView.setWriterNickname(board.getWriterNickname());\n\n            if (board.getTitleImage() != null) {\n                System.out.println(\"타이틀 이미지가 존재합니다.\");\n                boardListView.setTitleImage(board.getTitleImage().getImageUrl());\n            } else {\n                System.out.println(\"타이틀 이미지가 없습니다.\");\n            }\n            boardListViews.add(boardListView);\n        }\n        return boardListViews;\n    }\n\n\n====+ 개발 추가 사항 +====\n - 이미지를 그냥 불러오는 것 말고, 복사 붙여넣기도 가능하게 하려 면 어떻게 해야할까?\n - 본문 글 작성할 때 [tab] 키 로 들여쓰기가 안되네... 어떻게 하지?\n- 글 작성 시에 폰트 색깔도 지정할 수 있게 하고 싶다!\n- 그리고 글 작성시 마지막까지 가면 뭔가 에러가 나네...\n- 이미지를 글 중간에 넣을 수가 없다..!\n\n','2024-04-08 17:07:23','자발개'),(18,'흠 아주 디자인이 제각각이군','크크크 \n타이틀 이미지 좀 예쁜 걸로 하자. 근데 생각보다 뭐 없군..\n폰트 좀 통일시켜야겠다. 이미지 사이즈도 조정좀 해야겠다.\n','2024-04-17 01:48:40','된다헤헤'),(24,'난 굉장히 길어. 타이틀 이미지가 굉장히 길면 어떻게 표시될까나~~???\n이릴리이ㅣㄹ','본문. 이제 페이지네이션은 잘 처리가 된다! 신기하게 껐다 켜니까 되네?? ㅋㅋㅋ\n이미지도 하나 넣어주장!!','2024-05-01 11:00:12','타이틀 이미지'),(26,'글 수정하면 메인페이지로 넘어가기','하지만 만약... 3페이지에 있는 글을 수정하면 메인페이지가 아니라, 해당 글이 있는 페이지로 나가게 하고 싶어!\n글을 여러 줄을 써보자.\n이스라엘 백성이 출애굽 할 때 애굽 사람들에게서 금은 패물과 의복 등 물품을 구하여 가지고 나왔습니다. 그것으로 광야에서 성막을 만들었지요. 한때 애굽 사람들의 소유물이었으며 그들이 좋아하며 즐겨 쓰던 물건들입니다. 성막의 재료는 다 애굽의 것이었습니다. \n			이처럼 하나님 나라의 일은 세상 것을 가지고 해야 합니다. 자신이 하던 일을 그대로 계속하되 일에 대한 동기와 태도를 바꾸면 됩니다. 자기 자신을 위해서 일하는가 아니면 하나님을 위해서 일하는가의 문제입니다. - <왜 일하는가?>, 조정민 지음 - 밀리의 서재 https://www.millie.co.kr/v3/bookDetail/e784968b54c24e55\n하지만 만약... 3페이지에 있는 글을 수정하면 메인페이지가 아니라, 해당 글이 있는 페이지로 나가게 하고 싶어!\n글을 여러 줄을 써보자.\n이스라엘 백성이 출애굽 할 때 애굽 사람들에게서 금은 패물과 의복 등 물품을 구하여 가지고 나왔습니다. 그것으로 광야에서 성막을 만들었지요. 한때 애굽 사람들의 소유물이었으며 그들이 좋아하며 즐겨 쓰던 물건들입니다. 성막의 재료는 다 애굽의 것이었습니다. \n			이처럼 하나님 나라의 일은 세상 것을 가지고 해야 합니다. 자신이 하던 일을 그대로 계속하되 일에 대한 동기와 태도를 바꾸면 됩니다. 자기 자신을 위해서 일하는가 아니면 하나님을 위해서 일하는가의 문제입니다. - <왜 일하는가?>, 조정민 지음 - 밀리의 서재 https://www.millie.co.kr/v3/bookDetail/e784968b54c24e55\n\n\n하지만 만약... 3페이지에 있는 글을 수정하면 메인페이지가 아니라, 해당 글이 있는 페이지로 나가게 하고 싶어!\n글을 여러 줄을 써보자.\n이스라엘 백성이 출애굽 할 때 애굽 사람들에게서 금은 패물과 의복 등 물품을 구하여 가지고 나왔습니다. 그것으로 광야에서 성막을 만들었지요. 한때 애굽 사람들의 소유물이었으며 그들이 좋아하며 즐겨 쓰던 물건들입니다. 성막의 재료는 다 애굽의 것이었습니다. \n			이처럼 하나님 나라의 일은 세상 것을 가지고 해야 합니다. 자신이 하던 일을 그대로 계속하되 일에 대한 동기와 태도를 바꾸면 됩니다. 자기 자신을 위해서 일하는가 아니면 하나님을 위해서 일하는가의 문제입니다. - <왜 일하는가?>, 조정민 지음 - 밀리의 서재 https://www.millie.co.kr/v3/bookDetail/e784968b54c24e55\n하지만 만약... 3페이지에 있는 글을 수정하면 메인페이지가 아니라, 해당 글이 있는 페이지로 나가게 하고 싶어!\n글을 여러 줄을 써보자.\n이스라엘 백성이 출애굽 할 때 애굽 사람들에게서 금은 패물과 의복 등 물품을 구하여 가지고 나왔습니다. 그것으로 광야에서 성막을 만들었지요. 한때 애굽 사람들의 소유물이었으며 그들이 좋아하며 즐겨 쓰던 물건들입니다. 성막의 재료는 다 애굽의 것이었습니다. \n			이처럼 하나님 나라의 일은 세상 것을 가지고 해야 합니다. 자신이 하던 일을 그대로 계속하되 일에 대한 동기와 태도를 바꾸면 됩니다. 자기 자신을 위해서 일하는가 아니면 하나님을 위해서 일하는가의 문제입니다. - <왜 일하는가?>, 조정민 지음 - 밀리의 서재 https://www.millie.co.kr/v3/bookDetail/e784968b54c24e55\n\n','2024-05-01 16:36:19','수정이'),(33,'관리자 로그인을 성공하였습니다llll.','본문입니다. ','2024-05-28 17:24:48','관리자에요.'),(55,'현재까지 구현된 상황 보고','현재까지 이 프로젝트에 구현된 기능들을 설명드리겠습니다.\n이 게시판은 익명의 사용자가 자유롭게 글을 작성할 수 있게 되어있습니다. 하지만, 수정/삭제는 불가합니다.\n\n만약, 수정/삭제를 하고 싶다면 \'관리자 로그인\'을 해야합니다. \n로고에 대고 오른쪽 마우스 버튼을 클릭하면 \'관리자 로그인 페이지로 이동하시겠습니까?\' 라는 창이 나옵니다.\n거기서 확인 버튼을 누른 후 이동한 페이지에서 회원가입과 로그인을 진행하면 됩니다.\n\n회원가입하면 무조건 관리자가 되어 \"ROLE_ADMIN\" 권한을 부여받게됩니다. \n그리고 그 때부터 수정/삭제도 가능해집니다.\n\n현재 로그인된 나의 정보를 보고싶다면 로그인 시 새로 생기는 우측 상단의 \'유저 아이콘\'을 클릭하면 유저 페이지로 넘어갑니다.\n\n닉네임을 \'관리자\'로 설정 후에 글을 쓰면 닉네임 색이 빨간색으로 변해 더욱 쉽게 알아볼 수 있습니다.\n\n\n','2024-06-05 14:20:40','관리자'),(61,'공지2 - 최종제출에 관하여','(1) 교무처에 제출할 결과 보고서\n\n  1-1) 인쇄 & 작성자 사인 & 스캔한 이미지와 문서 파일을 나에게 이메일로 보내거나\n\n  1-2) 사인 이미지를 문서 파일에 넣어서 나에게 이메일로 보내요\n\n \n\n(2) 서버 설치 운영이 어려우면\n\n  자세한 시연 동영상과,\n\n  내가 직접 실행해 볼 수 있도록 DB 설치부터 플젝 빌드해서 실행하는 방법에 대한 안내 문서를 제출해도 됩니다.\n\n ','2024-06-18 13:32:50','관리자'),(62,'익명이1이 쓴 제목입니다.','안녕하세요, 소프트웨어 캡스톤 디자인 시연 설명 중인 송하은입니다.\n이 본문에 사진을 첨부해보겠습니다. \n','2024-06-18 16:13:33','익명이1'),(65,'제목입니다.22','본문입니다. 2222\n','2024-06-19 11:18:41','익명이6');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boardListView`
--

DROP TABLE IF EXISTS `boardListView`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boardListView` (
  `boardNumber` int NOT NULL,
  `title` text,
  `content` text,
  `boardTitleImage` text,
  `writeDatetime` varchar(45) DEFAULT NULL,
  `writerNickname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`boardNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boardListView`
--

LOCK TABLES `boardListView` WRITE;
/*!40000 ALTER TABLE `boardListView` DISABLE KEYS */;
/*!40000 ALTER TABLE `boardListView` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `imageId` int NOT NULL AUTO_INCREMENT,
  `boardNumber` int DEFAULT NULL,
  `imageUrl` text,
  PRIMARY KEY (`imageId`),
  KEY `boardNumber` (`boardNumber`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`boardNumber`) REFERENCES `board` (`boardNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (6,9,'http://localhost:4000/file/b1c3f6d4-9960-4c94-93de-2734a9a9f675.jpg'),(7,11,'http://localhost:4000/file/3c052d68-ba2e-4092-99d1-d220f41f6f8e.jpg'),(8,12,'http://localhost:4000/file/4e7fc189-db50-4977-889c-58dade837676.jpg'),(9,13,'http://localhost:4000/file/9f1be302-7696-4526-9f1d-65af6cebe932.jpg'),(12,15,'http://localhost:4000/file/9f6092d6-acf1-4c25-afe0-b00d4e7ebc50.png'),(20,18,'http://localhost:4000/file/7cb92a2a-805c-43b4-955a-7259c3ddcae5.jpg'),(21,24,'http://localhost:4000/file/fcebbd03-57f8-447f-95cc-2dc9f3b24520.PNG'),(25,6,'http://localhost:4000/file/c51e5352-5fe1-437c-9133-d8eb095537b8.jpg'),(39,26,'http://localhost:4000/file/2c1bdb14-feb2-4f29-920e-90ec4e9f624c.png'),(40,26,'http://localhost:4000/file/1e52360e-45fd-40af-8e12-22659315b299.jpg'),(53,61,'http://localhost:4000/file/5c9325e7-78c5-4c7c-8c01-d49ee03a3cf6.jpg'),(54,62,'http://localhost:4000/file/a5197dfe-c91f-4930-ae69-fe9ccd220311.jpg'),(58,65,'http://localhost:4000/file/9bc7696a-f920-434d-afa2-be068191ff4b.JPG');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search`
--

DROP TABLE IF EXISTS `search`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search` (
  `searchId` int NOT NULL AUTO_INCREMENT,
  `searchWord` text,
  `relationWord` text,
  `relation` tinyint DEFAULT NULL,
  PRIMARY KEY (`searchId`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search`
--

LOCK TABLES `search` WRITE;
/*!40000 ALTER TABLE `search` DISABLE KEYS */;
INSERT INTO `search` VALUES (1,'게시물',NULL,0),(2,'본문',NULL,0),(3,'본문',NULL,0),(4,'게시물',NULL,0),(5,'게시물',NULL,0),(6,'게시물',NULL,0),(7,'게시',NULL,0),(8,'게',NULL,0),(9,'삭',NULL,0),(10,'삭',NULL,0),(11,'삭',NULL,0),(12,'게시물',NULL,0),(13,'본문',NULL,0),(14,'본문',NULL,0),(15,'본문',NULL,0),(16,'본문',NULL,0),(17,'본문',NULL,0),(18,'본문',NULL,0),(19,'본문',NULL,0),(20,'본',NULL,0),(21,'본',NULL,0),(22,'본',NULL,0),(23,'본}',NULL,0),(24,'본','}',0),(25,'}','본',1),(26,'본}',NULL,0),(27,'본}',NULL,0),(28,'본}',NULL,0),(29,'본}',NULL,0),(30,'본}',NULL,0),(31,'본}',NULL,0),(32,'본',NULL,0),(33,'현}',NULL,0),(34,'현}',NULL,0),(35,'본',NULL,0),(36,'현',NULL,0),(37,'현',NULL,0),(38,'ㅇ}',NULL,0),(39,'ㅇ}',NULL,0),(40,'본',NULL,0),(41,'본',NULL,0),(42,'본',NULL,0),(43,'본',NULL,0),(44,'본',NULL,0),(45,'본',NULL,0),(46,'본',NULL,0),(47,'본',NULL,0),(48,'본',NULL,0),(49,'본',NULL,0),(50,'본',NULL,0),(51,'본',NULL,0),(52,'본',NULL,0),(53,'본',NULL,0),(54,'본',NULL,0),(55,'본',NULL,0),(56,'본',NULL,0),(57,'본',NULL,0),(58,'본','본',0),(59,'본','본',1),(60,'본',NULL,0),(61,'본',NULL,0),(62,'본','본',0),(63,'본','본',1),(64,'본',NULL,0),(65,'본',NULL,0),(66,'본','본',0),(67,'본','본',1),(68,'본','본',0),(69,'본','본',1),(70,'본','본',0),(71,'본','본',1),(72,'본',NULL,0),(73,'본',NULL,0),(74,'현',NULL,0),(75,'현',NULL,0),(76,'본','현',0),(77,'현','본',1),(78,'본',NULL,0),(79,'본',NULL,0),(80,'현','본',0),(81,'본','현',1),(82,'본','현',0),(83,'현','본',1),(84,'본',NULL,0),(85,'본',NULL,0),(86,'현','본',0),(87,'본','현',1),(88,'ㅁㅇ','현',0),(89,'현','ㅁㅇ',1),(90,'본','ㅁㅇ',0),(91,'ㅁㅇ','본',1),(92,'관','본',0),(93,'본','관',1),(94,'관',NULL,0),(95,'관',NULL,0),(96,'현','관',0),(97,'관','현',1),(98,'본','현',0),(99,'현','본',1),(100,'본','본',0),(101,'본','본',1),(102,'본','본',0),(103,'본','본',1),(104,'본','본',0),(105,'본','본',1),(106,'본','본',0),(107,'본','본',1),(108,'본','본',0),(109,'본','본',1),(110,'본','본',0),(111,'본','본',1),(112,'본','본',0),(113,'본','본',1),(114,'관',NULL,0),(115,'관',NULL,0),(116,'난',NULL,0),(117,'난',NULL,0),(118,'관',NULL,0),(119,'관',NULL,0),(120,' 관',NULL,0),(121,' 관',NULL,0),(122,'관',NULL,0),(123,'관',NULL,0),(124,'관',NULL,0),(125,'관',NULL,0),(126,'관',NULL,0),(127,'관',NULL,0),(128,'본',NULL,0),(129,'본',NULL,0),(130,'본',NULL,0),(131,'본',NULL,0),(132,'제목',NULL,0),(133,'제목',NULL,0);
/*!40000 ALTER TABLE `search` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `email` varchar(45) NOT NULL,
  `password` text,
  `nickname` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin@com','$2a$10$MEbzl9Y6vCyjQXln8FM9zODOj61UO7rU7EQpwtHFi69S6YvP3Po8K','관리자','ROLE_ADMIN'),('admin@naver.com','$2a$10$3SVLeOLsE.oWNltwAm2M8O1Z1WI4J6he0SXcHAAmitOKKHC1uea5O','관리자','ROLE_ADMIN'),('admin2@com','$2a$10$1y7HFpHQTpv5AGkLh2Qk4ehif5vyztdA3GGFXlVxUOjM6F5oMa7uS','관리자2','ROLE_ADMIN'),('admin2@naver.com','$2a$10$tFuC8Zo9QaH8TiDT8MY8OebYuRLtWSbiT.awSuVDr0xnPx/nHorRm','관리자','ROLE_ADMIN'),('admin6@naver.com','$2a$10$7QdEmu8aOD5Ol.j7/t.W8.5XF2hH5XoKi9oVeL25NrNG1saAdrkvW','관리자6','ROLE_ADMIN'),('admin77@naver.com','$2a$10$QwInbd3i2iSGYhTArNOUEO83e2cl5EZVe67L06Ww8T.MkCR.enrGS','관리자77','ROLE_ADMIN'),('jamy@com','$2a$10$6uBG0c8E2yrZWqLlblaa0OZ.FXfqvuV93XtwvwdLguwgKSxkM0IES','호야호잇','ROLE_ADMIN'),('jamy0225@naver.com','$2a$10$LGbglresPdEBrtmWF5EgZevHWuk.V7bfsq7UVmWdChF5ZIoqW/53K','워터터터','ROLE_ADMIN'),('jamy2@com','$2a$10$od9u.hi/WHCGzY4B4VBMrOeb3h4sxjK.qtCDyAjulI.wjTABDvUpW','호야호잇','ROLE_ADMIN'),('test1@com','$2a$10$N7A305w1YBJXlxGHtvMHm.MnDgHZ14qfemidadU9v4UcA1sxTwMJq','haeuns','ROLE_ADMIN'),('test2@com','$2a$10$IUhbFB9dm79MJG4Z4FDYTepB25a3JWIGxPP1AxQ.gMo2L7d35NK22','haeuns','ROLE_ADMIN'),('test3@com','$2a$10$VVAZ4bHQLWbQFr1BkoXMheItOz0t1TulQ3TLrT4yoxMntGRmEMSMq','haeuns','ROLE_ADMIN'),('test3@naver.com','$2a$10$PQ0NyoBbI3Kl99j/T1zJfOPsUMGZdmaSnDI6Q4NwKsBALhMEAqMQK','haeuns','ROLE_ADMIN'),('test4@com','$2a$10$kbynBPwe6.9xV2UnsEeSd.WpL.mElRze1eU1P3OvpnwnD0uq2p/hC','과연될까','ROLE_ADMIN'),('test5@com','$2a$10$nmkOLRnRScrlns4aJQZUFed3cORQ/jqGAhX86iRyHlnkuKOOxQrY.',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-19 11:37:09
