/**
 * Created by danesmith on 11/6/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/toastoffice');
mongoose.model('Post', new Schema({"name": String, "post": String}, {collection: 'posts'}));
var Post = mongoose.model('Post');



router.route('/submit')
    .get(function(req, res) {
        Post.find({}, function (err, data) {
            if (err) {
                console.log("ERROR! : ", err);
            }
            res.send(data);
        });
    })


    .post(function(req, res) {


            var toPost = new Post({
                name: req.body.name,
                post: req.body.message
            });
            toPost.save(function (err, data) {
                if (err) console.log(err);
                res.send(data);
        });
    });

router.delete('/admin', function(req, res){
    var deleteId = req.body.id;
    Post.findByIdAndRemove({"_id" : deleteId}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});


router.get('/admin', function(req, res){
    var file = req.params[0] || "views/admin.html";
    res.sendFile(path.join(__dirname, "../public/", file))
});




router.get('/*', function(req, res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file))
});

module.exports = router;