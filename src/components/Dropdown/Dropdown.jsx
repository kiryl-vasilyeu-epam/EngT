import React, {
  useEffect, useRef, useState, useMemo, useCallback,
} from 'react';
import styled from 'styled-components';
import BootstrapDropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Dropdown = ({
  value, values,
  onChange,
  isCorrect, isIncorrect,
  tooltip,
  disabled,
}) => {
  const [width, setWidth] = useState(10);
  const ref = useRef(null);
  const dropDownRef = useRef(null);

  const handleChange = useCallback((title) => () => {
    onChange(title);
  }, [onChange]);

  useEffect(() => {
    dropDownRef?.current?.blur?.();
  }, [value]);

  useEffect(() => {
    const newWidth = ref?.current?.offsetWidth;
    if (newWidth && width !== newWidth) {
      setWidth(newWidth);
    }
  }, [ref]);

  const TooltipComponent = useMemo(() => (
    <Tooltip show={!!tooltip} style={{ position: 'absolute' }}>{tooltip}</Tooltip>
  ), [tooltip]);

  const Items = useMemo(() => values.map((val) => (
    <BootstrapDropdown.Item
      key={val.id}
      onClick={handleChange(val.title)}
    >
      {val.title}
    </BootstrapDropdown.Item>
  )), [values, onChange]);

  // eslint-disable-next-line no-nested-ternary
  const variant = isCorrect
    ? 'success'
    : isIncorrect
      ? 'danger'
      : 'outline-secondary';

  return (
    <div>
      <SizeContainer>
        <StyledMenu show ref={ref}>
          {Items}
        </StyledMenu>
      </SizeContainer>

      <OverlayTrigger
        show={tooltip ? undefined : false}
        overlay={TooltipComponent}
      >
        <BootstrapDropdown disabled={disabled}>

          <StyledDropdown
            size="sm"
            style={{ width }}
            variant={variant}
            $isCorrect={isCorrect}
            $isIncorrect={isIncorrect}
            ref={dropDownRef}
          >
            {value || '\xa0'}
          </StyledDropdown>

          <StyledMenu>
            {Items}
          </StyledMenu>

        </BootstrapDropdown>
      </OverlayTrigger>
    </div>
  );
};

const StyledDropdown = styled(BootstrapDropdown.Toggle)`
  display: flex;
  outline: none !important;
  box-shadow: none !important;
  padding: 0;
  justify-content: center;
  align-items: center;
  &:after {
    display: none;
  };
  ${({ $isCorrect, $isIncorrect }) => ((!$isCorrect && !$isIncorrect)
    ? `
      &:hover {
        background-color: #C5C9D0;
      };
      &:focus {
        background-color: #C5C9D0;
      };`
    : '')}
  
`;

const StyledMenu = styled(BootstrapDropdown.Menu)`
  min-width: 0;
`;

const SizeContainer = styled.div`
  position: absolute;
  visibility: hidden;
  z-index: -10;
`;

export default Dropdown;
