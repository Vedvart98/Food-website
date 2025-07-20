// \/
import styled from "styled-components";
const API_URL = import.meta.env.REACT_APP_API_URL;

const DishCard = ({ name, price, imageUrl }) => {
  return (
    <DishCardContainer>
      <div className="dish-card">
        <img src={`${API_URL}${imageUrl}`} alt={name} className="photo" />
        <div className="naam">
          <h3 className="name">{name}</h3>
          <p>${price}</p>
        </div>
      </div>
    </DishCardContainer>
  );
};

export default DishCard;
const DishCardContainer = styled.div`
padding:10px 10px 10px 10px;
.dish-card{
  display:flex;
  flex-direction:column;
  width: clamp(160px, 45vw, 220px);
  justify-content:space-around;
  align-items:center;
  padding: 0.75rem;
  gap: 0.5rem;
  border-radius: 12px;
  color:black;
}
.photo{
  width:200px;
  height:100px;
  object-fit:cover;
  border-radius:8px;
  }

.naam {
  display:flex;
  justify-content:space-between;
align-items:center;
  gap:30px;
}

.name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}
@media (max-width: 480px) {
    .photo {
      height: 110px;
    }
  }
`;
