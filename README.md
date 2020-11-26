# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation


## groups_usersテーブル

|Columun|Type|Options|
|-------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, goreign_key: true|

###Association
- belongs_to :group
- belings_to :user

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
