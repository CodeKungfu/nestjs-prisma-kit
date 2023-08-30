/*
 Navicat Premium Data Transfer

 Source Server         : rm-uf639g894024oc270io.mysql.rds.aliyuncs.com_3306
 Source Server Type    : MySQL
 Source Server Version : 80018 (8.0.18)
 Source Host           : rm-uf639g894024oc270io.mysql.rds.aliyuncs.com:3306
 Source Schema         : meetfaithtest

 Target Server Type    : MySQL
 Target Server Version : 80018 (8.0.18)
 File Encoding         : 65001

 Date: 17/07/2023 09:13:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(255) DEFAULT NULL COMMENT '标题',
  `url` varchar(255) DEFAULT NULL COMMENT '跳转url',
  `image_url` varchar(255) DEFAULT NULL COMMENT '图片url',
  `is_show` tinyint(1) DEFAULT NULL COMMENT '是否显示',
  `order` int(11) DEFAULT NULL COMMENT '排序值',
  `created_at` datetime(6) DEFAULT NULL COMMENT '创建时间'
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;