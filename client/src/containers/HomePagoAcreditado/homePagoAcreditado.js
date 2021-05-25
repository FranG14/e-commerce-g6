import React, { useEffect } from "react"
import { Link } from "react-router-dom" 
import {buy} from "../../redux/actions/cart_actions"
import { connect } from "react-redux"
import UniversalNavBar from "../../components/UniversalNavBar/universalNavBar"
import Footer from '../Footer/footer';
import nike2 from '../../assets/nike2.jpg'
import zapatillas from '../../assets/zapatillas.jpg'
import nike from '../../assets/nike.jpg'
import helly from '../../assets/helly.jpg'
import image1 from '../../assets/image1.jpg'
import image2 from '../../assets/image2.jpg'
import image3 from '../../assets/image3.jpg'
import image4 from '../../assets/image4.jpg'

let objHome={bandera:true}

function HomePagoAcreditado(props){
                

    useEffect(()=>{
        
        if(objHome.bandera){
            objHome.bandera=false
            fetch(`http://localhost:3001/carts/${props.match.params.userId}`,{
                    body:JSON.stringify({state:"completed"}),
                    method:"POST"
                })
                .then(res=>res.json())
                .then(res=>{
                    alert(JSON.stringify(res))
                    props.buy()
                })
                .catch(err=>{
                    alert(err)
                })
                
            
            
        }
        
    },[])

    return(
        <div>

      <body class="bg-white font-serif">

        {/* <header class="flex flex-wrap items-center justify-between px-12 h-32 -mb-32 relative"> */}
        <UniversalNavBar />
        {/* <ul class="order-last md:order-first flex-1 flex justify-center md:justify-start list-reset">
            <li>
              <a href="#" class="text-sm text-grey-darker no-underline hover:text-black">Home</a>
            </li>
            <li class="ml-8">
              <a href="#" class="text-sm text-grey-darker no-underline hover:text-black">About</a>
            </li>
            <li class="ml-8">
              <a href="#" class="text-sm text-grey-darker no-underline hover:text-black">Contact</a>
            </li>
          </ul> */}




        {/*   </header> */}

        <div class="w-full flex flex-wrap md:h-screen pt-32">
          <div class="pt-6 md:pt-0 w-full md:flex-1 md:order-last">
            <img src={nike2} class="w-full h-64 md:h-full object-cover" />
          </div>
          <div class="w-full p-6 pb-12 md:p-12 md:w-5/12 flex justify-center items-center relative">
            <div class="w-full relative text-center py-12 px-12 md:p-0 md:text-right">
              <h1 class="text-5xl mb-4">Ecommerce Clothes</h1>
              {/* <h2 class="text-2xl mb-4">Ut vel nunc a est auctor lacinia.</h2> */}
              <p class="leading-loose tracking-wide text-gray-700">Sport keeps us fit. It keeps you attentive. It unites us. Through sport we can change lives. Whether it's through inspiring athlete stories. Encouraging you to get going.</p>
              <br />
              <Link to="/Shop">
                <a class="justify-center inline-block bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 ">Shop!</a>
              </Link>
            </div>
          </div>
        </div>


        <div class="w-full -mt-6 pt-32 pb-24 px-12 text-center bg-black text-white">
          <h1 class="text-5xl mb-4">New Arrivals</h1>
          <section class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
            <ul role="list" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <li class="relative">
                <div class="block overflow-hidden w-full group aspect-w-10 aspect-h-7">
                  <img src={image1} width="300" height="300" class="object-cover pointer-events-none group-hover:opacity-75" />
                  <button type="button" class="absolute inset-0">
                    <span class="sr-only">View details for IMG</span>
                  </button>
                </div>
              </li>
              <li class="relative">
                <div class="block overflow-hidden w-full group aspect-w-10 aspect-h-7">
                  <img src={image2} width="300" height="300" class="object-cover pointer-events-none group-hover:opacity-75" />
                  <button type="button" class="absolute inset-0">
                    <span class="sr-only">View details for IMG</span>
                  </button>
                </div>
              </li>
              <li class="relative">
                <div class="block overflow-hidden w-full group aspect-w-10 aspect-h-7">
                  <img src={image3} width="300" height="300" class="object-cover pointer-events-none group-hover:opacity-75" />
                  <button type="button" class="absolute inset-0">
                    <span class="sr-only">View details for IMG</span>
                  </button>
                </div>
              </li>
              <li class="relative">
                <div class="block overflow-hidden w-full group aspect-w-10 aspect-h-7">
                  <img src={image4} width="300" height="300" class="object-cover pointer-events-none group-hover:opacity-75" />
                  <button type="button" class="absolute inset-0">
                    <span class="sr-only">View details for IMG</span>
                  </button>
                </div>
              </li>
            </ul>
          </section>
        </div>


        <div class="py-24 px-12">

          <div class="container mx-auto flex flex-wrap">
            <div class="w-full md:w-1/2 md:pr-4 flex flex-wrap mb-12 md:mb-0">
              <div class="p-2 w-1/2">
                <img src={zapatillas} class="w-full h-64 object-cover" />
              </div>
              <div class="p-2 w-1/2">
                <img src={nike} class="w-full h-64 object-cover" />
              </div>
              <div class="p-2 w-full">
                <img src={helly} class="w-full h-64 object-cover" />
              </div>
            </div>
            <div class="w-full md:w-1/2 md:pl-4">
              <h2 class="text-4xl mb-10">Develop</h2>
              <div class="max-w-lg">
                {/* <p class="mb-6 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis vulputate tellus. Etiam vel placerat lorem, eget ornare nibh. Ut in commodo magna. Quisque vitae fermentum quam. Mauris venenatis id enim at porta. Etiam molestie lorem non odio hendrerit.</p> */}
                {/* <p class="mb-6 text-gray-700">At vulputate ligula consequat. Morbi sollicitudin mollis erat, in tempus nisi. Quisque vehicula vitae sem in ornare. Vivamus id odio ligula.</p> */}
                <p class="mb-10 text-gray-700">Ecommerce Clothes is much more than sports and training clothing. We partner with the best in the industry to develop our apparel. In this way, we offer our followers the sports clothes and styles that best suit their sports needs, without neglecting sustainability.</p>
                <a href="#" class="inline-block bg-black text-white px-6 py-3 text-sm hover:bg-gray-800">Find out more</a>

              </div>
            </div>
          </div>
        </div>

        {/* <div class="bg-black text-white text-center text-sm py-12">
          <p>Copyright © 2019 Henry</p>
        </div> */}



      </body>
      <Footer />
    </div>
    )
}
let mapToStateProps = (state) =>{
    return {
        test: state.userReducer
    }
}
//export default HomePagoAcreditado
export default connect(mapToStateProps, { buy })(HomePagoAcreditado); 