//backend
function Cart(name) {
  this.for = name;
  this.total = 0.0;
  this.pizzas = [];
};
function Pizza(size, crust, sauce, topings) {
  this.size = size;
  this.crust = crust;
  this.sauce = sauce;
  this.toppings = topings;
  this.price = 0.0;
};
Pizza.prototype.print = function(){
  // combine meat and veg toppings
  var meatAndVeg = [];
  this.toppings.forEach(function(toppingArray){
    toppingArray.forEach(function(topping){
      meatAndVeg.push(topping);
    });
  });

  //print out on webpage the current pizza
  $("#currentPizza").html("<h2>" + this.size + " " + this.crust + " pizza with " + this.sauce +"</h2><br><img src='img/pizza.png' alt='pizza'><h3>Toppings: </h3><ul id='toppings'>" + "</ul><br><h3>Cost: "+ this.price + "</h3>" );
  meatAndVeg.forEach(function(topping){
    return $("#toppings").append("<li>" + topping + "</li>");
  })
}
//print each pizza and total on website
Cart.prototype.printCart = function(){
  $("#cart").append("<h2> Order for: " + this.for +"</h2>");
  this.pizzas.forEach(function(pizza){
    $("#cart").append('<div class="well"><img src="img/pizza.png" alt="pizza">' + pizza.size + ", " + pizza.crust + ", " + pizza.sauce + ", " + pizza.toppings[0] + " ," + pizza.toppings[1] + " Price: " + pizza.price + '</div>');
  });
  $("#cart").append("<h2> Total Price: " + this.total +"</h2>");
};
Pizza.prototype.cost = function(){
  if(this.size === "large"){
    this.price += 6.99;
    this.price += this.toppings[0].length * 1.5;
    this.price += this.toppings[1].length * 1;
  }else if(this.size === "medium"){
    this.price += 4.99;
    this.price += this.toppings[0].length * 1;
    this.price += this.toppings[1].length * .75;
  }else if(this.size === "small"){
    this.price += 3.99;
    this.price += this.toppings[0].length * .75;
    this.price += this.toppings[1].length * .5;
  };
};
Cart.prototype.cartCost = function(){
  var countTotal = 0;
  this.pizzas.forEach(function(pizza){
    countTotal += pizza.price;
  });
  this.total = countTotal;
};
//front end
$(document).ready(function() {
  //takes user name as input and creats a new cart for that name
  $("#cartInput").submit(function(event){
    event.preventDefault();
    var name = $("#nameInput").val();
    newCart = new Cart(name);
    $("#pizzaInput").show();
    $("#cartInput").hide();
  });
  $("#pizzaInput").submit(function(event){
    event.preventDefault();
    var size = $("input:radio[name=sizeInput]:checked").val();
    var crust = $("#crustInput").val();
    var sauce = $("#sauceInput").val();
    var meatToppings = $("input:checkbox[name=meatTopping]:checked").map(function(){
      return this.value;
    }).get();
    var nonMeatToppings = $("input:checkbox[name=nonMeatTopping]:checked").map(function(){
      return this.value;
    }).get();
    var toppings = [meatToppings, nonMeatToppings];
    //takes all input and creats a new pizza and pushes that pizza into the cart
    newPizza = new Pizza (size, crust, sauce, toppings);
    newPizza.cost();
    newCart.pizzas.push(newPizza);
    $("#pizzaInput").hide();
    $("#currentPizza").show();
    $("#viewCart").show();
    $("#newPizza").show();
    newPizza.print();
  });
   $("#newPizza").click(function(event){
     //removes checkes from checkbox inputs
     $('input[type=checkbox]').each(function(){
        this.checked = false;
      });
     $("#pizzaInput").show();
     $("#newPizza").hide();
     $("#currentPizza").hide();
  });
  $("#viewCart").click(function(event){
    newCart.cartCost();
    newCart.printCart();
    $("#cart").show();
    $("#newOrder").show();
    $("#newPizza").hide();
    $("#pizzaInput").hide();
    $("#currentPizza").hide();
    $("#viewCart").hide();
  });
  $("#newOrder").click(function(event){
    location.reload();
  });
});
