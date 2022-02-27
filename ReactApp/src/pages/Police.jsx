import { Field, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Accordion, Col, Row } from 'react-bootstrap'
import { Layout } from 'antd'
import {
  LoadingOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from '@ant-design/icons/lib/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Table, Tag, Space } from 'antd'
import columns from './table'
import { Baseurl } from '../config/BaseURL'
import CrimeReport from './crimeReport'
const { Column, ColumnGroup } = Table
const { Header, Footer, Sider, Content } = Layout
export const Police = () => {
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [accordionActiveKey, setAccordionActiveKey] = useState('0')

  // const data = [
  //   {
  //     case_status: "true",
  //     law_name: "IPC 205",
  //     offense_date: "22/03/2022",
  //     offense_time: "1:13 PM",
  //     description: "Half Murder",
  //     station_name: "Nikol",
  //     witness_name: "Neet",
  //     witness_age: "32",
  //     witness_address: "Nikol road,Nikol,Ahmedabad",
  //     id_proof_status: "true",
  //   },
  // ];

  // useEffect(() => {
  //   loadRequestList();
  // }, []);

  const handleSubmit = async (values) => {
    const {
      fir_id,
      law_name,
      description,
      station_name,
      offense_date,
      witness_age,
      witness_name,
      witness_address,
      offense_time,
      casestatus,
      id_proof_status,
    } = values

    await axios
      .post(Baseurl.nodeLocal + 'FIR/create/', {
        FIRId: fir_id,
        case_status: casestatus,
        law_name: law_name,
        offense_date: offense_date,
        offense_time: offense_time,
        description: description,
        station_name: station_name,
        witness_name: witness_name,
        witness_age: witness_age,
        witness_address: witness_address,
        id_proof_status: id_proof_status,
      })
      .then((data) => {
        if (data.status === 200) {
          window.alert('Created Successfully')
          console.log('data inserted db')
          console.log(data)
        } else if (data.status === 400) {
          window.alert('Register Failed')
          console.log('Failed to insert in db')
          console.log(data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loadRequestList = async (values) => {
    await axios
      .get(Baseurl.nodeLocal + 'FIR/get/' + values.FIRId)
      .then((res) => {
        console.log(res.data)
        setData([res.data.data])
        setAccordionActiveKey('1')
      })
      .catch((err) => {
        console.log(err, 'err')
      })
    console.log(data, 'data')
  }
  const loadPage = async (values) => {
    console.log(data, 'alll fir')
    await axios
      .get(Baseurl.nodeLocal + 'FIR/getAll/')
      .then((res) => {
        console.log(res.data.itemList, 'res.data')
        setData(res.data.itemList)
        setAccordionActiveKey('1')
      })
      .catch((err) => {
        console.log(err, 'err')
      })
    console.log(data, 'data')
  }

  const allData = data.map((item) => {
    return item.Record
  })
  console.log(allData, '>>>>>')

  const [report, setReport] = useState([])

  const getReport = async () => {
    await axios
      .get(Baseurl.nodeLocal + 'anonymous/getAllReport/')
      .then((res) => {
        console.log(res.data.itemList)
        setReport(res.data.itemList)
      })
      .catch((err) => {
        console.log(err, 'error')
      })
  }
  const allReports = report.map((item) => {
    return item.Record
  })
  return (
    <div>
      <Layout>
        <Header className="text-white nav justify-content-end">
          <a
            href="#"
            onClick={(e) => {
              navigate('/')
            }}
          >
            <LogoutOutlined style={{ fontSize: 30 }} />
          </a>
        </Header>
        <div
          className="w-100 d-flex justify-content-center align-items-center h5"
          style={{ height: 200 }}
        >
          <label>Police Dashboard</label>
        </div>

        <Content>
          <div>
            <Accordion defaultActiveKey={accordionActiveKey}>
              <Accordion.Item
                eventKey="0"
                onClick={() => {
                  setAccordionActiveKey('0')
                }}
              >
                <Accordion.Header className="d-flex justify-content-center">
                  Create FIR
                </Accordion.Header>
                <Accordion.Body className="d-flex justify-content-center">
                  {/* <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <div className="d-flex justify-content-center"> */}
                  <Formik
                    initialValues={{
                      fir_id: '',
                      law_name: '',
                      description: '',
                      station_name: '',
                      offense_date: '',
                      witness_age: '',
                      witness_name: '',
                      witness_address: '',
                      offense_time: '',
                      casestatus: false,
                      id_proof_status: false,
                    }}
                    validate={(values) => {
                      const errors = {}

                      /* fir_id */
                      if (!values.fir_id) {
                        errors.fir_id = 'Required'
                      }
                      /* witnessname */
                      if (!values.witness_name) {
                        errors.witness_name = 'Required'
                      }

                      return errors
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      console.log(JSON.stringify(values, null, 3))
                      setSubmitting(false)
                      handleSubmit(values)
                      resetForm()
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      handleReset,
                      isSubmitting,
                    }) => (
                      <form
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                        className="w-50"
                      >
                        <Row>
                          <Col xs={12} md={6} lg={6}>
                            <div className="form-group"></div>
                            <div className="form-group">
                              <label className="form-label">Fir ID</label>
                              <input
                                className="form-control"
                                type="text"
                                name="fir_id"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fir_id}
                              />
                              <span className="text-danger">
                                {errors.fir_id &&
                                  touched.fir_id &&
                                  errors.fir_id}
                              </span>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Law Name</label>
                              <input
                                className="form-control"
                                type="text"
                                name="law_name"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.law_name}
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label">Description</label>
                              <input
                                className="form-control"
                                type="text"
                                name="description"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Station Name</label>
                              <input
                                className="form-control"
                                type="text"
                                name="station_name"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.station_name}
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label">
                                Witness Address
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="witness_address"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.witness_address}
                              />
                            </div>
                          </Col>
                          <Col xs={6} md={6} lg={6}>
                            <div className="form-group">
                              <label className="form-label">Offense Date</label>
                              <input
                                className="form-control"
                                type="date"
                                name="offense_date"
                                placeholder="Date"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.offense_date}
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label">Witness age</label>
                              <input
                                className="form-control"
                                type="text"
                                name="witness_age"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.witness_age}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Offense Time</label>
                              <input
                                className="form-control"
                                type="text"
                                name="offense_time"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.offense_time}
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Witness Name</label>
                              <input
                                className="form-control"
                                type="text"
                                name="witness_name"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.witness_name}
                              />
                              <span className="text-danger">
                                {errors.witness_name &&
                                  touched.witness_name &&
                                  errors.witness_name}
                              </span>
                            </div>
                            <div
                              className="form-group"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: 40,
                                // marginTop: '15px',
                              }}
                            >
                              <div className="custom-control custom-switch">
                                <Field type="checkbox" name="id_proof_status" />
                              </div>
                              <div
                                style={{ display: 'flex', marginLeft: '145px' }}
                              >
                                <label className="form-label">Id Proof</label>
                              </div>

                              <span className="text-danger">
                                {errors.id_proof_status &&
                                  touched.id_proof_status &&
                                  errors.id_proof_status}
                              </span>
                            </div>

                            <div
                              className="form-group"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: 40,
                              }}
                            >
                              <div className="custom-control custom-switch">
                                <Field type="checkbox" name="casestatus" />
                              </div>
                              <div
                                style={{ display: 'flex', marginLeft: '145px' }}
                              >
                                <label className="form-label">
                                  Case Status
                                </label>
                              </div>

                              <span className="text-danger">
                                {errors.isactive &&
                                  touched.isactive &&
                                  errors.isactive}
                              </span>
                            </div>
                          </Col>
                        </Row>

                        <button
                          type="submit"
                          className="btn btn-primary mt-2"
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  </Formik>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item
                eventKey="1"
                onClick={() => {
                  setAccordionActiveKey('1')
                }}
              >
                <Accordion.Header className="d-flex justify-content-center">
                  Fetch FIR
                </Accordion.Header>
                <Accordion.Body>
                  <Formik
                    initialValues={{
                      FIRId: '',
                    }}
                    validate={(values) => {
                      const errors = {}

                      /* fir_id */
                      if (!values.FIRId) {
                        errors.FIRId = 'Required'
                      }

                      return errors
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      console.log(JSON.stringify(values, null, 3))
                      setSubmitting(false)
                      loadRequestList(values)
                      setSubmitting(true)
                      resetForm()
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      handleReset,
                      isSubmitting,
                    }) => (
                      <form
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                        className="w-50"
                      >
                        <Row>
                          <Col xs={12} md={6} lg={6}>
                            <div className="form-group"></div>

                            <div className="form-group">
                              <label className="form-label">Fir ID</label>
                              <input
                                className="form-control"
                                type="text"
                                name="FIRId"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.FIRId}
                              />
                              <span className="text-danger">
                                {errors.FIRId && touched.FIRId && errors.FIRId}
                              </span>
                            </div>
                          </Col>
                        </Row>

                        <button
                          type="submit"
                          className="btn btn-primary mt-2"
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  </Formik>
                  {data && data.length > 0 && (
                    <Table dataSource={data}>
                      <ColumnGroup title="FIR Details">
                        <Column title="FIRId" dataIndex="FIRId" key="FIRId" />
                        <Column
                          title="Ipc"
                          dataIndex="law_name"
                          key="law_name"
                        />
                        <Column
                          title="case_status"
                          dataIndex="case_status"
                          key="case_status"
                        />
                        <Column
                          title="offense_date"
                          dataIndex="offense_date"
                          key="offense_date"
                        />
                        <Column
                          title="offense_time"
                          dataIndex="offense_time"
                          key="offense_time"
                        />
                        <Column
                          title="description"
                          dataIndex="description"
                          key="description"
                        />
                        <Column
                          title="station_name"
                          dataIndex="station_name"
                          key="station_name"
                        />
                        <Column
                          title="witness_name"
                          dataIndex="witness_name"
                          key="witness_name"
                        />
                        <Column
                          title="witness_age"
                          dataIndex="witness_age"
                          key="witness_age"
                        />
                        <Column
                          title="witness_address"
                          dataIndex="witness_address"
                          key="witness_address"
                        />
                        <Column
                          title="id_proof_status"
                          dataIndex="id_proof_status"
                          key="id_proof_status"
                        />
                      </ColumnGroup>
                    </Table>
                  )}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item
                eventKey="2"
                onClick={() => {
                  setAccordionActiveKey('2')
                }}
              >
                <Accordion.Header onClick={loadPage}>All FIR</Accordion.Header>
                <Accordion.Body>
                  {data && data.length > 0 && (
                    <Table dataSource={allData} columns={columns}></Table>
                  )}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item
                eventKey="3"
                onClick={() => {
                  setAccordionActiveKey('3')
                }}
              >
                <Accordion.Header onClick={getReport}>
                  Crime Reports
                </Accordion.Header>
                <Accordion.Body>
                  {report && report.length > 0 && (
                    <Table
                      dataSource={allReports}
                      columns={CrimeReport}
                    ></Table>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  )
}
