import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Stack, Typography, Box } from "@strapi/design-system";
import Editor from "../Editor";
import { useIntl } from "react-intl";

const LabelAction = styled(Box)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;

const TypographyAsterisk = styled(Typography)`
  line-height: 0;
`;

const Input = ({
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  value,
  required,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Stack spacing={1}>
        <Stack horizontal spacing={1}>
          <Typography variant="pi" fontWeight="bold" textColor="neutral800">
            {formatMessage(intlLabel)}
            {required && (
              <TypographyAsterisk textColor="danger600">*</TypographyAsterisk>
            )}
          </Typography>
          {labelAction && (
            <LabelAction paddingLeft={1}>{labelAction}</LabelAction>
          )}
        </Stack>
        <Editor
          disabled={disabled}
          name={name}
          onChange={onChange}
          value={value}
          error={error}
        />
        {error && (
          <Box paddingTop={1}>
            <Typography
              variant="pi"
              textColor="danger600"
              data-strapi-field-error
            >
              {error}
            </Typography>
          </Box>
        )}
      </Stack>
    </>
  );
};

Input.defaultProps = {
  description: "",
  disabled: false,
  error: undefined,
  intlLabel: "",
  required: false,
  value: "",
};

Input.propTypes = {
  description: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default Input;
