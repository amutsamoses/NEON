"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = exports.loginUserSchema = exports.orderMenuItemSchema = exports.statusCatalogSchema = exports.orderStatusSchema = exports.restaurantOwnerSchema = exports.menuItemSchema = exports.categorySchema = exports.commentSchema = exports.addressSchema = exports.orderSchema = exports.citySchema = exports.driverSchema = exports.stateSchema = exports.userSchema = exports.restaurantSchema = void 0;
const zod_1 = require("zod");
exports.restaurantSchema = zod_1.z.object({
    name: zod_1.z.string(),
    street_address: zod_1.z.string(),
    city_id: zod_1.z.number(),
    zip_code: zod_1.z.number(),
});
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().max(255),
    contact_phone: zod_1.z.string().max(20).optional().nullable(),
    phone_verified: zod_1.z.boolean().default(false).optional(),
    email: zod_1.z.string().email().max(255),
    email_verified: zod_1.z.boolean().default(false).optional(),
    password: zod_1.z.string().max(255),
});
exports.stateSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    code: zod_1.z.string(),
});
exports.driverSchema = zod_1.z.object({
    car_make: zod_1.z.string(),
    car_model: zod_1.z.string(),
    car_year: zod_1.z.number(),
    userId: zod_1.z.number(),
    online: zod_1.z.boolean(),
    delivering: zod_1.z.boolean(),
});
exports.citySchema = zod_1.z.object({
    // "id": 4,
    name: zod_1.z.string(),
    stateId: zod_1.z.number(),
});
exports.orderSchema = zod_1.z.object({
    id: zod_1.z.number(),
    restaurant_id: zod_1.z.number(),
    delivery_address_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    driver_id: zod_1.z.number(),
    price: zod_1.z.number(),
    final_price: zod_1.z.number(),
});
exports.addressSchema = zod_1.z.object({
    street_address_1: zod_1.z.string(),
    street_address_2: zod_1.z.string(),
    city_id: zod_1.z.number(),
    zip_code: zod_1.z.string(),
    delivery_instructions: zod_1.z.string(),
    user_id: zod_1.z.number(),
});
exports.commentSchema = zod_1.z.object({
    order_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    comment_text: zod_1.z.string(),
    is_complaint: zod_1.z.boolean(),
    is_praise: zod_1.z.boolean(),
});
exports.categorySchema = zod_1.z.object({
    name: zod_1.z.string(),
    // description: z.string(),
});
exports.menuItemSchema = zod_1.z.object({
    name: zod_1.z.string(),
    restaurant_id: zod_1.z.number(),
    category_id: zod_1.z.number(),
    description: zod_1.z.string(),
    ingredients: zod_1.z.string(),
    price: zod_1.z.number(),
});
exports.restaurantOwnerSchema = zod_1.z.object({
    owner_id: zod_1.z.number(),
    restaurant_id: zod_1.z.number(),
});
exports.orderStatusSchema = zod_1.z.object({
    // name: z.string(),
    order_id: zod_1.z.number(),
    status_catalog_id: zod_1.z.number(),
    // description: z.string(),
});
exports.statusCatalogSchema = zod_1.z.object({
    name: zod_1.z.string(),
    // description: z.string(),
});
exports.orderMenuItemSchema = zod_1.z.object({
    order_id: zod_1.z.number(),
    menu_item_id: zod_1.z.number(),
    quantity: zod_1.z.number(),
    item_price: zod_1.z.number(),
    price: zod_1.z.number(),
});
exports.loginUserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.registerUserSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional(),
    // password2: z.string(),
});
