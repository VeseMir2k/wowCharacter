import React from "react";

function Form(props) {
  const regions = ["EU", "US", "TW", "KR", "CN"];

  return (
    <form>
      <div className="form-group">
        <label>
          Nazwa postaci:
          <input
            placeholder="thomgnar"
            name="name"
            className="form-control"
            type="text"
            onChange={props.handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Nazwa serwera:
          <input
            placeholder="burning-legion"
            name="realm"
            className="form-control"
            type="text"
            onChange={props.handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Nazwa regionu:
          <select
            name="region"
            className="form-control"
            onChange={props.handleChange}
          >
            {regions.map((region) => (
              <option key={region}>{region}</option>
            ))}
          </select>
        </label>
      </div>
      <button className="btn btn-primary" onClick={props.handleClick}>
        Szukaj
      </button>
    </form>
  );
}

export default Form;
