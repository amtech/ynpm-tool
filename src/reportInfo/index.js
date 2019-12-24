'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const formData = require('form-data');
const co = require('co');

const URLSearchParams = require('url').URLSearchParams;

const {getRc, setRc, getHttpConfig} = require('../utils');

function get(options, params) {
	let url = options.host ? options.host : "127.0.0.1";
	url += options.port ? ":" + options.port : "";
	// url += options.method?options.port:"";
	url += options.path ? options.path : "";
	// let met = options.method.toUpperCase();
	// if(met != "GET")return;
	let par = "?", i = 0, len = Object.keys(params).length;
	for (let attr in params) {
		i++;
		let _att = attr + "=" + params[attr];
		len == i ? "" : _att += "&";
		par += _att;
	}
	;
	url += par;
	return fetch(url)
		.then(res => res.text())
		.then(body => {
			let data = null;
			try {
				let res = JSON.parse(body);
				if (!isEmptyObject(res.data)) {
					data = res.data;
				}
			} catch (err) {
			}
			;
			return data;
		});
}


function isEmptyObject(obj) {
	for (var key in obj) {
		return false
	}
	;
	return true
};
function version() {
	let config = getHttpConfig({
		path: "/package/getToolVersion",
	});
	return get(config, {});
}
function getLastVersion() {
	let config = getHttpConfig({
		path: "/package/getLastToolVersion",
	});
	return get(config, {});
}
function userInfo(packageName) {
	let parame = getRc("ynpm");
	parame.packageName = packageName
	let config = getHttpConfig({
		path: "/user/getUserValidate",
	});
	return get(config, parame);
}

function getAuth() {
	let parame = getRc("ynpm");
	let config = getHttpConfig({
		path: "/user/getUserValidate",
	});
	return get(config, parame);
}

function addDownloadNum(params) {
	let config = getHttpConfig({
		path: "/package/addDownloadNum",
	});
	const form = new formData()
	form.append('installPackMap', params.installPackMap)
	return fetch(config.host + config.path, {
		method: 'post',
		body: form,
	})
}

function packageDownloadDetail(pkg) {
	let params = getRc("ynpm") || {};
	params.package_name = pkg
	let config = getHttpConfig({
		path: "/package/packageDownloadDetail",
	});
	return get(config, params);
}

function setPackage(params) {
	let config = getHttpConfig({
		path: "/package/set",
	});
	return get(config, params);
}

module.exports = {
	userInfo,
	setPackage,
	version,
	getLastVersion,
	addDownloadNum,
	packageDownloadDetail
}
