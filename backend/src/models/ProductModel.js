const db = require("../config/db");
const client = require("../config/redis");

class ProductModel {
  getAllProduct = async (limit, cursor, direction, page, locale) => {
    // const [row] = await db.query(
    //   "SELECT id , name , price , img , category_id FROM  products  WHERE status = 'active' ",
    // );
const zsetKey = `products:active:${locale}`;
const start = (page - 1) * limit;
const stop = start + limit - 1;

// Lấy danh sách ID từ Sorted Set
const productIds = await client.zRange(zsetKey, start, stop);

if (productIds.length > 0) {
       
        const pipeline = client.multi();
        productIds.forEach(id => {
            pipeline.hGetAll(`product:detail:${id}:${locale}`);
        });
        const results = await pipeline.exec();
        
        // In node-redis v4, results is an array of responses directly
        const rows = results; 
        console.log("Lấy dữ liệu từ Redis" ,rows);
        // Tính toán Cursor đơn giản từ kết quả Redis
        const nextCursor = rows.length ? Buffer.from(JSON.stringify({ idNext: rows[rows.length - 1].id })).toString("base64") : null;
        const prevCursor = rows.length ? Buffer.from(JSON.stringify({ idprev: rows[0].id })).toString("base64") : null;
        
        const [totalCountRows] = await db.execute(
          "SELECT COUNT(*) FROM products WHERE status = 'active'",
        );
        const totalCount = totalCountRows[0]["COUNT(*)"];
        return [rows, nextCursor, prevCursor, { "COUNT(*)": totalCount }];
    } else {
      if (locale === "en") {
     

      let sql =
        "SELECT p.id , pt.name, p.price , p.img , p.category_id FROM  products p JOIN product_translations pt ON p.id = pt.product_id WHERE pt.language_code = 'en' AND p.status = 'active' ";
      let params = [];
      const offset = (page - 1) * limit;
      if (cursor) {
        const decoded = JSON.parse(Buffer.from(cursor, "base64").toString());

        if (direction === "next") {
          sql += ` AND p.id >  ?  `;
          sql += ` ORDER BY  p.id ASC  `;
          params.push(decoded.idNext);
        } else {
          sql += ` AND  p.id < ? `;
          sql += " ORDER BY p.id DESC ";
          params.push(decoded.idprev);
        }
        // sql += ` AND (id) < (?)`;
      } else {
        sql += ` ORDER BY  p.id ASC `;
      }

      sql += `LIMIT ? `;
      params.push(limit);
      if (page != null) {
        sql += ` OFFSET ?`;
        params.push(offset);
      }

      const [rows] = await db.query(sql, params);
      if (rows.length > 0) {
        const pipeline = client.multi();
        for (const row of rows) {
            const hashKey = `product:detail:${row.id}:${locale}`;
            pipeline.hSet(hashKey, Object.fromEntries(Object.entries(row).map(([k, v]) => [k, v === null ? "" : v.toString()])));
            pipeline.zAdd(zsetKey, { score: row.id, value: row.id.toString() });
        }
        await pipeline.exec();
        // Bạn có thể đặt TTL (hết hạn) cho ZSET nếu muốn
        await client.expire(zsetKey, 3600); 
    }
      if (direction === "prev" && cursor) {
        rows.reverse();
      }
      // console.log(rows[0].id)
      const nextCursor = rows.length
        ? Buffer.from(
            JSON.stringify({
              idNext: rows[rows.length - 1].id,
            }),
          ).toString("base64")
        : null;

      const prevCursor = rows.length
        ? Buffer.from(
            JSON.stringify({
              idprev: rows[0].id,
            }),
          ).toString("base64")
        : null;

      const [totalCount] = await db.execute(
        "SELECT COUNT(*) FROM  products WHERE status = 'active'",
      );
      
      return [rows, nextCursor, prevCursor, totalCount[0]];
    } else {
      let sql =
        "SELECT id , name , price , img , category_id FROM  products  WHERE status = 'active' ";
      let params = [];
      const offset = (page - 1) * limit;
      if (cursor) {
        const decoded = JSON.parse(Buffer.from(cursor, "base64").toString());

        if (direction === "next") {
          sql += ` AND id >  ?  `;
          sql += ` ORDER BY  id ASC  `;
          params.push(decoded.idNext);
        } else {
          sql += ` AND  id < ? `;
          sql += " ORDER BY id DESC ";
          params.push(decoded.idprev);
        }
        // sql += ` AND (id) < (?)`;
      } else {
        sql += ` ORDER BY  id ASC `;
      }

      sql += `LIMIT ? `;
      params.push(limit);
      if (page != null) {
        sql += ` OFFSET ?`;
        params.push(offset);
      }

      const [rows] = await db.query(sql, params);
      if (rows.length > 0) {
        const pipeline = client.multi();
        for (const row of rows) {
            const hashKey = `product:detail:${row.id}:${locale}`;
            pipeline.hSet(hashKey, Object.fromEntries(Object.entries(row).map(([k, v]) => [k, v === null ? "" : v.toString()])));
            pipeline.zAdd(zsetKey, { score: row.id, value: row.id.toString() });
        }
        await pipeline.exec();
        // Bạn có thể đặt TTL (hết hạn) cho ZSET nếu muốn
        await client.expire(zsetKey, 3600); 
    }
      if (direction === "prev" && cursor) {
        rows.reverse();
      }
      // console.log(rows[0].id)
      const nextCursor = rows.length
        ? Buffer.from(
            JSON.stringify({
              idNext: rows[rows.length - 1].id,
            }),
          ).toString("base64")
        : null;

      const prevCursor = rows.length
        ? Buffer.from(
            JSON.stringify({
              idprev: rows[0].id,
            }),
          ).toString("base64")
        : null;

      const [totalCount] = await db.execute(
        "SELECT COUNT(*) FROM  products WHERE status = 'active'",
      );
      return [rows, nextCursor, prevCursor, totalCount[0]];
    }
    
}
   
    
  };
  getProduct = async (id, locale) => {
    if (locale === "en") {
      const [row] = await db.query(
        "SELECT p.id, pt.name, p.price, p.img, p.category_id ,p.status FROM products p JOIN product_translations pt ON p.id = pt.product_id WHERE pt.language_code = 'en' AND p.id = ? AND p.status = 'active'  FOR UPDATE",
        [id],
      );
      return row;
    } else {
      const [existingItem] = await db.execute(
        "SELECT * FROM  products WHERE id = ? AND status = 'active' FOR UPDATE",
        [id],
      );
      return existingItem;
    }
  };
  createProduct = async (data) => {
    const { name, price, img, quantity } = data;
    const [existingItem] = await db.query(
      "INSERT INTO products (name, price, img, quantity) VALUES (?,?,?,?)",
      [name, price, img, quantity],
    );
    return existingItem;
  };
  editProduct = async (data) => {
    const { name, price, img, quantity, id } = data;
    const [existingItem] = await db.query(
      "UPDATE products SET name=?,price =?,img=?,quantity= ? WHERE id = ?",
      [name, price, img, quantity, id],
    );
    return existingItem;
  };
  deleteProduct = async (id) => {
    const [existingItem] = await db.query(
      "UPDATE products SET status = 'inactive' WHERE id = ?",
      [id],
    );
    return existingItem;
  };
  getProducUpdateCartAttributes = async (id, connection = db) => {
    const [existingItem] = await connection.execute(
      "SELECT * FROM  attributes WHERE id = ? FOR UPDATE",
      [id],
    );
    return existingItem[0];
  };
  editQuantityProductAttributes = async (
    attributesId,
    quantity,
    connection = db,
  ) => {
    const [row] = await connection.execute(
      "UPDATE attributes SET quantity= quantity +?  WHERE id = ?",
      [quantity, attributesId],
    );
    return row[0];
  };
  searchProduct = async (name) => {
    const [rows] = await db.execute(
      "SELECT * FROM products WHERE name LIKE ? AND status = 'active'",
      [`%${name}%`],
    );
    return rows;
  };
}
module.exports = new ProductModel();
