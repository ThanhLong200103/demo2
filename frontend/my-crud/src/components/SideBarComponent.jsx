import { Button, Col, Container, Row } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutgoingMail } from "react-icons/md";
import { TbPhoneCall } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { closeSideBar } from "../redux/features/sideBar";
import "../styles/sideBar.css";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgMathMinus } from "react-icons/cg";
import { RepositoryFactory } from "../services/FactoryService";
import { useTranslation } from "react-i18next";
export default function SideBarComponent({ isOpen }) {
  const d = useDispatch();
  const { t } = useTranslation("header");
  // const [show, setShow] = useState(true);
  const [showId, setShowId] = useState();
  const [categorys, setCategorys] = useState([]);

  const i18nextlng = localStorage.getItem("i18nextLng")

  const hanleCloseSideBar = () => {
    d(closeSideBar(false));
  };
  useEffect(() => {
    // if (!category) return [];
    const buildTree = async () => {
      const map = {};
      const tree = [];
      const category = await RepositoryFactory.get("category").getCategory();
      console.log(category);
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
  }, [i18nextlng]);
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""} `}
        onClick={hanleCloseSideBar}
      ></div>
      <Container className={`d-lg-none slide ${isOpen ? "active" : ""}`}>
        <Row style={{ background: "" }}>
          <div className="d-flex justify-content-between  py-4 border-bottom fs-3 px-4 fw-bold ">
            <Col>{t("header.Category")}</Col>
            <Col className="text-end">
              <Button
                className="bg-white border-0 text-black fs-2"
                onClick={() => {
                  hanleCloseSideBar();
                }}
              >
                <IoCloseOutline />
              </Button>
            </Col>
          </div>
        </Row>
        <Row className="border-bottom  ">
          <Col>
            <div>
              <ul
                className="list-unstyled fw-bold ps-3"
                style={{ cursor: "pointer" }}
              >
                <li className="py-3 fs-4">
                  <Link to="/" className="text-black text-decoration-none">
                    {t("header.productNew")}
                  </Link>
                </li>
                <li className="py-3 fs-4">
                  <Link to="/sale" className="text-black text-decoration-none">
                    {t("header.categories Sale")}
                  </Link>
                </li>
                {categorys.map((category) => (
                  <li className="py-3 fs-4 position-relative" key={category.id}>
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
                      {showId === category.id ? <IoIosAdd /> : <CgMathMinus />}
                    </span>
                    {category.children && category.children.length > 0 && (
                      <ul
                        className={`list-unstyled fw-light fs-5  ${showId !== category.id && "d-none"}`}
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
            </div>
          </Col>
        </Row>
        <Row className="p-3">
          <div className="fs-3">
            <p>{t("header.support")}</p>
          </div>
          <div className="d-flex gap-3 fs-3  ">
            <p>
              <TbPhoneCall />
            </p>
            <a
              href="tel:0964942121"
              className=" text-decoration-none text-black fs-5 mt-2"
            >
              0964.942.121
            </a>
          </div>
          <div className="d-flex gap-3 fs-4 ">
            <p>
              <MdOutgoingMail />
            </p>
            <a
              href="maito:cskh@torano.vn"
              className=" text-decoration-none text-black fs-5 mt-1"
            >
              cskh@torano.vn
            </a>
          </div>
        </Row>
      </Container>
    </>
  );
}
