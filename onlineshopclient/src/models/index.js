
export class User {
    constructor(id, email, password, firstName, lastName, role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
}

export class Product {
    constructor(id, name, description, price, image, inCart) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.inCart = inCart;
    }
}


export class Order {
    constructor(id, user, orderProducts, totalPrice, status) {
        this.id = id;
        this.user = user;
        this.orderProducts = orderProducts || [];
        this.totalPrice = totalPrice;
        this.status = status;
    }
}

export class OrderProduct {
    constructor(id, order, product, quantity, unitePrice) {
        this.id = id;
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.unitePrice = unitePrice;
    }
}
