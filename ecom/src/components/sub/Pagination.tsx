
interface paginationType {
    totalItem : number
    itemPerPage : number
    changePage : (number: number) => void
}

const Pagination = ({changePage, totalItem, itemPerPage}: paginationType) => {

    const pageNumbers = []

    const pageCount = Math.ceil(totalItem / itemPerPage)

    for(let i = 1; i <= pageCount; i++){
        pageNumbers.push(i)
    }

    return (
      <section className="pagination">
        {pageNumbers.map((pageNumber, i) => 
            <button
              className="pagination-btn"
              key={i}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
        )}
      </section>
    );
}
export default Pagination