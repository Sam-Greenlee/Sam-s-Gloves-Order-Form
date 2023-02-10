"use strict";

//format most of this like how lab 7 was written

$(document).ready(function() {

//Run customer function when called
var Customer = function(name, city, state, email) {
    this.name = name;
    this.city = city;
    this.state = state;
    this.email = email;
};

//Run constructor for city validation when called
Customer.prototype.isNameValid = function() {
    if (this.name == "") {
            $("#name").next().text("Please enter a name.");
            return false;
        }
        else {
            $("#name").next().text("*");
            return true;
        }
    }

//Run constructor for city validation when called 
Customer.prototype.isCityValid = function() {
    if (this.city == "") {
            $("#city").next().text("Please enter a city.");
            return false;
        } 
        else {
            $("#city").next().text("*");
            return true;
        }
}   

//Run constructor for state validation when called
Customer.prototype.isStateValid = function() {
    if (this.state == "selectOne") {
            $("#state").next().text("Please select a valid state.")
            return false;
        }
        else {
            $("#state").next().text("*");
            return true;
        }   
}

//Run constructor for email validation when called
Customer.prototype.isEmailValid = function() {
    var emailPattern = 
	    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
	var email = $("#email").val().trim();
	if (email == "") {
	    $("#email").next().text("Please enter a email.");
	    return false;
	}
	else if (!emailPattern.test(email)) {
	    $("#email").next().text("Please enter a valid email.");
	    return false;
	}
	else {
	    $("#email").next().text("*");
	    return true;
	}
}

//Run specific functions when needed
var jMDB = {
    //Add Customers the the customers array
    customers: [],
    add: function(mov) {
        this.customers.push(mov);
    }
}

var addCustomer = function() {
    //Get the name from the form
    var name = $("#name").val();

    //Get the city from the form
    var city = $("#city").val();

    //Get the state from the form
    var state = $("#state").val();

    //Get the email from the form
    var email = $("#email").val();

    //Add a movie to the movie variable
    var customer = new Customer(name, city, state, email);

    //Call the Customer.prototype.isNameValid constructor
    var nameValid = customer.isNameValid();

    //Call the Customer.prototype.isCityValid constructor
    var cityValid = customer.isCityValid();

    //Call the Customer.prototype.isStateValid constuctor
    var stateValid = customer.isStateValid();

    //Call the Customer.prototype.isEmailValid constuctor
    var emailValid = customer.isEmailValid();

    //Check the customer object to see if there's already a customer with
        //the same email address
    for (var i in jMDB.customers) {
    	if (customer.email == jMDB.customers[i].email) {
    		emailValid = false;
    		$("#email").next().text("Email already entered.");
    		break;
    	}

    }

    //Empty form/Add valid customer to array
    if(nameValid == true && cityValid == true 
        && stateValid == true && emailValid == true) {
        
        //Empty form
        $("#name").val("");
        $("#city").val("");
        $("#state").val("");
        $("#email").val("");

        //Add valid customer to array
        jMDB.add(customer);

        //Display all entered customers on the page 
            //Website to help append things
            //https://www.w3schools.com/jquery/html_append.asp#:~:text=The%20append()%20method%20inserts,use%20the%20prepend()%20method.      
        $("#customerInfo").append("<li>" + email + "</li>");
        $("#customerInfo").append("<ul>" + "<li>" + name + "</li>" +
                                           "<li>" + city + ", " + state + "</li>" + "</ul>");        
    }
}    

//Run when add button is clicked
$("#addButton").click(function() {
        addCustomer();
    });
        
}); //End ready

