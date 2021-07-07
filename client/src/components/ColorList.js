import React, { useState } from "react";
import crudColors from '../crud/colors';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setAdding(false);
    setColorToAdd(initialColor);
    setEditing(true);
    setColorToEdit(color);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    if(editing) {
      crudColors.updateColor(colorToEdit)
      .then(res => {
        setEditing(false);
        updateColors(colors.map(item => item.id === colorToEdit.id ? colorToEdit : item));
      })
    } else if(adding) {
      crudColors.addColor(colorToAdd)
        .then(res => {
          setColorToAdd(initialColor);
          setAdding(false);
          updateColors(res.data);
        })
    }
  };

  const handleDeleteColor = color => {
    // make a delete request to delete this color
    crudColors.deleteColor(color.id)
      .then(res => {
        updateColors(colors.filter(item => item.id !== res.data));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    handleDeleteColor(color);
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {!adding && (
        <div className="button-row">
          <button onClick={() => {
            setAdding(true);
            setEditing(false);
          }}>Add color</button>
        </div>
      )}
      {(editing || adding) && (
        <form onSubmit={handleSubmit}>
          <legend>{editing ? 'edit color' : 'add color'}</legend>
          <label>
            color name:
            <input
              onChange={e => {
                editing ? 
                setColorToEdit({ ...colorToEdit, color: e.target.value }) :
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }}
              value={editing ? colorToEdit.color : colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e => {
                editing ?
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                }) :
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }}
              value={editing ? colorToEdit.code.hex : colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">{editing ? 'save' : 'add'}</button>
            <button onClick={() => {
              setEditing(false);
              setAdding(false);
              setColorToAdd(initialColor);
            }}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
