const express = require('express');
const router = express.Router();

const friends = [
    { 
        firstName: 'Jack',
        lastName: 'Wilson',
        DOB: '2000-1-1',
        email: 'jackwilson@gmail.com'
    },
    { 
        firstName: 'Mary',
        lastName: 'Wilson',
        DOB: '2000-1-1' ,
        email: 'marywilson@gmail.com'
    }
];

router.get("/", (req, res) => {
    res.send(JSON.stringify(friends, null, 4));
});

router.get('/:email', function (req, res) {
    const email = req.params.email;
    const friend = friends.find(friend => friend.email === email);

    if (friend) {
        res.send(friend);
    } else {
        res.status(404).send("Friend not found");
    }
});
router.post("/", function (req, res) {
    if (req.user) {
        const newFriend = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "DOB": req.body.DOB,
            "email": req.body.email
        };

        friends.push(newFriend);

        res.send(`The user ${req.body.firstName} has been added!`);
    } else {
        res.status(401).send("User not authenticatedd");
    }
});


router.put("/:email", function (req, res) {
    const email = req.params.email;
    let friend = friends.find(friend => friend.email === email);

    if (friend) {
        let DOB = req.body.DOB;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;

        if (DOB !== undefined) {
            friend["DOB"] = DOB;
        }
        if (firstName !== undefined) {
            friend["firstName"] = firstName;
        }
        if (lastName !== undefined) {
            friend["lastName"] = lastName;
        }

        res.send(`Friend with the email ${email} updated.`);
    } else {
        res.status(404).send("Unable to find friend!");
    }
});


router.delete("/:email", (req, res) => {
    const email = req.params.email;
    const index = friends.findIndex(friend => friend.email === email);

    if (index !== -1) {
        friends.splice(index, 1);
        res.send(`Friend with the email ${email} deleted.`);
    } else {
        res.send("Unable to find friend!");
    }
});


module.exports = router;
