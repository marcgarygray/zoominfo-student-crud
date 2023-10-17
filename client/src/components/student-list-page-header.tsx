import { Button } from './button';
import styled from 'styled-components';
type ListHeaderProps = {
  tableLoading: boolean;
  onAddStudentClick: () => void;
};

export function ListHeader({
  tableLoading,
  onAddStudentClick,
}: ListHeaderProps) {
  return (
    <Row>
      <h1>Student List</h1>
      <ButtonGroup>
        <Button disabled={tableLoading}>Deleted Selected Students</Button>
        <Button onClick={onAddStudentClick}>Add Student</Button>
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
