import { Col, Container, Row } from "react-bootstrap";
import "../styles/maxWidth.css";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { CgMathMinus } from "react-icons/cg";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RepositoryFactory } from "../services/FactoryService";
import ProductComponent from "../components/ProductComponent";
export default function CategoryPage() {
  const localtion = useLocation();
  const {idCategory} = localtion.state ||{}
  // console.log("id cate :",idCategory)
  const [showSideBar, setShowSideBar] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showColor, setShowColor] = useState(true);
  const [showSize, setShowSize] = useState(true);
  const [categorys, setCategorys] = useState([]);
  const [showId, setShowId] = useState();
  const [productCate, setProductCate] = useState([]);

  useEffect(() => {
    // if (!category) return [];
    const buildTree = async () => {
      const map = {};
      const tree = [];
      const category = await RepositoryFactory.get("category").getCategory();
      // console.log(category);
      // B1: tạo map id → object
      category.forEach((item) => {
        map[item.id] = { ...item, children: [] };
      });

      // B2: build cây
      category.forEach((item) => {
        if (item.parent_id === null) {
          tree.push(map[item.id]); // node cha
        } else {
          map[item.parent_id]?.children.push(map[item.id]);
        }
      });

      setCategorys(tree);
      console.log(tree);
    };
    buildTree();

    
  }, []);
  useEffect(
    ()=>{
      const cateProduct = async ()=>{
      const products = await RepositoryFactory.get("category").getCategoryProduct(idCategory);
      console.log("SP cate :",products)
      setProductCate(products)
    }
    cateProduct()
    },[idCategory]
  )
  return (
    <>
      <div className="maxWidth">
        <Container fluid>
          <Row>
            <Col lg={3} className="d-none d-lg-block">
              <div>
                <p className="fw-bold fs-4 pt-2"> Bộ Lọc</p>
              </div>
              <div>
                <ul className="list-unstyled">
                  <li
                    className="fw-bold fs-5 py-2 pe-4 position-relative"
                    key={1}
                  >
                    Danh mục sản phẩm
                    <span
                      className="position-absolute top-0 bottom-0 mt-2 me-3"
                      style={{ right: "0" }}
                      onClick={() => {
                        setShowSideBar((item) => !item);
                      }}
                    >
                      {showSideBar ? <IoIosAdd /> : <CgMathMinus />}
                    </span>
                    <ul
                      className={`list-unstyled  ps-3   ${showSideBar && "d-none"}`}
                      style={{ cursor: "pointer" }}
                    >
                      <li className="py-3 fs-6">
                        <Link
                          to="/"
                          className="text-black text-decoration-none"
                        >
                          Sản phẩm mới
                        </Link>
                      </li>
                      <li className="py-3 fs-6">
                        <Link
                          to="/sale"
                          className="text-black text-decoration-none"
                        >
                          Danh mục sale
                        </Link>
                      </li>
                      {categorys.map((category) => (
                        <li
                          className="py-3 fs-6 position-relative"
                          key={category.id}
                        >
                          <Link
                            to={`/collections/${category.name}`}
                            state={{ idCategory: category.id }}
                            className="text-black text-decoration-none"
                          >
                            {category.name}
                          </Link>
                          <span
                            className="position-absolute top-0 bottom-0 mt-3 me-3"
                            style={{ right: "0" }}
                            onClick={() => {
                              // setShow((item) => !item);
                              setShowId((prev) =>
                                prev === category.id ? null : category.id,
                              );
                            }}
                          >
                            {showId === category.id ? (
                              <CgMathMinus />
                            ) : (
                              <IoIosAdd />
                            )}
                          </span>
                          {category.children &&
                            category.children.length > 0 && (
                              <ul
                                className={`list-unstyled fw-light fs-6  ${showId !== category.id && "d-none"}`}
                              >
                                {category.children.map((c) => (
                                  <li className="m-3">
                                    <Link
                                      to={`/collections/${c.name}`}
                                      state={{ idCategory: c.id }}
                                      className="text-black text-decoration-none"
                                    >
                                      {c.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="fw-bold fs-5 py-2 pe-4 position-relative">
                    Khoảng giá
                    <span
                      className="position-absolute top-0 bottom-0 mt-2 me-3"
                      style={{ right: "0" }}
                      onClick={() => {
                        setShowPrice((item) => !item);
                      }}
                    >
                      {showPrice ? <IoIosAdd /> : <CgMathMinus />}
                    </span>
                  </li>
                  <li className="fw-bold fs-5 py-2 pe-4 position-relative">
                    Màu sắc
                    <span
                      className="position-absolute top-0 bottom-0 mt-2 me-3"
                      style={{ right: "0" }}
                      onClick={() => {
                        setShowColor((item) => !item);
                      }}
                    >
                      {showColor ? <IoIosAdd /> : <CgMathMinus />}
                    </span>
                  </li>
                  <li className="fw-bold fs-5 py-2 pe-4 position-relative">
                    Size
                    <span
                      className="position-absolute top-0 bottom-0 mt-2 me-3"
                      style={{ right: "0" }}
                      onClick={() => {
                        setShowSize((item) => !item);
                      }}
                    >
                      {showSize ? <IoIosAdd /> : <CgMathMinus />}
                    </span>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={9} md={12}>
            <ProductComponent products={productCate}></ProductComponent>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
