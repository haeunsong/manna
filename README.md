# api 목록
## BIBLE
GET /api/v1/bible/today

## BOARD
|Method|URL|
|------|-----------------|
|GET| /api/v1/board/list|
|GET| /api/v1/board/detail/{boardNumber}|
|GET| /api/v1/board/search-list/{searchWord}|
|POST| /api/v1/board/post|
|PATCH| /api/v1/board/update/{boardNumber}|
|DELETE| /api/v1/board/detail/{boardNumber}|

## AUTH
POST /api/v1/auth/sign-up
POST /api/v1/auth/sign-in
GET /api/v1/user/index

## FILE
POST /file/upload
GET /file/{fileName}

# 1. 사용된 기술들

## 1.1 프론트엔드

Manna 프론트엔드는 JavaScript 언어와 JavaScript 언어 라이브러리인 React 로 개발되어있습니다.

사용된 기술들과 버전은 아래와 같습니다.

```markdown
React: 18.2.0
axios: 1.6.8
react-router-dom: 6.22.3
typescript: 4.9.5
zustand: 4.5.2
```

## 1.2 백엔드

Manna 백엔드는 Java 언어와 Java 언어  프레임워크인 Spring 로 개발되어있습니다.

사용된 기술들과 버전은 아래와 같습니다.

```markdown
Spring Boot: 3.2.3
Java: 17

spring-boot-starter-data-jpa
spring-boot-starter-security
spring-boot-starter-validation
spring-boot-starter-web
spring-boot-starter-mail

jjwt:0.9.1
lombok
mysql-connector-j
```

# 2. 빌드 및 실행 방법

## 2.1 MySQL DB 설치 및 적용

Manna 프로젝트에서는 manna.sql 파일을 사용합니다.

1. manna.sql 파일을 다운로드하여 원하는 디렉토리에 저장합니다.
2. 명령 프롬프트 창에서 다음 명령을 실행합니다. (윈도우 기준)

```markdown
$ mysqldump -p -u root -databases manna > manna.sql
```

1. 여기까지하면 현재 디렉토리에 manna.sql 파일이 생생됩니다.
2. mysql workbench 를 이용하여 연결합니다.

## 2.2 스프링 프로젝트 빌드 및 실행방법

```markdown
$ git clone https://github.com/haeunsong/manna.git 
$ cd manna
$ gradle init
$ gradle wrapper
$ ./gradlew build.  // 여기까지 하면 빌드된 JAR 파일이 `build/libs` 디렉토리에 생성된다.
$ ./gradlew bootRun // 스프링 부트를 실행합니다.
```

## 2.3 리액트 프로젝트 빌드 및 실행방법

```markdown
$ cd manna
$ npm run build
$ npm start
```
