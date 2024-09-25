import React from "react";
import ButtonEditAdmin from "./EditButtonAdmin";
import ButtonDeleteComponent from "./ButtonDeleteAdmin";
import '../styles/ContentDeleteAndEdit.css'; // Importar el archivo de estilos

interface ContentDeleteAndEditProps {
  name: string;
  id: string;
  onClickDelete?: () => void; // Hacer que la función sea opcional
  onClickEdit?: () => void;   // Hacer que la función sea opcional
}

const ContentDeleteAndEdit: React.FC<ContentDeleteAndEditProps> = ({ name, onClickDelete = () => {}, onClickEdit = () => {} }) => {
  return (
    <div className="content-delete-edit-container">
      <h3 className="content-title">{name}</h3>
      <div className="button-container">
        <ButtonEditAdmin onClickEdit={onClickEdit} />
        <ButtonDeleteComponent onClickDelete={onClickDelete} />
      </div>
    </div>
  );
};

export default ContentDeleteAndEdit;
