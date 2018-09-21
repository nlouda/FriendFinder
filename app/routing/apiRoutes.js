const friendsData = require('../data/friends.js');
const path = require("path");
module.exports = function (app) {
  app.get("/api/friends", (req, res) => {
    return res.json(friendsData);
  });
  app.post("/api/friends", function (req, res) {

    const newData = req.body;
 
    let matchName = "";
    let matchImage = "";
    let total = 10000;
    for (let i = 0; i < friendsData.length; i++) {
      let diff = 0;
      
      for (let check in newData.scores) {
        let v = parseInt(friendsData[i].scores);
        let s = parseInt(newData.scores[check]);
        diff = Math.abs(v - s);
      };
      
      if (diff < total){
        total = diff;
        matchName = friendsData[i].name;
        matchImage = friendsData[i].photo;
      }
    }
    res.json({matchName: matchName, matchImage: matchImage});
    friendsData.push(newData);
  });
};