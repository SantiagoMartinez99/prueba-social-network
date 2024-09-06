import { useState } from "react";

function ImageFilter({ imageSrc }) {
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscale: 0,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filterStyle = {
    filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) grayscale(${filters.grayscale}%)`,
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <img
          src={imageSrc}
          alt="Preview"
          style={filterStyle}
          className="w-full h-auto rounded-lg border border-gray-300"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <div>
          <label>Brillo</label>
          <input
            type="range"
            name="brightness"
            min="0"
            max="200"
            value={filters.brightness}
            onChange={handleFilterChange}
            className="w-full"
          />
        </div>
        <div>
          <label>Contraste</label>
          <input
            type="range"
            name="contrast"
            min="0"
            max="200"
            value={filters.contrast}
            onChange={handleFilterChange}
            className="w-full"
          />
        </div>
        <div>
          <label>Saturación</label>
          <input
            type="range"
            name="saturation"
            min="0"
            max="200"
            value={filters.saturation}
            onChange={handleFilterChange}
            className="w-full"
          />
        </div>
        <div>
          <label>Escala de grises</label>
          <input
            type="range"
            name="grayscale"
            min="0"
            max="100"
            value={filters.grayscale}
            onChange={handleFilterChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ImageFilter;
