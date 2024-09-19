import React from "react";
import ButtonEditAdmin from "./EditButtonAdmin";
import ButtonDeleteComponent from "./ButtonDeleteAdmin";

interface ContentDeleteAndEditProps {
  name: string;
  id: string;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

const ContentDeleteAndEdit: React.FC<ContentDeleteAndEditProps> = ({ name, onClickDelete, onClickEdit }) => {
  return (
    <div>
      <h3>{name}</h3>
      <ButtonEditAdmin onClickEdit={onClickEdit} /> {/* Cambié 'onClick' a 'onClickEdit' */}
      <ButtonDeleteComponent onClickDelete={onClickDelete} /> {/* Cambié 'onClick' a 'onClickDelete' */}
    </div>
  );
};

export default ContentDeleteAndEdit;
