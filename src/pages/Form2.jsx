import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Buttons from "../common-components/Button";
import InputWithLabel from "../common-components/InputWithLabel";
import Selector from "../common-components/Selector";
import Head from "../components/Head";
import { seletData } from "../veriable";

const Form2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    custName,
    custUnit,
    emgCaseNum,
    ercHub,
    mktarea,
    rlName,
    sdmName,
    id,
    survey

  } = location?.state;
  const obj = {
    Q1: "",
    Q2: "",
    Q3: "",
    Q4: "",
    Q5: "",
    Q6: "",
    average: "",
    bad: "",
    good: "",
    lesson: "",
  };

  const vldObj = { ...obj };

  const [formData, setformData] = useState(obj);
  const [vldMsg, setVldMsg] = useState(vldObj);
  const [average, setAverage] = useState(null);

  const handleChange = (e) => {
    let inpField = e.target.name;
    let inpVal = e.target.value;

    setformData({ ...formData, [inpField]: inpVal });
    setVldMsg({ ...vldMsg, [inpField]: "" });
  };
  useEffect(() => {
    // console.log("formData===",formData);
    const { Q1, Q2, Q3, Q4, Q5, Q6 } = formData;
    if (Q1 && Q2 && Q3 && Q4 && Q5 && Q6) {
      let sum =
        parseInt(Q1) +
        parseInt(Q2) +
        parseInt(Q3) +
        parseInt(Q4) +
        parseInt(Q5) +
        parseInt(Q6);
      let ave = sum / 6;
      setAverage(ave);
      // setformData({...formData, Q7:average})
      // console.log("average===",Math.floor(average));
    }
  }, [formData]);
  useEffect(() => {
    if (average) {
      setformData({
        ...formData,
        average: JSON.stringify(Math.round(average)),
      });
    }
  }, [average]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { Q1, Q2, Q3, Q4, Q5, Q6 } = formData;

    if (!Q1) {
      vldObj.Q1 = "Please Select !";
    }
    if (!Q2) {
      vldObj.Q2 = "Please Select !";
    }
    if (!Q3) {
      vldObj.Q3 = "Please Select !";
    }
    if (!Q4) {
      vldObj.Q4 = "Please Select !";
    }
    if (!Q5) {
      vldObj.Q5 = "Please Select !";
    }
    if (!Q6) {
      vldObj.Q6 = "Please Select !";
    }

    setVldMsg(vldObj);
    if (Q1 && Q2 && Q3 && Q4 && Q5 && Q6) {
      const fdata = localStorage.getItem("formData");
      if (fdata) {
        const data = JSON.parse(fdata);

        const ind = data.map((item) => item.id).indexOf(id);
        data[ind].survey = formData;
        localStorage.setItem("formData", JSON.stringify(data));
        navigate("/list")
      }
    }
  };
  return (
    <>
    <Head/>
    <Container className="p-3">
      <div className=" py-3">
        <h1 className="text-white text-center">Form 2</h1>
      </div>
      <br />
      <div>
        <h4>Your Info</h4>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <span>Emergency Case Number : </span> <span>{emgCaseNum}</span>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <span>Customer Name : </span> <span>{custName}</span>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <span>Cutomer Unit : </span> <span>{custUnit}</span>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <span>Market Area : </span> <span>{mktarea}</span>
          </Col>
          {/* <Col lg={6} md={6} sm={12}>
                <span>SDM Name : </span> <span>{sdmName}</span>
            </Col> */}
          <Col lg={6} md={6} sm={12}>
            <span>RL Name : </span> <span>{rlName}</span>
          </Col>
        </Row>
        <h4 className="my-2">Survey</h4>
        {survey?.average?
        <h3>Already given survey !</h3>:
        <Form onSubmit={handleSubmit}>
          <Row>
            {seletData.map((item, ind) => (
              <Col lg={6} md={6} sm={12} key={ind}>
                <Selector
                  label={`${ind + 1}. ${item.label}`}
                  name={item.name}
                  placeholder={item.placeholder}
                  options={item.options}
                  onChange={handleChange}
                  value={formData[item.name]}
                  disabled={item.disabled}
                  validationMsg={vldMsg[item.name]}
                />
              </Col>
            ))}
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <InputWithLabel
                placeholder={"What was bad?"}
                label={"What was bad?  (SDM Name) "}
                name={"bad"}
                value={formData.bad}
                onChange={handleChange}
              />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <InputWithLabel
                placeholder={"What was good?"}
                label={"What was good? (SDM Name)"}
                name={"good"}
                value={formData.good}
                onChange={handleChange}
              />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <InputWithLabel
                placeholder={"What lesson"}
                label={
                  "What lessons can we take away from the handling of this case?  (SDM Name) "
                }
                name={"lesson"}
                value={formData.lesson}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Buttons text={"Submit"} type={"submit"} variant={"primary"} />
        </Form>
        }
      </div>
    </Container>
    </>
  );
};

export default Form2;
