import React, {
  useEffect, useRef, useState, useMemo, useCallback,
} from 'react';
import styled from 'styled-components';
import BootstrapDropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
    <StyledItem
      key={val.id}
      onClick={handleChange(val.title)}
    >
      {val.title}
    </StyledItem>
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
            <Title>
              {value || '\xa0'}
            </Title>
            <FontAwesomeIcon size="xs" icon={faChevronDown} />
          </StyledDropdown>

          <StyledMenu>
            {Items}
          </StyledMenu>

        </BootstrapDropdown>
      </OverlayTrigger>
    </div>
  );
};

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const StyledDropdown = styled(BootstrapDropdown.Toggle)`
  display: flex;
  align-items: center;
  outline: none !important;
  box-shadow: none !important;
  padding: 0 3px;

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
  max-width: 40vw;
`;

const StyledItem = styled(BootstrapDropdown.Item)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SizeContainer = styled.div`
  position: absolute;
  visibility: hidden;
  z-index: -10;
`;

export default Dropdown;
