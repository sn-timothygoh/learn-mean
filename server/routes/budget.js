const router = require("express").Router();
let Budget = require("../model/budget.model");

router.route("/").get((req, res) => {
  Budget.find()
    .then(budgets => res.json(budgets))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const desc = req.body.desc;
  const amount = req.body.amount;
  const expense = new Budget({ desc, amount });
  expense
    .save()
    .then(() => res.json("Expense recorded."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Budget.findByIdAndDelete(req.params.id)
    .then(budgets => res.json(budgets))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Budget.findById(req.params.id)
    .then(() => res.json("Expense deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Budget.findById(req.params.id)
    .then(budgets => {
      budgets.desc = req.body.desc;
      budgets.amount = req.body.amount;
      budgets
        .save()
        .then(() => res.json("Expense updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
