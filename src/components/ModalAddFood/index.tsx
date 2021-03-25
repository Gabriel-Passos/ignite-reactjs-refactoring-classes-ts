import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Modal } from '../Modal';
import { Input } from '../Input';

import { Food } from '../../types';

import { Form } from './styles';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Food) => void;
}

export function ModalAddFood({ isOpen, setIsOpen, handleAddFood }: ModalAddFoodProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: Food) => {
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        
        <Input name="name" placeholder="Nome do prato" />
        
        <Input name="description" placeholder="Descrição" />

        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="image" placeholder="Cole o link aqui" />
        
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
