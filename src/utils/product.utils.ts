import { FindOptions } from "sequelize";
import { Sequelize } from "sequelize";
import { ProductStatus } from "../enum/product.enum";
import { Category, ImageProduct, SubCategory, User } from "../models";
import { UserAttributes } from "../models/user.model";
import userService from "../services/user.service";

class ProductUtils {
  static userSubQuery = () => {
    return `(
        select (row_to_json(u))
        from (
          select 
          u.user_id, 
          u.name, 
          u.mobile_number, 
          u.address, 
          u.profile_photo
          from "User" u
          where "Product".user_id = u.user_id        
        ) u
      ) AS user`;
  };
  static imgSubQuery = () => {
    return `(
        select array_to_json(array_agg(row_to_json(img)))
        from (
          select 
          img.image_id, 
          img.product_id,
          img.image_path,
          img.idx
          from "ImageProduct" img
          where "Product".product_id = img.product_id        
        ) img
      ) AS images`;
  };
  static suggestionSubQuery = () => {
    return `(
      select array_to_json(array_agg(row_to_json(cat)))
      from (
        select 
        cat.category_id, 
        cat.category_name,
        cat.category_icon,
        cat.idx,
        cat."createdAt",
        cat."updatedAt"
        from "Category" cat
        where cat.category_id = ANY(ARRAY["Product".product_suggestion])        
      ) cat
    ) AS suggestions`;
  };

  static noOfViewsSubQuery = () => {
    return `
    (SELECT COUNT(id) 
      FROM "ProductViews" WHERE 
      "ProductViews".product_id = "Product".product_id
    ) AS no_of_views`;
  };

  static radiusGeometry = (user: UserAttributes) => {
    return `(
        (((acos(sin((${user.address_lat}*pi()/180)) * 
        sin(("Product".user_address_lat*pi()/180))+cos((${user.address_lat}*pi()/180))
        *  cos(("Product".user_address_lat*pi()/180)) * 
        cos(((${user.address_long}- "Product".user_address_long)*pi()/180))))*180/pi())*60*1.1515)
    )`;
  };

  static selectQuery = async (data: any) => {
    const {
      user_id,
      product_status = ProductStatus.ACTIVE,
      limit,
      offset,
      extra = "",
      order,
    } = data;
    const user = await userService.findMe(user_id);
    const orderBy = order ?? `ORDER BY "Product".id DESC`;

    return `SELECT 
          "Product".*, 
          ${this.noOfViewsSubQuery()},
          ${this.radiusGeometry(user)} AS distance,
  
          -- Product Images objects array
          ${this.imgSubQuery()},
          -- User object
          ${this.userSubQuery()},
          -- Product Suggestions
          ${this.suggestionSubQuery()}
  
  
          FROM "Product" 
        WHERE "Product"."product_status" = '${product_status}' ${extra} 
          AND ${this.radiusGeometry(user)} < ${user.radius}
          ${orderBy}
          LIMIT ${limit} OFFSET ${offset} 
        `;
  };

  static sequelizeFindOptions = (prop: { limit: number; offset: number }) => {
    const { limit, offset } = prop;
    const options: FindOptions = {
      limit,
      offset,
      include: [
        {
          model: User,
          as: "user",
          attributes: [
            "user_id",
            "name",
            "mobile_number",
            "address",
            "profile_photo",
          ],
        },
        {
          model: ImageProduct,
          as: "images",
          order: ["idx"],
        },
        {
          model: Category,
          // as: "category",
        },
        {
          model: SubCategory,
          as: "subcategory",
        },
      ],
      attributes: {
        include: [
          [
            //no of views
            Sequelize.literal(`
              (SELECT COUNT(id) 
                FROM "ProductViews" WHERE 
                "ProductViews".product_id = "Product".product_id
              )
            `),
            "no_of_views",
          ],
          [
            // add suggestions
            Sequelize.literal(`
              (
                select array_to_json(array_agg(row_to_json(cat)))
                from (
                  select 
                  cat.category_id, 
                  cat.category_name,
                  cat.category_icon,
                  cat.idx,
                  cat."createdAt",
                  cat."updatedAt"
                  from "Category" cat
                  where cat.category_id = ANY(ARRAY["Product".product_suggestion])        
                ) cat
              )
            `),
            "suggestions",
          ],
        ],
      },
    };
    return options;
  };

  //---> MISCELENOES
  // array(
  //   select category_id, category_name
  //   from "Category"
  //   where "Category".category_id = ANY(ARRAY["Product".product_suggestion])
  //   ) as tag_arr
}

export default ProductUtils;
