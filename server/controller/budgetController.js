const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Budget = mongoose.model("Budget");

var app = express();

router.get("/", (req, res) => {
    res.render("budget/addOrEdit", {
        viewTitle : 'Add my expenses',
    });
});

router.post("/", (req, res) => {
    // console.log(req.body);
    req.body._id == '' ? addExpense(req, res) : updateRecord(req, res);
});

function addExpense(req, res) {
    var budget = new Budget();
    budget.desc = req.body.desc;
    budget.amount = req.body.amount;
    budget.save((err, docs) => {
        if (!err) {
            res.redirect('budget/list')
        } else {
            console.log("error: " + err);
            res.render("budget/addOrEdit", {
                viewTitle: "Add my expenses",
                budget: req.body
            });
        }
    });
}

function updateRecord(req, res) {
    Budget.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, docs) => {
        if (!err) { res.redirect('budget/list'); }
        else {
            res.render("employee/addOrEdit", {
                viewTitle: 'Update Expense',
                budget: req.body
            });
        }
    });
}

router.get("/list", (req, res) => {
    Budget.find((err, docs) => {
        if (!err) {
            res.render("budget/list", {
                list: docs
            });
            // console.log(docs);
        } else console.log(err);
    })
});

router.get('/:id', (req, res) => {
    Budget.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.render("budget/addOrEdit", {
                viewTitle: "Update Expense",
                budget: docs
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Budget.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.redirect('/budget/list');
        }
        else { console.log(err); }
    });
});

module.exports = router;