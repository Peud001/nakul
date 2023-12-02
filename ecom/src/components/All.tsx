import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { useState } from "react";

interface allType {
  id: number | string;
  thumbnail: string;
  title: string;
  rating: number;
  stock: number;
  price: number;
  images: string[];
  discountPercentage: number;
}

const All = () => {
  const [imageId, setImageId] = useState<allType | string>("");

  const all: allType[] = useAppSelector((state) => state.all.all);

  const handleHover = (item: allType) => {
    setImageId(item === imageId ? "" : item);
  };
  const handleLeave = () => {
    setImageId("");
  };

  return (
    <section>
      <div className="all">
        {all &&
          all.map((item) => {
            return (
              <div key={item.id} className="all-items">
                <div>
                  <div className="image">
                    <img
                      onMouseEnter={() => handleHover(item)}
                      onMouseLeave={handleLeave}
                      className="all-image"
                      src={imageId === item ? item.images[0] : item.thumbnail}
                    />
                    <div className="add-to-cart">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#808080"
                        className="bi bi-cart3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                      </svg>
                    </div>
                  </div>
                  <div>{item.title}</div>
                  <div className="rating-stock">
                    <div className="stock-all">{item.stock} sold</div>
                    <div className="rating-all">
                      <div className="rating-star">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="currentColor"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </div>
                      <div>{item.rating.toFixed(1)}</div>
                    </div>
                  </div>
                  <div className="price-all">
                    <div className="discounted-price-all">
                      $<span className="price">{item.price.toFixed(2)}</span>
                    </div>
                    <div className="price-prev">
                      $
                      {(
                        item.price +
                        (item.price * item.discountPercentage) / 100
                      ).toFixed(2)}
                    </div>
                  </div>
                  <div className="preview-all">
                    <Link to="/view" className="preview-link">
                      <div className="preview">See preview</div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default All;
