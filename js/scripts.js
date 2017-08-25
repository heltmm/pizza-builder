//backend
function Cart(name) {
  this.for = name;
  this.pizzas = [];
};
function Pizza(size, crust, sauce, topings) {
  this.size = size;
  this.crust = crust;
  this.sauce = sauce;
  this.toppings = topings;
  this.price;
};
Pizza.prototype.print = function(){
  // combine meat and veg toppings
  var meatAndVeg = []
  this.toppings.forEach(function(toppingArray){
    toppingArray.forEach(function(topping){
      meatAndVeg.push(topping);
    })
  })
  //print out on webpage the current pizza
  $("#currentPizza").html("<h2>" + this.size + " " + this.crust + " pizza with " + this.sauce +"</h2><br><h3>Toppings: </h3><ul id='toppings'>" + "</ul>" );
  meatAndVeg.forEach(function(topping){
    return $("#toppings").append("<li>" + topping + "</li>");
  })
}
Cart.prototype.show = function(){

}
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
    newCart.pizzas.push(newPizza)
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
  });
  $("#viewCart").click(function(event){
    $("#cart").show();
    $("#checkout").show();
    $("#newPizza").hide();
    $("#pizzaInput").hide();
    $("#viewCart").hide();
  });
});
