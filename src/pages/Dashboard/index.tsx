import { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import api from "../../services/api";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { GetFood, AddFood } from "../../utils/types";


export function Dashboard(){
  const [foods, setFoods] = useState<GetFood[]>([]);
  const [editingFood, setEditingFood] = useState<GetFood>({} as GetFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get("/foods");
      setFoods(response.data);
    }
    loadFoods();
  }, []);

  async function handleAddFood(food: AddFood): Promise<void> {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleUpdateFood(food: AddFood): Promise<void> {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });
      const foodList = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );
      setFoods(foodList);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDeleteFood(id: number):Promise <void>{
    await api.delete(`/foods/${id}`);
    const foodList = foods.filter(food => food.id !== id);
    setFoods(foodList);
  }
  function toggleModal(){
    setModalOpen(!modalOpen);
  }
  function toggleEditModal(){
    setEditModalOpen(!editModalOpen);
  }
  function handleEditFood(food: GetFood){
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <>
      <Header onHandleOpenModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDeleteFood={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}