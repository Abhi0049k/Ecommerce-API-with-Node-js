# E-Commerce API with Node js Endpoint Reference

| Endpoint                           | Description                                 | Method | Inputs                                         | Outputs                  | Error Code |
| ---------------------------------- | ------------------------------------------- | ------ | ---------------------------------------------- | ------------------------ | ---------- |
| `/`                                | Display the welcome message                 | GET    | None                                           | Welcome Message (JSON)   | None       |
| `/users/login`                     | To Get the user logged In                   | POST   | `{email, password}` (JSON)                     | Token and Message (JSON) | 400 , 500  |
| `/users/register`                  | To Get the user registered                  | POST   | `{name, email, password}` (JSON)               | Success Message (JSON)   | 400, 500   |
| `/products/`                       | Get all the products                        | GET    | None                                           | Products (JSON)          | 400, 500   |
| `/products/:id`                    | Get Product Details Based on product id     | GET    | `id` (URL param)                               | Product Details (JSON)   | 400, 500   |
| `/products/category/categoryList`  | To fetch the list of categories             | GET    | None                                           | Category List (JSON)     | 400, 500   |
| `/products/category/:id`           | To fetch all the products based on category | GET    | `id` (URL param)                               | Product List (JSON)      | 400, 500   |
| `/products/addProduct`             | To Add a new product                        | POST   | `{title, description, price, category}` (JSON) | Success Message (JSON)   | 400, 500   |
| `/orders/placeOrder/:productId`    | To Add product in the cart                  | POST   | `{productId}` (URL param)                      | Success Message (JSON)   | 400, 500   |
| `/orders/removeProduct/:productId` | To Remove product from the cart             | DELETE | `{productId}` (URL param)                      | Success Message (JSON)   | 400, 500   |
| `/orders/increaseQty/:productId`   | To Increase product quantity in the cart    | PATCH  | `{productId}` (URL param)                      | Success Message (JSON)   | 400, 500   |
| `/orders/decreaseQty/:productId`   | To Decrease product quantity in the cart    | DELETE | `{productId}` (URL param)                      | Success Message (JSON)   | 400, 500   |
| `/orders/removeOrder/:orderId`     | To Delete an order                          | DELETE | `{orderId}` (URL param)                        | Success Message (JSON)   | 400, 500   |
| `/orders/confirmOrder`             | To confirm an order                         | GET    | None                        | Success Message (JSON)   | 400, 500   |
| `/orders/all`                      | To fetch all the order                      | GET    | None                                           | Success Message (JSON)   | 400, 500   |
| `/orders/:orderId`                 | To fetch details of an order                | GET    | `{orderId}` (URL param)                        | Success Message (JSON)   | 400, 500   |


#### Admin Credentials: 
email: `mangalamkumar2002@gmail.com`
password: `123456789`