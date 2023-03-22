import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Buttons from "../common-components/Button";
import InputWithLabel from "../common-components/InputWithLabel";
import Selector from "../common-components/Selector";
import Head from "../components/Head";

const Form1 = () => {
  const marketArea = [
    {
      value: "Delhi",
    },
    {
      value: "Mumbai",
    },
    {
      value: "Kolkata",
    },
  ];
  const customerUnit = [
    {
      value: "Dolar",
    },
    {
      value: "Rupees",
    },
   
  ];
  const ercHub = [{ value: "1" }, { value: "2" }, { value: "3" }];
  const formOBj = {
    emgCaseNum: "",
    custName: "",
    mktarea: "",
    custUnit: "",
    sdmEmail: "",
    rlName: "",
    ercHub: "",
  };

  const [formData, setFormData] = useState(formOBj);
  const [vldEmgNum, setVldEmgNum] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    let fieldName = e.target.name;
    let inpVal = e.target.value;
    setFormData((perv) => ({ ...perv, [fieldName]: inpVal }));
    if(vldEmgNum){
        setVldEmgNum("")
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.emgCaseNum){

        const obj = { ...formData };
        const formList = localStorage.getItem("formData");
        if (formList) {
          let formlistParse = JSON.parse(formList);
          let ids = [];
          formlistParse.map((item) => ids.push(item.id));
          obj.id = Math.max(...ids) + 1;
          const strfy = JSON.stringify([obj, ...formlistParse]);
          localStorage.setItem("formData", strfy);
        } else {
          obj.id = 1;
          const strfy = JSON.stringify([obj]);
          localStorage.setItem("formData", strfy);
        }
        navigate("/list")
    }else{
        setVldEmgNum("Please enter emergency case number !")
    }
  };
  return (
    <>
           <Head/>
    <Container>
      <div className="w-100  py-3">
        <h1 className="text-center  text-white">Form 1</h1>
      </div>
      <Form onSubmit={handleSubmit} className="mt-5">
        <Row>
          <Col lg={6} md={6} sm={12}>
            <InputWithLabel
              label={"Emergency case number"}
              placeholder={"Enter emergency case number."}
              type={"text"}
              value={formData.emgCaseNum}
              name={"emgCaseNum"}
              onChange={handleChange}
              validationMsg={vldEmgNum}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <InputWithLabel
              label={"Customer name"}
              placeholder={"Enter customer name."}
              type={"text"}
              value={formData.custName}
              name={"custName"}
              onChange={handleChange}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Selector
              placeholder={"Please select"}
              options={marketArea}
              label={"Market area"}
              value={formData.mktarea}
              name={"mktarea"}
              onChange={handleChange}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Selector
              placeholder={"Please select"}
              options={customerUnit}
              label={"Customer unit"}
              value={formData.custUnit}
              name={"custUnit"}
              onChange={handleChange}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <InputWithLabel
              label={"SDM email"}
              placeholder={"Enter SDM email."}
              type={"text"}
              value={formData.sdmEmail}
              name={"sdmEmail"}
              onChange={handleChange}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <InputWithLabel
              label={"RL name"}
              placeholder={"Enter RL name."}
              type={"text"}
              value={formData.rlName}
              name={"rlName"}
              onChange={handleChange}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Selector
              placeholder={"Please select"}
              options={ercHub}
              label={"ERC hub"}
              value={formData.ercHub}
              name={"ercHub"}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Buttons variant="primary" type="submit" text={"Submit"} />
      </Form>
    </Container>
    </>
  );
};

export default Form1;
