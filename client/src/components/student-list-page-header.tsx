import { Button } from './button';
import styled from 'styled-components';
type ListHeaderProps = {
  disableAddButton: boolean;
  disableBulkDeleteButton: boolean;
  onAddStudentClick: () => void;
  onBulkDeleteClick: () => void;
};

export function ListHeader({
  disableAddButton,
  disableBulkDeleteButton,
  onAddStudentClick,
  onBulkDeleteClick,
}: ListHeaderProps) {
  return (
    <Row>
      <h1>Students</h1>
      <ButtonGroup>
        <Button disabled={disableBulkDeleteButton} onClick={onBulkDeleteClick}>
          Deleted Selected Students
        </Button>
        <Button disabled={disableAddButton} onClick={onAddStudentClick}>
          Add Student
        </Button>
      </ButtonGroup>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonGroup = styled(Row)`
  gap: 8px;
`;
