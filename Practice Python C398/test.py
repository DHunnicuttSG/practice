# Name: Anika
# Date: 04/09/24

# implement the classes listed below 

class FoodItem:
    def __init__(self, itemname, itemprice):
        self.itemname = itemname
        self.itemprice = itemprice

    def __str__(self):
        return f"{self.itemname} is ${self.itemprice}"

class Burger(FoodItem):
    def __init__(self, itemname, itemprice, condiments):
        super().__init__(itemname, itemprice)
        self.condiments = condiments
    
    def __str__(self):
        return f"{self.itemname} with {self.condiments} is ${self.itemprice}"

class Drink(FoodItem):
    def __init__(self, itemname, itemprice, size):
        super().__init__(itemname, itemprice)
        self.size = size
    
    def __str__(self):
        return f"{self.size} {self.itemname} is ${self.itemprice:}"

class Side(FoodItem):
    pass

class Combo(FoodItem):
    def __init__(self, comboname, burger, drink, side, discount):
        self.burger = burger
        self.drink = drink
        self.side = side
        self.discount = discount
        self.comboname = comboname
        self.comboprice = burger.itemprice + drink.itemprice + side.itemprice - 5

    def __str__(self):
        return f"{self.comboname}: {self.burger.itemname}, {self.drink.size} {self.drink.itemname}, {self.side.itemname} is ${self.comboprice:}"

class Order:
    def __init__(self, customer_name):
        self.customer_name = customer_name
        self.items = []

    def add_item(self, item):
        self.items.append(item)

    def total_price(self):
        return sum(item.itemprice if not isinstance(item, Combo) else item.comboprice for item in self.items)

    def __str__(self):
        order_details = [str(item) for item in self.items]
        return f"Order for {self.customer_name}: Total: ${self.total_price()}"

def user_input_burger():
    # Ask user for the type of burger
    print("\nAvailable Burgers: 1. Double Cheese Burger ($10.00), 2. Bacon Burger ($11.00), 3. Veggie Burger ($9.00)")
    burger_choice = input("Choose a burger (1/2/3): ")
    
    if burger_choice == '1':
        burger = Burger("Double Cheese Burger", 10.00, ["ketchup", "mustard"])
    elif burger_choice == '2':
        burger = Burger("Bacon Burger", 11.00, ["mayo", "lettuce"])
    elif burger_choice == '3':
        burger = Burger("Veggie Burger", 9.00, ["lettuce", "tomato"])
    else:
        print("Invalid choice, try again.")
        return user_input_burger()

    return burger

def user_input_drink():
   
    print("Available Drinks: 1. Coke ($2.50), 2. Pepsi ($2.50), 3. Water ($1.00)")
    drink_choice = input("Choose a drink (1/2/3): ")
    size = input("Choose a size (Small, Medium, Large): ").capitalize()

    if drink_choice == '1':
        drink = Drink("Coke", 2.50, size)
    elif drink_choice == '2':
        drink = Drink("Pepsi", 2.50, size)
    elif drink_choice == '3':
        drink = Drink("Water", 1.00, size)
    else:
        print("Invalid choice, try again.")
        return user_input_drink()

    return drink

def user_input_side():

    print("\nAvailable Sides: 1. Fries ($3.00), 2. Onion Rings ($3.50), 3. Garden Salad ($4.00)")
    side_choice = input("Choose a side (1/2/3): ")

    if side_choice == '1':
        side = Side("Fries", 3.00)
    elif side_choice == '2':
        side = Side("Onion Rings", 3.50)
    elif side_choice == '3':
        side = Side("Garden Salad", 4.00)
    else:
        print("Invalid choice, try again.")
        return user_input_side()

    return side

def user_input_combo():
    print("\nYou have chosen a combo. Let's build it!")
    burger = user_input_burger()
    drink = user_input_drink()
    side = user_input_side()
    combo_name = "Custom Combo"
    discount = 0.10 
    combo = Combo(combo_name, burger, drink, side, discount)
    return combo

def take_order():
    print("Welcome to Burger Shop!")
    customer_name = input("Please enter your name: ")
    
    order = Order(customer_name)

    while True:
        print("\nMenu Options: 1. Burger, 2. Drink, 3. Side, 4. Combo, 5. Finish Order, 6. Cancel Order")
        choice = input("What would you like to order? (1/2/3/4/5/6): ")

        if choice == '1':
            order.add_item(user_input_burger())
        elif choice == '2':
            order.add_item(user_input_drink())
        elif choice == '3':
            order.add_item(user_input_side())
        elif choice == '4':
            order.add_item(user_input_combo())
        elif choice == '5':
            print("\n" + str(order))
            print("Thank you for choosing Burger shop!")
            break
        elif choice == '6':
            print("Order canceled!")
            break
        else:
            print("Invalid choice, please try again.")


take_order()