import React from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "react-bootstrap/Popover";

function Equipment(props) {
  return (
    <div className="text-center">
      {props.mediaEquipment.data.map((item, index) => (
        <OverlayTrigger
          key={index}
          overlay={
            <Tooltip id="tooltip-disabled">
              <p>
                {
                  props.equipment.equipped_items[index].inventory_type.name
                    .en_US
                }
              </p>
              <p>{props.equipment.equipped_items[index].name.en_US}</p>
            </Tooltip>
          }
        >
          <img src={item.assets[0].value} alt={index} key={index} />
        </OverlayTrigger>
      ))}
    </div>
  );
}

export default Equipment;
