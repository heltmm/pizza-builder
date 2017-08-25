//backend
function Cart(name) {
  this.for = name;
  this.pizzas = [];
}
function Pizza(size, crust, sauce, topings) {
  this.size = size;
  this.crust = crust;
  this.sauce = sauce;
  this.toppings = topings;
}
