/**
 * Created by danesmith on 11/7/15.
 */
var express = require('express');
var adminRouter = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/toastoffice');
mongoose.model('Post', new Schema({"name": String, "Post": String}, {collection: 'posts'}));
var Post = mongoose.model('Post');
//var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/toastoffice';






module.exports = adminRouter;