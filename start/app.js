/*
Your code goes here!
 */
function IssueTracker() {
  this.issues = [];
}

IssueTracker.prototype = {
  add: function (issue) {
    this.issues.push(issue);
  },
  retrieve: function () {
    var error_info = "";
    switch (this.issues.length) {
      case 0:
        // if no error break directly!
        break;
      case 1:
        error_info = this.issues[0];
        break;
      default:
        error_info = this.issues.join("\n");
        break;
    }
    return error_info;
  }
};
/*
You might find you want to use RegEx. As this quiz is about setCustomValidity
and not RegEx, here are some RegEx patterns you might find useful:

match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
match a number: /[0-9]/g or /\d/g
match a lowercase letter: /[a-z]/g
match an uppercase letter: /[A-Z]/g
match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
 */

/*
Grabbing a few inputs to help you get started...
 */
var firstPasswordInput = document.querySelector('#first');
var secondPasswordInput = document.querySelector('#second');
var submit = document.querySelector('#submit');

/*
You'll probably find this function useful...
 */
submit.onclick = function () {
  var firstPassword = firstPasswordInput.value;
  var secondPassword = secondPasswordInput.value;

  var firstInputIssuesTracker = new IssueTracker();
  var secondInputIssuesTracker = new IssueTracker();

  function checkRequirements() {
    if (firstPassword.length < 16) {
      firstInputIssuesTracker.add("need more than 16 characters");
    } else if (firstPassword.length > 100) {
      firstInputIssuesTracker.add("need less than 100 characters");
    }

    if (!(/[\!\@\#\$\%\^\&\*]/g.exec(firstPassword))) {
      firstInputIssuesTracker.add("At least one of these symbols: !, @, #, $, %, ^, &, *");
    }

    if (!(/\d/g.exec(firstPassword))) {
      firstInputIssuesTracker.add("At least one number");
    }

    if(!(/[a-z]/g.exec(firstPassword))) {
      firstInputIssuesTracker.add("At least one lowercase");
    }

    if(!(/[A-Z]/g.exec(firstPassword))) {
      firstInputIssuesTracker.add("At least one uppercase");
    }

    var illegalGroup = firstPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);
    if (illegalGroup) {
      illegalGroup.forEach(function (illegalChar) {
        firstInputIssuesTracker.add("content illegal character: " + illegalChar);
      });
    }
    if (/[^A-z0-9\!\@\#\$\%\^\&\*]/g.exec(firstPassword)) {
      firstInputIssuesTracker.add("your password has illegal characters");
    }
  }

  if ((firstPassword === secondPassword) && (firstPassword.length > 0)) {
    checkRequirements();
  } else {
    secondInputIssuesTracker.add("password must match");
  }

  var firstInputIssues = firstInputIssuesTracker.retrieve();
  var secondInputIssues = secondInputIssuesTracker.retrieve();

  // firstPasswordInput.setCustomValidity(firstInputIssues);
  // secondPasswordInput.setCustomValidity(secondInputIssues);

  if ((firstInputIssues.length + secondInputIssues.length) === 0) {
    alert("password commit sucessfully!");
  }
};
