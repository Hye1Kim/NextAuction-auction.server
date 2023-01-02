## NextAuction Admin Server

## 디렉토리 및 파일 구성 

/config : 환경 파일 디렉토리
- auction.account.js : 옥션 서비스의 계정 및 did 정보
- auction.contract.js : 옥션 서비스에 필요한 컨트랙트들의 정보 
- did.config.js : BCON Auth에 사용될 did-registry의 정보
- mysql.config : 옥션 정보를 저장할 스토리지 mysql 정보
- server.config : 옥션 서비스와 상호작용할 다른 서비스의 서버 정보

/lib : 라이브러리 디렉토리
- transactions.js : 컨트랙트에 트랜잭션 보내는 라이브러리
- validTime2Token.js : jwt 기반의 옥션 유효시간 검사 라이브러리
- winson.js : 로그 생성 라이브러리

/log : 생성된 로그를 해당 경로에 저장 

/middleware :
- auction.middleware.js : 옥션 서비스의 경매 진행에 필요한 기능을 제공하는 미들웨어
- auth.middleware.js : 인증 관련 기능을 제공하는 미들웨어
- database.middleware.js : 데이터베이스 관련 기능을 제공하는 미들웨어

/res : 배포된 컨트랙트 정보(abi, address) 환경파일
- auction : 옥션 서비스에 필요한 컨트랙트들의 배포 정보 abi, address
- did : did-registry의 배포 정보 abi, address

auction.server.js : 옥션 서비스의 메인 서버 

## DB 설정

1. docker 설치 
https://docs.docker.com/engine/install/ubuntu/

2. mysql DB 설정 (using Docker)

- mysql 컨테이너 실행(mysql 이미지 pull 포함) & auction database 생성
```shell
docker run --name mysql-db -v /your/path/:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=auction -e MYSQL_USER=userName -e MYSQL_PASSWORD=userPassword --restart=always -p 3306:3306 -p 8080:8080 -d mysql
```

- mysql shell 진입
```shell
sudo docker exec -it mysql-db bash
```

- mysql 로그인
```shell
mysql -u userName -p
(password: userPassword)
```

- cassandra 테이블 생성 (cqlsh)
```shell

use auction; //auction 데이터베이스 사용

CREATE TABLE auction_info
(
    `auction_id`    VARCHAR(100)    NOT NULL,
    `valid_time`    VARCHAR(1000)    NOT NULL,
    `nft`           VARCHAR(200)    NOT NULL,
    `valid_key`     VARCHAR(200)    NOT NULL,
    `user_addr`     VARCHAR(200)    NOT NULL,
    `status`        TINYINT(1)     NOT NULL,
    PRIMARY KEY (`auction_id`)
);

CREATE TABLE buyer_info
(
    `nft`    VARCHAR(45)    NOT NULL,
    `user_addr`    VARCHAR(200)    NOT NULL,
    `user_did`           VARCHAR(200)    NOT NULL,
    `key_id`     VARCHAR(200)    NOT NULL,
    `content_sig`        VARCHAR(800)     NOT NULL,
    `str_contentmeta`        VARCHAR(1000)     NOT NULL,
    `bid_amount`        VARCHAR(45)     NOT NULL,
    PRIMARY KEY (`nft`)
);

```

- 데이터 베이스 권한 부여
```shell

mysql --password=root
use mysql;

alter user 'userName'@'%' identified with mysql_native_password by 'userPassword';

FLUSH PRIVILEGES

```


## 실행

1. npm 모듈 설치
```shell
npm install  
```

2. 옥션 서버 실행 
```shell
node auction.server.js 
```



