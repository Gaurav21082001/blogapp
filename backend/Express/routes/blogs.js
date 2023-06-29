const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.post("/", (request, response) => {
    const { title, details } = request.body;
    const query = `insert into blogs(title, details,userId) values (?, ?,?)`;
    db.query(query, [title, details, request.user.id], (error, result) => {
        response.send(utils.createResult(error, result));
    });
});

router.get("/", (request, response) => {
    const query = `select id, title, details, status,likes from blogs where userId = ?`;
    db.query(query, [request.user.id], (error, result) => {
        response.send(utils.createResult(error, result));
    });
});
router.get("/single-blog/:id", (request, response) => {
  const {id}=request.params;
  const query = `select id, title, details, status from blogs where id=?`;
  db.query(query, [id], (error, result) => {
      response.send(utils.createResult(error, result));
  });
});


//updated get for all blogs
router.get("/all-blogs", (request, response) => {
  const query = `select id, title, details, status,likes from blogs`;
  db.query(query, [], (error, result) => {
      response.send(utils.createResult(error, result));
  });
});

router.put("/edit-blog/:id", (request, response) => {
    const { title, details } = request.body;
    const { id } = request.params;
    const checkOwnerQuery = `select count (*) as count from blogs where id = ? and userId = ?`;
    db.query(checkOwnerQuery, [id, request.user.id], (error, result) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      } else if (result.length == 0) {
        response.send(utils.createErrorResult("invalid result"));
      } else {
        const info = result[0];
        if (info["count"] == 0) {
          response.send(
            utils.createErrorResult("this blogs does not belong to you")
          );
        } else {
          const query = `update blogs set title = ?, details = ? where id = ?`;
          db.query(query, [title, details, id], (error, result) => {
            response.send(utils.createResult(error, result));
          });
        }
      }
    });
  });

  router.delete("/:id", (request, response) => {
    const { id } = request.params;
  
    // check if this todoItem belongs to the logged in user
    const checkOwnerQuery = `select count (*) as count from blogs where id = ? and userId = ?`;
    db.query(checkOwnerQuery, [id, request.user.id], (error, result) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      } else if (result.length == 0) {
        response.send(utils.createErrorResult("invalid result"));
      } else {
        const info = result[0];
        if (info["count"] == 0) {
          response.send(
            utils.createErrorResult("this blog does not belong to you")
          );
        } else {
          const query = `delete from blogs where id = ?`;
          db.query(query, [id], (error, result) => {
            response.send(utils.createResult(error, result));
          });
        }
      }
    });
  });
    module.exports = router;