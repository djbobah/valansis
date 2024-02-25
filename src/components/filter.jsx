const Filter = ({ filter, onChange, onSubmit, onCancel }) => {
  return (
    <>
      <div className="container mt-3 mb-3">
        <form className="row g-3 mt-2" onSubmit={onSubmit}>
          <div className="col-auto my-auto ">Фильтры:</div>
          <div className="col-auto">
            <label htmlFor="name" className="visually-hidden">
              Название
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
              placeholder="Название"
              value={filter.name}
            />
          </div>
          <div className="col-auto">
            <label htmlFor="brand" className="visually-hidden">
              Брэнд
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              onChange={onChange}
              placeholder="Брэнд"
              value={filter.brand}
            />
          </div>
          <div className="col-auto">
            <label htmlFor="price" className="visually-hidden">
              Цена
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              onChange={onChange}
              placeholder="Цена"
              value={filter.price}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-3"
              // onClick={handleClick}
            >
              Применить фильтр
            </button>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-secondary "
              onClick={onCancel}
            >
              Х
            </button>
          </div>
        </form>
        <hr />
      </div>
    </>
  );
};

export default Filter;
