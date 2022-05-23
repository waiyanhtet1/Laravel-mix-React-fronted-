import React, { useEffect, useState } from 'react'
import Spinner from '../Component/Spinner'
import ax from '../config/ax'
import Master from './Layout/Master'

function Home() {

  const[loader,setLoader] = useState(true)
  const[product,setProduct] = useState({data:[]})
  const[category,setCategory] = useState({data:[]})
  const[selectedCatgory,setSelectedCategory] = useState()
  const [currentPage,setCurrentPage] = useState(1)
  const [api,setApi] = useState('/product')

  useEffect(()=>{
    ax.get(api).then((res)=>{
      setLoader(false)
      setProduct(res.data.data)
    })

    ax.get('/category').then((res)=>{
      setCategory(res.data.data)
    })
  },[api])

  const renderNextPage = () => {
    setCurrentPage(currentPage + 1)
    const page = currentPage + 1
    setApi(`/product?page=${page}`)
  }

  const renderPrevPage = () => {
    setCurrentPage(currentPage - 1)
    const page = currentPage - 1
    setApi(`/product?page=${page}`)
  }

  return (
    <Master>
         {
           loader ? <Spinner />
           :
          <>
            <div className="row mb-4">
              <div className="col-md-12">
              {
                category.data.map((d)=>(
                      <span 
                      className={selectedCatgory===d.id ? 'btn btn-black' : 'btn btn-outline-black'} 
                      style={{marginRight:10}}
                       key={d.id} 
                      onClick={()=>setSelectedCategory(d.id)} >
                        {d.name}
                        </span>
                    ))
                  }
              </div>
            </div>

            <div className="row">
              {
                product.data.map((d)=>(
                  <div className="col-md-3" key={d.id}>
                        <div className="card">
                            <img src={`http://localhost:8000/images/${d.image}`} alt="" width='200px' />
                            <div className="card-body">
                                <h6 className='text-center'>{d.name}</h6>
                                <div className="d-flex justify-content-between mt-4">
                                    <span>$ {d.price}</span>
                                    <button className='btn btn-sm btn-warning'>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                  </div> 
                ))
              }    
            </div>
            <div className="text-center mt-5">
              <button className='btn btn-primary' 
              disabled={product.prev_page_url === null} onClick={()=>renderPrevPage()}>
                <i className='fas fa-arrow-left'></i></button>

              <button className='btn btn-primary ms-3'
              disabled={product.next_page_url === null} onClick={()=>renderNextPage()}>
                <i className='fas fa-arrow-right'></i></button>
            </div>
          </>
         }
    </Master>
  )
}

export default Home