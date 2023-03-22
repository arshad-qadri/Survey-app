import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../common-components/InputWithLabel";
import Head from "../components/Head";

const List = () => {
  const [data, setData] = useState([]);
  const navigate= useNavigate()
  function getData() {
    const dataList = localStorage.getItem("formData");
    if (dataList) {
      let dataListParse = JSON.parse(dataList);
      setData(dataListParse);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  const handleChange = (e) => {
    let val = e.target.value;
    if (val) {
      let newData = data;
      let filter = newData.filter((item) => item.emgCaseNum.includes(val));
      setData(filter);
    } else {
      getData();
    }
  };
  return (
    <>
    <Head/>
    <Container className="py-2">
      <InputWithLabel placeholder={"Search here..."} onChange={handleChange} />
      {data && data.length > 0 ? (
        <Table striped bordered hover className="text-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Emergency case number</th>
              <th>Customer name</th>
              <th>Market area</th>
              <th>Customer unit</th>
              <th>SDM Email</th>
              <th>RL Name</th>
              <th>ERC Hub</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {data && data?.length > 0
              ? data.map((item, ind) => (
                  <tr key={ind} onClick={()=>navigate("/form2",{state:item})} className="text-white">
                    <td className="text-white">{ind + 1}</td>
                    <td>{item.emgCaseNum}</td>
                    <td>{item.custName}</td>
                    <td>{item.mktarea}</td>
                    <td>{item.custUnit}</td>
                    <td>{item.sdmEmail}</td>
                    <td>{item.rlName}</td>
                    <td>{item.ercHub}</td>
                  </tr>
                ))
              : ""}
          </tbody>
        </Table>
      ) : (
        <h2 className="text-center">NO Data Found</h2>
      )}
    </Container>
    </>
  );
};

export default List;
