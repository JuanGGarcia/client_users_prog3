import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import "./SubjectStyle.scss";
import { postSubject } from "../../../api/subject";

export default function EditSubject(props) {
  const { setIsVisibleModal, setReloadSubjects } = props;
  const [subjectData, setSubjectData] = useState({});

  const addSubject = (event) => {
    event.preventDefault();

    if (!subjectData.department) {
      console.log(subjectData.department);
      notification["error"]({
        message: "Todos los campos son obligatorios. fronEnd addSubject",
      });
    } else {
      postSubject(subjectData)
        .then((response) => {
          notification["success"]({
            message: response,
          });
          setIsVisibleModal(false);
          setReloadSubjects(true);
          setSubjectData({});
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
    }
  };

  return (
    //subjectData
    <div className="add-subject-form">
      <AddForm
        subjectData={subjectData}
        setSubjectData={setSubjectData}
        addSubject={addSubject}
      />
    </div>
  );
}

const AddForm = (props) => {
  const { subjectData, setSubjectData, addSubject } = props;
  const { Option } = Select;

  return (
    <Form className="form-add">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserAddOutlined />}
              placeholder="department"
              value={subjectData.department}
              onChange={(e) =>
                setSubjectData({ ...subjectData, department: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          onClick={addSubject}
        >
          Crear Materia
        </Button>
      </Form.Item>
    </Form>
  );
};
