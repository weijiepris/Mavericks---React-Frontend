import { FC, useEffect, useState, } from 'react'
import EmployeeCard, { EmployeeCardProps } from '../employee/EmployeeCard/EmployeeCard';
import "./Main.css"
import Pagination from '../common/Pagination/Pagination';
import ReusableCard from '../common/ResuableCard/ReusableCard';
import { useSelector, useDispatch } from 'react-redux';
import { EmployeeCardInterface, InitialEmployeesState, } from '../../store';
import { Dispatch } from 'redux';
import { CONSTANTS } from '../../constants';
import { v4 as uuidv4 } from 'uuid';
import { fetchAllEmployee } from '../actions';

const Main: FC = () => {
  // const items: EmployeeCardInterface[] = [
  //   { id: 0, name: 'Eva', salary: 89162, department: 'HR' },
  //   { id: 1, name: 'David', salary: 108643, department: 'PS' },
  //   { id: 2, name: 'Hannah', salary: 110295, department: 'PS' },
  //   { id: 3, name: 'Eva', salary: 94476, department: 'PS' },
  //   { id: 4, name: 'Alice', salary: 94142, department: 'HR' },
  //   { id: 5, name: 'Frank', salary: 102149, department: 'PS' },
  //   { id: 6, name: 'Bob', salary: 94158, department: 'HR' },
  //   { id: 7, name: 'Grace', salary: 101712, department: 'PS' },
  //   { id: 8, name: 'Hannah', salary: 59466, department: 'PS' },
  //   { id: 9, name: 'Charlie', salary: 117387, department: 'HR' },
  //   { id: 10, name: 'Grace', salary: 103937, department: 'HR' },
  //   { id: 11, name: 'Bob', salary: 112249, department: 'HR' }
  // ]
  // const [items, setItems] = useState<any[]>([{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }]);
  const [cards, setCards] = useState<EmployeeCardProps[]>([])

  const employees: EmployeeCardInterface[] = useSelector((state: InitialEmployeesState) => state.employees);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    handleFetchAllEmployees();

    return (() => {
      setCards([])
    })
  }, [])


  useEffect(() => {
  }, [cards])


  const handleFetchAllEmployees = async () => {
    const employees = await fetchAllEmployee().then(res => res.data);
    employeesHandler(employees)
  }

  const employeesHandler = (payload: EmployeeCardInterface[]) => {
    dispatch({ type: CONSTANTS.SET_ALL, payload });
  }

  const handlePageChange = (incomingItem: EmployeeCardProps[]) => {

    setCards(incomingItem)
  }

  const handleDeleteCard = (card: EmployeeCardProps) => {
    const { id } = card;

    // let tempCards = items.filter(c => c.id !== id);
    // setItems(tempCards);
  }

  return (
    <>
      <ReusableCard className="flex-container" style={{ boxShadow: "none" }}>
        {cards.length > 0 && cards.map((card: EmployeeCardProps) => (<EmployeeCard key={uuidv4()} card={card} onDelete={handleDeleteCard} />))}
      </ReusableCard>
      <Pagination items={employees} rowsPerPage={10} showItem={handlePageChange} />
    </>
  )
}
export default Main