import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getAccessToken } from "../../../api/auth";

import "./SubjectStyle.scss";

export default function EditSubjectForm(props) {
  const { subject, setIsVisibleModal, setReloadSubjects } = props;
  const [subjectData, setSubjectData] = useState({});

  useEffect(() => {
    setSubjectData({
      department: subject.department,
    });
  }, [subject]);

  const updateSubject = () => {
    //const token = getAccessToken();
    let subjectUpdate = subjectData;

    if (!subjectUpdate.department) {
      notification["error"]({
        message: "todos los valores son obligatorios. FrontEnd editSubject",
      });
      return;
    }
    updateSubject(subjectUpdate, subject._id).then((result) => {
      notification["success"]({
        message: result.message,
      });
      setIsVisibleModal(false);
      setReloadSubjects(true);
    });
  };

  return (
    <div className="edit-subject-form">
      <EditForm
        subjectData={subjectData}
        setSubjectData={setSubjectData}
        updateSubject={updateSubject}
      />
    </div>
  );
}

function EditForm(props) {
  const { subjectData, setSubjectData, updateSubject } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onFinish={updateSubject}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="academic_activity"
              value={subjectData.academic_activity}
              onChange={(e) =>
                setSubjectData({
                  ...subjectData,
                  academic_activity: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Materia
        </Button>
      </Form.Item>
    </Form>
  );
}
