import { Component, useEffect, useState } from "react";

import { Header } from "../../components/Header";
import api from "../../services/api";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { GetFood } from "../../utils/types";

function Dashboard(){
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
    
  async function handleAddFood(food: Omit<GetFood, 'id' | 'available'>){
    try{
      const response = await api.post("/foods",
      ...food,
      available: true,
      )};

    setFoods([...foods, response.data]);
  } catch (err) {
    console.log(err);
  }

  function handleUpdateFood(food: GetFood): void {
    const foodsFiltered = foods.filter((foodItem) => foodItem.id !== food.id);

    setFoods([...foodsFiltered, food]);
  }

  function handleDeleteFood(id: number): void {
    const foodsFiltered = foods.filter((foodItem) => foodItem.id !== id);
    await api.delete(`/foods/${id}`);
    setFoods(foodsFiltered);
  }
  
  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: GetFood): void {
    setEditingFood(food);
    toggleEditModal();
  }
    return (
      <>
        <Header openModal={toggleModal} />
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
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );

