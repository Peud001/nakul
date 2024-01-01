import oops from '../../asset/oops.webp'

const NotPriceRange = () => {
  return (
    <div className="notFound">
      <img src={oops} />
      <h3>Oops!</h3>
      <div>
        It seems like there are no items available within the selected price
        range.
      </div>
      <div>
        Please adjust your filters to find the perfect match for your
        preferences.
      </div>
      <div>Happy shopping!</div>
    </div>
  );
}

export default NotPriceRange