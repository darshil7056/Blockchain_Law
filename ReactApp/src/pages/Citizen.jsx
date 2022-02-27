import React, { useState } from 'react'
import { Field, Formik } from 'formik'
import { Accordion, Col, Row, Table } from 'react-bootstrap'
import { Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  LoadingOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from '@ant-design/icons/lib/icons'
import axios from 'axios'
import { Baseurl } from '../config/BaseURL'
const { Header, Footer, Sider, Content } = Layout
export const Citizen = () => {
  const navigate = useNavigate()
  const handleSubmit = async (values) => {
    const {
      reportId,
      crime_type,
      offense_date,
      offense_time,
      description,
      area,
      victim_name,
      victim_address,
      suspect_name,
      suspect_address,
    } = values

    await axios
      .post(Baseurl.nodeLocal + 'anonymous/postReport', {
        reportId: reportId,
        crime_type: crime_type,
        offense_date: offense_date,
        offense_time: offense_time,
        description: description,
        area: area,
        victim_name: victim_name,
        victim_address: victim_address,
        suspect_name: suspect_name,
        suspect_address: suspect_address,
      })

      .then((data) => {
        if (data.status === 200) {
          //   window.alert("Product created Successfully");
          console.log('data inserted db')
          console.log(data)
        } else if (data.status === 400) {
          //window.alert("Register Failed")
          console.log('Failed to insert in db')
          console.log(data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
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
          <label>Citizen Dashboard</label>
        </div>

        <Content>
          {' '}
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="d-flex justify-content-center">
                Crime Report
              </Accordion.Header>
              <Accordion.Body className="d-flex justify-content-center">
                {/* <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <div className="d-flex justify-content-center"> */}
                <Formik
                  initialValues={{
                    reportId: '',
                    crime_type: '',
                    offense_date: '',
                    offense_time: '',
                    description: '',
                    area: '',
                    victim_name: '',
                    victim_address: '',
                    suspect_name: '',
                    suspect_address: '',
                  }}
                  validate={(values) => {
                    const errors = {}

                    /* fir_id */
                    if (!values.reportId) {
                      errors.reportId = 'Required'
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
                            <label className="form-label">Report ID</label>
                            <input
                              className="form-control"
                              type="text"
                              name="reportId"
                              autoComplete="new-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.reportId}
                            />
                            <span className="text-danger">
                              {errors.reportId &&
                                touched.reportId &&
                                errors.reportId}
                            </span>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Crime Type</label>
                            <input
                              className="form-control"
                              type="text"
                              name="crime_type"
                              autoComplete="new-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.crime_type}
                            />
                          </div>
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
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                          <div className="form-group">
                            <label className="form-label">Area</label>
                            <input
                              className="form-control"
                              type="text"
                              name="area"
                              autoComplete="new-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.area}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Victim Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="victim_name"
                              autoComplete="new-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.victim_name}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">victim Address</label>
                            <input
                              className="form-control"
                              type="text"
                              name="victim_address"
                              autoComplete="new-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.victim_address}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Suspect Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="suspect_name"
                              autoComplete="new-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.suspect_name}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">
                              Suspect Address
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="suspect_address"
                              autoComplete="new-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.suspect_address}
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
          </Accordion>
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  )
}
