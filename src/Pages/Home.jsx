import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../Component/Spinner'
import ax from '../config/ax'
import CartContext from '../Context/CartContext'
import Master from './Layout/Master'

function Home() {

  const[pageLoader,setPageLoader] = useState(true)
  const[productLoader,setProductLoader] = useState(false)
  const[product,setProduct] = useState({data:[]})
  const[category,setCategory] = useState({data:[]})
  const[selectedCatgory,setSelectedCategory] = useState(null)
  const [currentPage,setCurrentPage] = useState(1)
  const [api,setApi] = useState('/product')
  
  const {cart,setCart} = useContext(CartContext)

  useEffect(()=>{
    ax.get(api).then((res)=>{
      setPageLoader(false)
      setProductLoader(false)
      setProduct(res.data.data)
    })

    ax.get('/category').then((res)=>{
      setCategory(res.data.data)
      setPageLoader(false)
    })
  },[api])

  const viewAll = () => {
    setProductLoader(true)
    setSelectedCategory(null)
    setCurrentPage(1)
    setApi('/product')
  }

  const renderProductByCategory = (id) =>{
    setProductLoader(true)
    setCurrentPage(1)
    setSelectedCategory(id)
    setApi(`/product?category_id=${id}`)
  }

  const renderNextPage = () => {
    setProductLoader(true)
    setCurrentPage(currentPage + 1)
    const page = currentPage + 1
    if(selectedCatgory===null){
      setApi(`/product?page=${page}`)
    } else {
      setApi(`/product?category_id=${selectedCatgory}&page=${page}`)
    }
  }

  const renderPrevPage = () => {
    setProductLoader(true)
    setCurrentPage(currentPage - 1)
    const page = currentPage - 1
    if(selectedCatgory===null){
      setApi(`/product?page=${page}`)
    } else {
      setApi(`/product?category_id=${selectedCatgory}&page=${page}`)
    }
  }


  return (
    <Master>
         {
           pageLoader ? <Spinner />
           :
          <>
            <div className="row mb-4">
              <div className="col-md-12">
                <span 
                className={selectedCatgory===null ? 'btn btn-black': 'btn btn-outline-black'} 
                style={{marginRight:10}}
                onClick={()=>viewAll()}>
                  View All</span>
              {
                category.data.map((d)=>(
                      <span 
                      className={selectedCatgory===d.id ? 'btn btn-black' : 'btn btn-outline-black'} 
                      style={{marginRight:10}}
                       key={d.id} 
                      onClick={()=>renderProductByCategory(d.id)} >
                        {d.name}
                        </span>
                    ))
                  }
              </div>
            </div>

            <div className="row">
              {
                productLoader ? <Spinner />
                :
                <>
                  {
                    product.data.map((d)=>(
                      <div className="col-md-3" key={d.id}>
                            <div className="card">
                                <img src={`http://localhost:8000/images/${d.image}`} alt="" width='200px' />
                                <div className="card-body">
                                    <h6 className='text-center'>{d.name}</h6>
                                    <div className="d-flex justify-content-between mt-4">
                                        <span>$ {d.price}</span>
                                        <button 
                                        className='btn btn-sm btn-warning'
                                        onClick={()=>setCart([...cart,d])}
                                        >Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                      </div> 
                    ))
                  }   
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
          </div>
          </>
         }
    </Master>
  )
}

export default Home