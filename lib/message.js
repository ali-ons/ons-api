'use strict';

var assert = require('assert');
var util = require('core-util-is');
var format = require('util').format;
var Properties = require('nproperties');

module.exports = Message;

var TAG = '__TAG';
var KEY = '__KEY';
var MSGID = '__MSGID';
var RECONSUMETIMES = '__RECONSUMETIMES';
var STARTDELIVERTIME = '__STARTDELIVERTIME';

function Message(options) {
  // 消息主题
  this.topic = options.topic;
  // 消息体
  this.body = options.body;
  // 系统属性
  this.systemProperties = new Properties();
  // 用户属性
  this.userProperties = new Properties();

  if (options.tag) {
    this.systemProperties.setProperty(TAG, options.tag);
  }
  if (options.key) {
    this.systemProperties.setProperty(KEY, options.key);
  }
}

var proto = Message.prototype;

proto.getTag = function() {
  return this.systemProperties.getProperty(TAG);
};

proto.setTag = function(tag) {
  assert(tag && util.isString(tag));
  this.systemProperties.setProperty(TAG, tag);
  return this;
};

proto.getKey = function() {
  return this.systemProperties.getProperty(KEY);
};

proto.setKey = function(key) {
  assert(key && util.isString(key));
  this.systemProperties.setProperty(KEY, key);
  return this;
};

proto.getMsgID = function() {
  return this.systemProperties.getProperty(MSGID);
};

proto.setMsgID = function(msgid) {
  assert(msgid && util.isString(msgid));
  this.systemProperties.setProperty(MSGID, msgid);
  return this;
};

proto.toString = function() {
  return format('Message [topic=%s, systemProperties=%s, userProperties=%s, body=%s]', this.topic, this.systemProperties.toString(),
    this.userProperties.toString(), (this.body ? this.body.length : 0));
};

