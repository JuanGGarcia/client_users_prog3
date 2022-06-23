import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { minLengthValidation } from "../../../validations/FormValidations";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    department: "",
  });
  const [formValid, setFormValid] = useState({
    department: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const inputValidation = (e) => {
    console.log(formValid);
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }
    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }
    if (type === "checkbox") {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };

  const register = async (e) => {
    e.preventDefault();
    const depVal = inputs.department;

    if (!depVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
      console.log("Vacìos desde register en subject");
    } else {
      notification["success"]({
        message: "Asignatura creado correctamente",
      });
      resetForm();
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      department: "",
    });

    setFormValid({
      department: false,
    });
  };

  return (
    <Form className="register-form" onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="txt"
          name="department"
          placeholder="department"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.department}
        />
      </Form.Item>
      <Button onClick={register} className="register-form__button">
        Crear cuenta
      </Button>
    </Form>
  );
}
