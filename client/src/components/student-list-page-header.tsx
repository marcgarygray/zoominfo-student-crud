import { Button } from './button';
import styled from 'styled-components';
type ListHeaderProps = {
  bulkDeleting: boolean;
  tableLoading: boolean;
  onAddStudentClick: () => void;
  onBulkDeleteClick: () => void;
};

export function ListHeader({
  bulkDeleting,
  tableLoading,
  onAddStudentClick,
  onBulkDeleteClick,
}: ListHeaderProps) {
  return (
    <Row>
      <h1>Student List</h1>
      <ButtonGroup>
        <Button
          disabled={tableLoading || bulkDeleting}
          onClick={onBulkDeleteClick}
        >
          Deleted Selected Students
        </Button>
        <Button disabled={bulkDeleting} onClick={onAddStudentClick}>
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
