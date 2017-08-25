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
};
//front end
$(document).ready(function() {
  //takes user name as input and creats a new cart for that name
  $("#cartInput").submit(function(event){
    event.preventDefault();
    var name = $("#nameInput").val();
    newCart = new Cart(name);
    console.log(newCart)
  });
  $("#pizzaInput").submit(function(event){
    event.preventDefault();
    var size = $("input:radio[name=sizeInput]:checked").val();
    console.log(size)
    var crust = $("#crustInput").val();
    console.log(crust)
    var sauce = $("#sauceInput").val();
    console.log(sauce)
    var meatToppings = $("input:checkbox[name=meatTopping]:checked").map(function(){
      return this.value;
    }).get();
    console.log(meatToppings);
    var nonMeatToppings = $("input:checkbox[name=nonMeatTopping]:checked").map(function(){
      return this.value;
    }).get();
    console.log(nonMeatToppings)
    var toppings = [meatToppings, nonMeatToppings];
    newPizza = new Pizza (size, crust, sauce, toppings);
    console.log(newPizza)
    newCart.pizzas.push(newPizza)
    console.log(newCart)
  });
});
