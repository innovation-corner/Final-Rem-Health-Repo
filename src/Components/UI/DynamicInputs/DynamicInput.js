import React from "react";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  CardBody,
  Progress,
  TabContent,
  TabPane
} from "reactstrap";
const max = moment().format("YYYY-MM-DD");

const DynamicInputs = props => {
  return props.inputs.map((val, idx) => {
    // let catId = `cat-${idx}`,
    //   ageId = `age-${idx}`;
    console.log(props.inputs[0]);
    console.log(props.inputs[idx]["searchCriteria"]);
    return (
      <div key={idx}>
        <Col md={4}>
          <FormGroup>
            <Label for={"searchCriteria" + idx + 1}>
              Search Criteria No {idx + 1}
            </Label>
            <Input
              value={props.inputs[idx]["searchCriteria form-control"]}
              type="select"
              data-id={idx}
              required
              name={"searchCriteria " + idx}
              id={"searchCriteria " + idx}
              className="searchCriteria"
              onChange={props.onChangeHandler}
            >
              <option defaultValue></option>
              <option>Age</option>
              <option>Gender</option>
              <option>Vaccine</option>
              <option>Age Range</option>
              <option>Date Range</option>
              {props.role == "superAdmin" || props.role == "nationalAdmin" ? (
                <option>State</option>
              ) : null}
              {props.role == "stateAdmin" || props.role == "user" ? (
                <option>LGA</option>
              ) : null}
            </Input>
          </FormGroup>
        </Col>

        <Row>
          <Col md={12}>
            {props.inputs[idx].dateRange ? (
              <Col md={3}>
                <FormGroup>
                  <Label for="dateFrom">From</Label>
                  <Input
                    value={props.inputs[idx]["datefrom form-control"]}
                    type="date"
                    data-id={idx}
                    required
                    name={"dateFrom" + idx}
                    id={"dateFrom" + idx}
                    className="dateFrom"
                    max={max}
                    onChange={props.onChangeHandler}
                  />
                </FormGroup>
              </Col>
            ) : null}
            {props.inputs[idx].dateRange ? (
              <Col md={6}>
                <FormGroup>
                  <Label for="dateTo">To</Label>
                  <Input
                    value={props.inputs[idx]["dateto form-control"]}
                    type="date"
                    data-id={idx}
                    required
                    name={"dateTo" + idx}
                    id={"dateTo" + idx}
                    className="dateTo"
                    max={max}
                    onChange={props.onChangeHandler}
                  />
                </FormGroup>
              </Col>
            ) : null}
            {props.inputs[idx].dateRange ? (
              <Col md={6}>
                <FormGroup>
                  <Label for="dateRangeType">Type</Label>
                  <Input
                    value={props.inputs[idx]["datereangetype form-control"]}
                    type="select"
                    data-id={idx}
                    required
                    name={"dateRangeType" + idx}
                    id={"dateRangeType" + idx}
                    className="dateRangeType"
                    onChange={props.onChangeHandler}
                  >
                    <option defaultValue>Registration</option>
                    <option>Date Of Birth</option>
                  </Input>
                </FormGroup>
              </Col>
            ) : null}
            {props.inputs[idx].searchByAge ? (
              <Col md={2}>
                <FormGroup>
                  <Label for="ageSearch">Select Age</Label>
                  <Input
                    value={props.inputs[idx]["ageSearch form-control"]}
                    type="number"
                    data-id={idx}
                    required
                    name={"ageSearch" + idx}
                    id={"ageSearch" + idx}
                    className="ageSearch"
                    onChange={props.onChangeHandler}
                  />
                </FormGroup>
              </Col>
            ) : null}

            {props.inputs[idx].searchByGender ? (
              <Col md={2}>
                <FormGroup>
                  <Label for="gender">Gender</Label>
                  <Input
                    value={props.inputs[idx]["gender form-control"]}
                    type="select"
                    required
                    name={"gender" + idx}
                    data-id={idx}
                    id={"gender" + idx}
                    className="gender"
                    onChange={props.onChangeHandler}
                  >
                    <option defaultValue>Male</option>
                    <option defaultValue>Female</option>
                  </Input>
                </FormGroup>
              </Col>
            ) : null}

            {props.inputs[idx].searchByAge ? (
              <Col md={2}>
                <FormGroup>
                  <Label for="ageType">Type</Label>
                  <Input
                    value={props.inputs[idx]["agetype form-control"]}
                    type="select"
                    required
                    name={"ageType" + idx}
                    id={"ageType" + idx}
                    data-id={idx}
                    className="ageType"
                    onChange={props.onChangeHandler}
                  >
                    <option defaultValue>Days</option>
                    <option>Weeks</option>
                    <option>Months</option>
                    <option>Years</option>
                  </Input>
                </FormGroup>
              </Col>
            ) : null}
            {props.inputs[idx].ageRange ? (
              <Col md={6}>
                <FormGroup>
                  <Label for="ageFrom">From</Label>
                  <Input
                    value={props.inputs[idx]["agefrom form-control"]}
                    type="number"
                    required
                    name={"ageFrom" + idx}
                    data-id={idx}
                    id={"ageFrom" + idx}
                    className="ageFrom"
                    onChange={props.onChangeHandler}
                  />
                </FormGroup>
              </Col>
            ) : null}
            {props.inputs[idx].ageRange ? (
              <Col md={4}>
                <FormGroup>
                  <Label for="ageFromType">Range Type</Label>
                  <Input
                    value={props.inputs[idx]["agefromtype form-control"]}
                    type="select"
                    required
                    name={"ageFromType" + idx}
                    data-id={idx}
                    id={"ageFromType" + idx}
                    className="ageFromType"
                    onChange={props.onChangeHandler}
                  >
                    <option defaultValue>Days</option>
                    <option>Weeks</option>
                    <option>Months</option>
                    <option>Years</option>
                  </Input>
                </FormGroup>
              </Col>
            ) : null}

            {props.inputs[idx].ageRange ? (
              <Col md={6}>
                <FormGroup>
                  <Label for="ageTo">To</Label>
                  <Input
                    value={props.inputs[idx]["ageto form-control"]}
                    type="number"
                    data-id={idx}
                    required
                    name={"ageTo" + idx}
                    id={"ageTo" + idx}
                    className="ageTo"
                    onChange={props.onChangeHandler}
                  />
                </FormGroup>
              </Col>
            ) : null}
            {props.inputs[idx].ageRange ? (
              <Col md={6}>
                <FormGroup>
                  <Label for="ageToType">Range Type</Label>
                  <Input
                    value={props.inputs[idx]["agetotype form-control"]}
                    type="select"
                    required
                    data-id={idx}
                    name={"ageToType" + idx}
                    id={"ageToType" + idx}
                    className="ageToType"
                    onChange={props.onChangeHandler}
                  >
                    <option defaultValue>Days</option>
                    <option>Weeks</option>
                    <option>Months</option>
                    <option>Years</option>
                  </Input>
                </FormGroup>
              </Col>
            ) : null}

            {props.inputs[idx].searchByState ? (
              <Col md={6}>
                <FormGroup>
                  <Label for="soo">State</Label>
                  <Input
                    data-id={idx}
                    value={props.inputs[idx]["soo form-control"]}
                    type="select"
                    name={"soo" + idx}
                    id={"soo" + idx}
                    className="soo"
                    onChange={props.onChangeHandler}
                    // disabled={props.inputs[idx].disableState}
                  >
                    <option>--State--</option>
                    {props.inputs[idx].sor.map(sors => {
                      return (
                        <option key={sors} value={sors}>
                          {sors}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
            ) : null}
            {props.inputs[idx].searchByState ? (
              <Col md={12}>
                <FormGroup>
                  <Label for="lga">Local Government Area</Label>
                  <Input
                    value={props.inputs[idx]["slga form-control"]}
                    type="select"
                    name={"slga" + idx}
                    id={"lga" + idx}
                    data-id={idx}
                    className="slga"
                    onChange={props.onChangeHandler}
                    // disabled={
                    //   props.inputs[idx].disableState ||
                    //   props.inputs[idx].soo == ""
                    // }
                  >
                    <option defaultValue>--select lga--</option>
                    {props.inputs[idx].lga.map(slga => {
                      return (
                        <option key={slga} value={slga}>
                          {slga}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
            ) : null}
            {props.inputs[idx].searchByLga ? (
              <Col md={4}>
                <FormGroup>
                  <Label for="slga">Local Government Area</Label>
                  <Input
                    value={props.inputs[idx]["slga form-control"]}
                    type="select"
                    data-id={idx}
                    name={"slga" + idx}
                    id={"lga" + idx}
                    className="slga"
                    onChange={props.onChangeHandler}
                  >
                    <option>--select lga--</option>
                    {props.inputs[idx].lga.map(slga => {
                      return (
                        <option key={slga} value={slga}>
                          {slga}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
            ) : null}

            {props.inputs[idx].searchByVaccine ? (
              <Col md={8}>
                <FormGroup>
                  <Label for="vaccine">Vaccine</Label>
                  <Input
                    value={props.inputs[idx]["vaccine form-control"]}
                    type="select"
                    required
                    name={"vaccine" + idx}
                    id={"vaccine" + idx}
                    className="vaccine"
                    data-id={idx}
                    onChange={props.onChangeHandler}
                  >
                    <option defaultValue>BCG</option>
                    <option defaultValue>HBV 1</option>
                    <option defaultValue>OPV</option>
                    <option defaultValue>OPV 1</option>
                    <option defaultValue>PCV 1</option>
                    <option defaultValue>Rotarix 1</option>
                    <option defaultValue>Pentavalent 1</option>
                    <option defaultValue>OPV 2</option>
                    <option defaultValue>Rotarix 2</option>
                    <option defaultValue>PCV 2</option>
                    <option defaultValue>OPV 2</option>
                    <option defaultValue>Pentavalent 2</option>
                    <option defaultValue>OPV 3</option>
                    <option defaultValue>PCV 3</option>
                    <option defaultValue>IPV</option>
                    <option defaultValue>Rotarix 3</option>
                    <option defaultValue>Pentavalent 3</option>
                    <option defaultValue>Vitamin A1</option>
                    <option defaultValue>Measles Vaccine</option>
                    <option defaultValue>Yellow Fever Vaccine</option>
                    <option defaultValue>Meningitis Vaccine</option>
                    <option defaultValue>Vitamin A2</option>
                    <option defaultValue>OPV Booster</option>
                    <option defaultValue>Measles 2 Vaccine</option>
                    <option defaultValue>Typhoid Vaccine</option>
                  </Input>
                </FormGroup>
              </Col>
            ) : null}
          </Col>
        </Row>
      </div>
    );
  });
};
export default DynamicInputs;
