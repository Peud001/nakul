

const Discount = () => {

  const discounts = [
    {percent : '50%'},
    {percent : '40%'},
    {percent : '30%'},
    {percent : '20%'},
    {percent : '10%'}
  ]

  return (
    <section>
      <div className='categories'>Discount</div>
      <div className="discount">
        {
          discounts.map((item, i) => {
            return <div key={i}>
              <input
              type='radio'
              name='price' 
              />
              <label className="label" >{item.percent} or more</label>
            </div>
          })
        }
      </div>
    </section>
  )
}

export default Discount