'use strict';

const ElasticSearch = require('elasticsearch');
const Bluebird = require('bluebird');
let Config = require('./dev.config').config;
// Todo production config

var elasticClient = new ElasticSearch.Client({
    host: Config.elasticSearchHost,
    defer: function() {
        return Bluebird.defer();
    },
    timeout: 500000,
    requestTimeout: 500000,
    log: 'info'
});

function deleteIndex() {
    return elasticClient.indices.delete({
        index: Config.indexName
    });
}
exports.deleteIndex = deleteIndex;

function createIndex() {
    return elasticClient.indices.create({
        index: Config.indexName
    });
}
exports.createIndex = createIndex;

function indexExists() {
    return elasticClient.indices.exists({
        index: Config.indexName
    });
}
exports.indexExists = indexExists;

function initMapping() {
    return elasticClient.indices.putMapping({
        index: Config.indexName,
        type: "documentLog",
        body: {
            properties: {
                machine: {type: "string"},
                messageType: {type: "string"},
                dateLog: {type: "date", format: "date_time"},
                content: {type: "string"}
            }
        }
    });
}
exports.initMapping = initMapping;
//        dateLog: {type: "date", format: "dateOptionalTime"},

function addDocument(document) {
    return elasticClient.index({
        index: Config.indexName,
        type: "documentLog",
        body: document
    });
}
exports.addDocument = addDocument;
