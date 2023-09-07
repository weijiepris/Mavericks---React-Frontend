import { FC, useState, } from 'react'
import EmployeeCard, { EmployeeCardProps } from '../employee/EmployeeCard/EmployeeCard';
import "./Main.css"
import Pagination from '../common/Pagination/Pagination';
import ReusableCard from '../common/ResuableCard/ReusableCard';

const Main: FC = () => {

  const [items, setItems] = useState<any[]>([{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }]);
  const [cards, setCards] = useState<EmployeeCardProps[]>([])

  const handlePageChange = (incomingItem: EmployeeCardProps[]) => {
    setCards(incomingItem)
  }

  const handleDeleteCard = (card: EmployeeCardProps) => {
    const { id } = card;

    let tempCards = items.filter(c => c.id !== id);
    setItems(tempCards);
  }

  return (
    <>
      <ReusableCard className="flex-container" style={{ boxShadow: "none" }}>
        {cards.map((card: EmployeeCardProps) => (<EmployeeCard key={card.id} card={card} onDelete={handleDeleteCard} />))}
      </ReusableCard>
      <Pagination items={items} rowsPerPage={10} showItem={handlePageChange} />
    </>
  )
}
export default Main