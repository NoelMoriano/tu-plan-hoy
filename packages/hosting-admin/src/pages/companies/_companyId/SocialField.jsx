import React, { useEffect, useState } from "react";
import {
  Col,
  ComponentContainer,
  Input,
} from "../../../components/ui/index.js";
import { Row } from "antd";

export const SocialField = ({
  label,
  name,
  value,
  required = false,
  error = false,
  hidden = false,
  disabled = false,
  onChange,
}) => {
  const [socialName, setSocialName] = useState("");
  const [socialUrl, setSocialUrl] = useState("");

  useEffect(() => {
    if (socialName && socialUrl) {
      let newValue = {};

      const _newValue = (newValue[name] = {
        name: value?.name || socialName,
        url: value?.url || socialUrl,
      });

      onChange({
        ..._newValue,
      });
    }
  }, [value, socialName, socialUrl]);

  return (
    <ComponentContainer.filled
      disabled={disabled}
      error={error}
      required={required}
      hidden={hidden}
      label={label}
      animation={false}
    >
      <Row gutter={[16, 16]} style={{ padding: "1.1em .5em .5em .5em" }}>
        <Col span={24}>
          <Input
            label="Nombre"
            animation={false}
            value={socialName}
            onChange={(e) => setSocialName(e.target.value)}
          />
        </Col>
        <Col span={24}>
          <Input
            label="Url"
            animation={false}
            value={socialUrl}
            onChange={(e) => setSocialUrl(e.target.value)}
          />
        </Col>
      </Row>
    </ComponentContainer.filled>
  );
};
