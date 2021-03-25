import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Header } from '../../components/Header';
import { FoodCard } from '../../components/FoodCard';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import api from '../../services/api';

import { Food } from '../../types';

import { FoodsContainer } from './styles';

export function Dashboard() {
  const [foods, setFoods] = useState<Food[]>([]);

  const [editingFood, setEditingFood] = useState<Food>({} as Food);

  const [modalOpen, setModalOpen] = useState(false);
  
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data));
  }, []);

  const handleAddFood = async (food: Food) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.number().required(),
        image: Yup.string().required(),
      });

      await schema.validate(food, {
        abortEarly: false
      }); 

      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
      toast.success('Novo prato adicionado');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        toast.error('Preencha os campos');
        setModalOpen(true);
      }
    }
  }

  const handleUpdateFood = async (food: Food) => {
    try {
      const foodUpdated = await api.put<Food>(`/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(foodItem =>
        foodItem.id !== foodUpdated.data.id ? foodItem : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      toast.error('Erro ao atualizar prato');
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
    toast.info('Prato deletado');
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  const handleEditFood = (food: Food) => {
    setEditingFood(food);
    setEditModalOpen(true);
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
          foods.map(food => (
            <FoodCard
              key={food.id}
              food={food}
              handleDeleteFoodCard={() => handleDeleteFood(food.id)}
              handleEditFoodCard={() => handleEditFood(food)}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
