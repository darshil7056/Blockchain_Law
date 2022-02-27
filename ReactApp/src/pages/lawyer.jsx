import { Field, Formik } from 'formik'
import React, { useState } from 'react'
import { Accordion, Col, Row } from 'react-bootstrap'
import {
  LoadingOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from '@ant-design/icons/lib/icons'
import { useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import axios from 'axios'
import { Baseurl } from '../config/BaseURL'
import { Table } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const { Column, ColumnGroup } = Table

export const Lawyer = () => {
  const navigate = useNavigate()

  const [dataset, setDataset] = useState([])
  const [fir, setFir] = useState([])
  const [accordionActiveKey, setAccordionActiveKey] = useState('0')

  const handleSubmit = async (values) => {
    const { Id, FIRId, clientName, message, details } = values

    await axios
      .post(Baseurl.nodeLocal + 'chat/sendMessage/', {
        Id: Id,
        FIRId: FIRId,
        clientName: clientName,
        message: message,
        details: details,
      })
      .then((data) => {
        if (data.status === 200) {
          window.alert(' Chat Sent Successfully')
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
  const FetchFIR = async (values) => {
    await axios
      .get(Baseurl.nodeLocal + 'FIR/get/' + values.FIRId)
      .then((res) => {
        console.log(res.data, 'fetchfir')
        setFir([res.data.data])
        setAccordionActiveKey('1')
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }
  const loadRequestList = async (values) => {
    console.log(values.MessageId, '======id')
    const ctId = values.MessageId
    console.log(ctId, 'ct')
    await axios
      .get(Baseurl.nodeLocal + 'chat/ReadMessage/' + ctId)
      .then((res) => {
        console.log(res.data.orderData, '>>>>')
        setDataset(JSON.parse(res.data.orderData))
        setAccordionActiveKey('1')
      })
      .catch((err) => {
        console.log(err, 'err')
      })

    // console.log(data, "data");
  }
  console.log(dataset, 'data')

  const Columns = [
    {
      headerName: 'FIRId',
      field: 'FIRId',
      width: 150,
    },
    {
      headerName: 'clientName',
      field: 'clientName',
      width: 150,
    },
    {
      headerName: 'message',
      field: 'message',
      width: 150,
    },
    {
      headerName: 'details',
      field: 'details',
      width: 150,
    },
  ]

  return (
    <>
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
            <label>Lawyer Dashboard</label>
          </div>
          <Content>
            {' '}
            <Accordion defaultActiveKey={accordionActiveKey}>
              <Accordion.Item
                eventKey="0"
                onClick={() => {
                  setAccordionActiveKey('0')
                }}
              >
                <Accordion.Header className="d-flex justify-content-center">
                  Send PDC Message
                </Accordion.Header>
                <Accordion.Body className="d-flex justify-content-center">
                  {/* <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <div className="d-flex justify-content-center"> */}
                  <Formik
                    initialValues={{
                      Id: '',
                      FIRId: '',
                      clientName: '',
                      message: '',
                      details: '',
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
                              <label className="form-label"> ID</label>
                              <input
                                className="form-control"
                                type="text"
                                name="Id"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.Id}
                              />
                              <span className="text-danger">
                                {errors.ID && touched.ID && errors.ID}
                              </span>
                            </div>
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
                            </div>
                            <div className="form-group"></div>
                            <div className="form-group">
                              <label className="form-label">Client Name</label>
                              <input
                                className="form-control"
                                type="text"
                                name="clientName"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.clientName}
                              />
                            </div>
                          </Col>
                          <Col xs={12} md={6} lg={6}>
                            <div className="form-group"></div>
                            <div className="form-group">
                              <label className="form-label">Message</label>
                              <input
                                className="form-control"
                                type="text"
                                name="message"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.message}
                              />
                            </div>
                            <div className="form-group"></div>
                            <div className="form-group">
                              <label className="form-label">Details</label>
                              <input
                                className="form-control"
                                type="text"
                                name="details"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.details}
                              />
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
                  Read PDC Message
                </Accordion.Header>
                <Accordion.Body className="d-flex justify-content-center flex-wrap">
                  <Formik
                    initialValues={{
                      MessageId: '',
                    }}
                    validate={(values) => {
                      const errors = {}

                      /* fir_id */
                      if (!values.MessageId) {
                        errors.MessageId = 'Required'
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
                        className="w-100"
                      >
                        <Row>
                          <Col xs={12} md={6} lg={6}>
                            <div className="form-group"></div>

                            <div className="form-group">
                              <label className="form-label">ID</label>
                              <input
                                className="form-control"
                                type="text"
                                name="MessageId"
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.MessageId}
                              />
                              <span className="text-danger">
                                {errors.MessageId &&
                                  touched.MessageId &&
                                  errors.MessageId}
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
                  {/* <div className="table" style={{width:'100%',marginTop:'10px',height:'400px'}}>
                    <LawyerData />
                  </div> */}

                  <div
                    className="table"
                    style={{
                      width: '100%',
                      marginTop: '10px',
                      height: '400px',
                    }}
                  >
                    <table>
                      <tbody>
                        <tr>
                          <th style={{ width: 100 }}>FIRId</th>
                          <th style={{ width: 150 }}>Client Name</th>
                          <th style={{ width: 200 }}>Message</th>
                          <th style={{ width: 150 }}>Details</th>
                        </tr>
                        <tr>
                          <td style={{ width: 100 }}>{dataset.FIRId}</td>
                          <td style={{ width: 150 }}>{dataset.clientName}</td>
                          <td style={{ width: 200 }}>{dataset.message}</td>
                          <td style={{ width: 150 }}>{dataset.details}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="2"
                onClick={() => {
                  setAccordionActiveKey('2')
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
                      FetchFIR(values)
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
                            <div className="form-group" ></div>

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
                  {fir && fir.length > 0 && (
                    <Table dataSource={fir} >
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
            </Accordion>
          </Content>
          <Footer></Footer>
        </Layout>
      </div>
    </>
  )
}
