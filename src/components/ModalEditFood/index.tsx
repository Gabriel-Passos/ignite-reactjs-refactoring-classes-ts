import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Modal } from '../Modal';
import { Input } from '../Input';

import { Food } from '../../types';

import { Form } from './styles';

interface ModalEditFoodProps {
  setIsOpen: () => void;
  handleUpdateFood: (food: Food) => void;
  editingFood: Food;
  isOpen: boolean;
  foodId?: number;
}

export function ModalEditFood({ 
  setIsOpen, 
  handleUpdateFood, 
  editingFood, 
  isOpen
}: ModalEditFoodProps) {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = async (data: Food) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>

        <Input name="name" placeholder="Ex: Moda Italiana" />

        <Input name="description" placeholder="Descrição" />
        
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="image" placeholder="Cole o link aqui" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
