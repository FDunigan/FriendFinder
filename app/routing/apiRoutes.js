var path = require('path');

var friendsData = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {

    var newFriend = req.body;

    var friendResponse = newFriend.scores;

    var matchName = '';
    var matchImage = '';
    var difference = 10000;

    for (var i = 0; i < friendsData.length; i++) {
        var diff = 0;
        for (var j = 0; j < friendResponse.length; j++) {
            diff += Math.abs(friendsData[i].scores[j] - friendResponse[j]);
        }

        if (diff < difference) {
            difference = diff;
            matchName = friendsData[i].name;
            matchImage = friendsData[i].photo;
        }
    }
  
    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

    console.log(newFriend);
  
    friendsData.push(newFriend);
  
    res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
  });

};
