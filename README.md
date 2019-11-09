#CEP_API_BACKEND

/categories
    (GET)
    ------get all categories

/items
    (GET)
    ------get all items

/find/name?name="ITEM NAME"
    (GET)
    ------find items of NAME

/find/category?category="CATEGORY"
    (GET)
    ------find items of CATs

/newItem
    (JSON)---(POST)
    -----post new item

/find-id/:id
    (GET)
    ------get item of id

/edit/:id
    (PUT)
    ------edit item of id

/delete/:id
    (DELETE)
    ------delete item of id

/newOrder
    (POST)
    ------new order

/orders
    (GET)
    ------get all orders